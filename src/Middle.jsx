import { doc, getDoc, deleteDoc, query, collection, where } from "firebase/firestore";
import deleteicon from "./deleteicon.svg"

export default function Middle({ messeges, uid, db, to }) {

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
                                <img src={deleteicon} onClick={() => deletemessege(msg.id)} className="del-btn" />
                                <div className="messege-b">
                                    <p className="messege">{msg.text}</p>
                                </div>
                            </>
                            : <>
                                <div className="messege-b">
                                    <p className="messege">{msg.text}</p>
                                </div>
                                <img src={deleteicon} onClick={() => deletemessege(msg.id)} className="del-btn" />
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

