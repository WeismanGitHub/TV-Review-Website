import ReportPage from './mod/report-page';
import { Route } from 'react-router-dom';
import Home from './mod/home'

export default [
    <Route path='/mod' element={<Home/>}/>,
    <Route exact path='/report/:id' element={<ReportPage/>}/>
];