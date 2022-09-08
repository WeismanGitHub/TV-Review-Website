import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { createRoot } from 'react-dom/client'
import './index.css';

import Authentication from './authentication'
import TVPage from './tv-page'
import NotFound from './not-found'
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
                <Route exact path='/:type/:id' element={<TVPage/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </Router>
        <ToastContainer/>
    </>
)