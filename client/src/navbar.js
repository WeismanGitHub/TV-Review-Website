import Cookie from 'universal-cookie';
import Logout from './user/logout'
const cookie = new Cookie();

function NavBar() {
    return (
        <div>
            <div class='navbar'>
                <a href='/' class="navbarButton">Home</a>
                {cookie.get('token') ? <a href='/account' class="navbarButton">Account</a> : <a href='/authentication' class='navbarButton'>Login/Register</a>}
                <Logout class='navbarButton'/>
            </div>
            <br/>
            <br/>   
        </div>
    )
}

export default NavBar;