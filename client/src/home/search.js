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
        }, 300);
    
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
                !results.length && search !== '' ? <li>No Results</li> : results.map((result) => 
                <li key={result.id}>
                <Link class='searchResult'
                    to={{ pathname: `/${result.id}` }}
                    state={{ tvType: result.media_type }}
                >
                    {result.title}
                </Link>
                </li>)
            }
        </ul>
    </>)
}

export default Search;