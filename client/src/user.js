import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import UpdateUser from './user/update-user'
import DeleteUser from './user/delete-user'
import { toast } from 'react-toastify';
import NavBar from './navbar'
const axios = require('axios').default;

function User() {
    const [user, setUser] = useState('name')

    useEffect(() => {
        axios.get('/api/user')
        .then(res => setUser(res.data))
        .catch(err => toast.error(err.response.data))
    }, [])

    return (
        <div>
            <NavBar/>
            <UpdateUser user={user}/>
            <DeleteUser/>
        </div>
    )
}

export default User