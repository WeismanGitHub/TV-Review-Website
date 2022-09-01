import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
import UpdateUser from './user/update-user'
import DeleteUser from './user/delete-user'
import Logout from './user/logout'
const axios = require('axios').default;

function User() {
    const [user, setUser] = useState('Loading...')

    useEffect(() => {
        axios.get('/api/v1/user')
        .then(res => {
            setUser(res.data.user)
        })
        .catch(err => {
            toast.error(err.response.data.message)
        })
    }, [])

    return (
        <div>
            <UpdateUser user={user}/>
            <Logout/>
            <DeleteUser/>
            <ToastContainer/>
        </div>
    )
}

export default User