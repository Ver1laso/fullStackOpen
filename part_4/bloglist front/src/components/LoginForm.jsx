
const LoginForm = (props) => {
return (
    <form onSubmit={props.handleLogin}>
    <div>
        Username:&nbsp;
        <input type='text' value={props.username} name='Username' onChange={props.handleUsernameChange} />
    </div>
    <div>
        Password:&nbsp;
        <input type='password' value={props.password} name='Password' onChange={props.handlePasswordChange} />
        </div>
        <div>
        <button type='submit'>Login</button>
        </div>
    </form>
)
}

export default LoginForm