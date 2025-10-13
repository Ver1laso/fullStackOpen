import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const create = async newObject => {
  const config = {
    headers: { Authorization: token},
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deletePost = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const addLikes = (id, updatePost) => {
  const request = axios.put(`${baseUrl}/${id}`, updatePost)
  return request.then(response => response.data)
}

const blogsServices = {
  getAll,
  create,
  update,
  setToken,
  deletePost,
  addLikes
}

export default blogsServices

// export default { getAll, create, update, setToken, deletePost, addLikes }