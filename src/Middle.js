import { useState } from "react";

export default function Middle(m, user_id) {
    let [userid, setuserid] = useState(0)
    let [M, setM] = useState([{ user_id: 0, username: "frey", m: "Hello, world" }, { user_id: 1, username: "ad", m: "World, Hello" }, { user_id: 0, username: "frey", m: "Hello, world" }, { user_id: 1, username: "ad", m: "World, Hello" }, { user_id: 0, username: "frey", m: "Hello, world" }, { user_id: 1, username: "ad", m: "World, Hello" }, { user_id: 0, username: "frey", m: "Hello, world" }, { user_id: 1, username: "ad", m: "World, Hello" }]);
    return (
        <div className="middle">
            <div id={checkuser(M[0].user_id, userid)} className="messege-b">
                <p className="messege">{M[0].m}</p>
            </div>
        </div>
    );
}

function checkuser(usid, userid) {
    if (usid === userid) {
        return 'm'
    } else {
        return 'u'
    }
}