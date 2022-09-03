import Cookie from 'universal-cookie';
import Logout from './self/logout'
const cookie = new Cookie();

function NavBar() {
    const token = cookie.get('token')

    return (
        <div>
            <div class='navbar'>
                <a href='/' class="customButton">Home</a>
                {token ? <a href='/account' class="customButton">Account</a> : <a href='/authentication' class='customButton'>Login/Register</a>}
                {token && <Logout class='customButton'/>}
            </div>
            <br/>
            <br/>
        </div>
    )
}

export default NavBar;