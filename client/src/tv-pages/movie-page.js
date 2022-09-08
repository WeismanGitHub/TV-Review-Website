import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import NavBar from '../navbar'
const axios = require('axios').default;

function MoviePage() {
    const [media, setMedia] = useState({})
    const { id, tvType } = useParams();

    useEffect(() => {
        axios.get(`/api/tv/${tvType}/${id}`)
        .then(res => setMedia(res.data))
        .catch(err => setMedia({ title: `[${err.response.data}]` }))
    }, [])
    
    return (<>
        <NavBar/>
        <br/>
        <div class='column'>
            <h1>{media.title}</h1>
            <hr class='rounded'/>
            <h2>Release: {media.release}</h2>
            <hr class='rounded'/>
            <h3 class='overview'>{media.overview}</h3>
        </div>
    </>)
}

export default MoviePage