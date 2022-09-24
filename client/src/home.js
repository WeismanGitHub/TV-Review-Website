import Trending from './home/trending'
import Search from './home/search'
import NavBar from './navbar'

function Home() {
    return (<>
        <NavBar/>
        <br/>
        <h1>Trending:</h1>
        <Trending/>
        <br/>
        <Search/>
    </>)
}

export default Home;