import { useState, useEffect } from 'react'
import loginService from './services/loginServices'
import blogsServices from './services/blogsServices'
import {LoginForm, Blog} from './components'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setNewTitle] = useState('')
  const [url, setUrl] = useState('')
  const [visible, setVisible] = useState(false)
  const [visiblePost, setVisiblePost] = useState(null)

  
  

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

  const handleDelete = (postId, postTitle) => {
    if (window.confirm(`Do you really want to delete: ${postTitle}` )) {
    // window.open("exit.html", "Thanks for Visiting!");
    blogsServices.deletePost(postId)
      .then(()=> {
        setBlogs(blogs.filter(post => post.id !== postId))
      })
    }
    
  }

  const handleLikes = (postId) => {
    const post = blogs.find(p => p.id === postId)
    const updatePost = { ...post, likes: post.likes + 1}

    blogsServices.addLikes(postId, updatePost)
      .then(returnedPost => {
        setBlogs(prevBlogs => prevBlogs.map(p => p.id === postId ? returnedPost : p))
      })
  }

  const Notification = ({ message }) => {
    if(message === null || message === '') {
      return null
    }

    return (
      <div>{message}</div>
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

  const logout = ()=> {
    localStorage.clear()
    window.location.href = '/'
  }


  const userPosts = user
  ? blogs.filter(post => post.author === user.name)
  : []

  const loginForm = () => {
    const hideWhenVisible = { display: visible ? `none` : '' }
    const showWhenVisible = { display: visible ? '' : `none` }

    const toggleVisibility = () => {
      setVisible(!visible)
    }

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
          
        </>
      )
    }

   return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>Create a post</button>
      </div>
      <div style={showWhenVisible}>
        {postForm()}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
   )

  }


  return (
    <div>
      <h1>Posts</h1>

      <Notification message={errorMessage} />

      {user === null ? (
      <LoginForm
      handleLogin={handleLogin}
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      />
      ): 
        <div>
          <p>{user.name} logged-in&nbsp;&nbsp;&nbsp;&nbsp;
          <button type='logOut' onClick={()=>logout()}>Logout</button>
          </p> 
          {loginForm()}
          <h2>Your published posts</h2>
            <ul>
              {userPosts.map(post => {

                const showWhenVisiblePost = { display: visiblePost === post.id ? '' : `none` }

                const togglePostVisibility = (postId) => {
                  setVisiblePost(visiblePost === postId ? null : postId)
                }
                return (
                <>
                  <li key={post.id}>

                      <b>Title: </b>{post.title}<br/>
                      <button onClick={() =>togglePostVisibility(post.id)}>View</button>

                    <div style={showWhenVisiblePost}>
                      <b>Url: </b> {post.url}<br/>
                      <b>Likes: </b> {post.likes} <button onClick={() => handleLikes(post.id)}>Like</button>
                      <br></br>
                      <button type='delete' onClick={() => handleDelete(post.id, post.title)}>Delete Post</button>
                    </div>
                    
                  </li>
                  
                </>
                )
              })}
            </ul>
        </div>
      }
    </div>
  )
}

export default App