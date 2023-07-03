
import profileP from './flower.png'

export default function Friendlist({ users, setto }) {
    function setuser(id){
        setto(id)
    }
    return <div className="v">
        <div className="friendc">
            {
                users.map((u) => {
                    return (
                    <div onClick={() => setuser(u.id)} key={u.id} id={u.id} className="friend">
                        <img src={profileP} className='friend-p' alt='profile picture'></img>
                        <p className='friend-name'>{u.username}</p>
                    </div>)
                })
            }
        </div>
    </div>
}