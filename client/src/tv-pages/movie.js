import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
const axios = require('axios').default;

function Movie({ id }) {
    const [movie, setMovie] = useState({})

    useEffect(() => {
        axios.get(`/api/tv/movie/${id}`)
        .then(res => setMovie(res.data))
        .catch(err => setMovie({ title: `[${err.response.data}]` }))
    }, [])
    
    return (<>
        <div class='halfColumn'>
            <h1>{movie.title}</h1>
            <hr class='rounded'/>
            <h2>Release: {movie.release}</h2>
            <hr class='rounded'/>
            <h3 class='overview'>{movie.overview}</h3>
            <hr class='rounded'/>
            <h5>Genres: {movie.genres}</h5>
        </div>
    </>)
}

export default Movie