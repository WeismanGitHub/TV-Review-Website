import Cookie from 'universal-cookie';
const cookie = new Cookie();

function Home() {
    return (
        <>
            <div class='navbar'>
                {cookie.get('token') ? 'Your Account' : 'Login/Register'}
            </div>
            Home Page
        </>
    )
}

export default Home;
