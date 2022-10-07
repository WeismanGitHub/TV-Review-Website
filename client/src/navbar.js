import Cookie from 'universal-cookie';
import Logout from './self/logout'
const cookie = new Cookie();

function NavBar() {
    const token = cookie.get('token')
    const level = cookie.get('level')

    return (
        <div>
            <div class='navbar'>
                <a href='/' class="navbarButton">Home</a>
                {token ? <a href='/account' class="navbarButton">Account</a> : <a href='/authentication' class='navbarButton'>Login/Register</a>}
                {(level == 'administrator' || level == 'moderator') && <a class='navbarButton' href='/mod'>Mod</a>}
                {token && <Logout class='navbarButton'/>}
            </div>
            <br/>
            <br/>
        </div>
    )
}

export default NavBar;