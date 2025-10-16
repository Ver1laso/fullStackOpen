import PropTypes from 'prop-types'

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    url: PropTypes.string,
    likes: PropTypes.number
  }).isRequired
}

export default Blog