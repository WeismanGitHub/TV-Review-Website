import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import Movie from './tv-pages/movie'
import Reviews from './tv-pages/reviews'
import Show from './tv-pages/show'
import NavBar from './navbar'

function TVPage() {
    const { id, type } = useParams();

    return (<>
        <NavBar/>
        <br/>
        { type == 'movie' ? <Movie id={id}/> : <Show id={id}/>}
        <Reviews id={id} type={type}/>
    </>)
}

export default TVPage