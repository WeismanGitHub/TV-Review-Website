import Cookie from 'universal-cookie';
const cookie = new Cookie();

function Home() {

    return (
        <div class='navbar'>
            {cookie.get('token') ? <button href='/user'>Account</button> : <button href='/authentication'>Authentication</button>}
        </div>
    )
}

export default Home;
