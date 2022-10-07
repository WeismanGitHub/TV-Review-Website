import { useNavigate } from 'react-router-dom';
import Cookie from 'universal-cookie';
import Reports from './reports'
import NavBar from '../navbar'

const cookie = new Cookie();

function Home() {
    const navigate = useNavigate();

    if (!cookie.get('token')) {
        navigate('/authentication');
    }

    return (<>
        <NavBar/>
        <br/>
        <Reports/>
    </>)
}

export default Home;