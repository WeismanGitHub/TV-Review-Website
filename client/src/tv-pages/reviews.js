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
    
    function createReview() {
        navigate('/review/create', { state: { tvId: id, type: type } });
    }

    function editReview(reviewId) {
        navigate('/review/edit', { state: { _id:  reviewId} });
    }

    function deleteReview(reviewId) {
        if (window.confirm('Are you sure you want to delete review?')) {
            axios.delete('/api/review/', { _id: reviewId })
            .then(res => toast.success('Deleted!'))
            .catch(err => toast.error(err.response.data))
        }

        navigate('/review/edit', { state: { _id:  reviewId} });
    }

    function upvote(reviewId) {
        axios.post(`/api/review/vote/${reviewId}`, { type: 'upvote' })
        .then(res => toast.success('Upvoted!'))
        .catch(err => toast.error(err.response.data))
    }

    function downvote(reviewId) {
        axios.post(`/api/review/vote/${reviewId}`, { type: 'downvote' })
        .then(res => toast.error('Downvoted!'))
        .catch(err => toast.error(err.response.data))
    }

    function displayReview(review) {
        return (<>
            <div class='review'>
                <a class='author' href={`/user/${review.creatorId}`}>author</a>
                <br/>
                <div class='reviewBody'>{review.body}</div>
                <div onClick={() => upvote(review._id)} class='vote'>☑</div> {review.score} <div onClick={() => downvote(review._id)} class='vote'>☒</div>
                {review.editable ? <><div onClick={() => editReview(review._id)} class='editButton'>Edit</div> <div class='editButton' onClick={() => deleteReview(review._id)}>Delete</div></> : null}
            </div>
        </>)
    }

    return (<>
        <div class='halfColumn'>
            {token ? <a onClick= {createReview} class='createReviewButton'>+</a> : <h1>Sign in to post a review!</h1>}
            <br/>
            {reviews.length ? reviews.map(review => displayReview(review)) : <h1>No Reviews</h1>}
        </div>
    </>)
}

export default Reviews