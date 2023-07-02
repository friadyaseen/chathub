import profileP from './flower.png'

export default function Header({ user, logout , username }) {
    return (
        <div className="header">
            {user ? <button onClick={() => logout()}>Log out</button> : <></>}
            <div className='profilec'>
                <p className='username'>{username}</p>
                <img src={profileP} alt="profileP" className="profileP"></img>
            </div>
        </div>
    );
}
