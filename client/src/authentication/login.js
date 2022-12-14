import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
const axios = require('axios').default;

function Login() {
    const navigate = useNavigate();

    function loginHandler(event) {
        event.preventDefault();

        axios.post('/api/authentication/login', {
            name: event.target[0].value,
            password: event.target[1].value
        }).then(res => {
            navigate('/');
        }).catch(error => {
            toast.error(error.response.data)
        })
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={loginHandler}>
                Name:
                <br/>
                <input type='text' name='name' placeholder="name" maxlength='15' minlength='1'/>
                <br/>
                Password:
                <br/>
                <input type='password' name='password' placeholder="password" maxlength='50' minlength='6'/>
                <br/>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login;