import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
const axios = require('axios').default;

function Show({ id }) {
    const [show, setShow] = useState({})

    useEffect(() => {
        axios.get(`/api/tv/show/${id}`)
        .then(res => setShow(res.data))
        .catch(err => setShow({ title: `[${err.response.data}]` }))
    }, [])

    return (<>
        <div class='halfColumn'>
            <h1>{show.title}</h1>
            <hr class='rounded'/>
            <h2>First Airing: {show.release}</h2>
            <hr class='rounded'/>
            <h3 class='overview'>{show.overview}</h3>
            <hr class='rounded'/>
            <h4>Genres: {show.genres}</h4>
            <hr class='rounded'/>
            <h4>Total Episodes: {show.episodeCount}</h4>
            <br/>
            <br/>
            <div class='seasons'>
                <h2>Seasons: {show.seasons && show.seasons.length}</h2>
                {show.seasons && show.seasons.map(season => {
                    return (<>
                        <h3>{season.name}</h3>
                        <h4>{season.airDate}</h4>
                        <h4>Episodes: {season.episodeCount}</h4>
                        <br/>
                    </>)
                })}
            </div>
        </div>
    </>)
}

export default Show