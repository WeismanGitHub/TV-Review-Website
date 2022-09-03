import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
const axios = require('axios').default;

function UpdateSelf({ self }) {
    async function onSubmit(event) {
        event.preventDefault();
        
        axios.post('/api/user/update', {
            currentPassword: event.target[0].value,
            newName: event.target[1].value,
            newPassword: event.target[2].value
        }).then(res => {
            window.location.reload(false);
        }).catch(err => {
            toast.error(err.response.data)
        })
    }

    return (
        <div>
            <div>Update Account</div>
            <form onSubmit={onSubmit}>
                Current Password:
                <br/>
                <input type='text' name='current password' placeholder='current password' maxlength='50' minlength='6'/>
                <br/>
                New Name:
                <br/>
                <input type='text' name='name' placeholder={self?.name} maxlength='15' minlength='1'/>
                <br/>
                New Password:
                <br/>
                <input type='password' placeholder="new password" name='new password' maxlength='50' minlength='6'/>
                <br/>
                <button type='submit'>Update</button>
            </form>
        </div>
    )
}

export default UpdateSelf