
import { useState } from 'react'
import profileP from './dd.png'

export default function Friendlist({ users, setto }) {
    let [sel, setsel] = useState("")
    function setuser(id){
        setto(id)
        setsel(id)
    }
    return <div className="v">
        <div className="friendc">
            {
                users.map((u) => {
                    return (
                    <div onClick={() => setuser(u.id)} key={u.id} id={u.id} className="friend">
                        <img src={profileP} className='friend-p' alt='profile picture'></img>
                        <p id={setcurrentfriend(sel, u.id)} className='friend-name'>{u.username}</p>
                    </div>)
                })
            }
        </div>
    </div>
}

function setcurrentfriend(currentfreind, friend)
{
    if(currentfreind === friend)
    {
        return "s"
    } 
    return "b"
}