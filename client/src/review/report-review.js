import { useNavigate, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
const axios = require('axios').default;

function ReportReview() {
    const navigate = useNavigate();
    const location = useLocation();

    function onSubmit(event) {
        event.preventDefault();
        axios.post('/api/report', {
            reason: event.target[0].value,
            ...location.state
        }).then(res =>
            navigate(-1)
        ).catch(error =>
            toast.error(error.response.data)
        )
    }

    return (
        <div>
            <br/>
            <h2>Write a report!</h2>
            <form onSubmit={onSubmit}>
                <br/>
                <textarea name='body' placeholder="Write a report!" maxlength='1000' minlength='1' rows='10' cols='75'/>
                <br/>
                <button type='submit'>Report</button>
            </form>
        </div>
    )
}

export default ReportReview;