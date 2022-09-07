import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { createRoot } from 'react-dom/client'
import './index.css';

import Authentication from './authentication'
import TVPage from './tv-page'
import Self from './self'
import Home from './home'

const root = createRoot(document.getElementById('root'));

root.render(
    <>
        <Router>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route exact path='/account' element={<Self/>}/>
                <Route exact path='/authentication' element={Authentication}/>
                <Route exact path='/:tvType/:id' element={<TVPage/>}/>
                <Route path='*' element={<h1>This page doesn't exist!</h1>}/>
            </Routes>
        </Router>
        <ToastContainer/>
    </>
)