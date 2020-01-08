import React, {useState} from 'react'

const Login = props => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginSubmit = async e => {
        e.preventDefault();

        props.login(username, password);

        setUsername('')
        setPassword('')

    }

    if(!props.show) return null;

    return (
        <form>
            <label>username</label>
            <input type="text" value={username} onChange={({target}) => setUsername(target.value)} />
            <br />
            <label>password</label>
            <input type="password" value={password} onChange={({target}) => setPassword(target.value)} />
            <br />
            <button type="submit" onClick={handleLoginSubmit}>login</button>
        </form>
    )

}

export default Login;