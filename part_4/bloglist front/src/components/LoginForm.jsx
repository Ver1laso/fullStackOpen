
const LoginForm = (props) => {
return (
    <form onSubmit={props.handleLogin}>
    <div>
        <label htmlFor="username">Username:&nbsp;</label>
        <input data-testid='username' id="username" type='text' value={props.username} name='Username' onChange={props.handleUsernameChange} />
    </div>
    <div>
        <label htmlFor="password">Password:&nbsp;</label>
        <input data-testid='password' id="password" type='password' value={props.password} name='Password' onChange={props.handlePasswordChange} />
        </div>
        <div>
        <button type='submit'>Login</button>
        </div>
    </form>
)
}

export default LoginForm