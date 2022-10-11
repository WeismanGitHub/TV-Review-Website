import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookie from 'universal-cookie';
import NavBar from '../navbar'

const axios = require('axios').default;
const cookie = new Cookie();

function ReportPage() {
    const navigate = useNavigate();
    const level = cookie.get('level')
    const [reportData, setReportData] = useState({})
    const { id } = useParams();

    if (level == 'user') {
        navigate('/authentication');
    }

    useEffect(() => {
        axios.get('/api/mod/report/' + id)
        .then(res => setReportData(res.data))
        .catch(err => toast.error(err.response.data))
    }, [])

    function closeReport(reportId) {
        axios.post('/api/mod/close', { reportId: reportId })
        .catch(err => toast.error('Problem closing report.'))
    }

    console.log(reportData)
    const report = (<>
        <h2>
            <div class='halfColumn'>
                Review: {reportData.review}
                <br/>
                Report Reason: {reportData.reason}
            </div>
            <div class='halfColumn'>
                <a href={`/users/${reportData.reviewAuthorId}`}>Author</a>
                <br/>
                <a href={`/users/${reportData.userId}`}>Reporter</a>
                <br/>
                Resolved: {String(reportData.resolved)}
                <br/>
                <h3>{reportData.resolved || <div class='customButton' onClick={() => closeReport(id)}>Close</div>}</h3>
            </div>
        </h2>
    </>)

    return (<>
        <NavBar/>
        <br/>
        {Object.keys(reportData).length ? report : <h1>Loading...</h1>}
    </>)
}

export default ReportPage