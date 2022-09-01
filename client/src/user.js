import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import UpdateUser from './user/update-user'
import DeleteUser from './user/delete-user'
const axios = require('axios').default;

function User() {
    const [user, setUser] = useState()

    useEffect(() => {
        axios.get('/api/user')
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
            <DeleteUser/>
        </div>
    )
}

export default User