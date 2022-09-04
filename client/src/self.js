import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UpdateSelf from './self/update-self'
import DeleteSelf from './self/delete-self'
import { toast } from 'react-toastify';
import Cookie from 'universal-cookie';
import NavBar from './navbar'

const axios = require('axios').default;
const cookie = new Cookie();

function Self() {
    const navigate = useNavigate();
    
    if (!cookie.get('token')) {
        navigate('/authentication');
    }

    const [self, setSelf] = useState('name')

    useEffect(() => {
        axios.get('/api/user')
        .then(res => setSelf(res.data))
        .catch(err => toast.error(err.response.data))
    }, [])

    return (
        <div>
            <NavBar/>
            <br/>
            <h1>{self.name}</h1>
            <br/>
            <h2>Score: {self.score ?? 0}</h2>
            <br/>
            <UpdateSelf self={self}/>
            <br/>
            <DeleteSelf/>
        </div>
    )
}

export default Self