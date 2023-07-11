import { doc, deleteDoc, } from "firebase/firestore";
import trash from './trash.svg'
import { useState } from "react";


export default function Middle({ messeges, userc, uid, db, to, toi }) {
    let temp = false;

    if (messeges.length < 1) {
        temp = true;
    }

    async function deletemessege(id) {
        await deleteDoc(doc(db, "messeges", id));
    }

    return (
        <>
            {messeges.map((msg) => {

                return (
                    <div key={msg.id} id={checkuser(msg.from, uid)} className="messege-c">
                        {checkuser(msg.from, uid) === 'm' ?
                            <>
                                <img src={trash} id="del" onClick={() => deletemessege(msg.id)} />
                                <div className="messege-b">
                                    <p className="messege">{msg.text}</p>
                                </div >
                                <img className="prifile-m" src={userc.profile} />
                            </>
                            : <>
                                <img className="prifile-m" src={toi.profile} />
                                <div className="messege-b">
                                    <p className="messege">{msg.text}</p>
                                </div>
                                <img src={trash} id="del" onClick={() => deletemessege(msg.id)} />
                            </>}
                    </div>
                )
            })}
            {temp ? <>{to === "" ? <></> : <p className="no-messege">No Messeges</p>}</> : <></>}
        </>
    );
}



//check if messege is sent or reseved
function checkuser(from, uid) {
    if (from === uid) {
        return 'm'
    }
    return 'u'
}

