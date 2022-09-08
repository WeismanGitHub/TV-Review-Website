import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Link} from 'react-router-dom';
import { toast } from 'react-toastify';
const axios = require('axios').default;

function Search() {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])

    useEffect(() => {
        const delayedSearch = setTimeout(function() {
            if (search !== '') {
                axios.get(`api/tv/search/${search}`)
                .then(res => setResults(res.data))
                .catch(err => toast.error(err.response.data))
            }
        }, 500);
    
        return () => clearTimeout(delayedSearch)
    }, [search])

    return (<>
        <input
            type='text'
            value={search}
            placeholder='search...'
            onChange={(event) => {
                setSearch(event.target.value)
            }}
        />
        <br/>
        <ul class='searchResults'>
            {
                search !== '' && !results.length ? <li>No Results</li> : results.map((result) => <li key={result.id}><a class='searchResult' href={`/${result.media_type == 'movie' ? 'movie' : 'show'}/${result.id}`}>{result.title}</a></li>)
            }
        </ul>
    </>)
}

export default Search;