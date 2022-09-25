import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
const axios = require('axios').default;

function Trending() {
    const [trending, setTrending] = useState([{ title: 'loading...'}])

    useEffect(() => {
        axios.get(`api/tv/trending`)
        .then(res => setTrending(res.data))
        .catch(err => toast.error(err.response.data))
    }, []);

    return (<>
        <div class='trendingTVList'>
            {trending.map(tv => <a class='trendingTV' href={`/${tv.media_type == 'movie' ? 'movie' : 'show'}/${tv.id}`}>{tv.title}</a>)}
        </div>
    </>)
}

export default Trending;