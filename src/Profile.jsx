export default function Profile({ user, logout }) {
    return <>{user ? <button onClick={() => logout()} className='log-out'>Log out</button> : <></>}</>
}