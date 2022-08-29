import { useNavigate } from 'react-router-dom';
import Cookie from 'universal-cookie';
import { useEffect } from 'react';

const cookie = new Cookie();

function Home() {
    const navigate = useNavigate()

    useEffect(()=> {
        if (!cookie.get('token')) {
            navigate('/authentication')
        }
    }, [])

    return (
        <>
          Home Page
        </>
    )
}

export default Home;
