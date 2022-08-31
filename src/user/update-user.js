import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
const axios = require('axios').default;

function UpdateUser({ user }) {
    async function onSubmit(event) {
        event.preventDefault();
        
        axios.post('/api/v1/user/update', {
            name: event.target[0].value,
            password: event.target[1].value
        }).then(res => {
            window.location.reload(false);
            toast('Account updated!')
        }).catch(err => {
            toast.error(err.response.data.message)
        })
    }

    return (
        <div>
            <div>Update Account</div>
            <form onSubmit={onSubmit}>
                Name:
                <input id='Your Name' type='text' name='name' placeholder={user?.name} maxlength='15' minlength='1'/>
                Password:
                <input id='Your Password' type='password' placeholder="password" name='password' maxlength='50' minlength='6'/>
                <button type='submit'>Update</button>
            </form>
        </div>
    )
}

export default UpdateUser