import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
const axios = require('axios').default;

function Logout() {
    const navigate = useNavigate();

    function onClick(event) {
        event.preventDefault();

        axios.post('/api/authentication/logout')
        .then(res => {
            navigate('/authentication');
        }).catch(error => {
            toast.error(error.response.data)
        })
    }

    return <a href='/authentication' onClick={onClick} class="navbarButton">Logout</a>
}

export default Logout