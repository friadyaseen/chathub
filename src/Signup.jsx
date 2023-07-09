import { useState } from "react"

import { doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";

import { firebaseConfig } from "./firebaseconfig"

const app = initializeApp(firebaseConfig)
const storage = getStorage();

export default function Signup({ db, checkuser, loginuser, setuser, setlog, email, setemail }) {

    const [username, setusername] = useState("");
    const [d, setd] = useState(false);
    const [f, setf] = useState(false)
    let blob;

    async function handlesumbit(e) {
        e.preventDefault()
        //check weather user alredy exist or not
        if (email !== "" && username !== "") {
            const userSnapshot = await checkuser()
            //if user exists  
            if (!userSnapshot.empty) {
                //show user alredy exists messege
                setd(true)
            } else {
                //add user to database
                let temp1 = username
                let temp2 = email
                let e = ""
                setusername("")
                setemail("")
                let id = crypto.randomUUID();
                const deccref = await setDoc(doc(db, 'users', id), {
                    username: temp1,
                    email: temp2,
                    id: id,
                    profile: e
                })
                if (blob === undefined) {
                    e = ""
                } else {
                    const storageRef = ref(storage, "image/" + id + ".jpg");
                    await uploadBytes(storageRef, blob).then((snapshot) => {
                        console.log('Uploaded a blob or file!');
                    });
                }
                loginuser()
                setuser(true)
                setd(false)
                setlog(false)
            }
        } else {
            setf(true)
        }
    }

    function handlchange(e) {
        blob = e.target.files[0]
    }

    return <div className="sign-div">
        <div className="hf">
            <form onSubmit={handlesumbit} className="sign-form">
                <label>email</label>
                <input className="sl" autoComplete="off" type="email" value={email} onChange={e => setemail(e.target.value)}></input>
                {d ? <label style={{ color: "var(--red)", display: "block" }}>User alredy exists</label> : <></>}
                <label>Username</label>
                <input className="sl" autoComplete="off" type="text" value={username} onChange={e => setusername(e.target.value)}></input>
                {f ? <label style={{ color: "var(--red)", display: "block" }}>Pleas fill both fields</label> : <></>}
                <label>Profile image</label>
                <input className="mm" onChange={handlchange} type="file" name="img" accept="image/*"></input>
                <button className="sign-btn">Sign up</button>
            </form>
            <button className="ll" onClick={() => setlog(false)}>Go back</button>
        </div>
    </div>
}