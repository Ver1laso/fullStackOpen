import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/loginServices'
import blogsServices from './services/blogsServices'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setNewTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    if(user){
      blogsServices.getAll().then(blogs =>
      setBlogs( blogs )
      )  
    }
  }, [user])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      blogsServices.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

    console.log('Logging in with ', username, password)
  }

  const Notification = ({ message }) => {
    if(message === null || message === '') {
      return null
    }

    return (
      <div>{message}</div>
    )
  }


  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          Username:&nbsp;
          <input type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
            Password:&nbsp;
            <input type='password' value={password} name='Password' onChange={({ target}) => setPassword(target.value)} />
          </div>
          <div>
            <button type='submit'>Login</button>
          </div>
      </form>
    )
  }

  const addPost = (event) => {
    event.preventDefault()

    const newObject = {
      title: title,
      author: user.name,
      url: url,
      likes: 0
    }

    blogsServices
      .create(newObject)
      .then(returnedPost => {
        setBlogs(blogs.concat(returnedPost))
        setNewTitle('')
        setUrl('')
      })

  }


  const userPosts = user
  ? blogs.filter(post => post.author === user.name)
  : []



  const postForm = () => {
    return (
      <>
        <form onSubmit={addPost}>
          <div>
            Title: <input type='text' value={title} onChange={({target})=> setNewTitle(target.value)} />
          </div>
          <div>
            url:&nbsp; <input type='text' value={url} onChange={({target}) => setUrl(target.value)}/>
          </div>
          <button type='submit'>save</button>
        </form>
        <br/>
        <h2>Your written posts</h2>
        <ul>
          {userPosts.map(post => (
            <li key={post.id}>
              <b>Title: </b>{post.title}<br/>
              <b>Url: </b> {post.url}<br/>
              <b>Likes: </b> {post.likes}
            </li>
          ))}
        </ul>
      </>
    )
  }

  return (
    <div>
      <h1>Posts</h1>

      <Notification message={errorMessage} />

      {user === null ? loginForm() : 
        <div>
          <p>{user.name} logged-in</p>
          {postForm()}
        </div>
      }

    </div>
  )
}

export default App