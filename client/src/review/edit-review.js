import { useNavigate, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useState } from 'react';
const axios = require('axios').default;

function EditReview() {
    const navigate = useNavigate();
    const location = useLocation();
    const [body, setBody] = useState(location.state.body)

    function onSubmit(event) {
        event.preventDefault();
        axios.patch('/api/review', {
            body: event.target[0].value,
            reviewId: location.state.reviewId
        }).then(res =>
            navigate(-1)
        ).catch(error =>
            toast.error(error.response.data)
        )
    }

    return (
        <div>
            <br/>
            <h2>Edit Review!</h2>
            <form onSubmit={onSubmit}>
                <br/>
                <textarea name='body' onChange={(event) => setBody(event.target.value)} value={body} maxlength='1000' minlength='1' rows='10' cols='75'/>
                <br/>
                <button type='submit'>Update</button>
            </form>
        </div>
    )
}

export default EditReview;