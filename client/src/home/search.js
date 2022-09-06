import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
const axios = require('axios').default;

function Search() {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    var delayTimer;
    return (<>
        <input
            type='text'
            value={search}
            placeholder='search...'
            onChange={(event) => {
                setSearch(event.target.value)
                clearTimeout(delayTimer);
                delayTimer = setTimeout(function() {
                    if (event.target.value !== '') {
                    axios.get(`api/tv/search/${event.target.value}`)
                    .then(res => setResults(res.data))
                    .catch(err => toast.error(err.response.data))
                    }
                }, 1000);
            }}
        />
        <br/>
        <br/>
        <ul class='searchResults'>
            { results.map((result) => <li key={result.id}><a href={`/${result.id}`}>{result.title}</a></li>) }
        </ul>
    </>)
}

export default Search;