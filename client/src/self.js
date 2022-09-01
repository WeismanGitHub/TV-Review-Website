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
    const [self, setSelf] = useState('name')
    
    useEffect(() => {
        axios.get('/api/user')
        .then(res => setSelf(res.data))
        .catch(err => toast.error(err.response.data))
    }, [])
    
    if (!cookie.get('token')) {
        const navigate = useNavigate();
        navigate('/authentication');
    }
    
    return (
        <div>
            <NavBar/>
            <UpdateSelf self={self}/>
            <DeleteSelf/>
        </div>
    )
}

export default Self