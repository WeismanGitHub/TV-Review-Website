import Cookie from 'universal-cookie';
import Logout from './user/logout'
const cookie = new Cookie();

function NavBar() {
    return (
        <div class='navbar'>
            {cookie.get('token') ? <a href='/account' class="navbarButton">Account</a> : <a href='/authentication' class='navbarButton'>Login/Register</a>}
            <Logout class='navbarButton'/>
        </div>
    )
}

export default NavBar;