import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
const axios = require('axios').default;

function Search() {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const [page, setPage] = useState(0)

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

    const getResults = (pageToGet) => {
        setPage(pageToGet)
        axios.get(`api/tv/search/${search}?page=${pageToGet}`)
        .then(res => setResults(res.data))
        .catch(err => toast.error(err.response.data))
    } 

    return (<>
        <input
            type='text'
            value={search}
            placeholder='search...'
            onChange={(event) => {
                setSearch(event.target.value)
            }}
        />
        {page > 0 ? <div class='customButton' onClick={() => getResults(page - 1)}>Back</div> : null}
        {search !== '' ? <div class='customButton' onClick={() => getResults(page + 1)}>Next</div> : null}
        <br/>
        <ul class='searchResults'>
            {
                search !== '' && !results.length ? <li>No Results</li> : results.map((result) => <li key={result.id}><a class='searchResult' href={`/${result.media_type == 'movie' ? 'movie' : 'show'}/${result.id}`}>{result.title}</a></li>)
            }
        </ul>
    </>)
}

export default Search;