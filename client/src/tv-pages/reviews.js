import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Cookie from 'universal-cookie';

const axios = require('axios').default;
const cookie = new Cookie();

function Reviews({ id, type }) {
    const token = cookie.get('token')
    const [reviews, setReviews] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/review/${type}/${id}`)
        .then(res => setReviews(res.data))
        .catch(err => toast.error(err.response.data))
    }, [])
    
    function onClick() {
        navigate('/review', { state: { tvId: id, type: type } });
    }

    function upvote(reviewId) {
        axios.post(`/api/review/vote/${reviewId}`, { type: 'upvote' })
        .then(res => toast.success('Upvoted!'))
        .catch(err => toast.error(err.response.data))
    }

    function downvote(reviewId) {
        axios.post(`/api/review/vote/${reviewId}`, { type: 'downvote'})
        .then(res => toast.success('Downvoted!'))
        .catch(err => toast.error(err.response.data))
    }

    function displayReview(review) {
        return (<>
            <div class='review'>
                <a class='author' href={`/user/${review.creatorId}`}>author</a>
                <br/>
                <div class='reviewBody'>{review.body}</div>
                <div onClick={event => upvote(review._id)} class='vote'>☑</div> {review.score} <div onClick={event => downvote(review._id)} class='vote'>☒</div>
                {review.editable ? <><div class='editButton'>Edit</div> <div class='editButton'>Delete</div></> : null}
            </div>
        </>)
    }

    return (<>
        <div class='halfColumn'>
            {token ? <a onClick= {onClick} class='createReviewButton'>+</a> : <h1>Sign in to post a review!</h1>}
            <br/>
            {reviews.length ? reviews.map(review => displayReview(review)) : <h1>No Reviews</h1>}
        </div>
    </>)
}

export default Reviews