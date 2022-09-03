import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
const axios = require('axios').default;

function UpdatePassword() {
    async function onSubmit(event) {
        event.preventDefault();
        
        axios.post('/api/user/update/password', event.target[0].value)
        .then(res => {
            window.location.reload(false);
        }).catch(err => {
            toast.error(err.response.data)
        })
    }

    return (
        <div>
            <div>Update Name</div>
            <form onSubmit={onSubmit}>
                <input type='text' name='name' placeholder='password' maxlength='15' minlength='1'/>
            </form>
        </div>
    )
}

export default UpdatePassword