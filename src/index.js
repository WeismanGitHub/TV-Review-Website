import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import './index.css';

import Authentication from './authentication'
import Home from './home'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
        <Router>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route exact path='/authentication' element={Authentication}/>
                <Route path='*' element={<h1>This page doesn't exist!</h1>}/>
            </Routes>
        </Router>
    </>
)