import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
const axios = require('axios').default;

function DeleteUser() {
    const navigate = useNavigate();

    function onClick(event) {
        event.preventDefault();

        if (window.confirm('Do you want to delete your account?')) {
            axios.post('/api/v1/user/delete')
            .then(res => {
                navigate('/authentication');
            }).catch(error => {
                toast.error(error.response.data.message)
            })
        }
    }

    return <button onClick={onClick}>Delete Account</button>
}

export default DeleteUser