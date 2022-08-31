import Cookie from 'universal-cookie';
const cookie = new Cookie();

function Home() {

    return (
        <div class='navbar'>
            {cookie.get('token') ? <a href='/user' class="navbarButton">Account</a> : <a href='/authentication' class="navbarButton">Authentication</a>}
        </div>
    )
}

export default Home;