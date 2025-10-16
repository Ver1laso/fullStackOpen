import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('Blog', () => {
  test('render the title and author of post', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Alfredo lejones',
      url: 'google.com',
      likes: 10,
      id: '1'
    }

    render(<Blog blog={blog} />)
    
    expect(screen.getByText(/Component testing is done with react-testing-library/)).toBeDefined()
    expect(screen.getByText(/Alfredo lejones/)).toBeDefined()
  })

  test('render title and author together', () => {
    const blog = {
      title: 'Testing en React',
      author: 'Juan Pérez',
      url: 'example.com',
      likes: 5,
      id: '2'
    }

    render(<Blog blog={blog} />)
    
    const element = screen.getByText(/Testing en React.*Juan Pérez/)
    expect(element).toBeDefined()
  })
})