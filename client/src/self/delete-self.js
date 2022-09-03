import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
const axios = require('axios').default;

function DeleteSelf() {
    const navigate = useNavigate();

    function onClick(event) {
        event.preventDefault();

        if (window.confirm('Are you sure you want to delete your account?')) {
            axios.post('/api/user/delete')
            .then(res => {
                navigate('/authentication');
            }).catch(err => {
                toast.error(err.response.data)
            })
        }
    }

    return <a href='/authentication' onClick={onClick} class="customButton">Delete Account</a>
}

export default DeleteSelf