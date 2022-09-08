import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import Movie from './tv-pages/movie'
import Show from './tv-pages/show'
import NavBar from './navbar'

function TVPage() {
    const { id, tvType } = useParams();

    return (<>
        <NavBar/>
        <br/>
        { tvType == 'movie' ? <Movie id={id}/> : <Show id={id}/>}
    </>)
}

export default TVPage