import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Cookie from 'universal-cookie';

const axios = require('axios').default;
const cookie = new Cookie();

function Reviews({ id, type }) {
    const token = cookie.get('token')
    const [ageFilter, setageFilter] = useState(cookie.get('age_filter') || 'newest')
    const [scoreFilter, setScoreFilter] = useState(cookie.get('score_filter') || 'highest')
    const [reviews, setReviews] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/review/${type}/${id}?score=${scoreFilter}&age=${ageFilter}`)
        .then(res => setReviews(res.data))
        .catch(err => toast.error(err.response.data))
    }, [scoreFilter, ageFilter])

    function ageFilterCheckBox() {
        return (<>
            <input type='checkbox'
                defaultChecked={ageFilter == 'newest'}
                onChange={() => {
                    cookie.set('age_filter', ageFilter == 'newest' ? 'oldest' : 'newest')
                    setageFilter(ageFilter == 'newest' ? 'oldest' : 'newest')
                }}
            />
        </>);
    }

    function ScoreFilterCheckBox() {
        return (<>
            <input type='checkbox'
                defaultChecked={scoreFilter == 'highest'}
                onChange={() => {
                    cookie.set('score_filter', scoreFilter == 'highest' ? 'lowest' : 'highest')
                    setScoreFilter(scoreFilter == 'highest' ? 'lowest' : 'highest')
                }}
            />
        </>);
    }

    function deleteReview(reviewId) {
        if (window.confirm('Are you sure you want to delete this review?')) {
            axios.post('/api/review/delete', { reviewId: reviewId })
            .then(res => toast.success('Deleted!'))
            .catch(err => toast.error(err.response.data))
        }
    }

    function vote(reviewId, type) {
        axios.post('/api/review/vote', { type: type, reviewId: reviewId })
        .then(res => console.log('[placeholdester] change color of button'))
        .catch(err => toast.error(err.response.data))
    }

    function displayReview(review) {
        return (<>
            <div class='review'>
                <a class='author' href={`/user/${review.userId}`}>author</a>
                <br/>
                <div class='reviewBody'>{review.body}</div>
                <div onClick={() => vote(review._id, 'upvote')} class='vote'>☑</div>
                {` ${review.score} `}
                <div onClick={() => vote(review._id, 'downvote')} class='vote'>☒</div>
                <div onClick={() => navigate('/review/report', { state: { reviewId: review._id } })} class='customButton'>Report</div>
                {review.editable && <>
                    <div onClick={() => navigate('/review/edit', { state: { reviewId: review._id, body: review.body } })} class='customButton'>Edit</div>
                    <div class='customButton' onClick={() => deleteReview(review._id)}>Delete</div>
                </>}
            </div>
        </>)
    }
    
    const createReviewButton = <a onClick= {() => navigate('/review/create', { state: { tvId: id, type: type } })} class='createReviewButton'>+</a>

    return (<>
        <div class='halfColumn'>
            {token ? createReviewButton : <h1>Sign in to post a review!</h1>}
            <br/>
            <ageFilterCheckBox/> newestest to oldestest
            <br/>
            <ScoreFilterCheckBox/> highestest to lowestest
            <br/>
            {reviews.length ? reviews.map(review => displayReview(review)) : <h1>No Reviews</h1>}
        </div>
    </>)
}

export default Reviews