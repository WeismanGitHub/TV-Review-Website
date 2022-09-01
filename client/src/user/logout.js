import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios').default;

function Logout() {
    const navigate = useNavigate();

    function onClick(event) {
        event.preventDefault();

        axios.post('/api/authentication/logout')
        .then(res => {
            navigate('/authentication');
        }).catch(error => {
            toast.error(error.response.data.message)
        })
    }

    return <a href='/authentication' onClick={onClick} class="navbarButton">Logout</a>
}

export default Logout