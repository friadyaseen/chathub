import { useState } from "react";
import { serverTimestamp } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";

export default function Footer({ db }) {
    let [Mes, setMes] = useState("")
    async function handlesumbit(e) {
        e.preventDefault()
        if (Mes !== "") {
            let temp = Mes
            setMes("")
            const deccref = await addDoc(collection(db, 'messeges'),{
                text:temp,
                createdAt: serverTimestamp(),
                uid: 1010,
                id: crypto.randomUUID()
            })

        }
    }
    return (
        <>
            <form onSubmit={handlesumbit} className="footer">
                <input type="text" className="textbox" value={Mes} onChange={e => setMes(e.target.value)}></input>
                <button className="send-btn">Send</button>
            </form>
        </>
    )
}