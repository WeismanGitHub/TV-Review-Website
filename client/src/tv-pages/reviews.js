import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
const axios = require('axios').default;

function Reviews({ id, type }) {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        axios.get(`/api/review/${type}/${id}`)
        .then(res => setReviews(res.data))
        .catch(err => toast.error(err.response.data))
    }, [])
    
    return (<>
        <div class='halfColumn'>
            <a href='/review' class='createReviewButton'>+</a>
            {reviews.length ? reviews : <h1>No Reviews</h1>}
        </div>
    </>)
}

export default Reviews