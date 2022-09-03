import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
const axios = require('axios').default;

function UpdateName({ self }) {
    async function onSubmit(event) {
        event.preventDefault();
        
        axios.post('/api/user/update/name', {
            name: event.target[1].value,
            currentPassword: event.target[0].value
        }).then(res => {
            window.location.reload(false);
        }).catch(err => {
            toast.error(err.response.data)
        })
    }

    return (
        <div>
            <div>Update Name</div>
            <form onSubmit={onSubmit}>
                Current Password:
                <br/>
                <input type='text' name='currentPassword' placeholder='current password' maxlength='50' minlength='6'/>
                <br/>
                New Name:
                <br/>
                <input type='text' name='name' placeholder={self?.name} maxlength='15' minlength='1'/>
                <br/>
                <button type='submit'>Update</button>
            </form>
        </div>
    )
}

export default UpdateName