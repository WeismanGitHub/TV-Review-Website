import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
const axios = require('axios').default;

function Search() {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        const delayedSearch = setTimeout(function() {
            if (search !== '') {
                axios.get(`api/tv/search/${search}`)
                .then(res => setResults(res.data))
                .catch(err => toast.error(err.response.data))
            } else {
                setResults([])
            }
        }, 500);
    
        return () => clearTimeout(delayedSearch)
    }, [search])

    const getNextPage = (nextPage) => {
        setPage(nextPage)
        axios.get(`api/tv/search/${search}?page=${nextPage}`)
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
        {page > 1 && <div class='customButton' onClick={() => getNextPage(page - 1)}>Back</div>}
        {Boolean(results.length) && <div class='customButton' onClick={() => getNextPage(page + 1)}>Next</div>}
        <br/>
        <ul class='searchResults'>
            {
                search !== '' && !results.length ? <li>No Results</li> : results.map((result) => <li key={result.id}><a class='searchResult' href={`/${result.media_type == 'movie' ? 'movie' : 'show'}/${result.id}`}>{result.title}</a></li>)
            }
        </ul>
    </>)
}

export default Search;