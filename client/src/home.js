import Cookie from 'universal-cookie';
import Logout from './user/logout'
const cookie = new Cookie();

function Home() {
    return (
        <div class='navbar'>
            {cookie.get('token') ? <a href='/user' class="navbarButton">Account</a> : <a href='/authentication' class='navbarButton'>Login/Register</a>}
            <Logout class='navbarButton'/>
        </div>
    )
}

export default Home;