import ff from './dd.jpg'

export default function Profile({ userc, user, logout }) {
    return <>{user ?
        <div className="profile-c">
            <img src={userc.profile === "" ? ff :userc.profile} alt="profileP" className="p-i"/>
            <p className="p-u">{userc.username}</p>
            <button onClick={() => logout()} className='log-out'>Log out</button>
        </div>
        : <></>}</>
}