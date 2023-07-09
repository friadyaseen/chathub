import { doc , getDoc } from "firebase/firestore";
import { useState } from 'react'




export default function Friendlist({db, users, setto, settoi}) {
    let [sel, setsel] = useState("")
    async function setuser(id) {
        const f = await getDoc(doc(db, "users", id));
        settoi(f.data())
        setto(id)
        setsel(id)
    }


return <div className="v">
    <div className="friendc">
        {
            users.map((u, i) => {
                return (
                    <div onClick={() => setuser(u.id)} key={u.id} id={u.id} className="friend">
                        <img src={u.profile} className='friend-p' alt='profile picture'></img>
                        <p id={setcurrentfriend(sel, u.id)} className='friend-name'>{u.username}</p>
                    </div>)
            })
        }
    </div>
</div>
}


function setcurrentfriend(currentfreind, friend) {
    if (currentfreind === friend) {
        return "s"
    }
    return "b"
}