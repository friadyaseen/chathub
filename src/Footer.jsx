import send from './send.svg'

import { useState } from "react";
import { serverTimestamp } from "firebase/firestore";
import { setDoc, doc } from "firebase/firestore";

export default function Footer({ db, uid, to }) {
    //message text box
    let [Mes, setMes] = useState("")

    //send messege
    async function handlesumbit(e) {
        e.preventDefault()
        if (Mes !== "" && to !== "") {
            let temp = Mes
            setMes("")
            let id = crypto.randomUUID();
            const deccref = await setDoc(doc(db, 'messeges', id), {
                text: temp,
                createdAt: serverTimestamp(),
                from: uid,
                to: to,
                id: id
            })

        }
    }
    return (
        <>
            <form onSubmit={handlesumbit} className="footer">
                <input type="text" className="textbox" value={Mes} onChange={e => setMes(e.target.value)}></input>
                <button className="send-btn">
                <img src={send} id="sendi"/>
                </button>
            </form>
        </>
    )
}