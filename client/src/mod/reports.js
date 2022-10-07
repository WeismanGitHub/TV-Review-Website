import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookie from 'universal-cookie';

const axios = require('axios').default;
const cookie = new Cookie();

function Reports() {
    const navigate = useNavigate();

    if (!cookie.get('token')) {
        navigate('/authentication');
    }

    const [reports, setReports] = useState([{ }])
    const [page, setPage] = useState(1)

    useEffect(() => {
        axios.get('/api/mod/reports')
        .then(res => setReports(res.data))
        .catch(err => {
            if (err.response.status == 401) {
                toast.error(err.response.data)
                return navigate('/')
            }

            toast.error(err.response.data)
        })
    }, [])

    const getPage = (page) => {
        setPage(page)
        axios.get(`/api/mod/reports?page=${page}`)
        .then(res => setReports(res.data))
        .catch(err => toast.error(err.response.data))
    }

    return (<>
        <br/>
        {
            !reports.length ? <h1>No Reports</h1> : reports.map((report) => <div class='report'>
            <h3><a href={`/report/${report._id}`}>{report.reason}</a></h3>
            </div>)
        }
        {reports.length == 10 && <div class='customButton' onClick={() => getPage(page + 1)}>Next</div>}
        {page > 1 && <div class='customButton' onClick={() => getPage(page - 1)}>Back</div>}
    </>)
}

export default Reports;