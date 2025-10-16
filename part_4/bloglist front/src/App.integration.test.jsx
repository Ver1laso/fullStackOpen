import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import loginService from './services/loginServices'
import blogsServices from './services/blogsServices'

// Mock de los servicios
vi.mock('./services/loginServices', () => ({
  default: {
    login: vi.fn()
  }
}))

vi.mock('./services/blogsServices', () => ({
  default: {
    setToken: vi.fn(),
    getAll: vi.fn(),
    create: vi.fn(),
    addLikes: vi.fn(),
    deletePost: vi.fn()
  }
}))

// Mock de localStorage
const localStorageMock = (() => {
  let store = {}
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value },
    removeItem: (key) => { delete store[key] },
    clear: () => { store = {} }
  }
})()
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('App Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  test('muestra formulario de login cuando usuario no está autenticado', () => {
    render(<App />)
    
    expect(screen.getByRole('textbox', { name: /username/i })).toBeDefined()
    // expect(screen.getByRole('textbox', { name: /password/i })).toBeDefined()
    expect(screen.getByLabelText(/password/i)).toBeDefined()
    expect(screen.getByRole('button', { name: /login/i })).toBeDefined()
  })

  test('login exitoso: usuario ingresa credenciales y ve sus posts', async () => {
    const user = userEvent.setup()
    
    // Mock del login exitoso
    loginService.login.mockResolvedValueOnce({
      token: 'abc123token',
      name: 'Juan Pérez',
      username: 'juan'
    })

    // Mock de getAll retorna posts
    blogsServices.getAll.mockResolvedValueOnce([
      {
        id: '1',
        title: 'Mi primer blog',
        author: 'Juan Pérez',
        url: 'http://ejemplo.com',
        likes: 5
      },
      {
        id: '2',
        title: 'Blog de otro autor',
        author: 'María López',
        url: 'http://otro.com',
        likes: 3
      }
    ])

    render(<App />)

    // Usuario ingresa credenciales
    const usernameInput = screen.getByRole('textbox', { name: /username/i })
    // const passwordInput = screen.getByRole('textbox', { name: /password/i })
    const passwordInput = screen.getByLabelText(/password/i)

    
    await user.type(usernameInput, 'juan')
    await user.type(passwordInput, 'password123')
    
    // Usuario hace click en login
    const loginButton = screen.getByRole('button', { name: /login/i })
    await user.click(loginButton)

    // Verifica que se llamó al servicio de login
    expect(loginService.login).toHaveBeenCalledWith({
      username: 'juan',
      password: 'password123'
    })

    // Verifica que se guardó el token
    expect(blogsServices.setToken).toHaveBeenCalledWith('abc123token')

    // Verifica que se guardó en localStorage
    expect(localStorage.getItem('loggedBlogappUser')).toBeDefined()

    // Espera a que carguen los blogs
    await screen.findByText('Mi primer blog')

    // Verifica que se muestran sus posts (solo del autor)
    expect(screen.getByText('Mi primer blog')).toBeDefined()
    expect(screen.queryByText('Blog de otro autor')).toBeNull() // No ve posts de otros
  })

  test('usuario puede crear un nuevo post', async () => {
    const user = userEvent.setup()

    // Setup: Usuario ya loggeado
    loginService.login.mockResolvedValueOnce({
      token: 'abc123',
      name: 'Juan Pérez',
      username: 'juan'
    })

    blogsServices.getAll.mockResolvedValueOnce([])

    const nuevoPost = {
      id: '3',
      title: 'Mi nuevo blog',
      author: 'Juan Pérez',
      url: 'http://nuevo.com',
      likes: 0
    }

    blogsServices.create.mockResolvedValueOnce(nuevoPost)

    render(<App />)

    // Login
    await user.type(screen.getByRole('textbox', { name: /username/i }), 'juan')
    // await user.type(screen.getByRole('textbox', { name: /password/i }), 'password123')
    await user.type(screen.getByLabelText(/password/i), 'password123')

    await user.click(screen.getByRole('button', { name: /login/i }))

    // Espera a que cargue
    await screen.findByText('Your published posts')

    // Click en "Create a post"
    const createButton = screen.getByRole('button', { name: /Create a post/i })
    await user.click(createButton)

    // Completa el formulario
    const inputs = screen.getAllByRole('textbox')
    const titleInput = inputs[inputs.length - 2] // Último textbox es el de URL
    const urlInput = inputs[inputs.length - 1]

    await user.type(titleInput, 'Mi nuevo blog')
    await user.type(urlInput, 'http://nuevo.com')

    // Envía el formulario
    const saveButton = screen.getByRole('button', { name: /save/i })
    await user.click(saveButton)

    // Verifica que se llamó al servicio create
    expect(blogsServices.create).toHaveBeenCalledWith({
      title: 'Mi nuevo blog',
      author: 'Juan Pérez',
      url: 'http://nuevo.com',
      likes: 0
    })

    // Verifica que el post aparece en la lista
    await screen.findByText('Mi nuevo blog')
    expect(screen.getByText('Mi nuevo blog')).toBeDefined()
  })

  test('usuario puede dar like a un post', async () => {
    const user = userEvent.setup()

    // Setup
    loginService.login.mockResolvedValueOnce({
      token: 'abc123',
      name: 'Juan Pérez',
      username: 'juan'
    })

    const post = {
      id: '1',
      title: 'Mi blog',
      author: 'Juan Pérez',
      url: 'http://ejemplo.com',
      likes: 5
    }

    blogsServices.getAll.mockResolvedValueOnce([post])

    const postActualizado = { ...post, likes: 6 }
    blogsServices.addLikes.mockResolvedValueOnce(postActualizado)

    render(<App />)

    // Login
    await user.type(screen.getByRole('textbox', { name: /username/i }), 'juan')
    // await user.type(screen.getByRole('textbox', { name: /password/i }), 'password123')
    await user.type(screen.getByLabelText(/password/i), 'password123')

    await user.click(screen.getByRole('button', { name: /login/i }))

    // Espera a que cargue el post
    await screen.findByText('Mi blog')

    // Click en "View" para ver detalles
    const viewButton = screen.getByRole('button', { name: /View/i })
    await user.click(viewButton)

    // Click en "Like"
    const likeButton = screen.getByRole('button', { name: /Like/i })
    await user.click(likeButton)

    // Verifica que se llamó a addLikes
    expect(blogsServices.addLikes).toHaveBeenCalledWith('1', {
      ...post,
      likes: 6
    })
  })

  test('usuario puede eliminar su post', async () => {
    const user = userEvent.setup()

    // Setup
    loginService.login.mockResolvedValueOnce({
      token: 'abc123',
      name: 'Juan Pérez',
      username: 'juan'
    })

    const post = {
      id: '1',
      title: 'Mi blog para eliminar',
      author: 'Juan Pérez',
      url: 'http://ejemplo.com',
      likes: 5
    }

    blogsServices.getAll.mockResolvedValueOnce([post])
    blogsServices.deletePost.mockResolvedValueOnce({})

    render(<App />)

    // Login
    await user.type(screen.getByRole('textbox', { name: /username/i }), 'juan')
    // await user.type(screen.getByRole('textbox', { name: /password/i }), 'password123')
    await user.type(screen.getByLabelText(/password/i), 'password123')

    await user.click(screen.getByRole('button', { name: /login/i }))

    // Espera a que cargue
    await screen.findByText('Mi blog para eliminar')

    // Click en "View"
    const viewButton = screen.getByRole('button', { name: /View/i })
    await user.click(viewButton)

    // Click en "Delete Post"
    // Mock window.confirm para que retorne true
    vi.spyOn(window, 'confirm').mockReturnValueOnce(true)

    const deleteButton = screen.getByRole('button', { name: /Delete Post/i })
    await user.click(deleteButton)

    // Verifica que se llamó a deletePost
    expect(blogsServices.deletePost).toHaveBeenCalledWith('1')

    // Verifica que el post desaparece
    expect(screen.queryByText('Mi blog para eliminar')).toBeNull()
  })

  test('login fallido muestra error', async () => {
    const user = userEvent.setup()

    // Mock de login que falla
    loginService.login.mockRejectedValueOnce(new Error('Wrong credentials'))

    render(<App />)

    // Usuario ingresa credenciales incorrectas
    await user.type(screen.getByRole('textbox', { name: /username/i }), 'juan')
    // await user.type(screen.getByRole('textbox', { name: /password/i }), 'wrongpassword')
    await user.type(screen.getByLabelText(/password/i), 'wrongpassword')
    
    await user.click(screen.getByRole('button', { name: /login/i }))

    // Verifica que muestra el mensaje de error
    await screen.findByText('Wrong credentials')
    expect(screen.getByText('Wrong credentials')).toBeDefined()
  })
})