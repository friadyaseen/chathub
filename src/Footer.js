import { useState } from "react";

export default function Footer() {
    let [Mes, setMes] = useState()

    return(
        <>
        <div className="footer">
            <input type="text" className="textbox" value={Mes} onChange={e => setMes(e.body)}></input>
            <button className="send-btn">Send</button>
        </div>
        </>
    )
}