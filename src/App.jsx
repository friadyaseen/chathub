import './App.css';
import Header from './Header'
import Middle from './Middle'
import Footer from './Footer'
import Friendlist from './Friendlist';
import Profile from './Profile'
import React, { useEffect, useRef, useState, useTransition } from 'react';

import { initializeApp } from "firebase/app";
import { updateDoc, getFirestore, collection, orderBy, and, or, query, onSnapshot, getDocs, where, doc } from "firebase/firestore";
import 'firebase/firestore'
import 'firebase/auth'
import Cookies from 'js-cookie';
import { queryByRole } from '@testing-library/react';
import Signup from './Signup';

import { getStorage, getDownloadURL, ref } from 'firebase/storage'

import { firebaseConfig } from "./firebaseconfig"

const app = initializeApp(firebaseConfig)

const db = getFirestore(initializeApp(firebaseConfig))
let temp = [0];

const storage = getStorage(app);

//ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
function App() {
  let [messeges, setmesseges] = useState([]);
  //user credentials
  let [userc, setuserc] = useState({
    id: "",
  });
  //wheter user alredy logged in or not
  let [user, setuser] = useState(false)
  //for emial text box
  let [email, setemail] = useState("")

  let [U, setU] = useState([])

  let [to, setto] = useState("")
  //whether user is loggin in or signing up
  let [log, setlog] = useState(false);
  //cockeise
  let emp;
  let [toi, settoi] = useState({})
  let [l, setl] = useState(false)
  const scrol = useRef()

  //get user credentials from coockes
  if (!user) {
    emp = Cookies.get()
    if (emp.username !== undefined) {
      setuserc({
        email: emp.email,
        username: emp.username,
        id: emp.id,
        profile: emp.profile
      })
      setuser(true)
    }
  }

  if (user) {
    if (userc.profile === "") {
      setp()
    }
  }

  async function setp() {
    getDownloadURL(ref(storage, 'image/' + userc.id + ".jpg")).then(async (url) => {
      setuserc({
        email: userc.email,
        username: userc.username,
        id: userc.id,
        profile: url
      })
      await updateDoc(doc(db, "users", userc.id), {
        profile: url
      });
    }).catch(async (err) => {
      console.log(err)
    })
  }
  
  //to check for rendering loops
  console.log("renderd")

  //gives login window
  function Login() {
    return (<div className='loginc'>
      <div className='ff'>
        <form onSubmit={loguser} className='login'>
          <label>Email</label>
          <input autoComplete="off" value={email} onChange={e => setemail(e.target.value)} type='email' className='log-txt'></input>
          {l ? <label style={{color: "var(--red)"}}>User not found</label> : <></>}
          <button className='log-btn'>Login</button>
        </form>
        <button onClick={() => setlog(true)} className='log-btn'>Sing Up</button>
      </div>
    </div>)
  }

  //logs user in
  async function loguser(e) {
    e.preventDefault()
    //check weather text boxe is empty or not
    if (email !== "") {
      loginuser();
    }
  }
  //set user credentials
  async function loginuser() {
    const userSnapshot = await checkuser()
    if (!userSnapshot.empty) {
      userSnapshot.forEach(doc => {
        setuserc({
          email: doc.data().email,
          username: doc.data().username,
          id: doc.data().id,
          profile: doc.data().profile
        })
        savecookies({
          email: doc.data().email,
          username: doc.data().username,
          id: doc.data().id,
          profile: doc.data().profile
        })
      })
      setuser(true)
    } else {
      setl(true)
    }
  }
  //check to see if user exists or not
  async function checkuser() {
    const userRef = collection(db, "users");

    const q = query(userRef, where("email", "==", email));

    return await getDocs(q);
  }



  //save cookies
  function savecookies(data) {
    Cookies.set('username', data.username, { expires: 7 })
    Cookies.set('email', data.email, { expires: 7 })
    Cookies.set('id', data.id, { expires: 7 })
    Cookies.set('profile', data.profile, { expires: 7 })
  }

  //get list of users
  //listen to the database for changes in messege collections
  useEffect(() => {
    if (user) {
      const q = query(collection(db, "messeges"), or(and(where('from', "==", userc.id), where('to', "==", to)),
        and(where('to', "==", userc.id), where('from', "==", to))), orderBy("createdAt"));
      const p = query(collection(db, "users"), where("email", "!=", "1"))
      onSnapshot(q, (querySnapshot) => {
        const messeges = [];
        querySnapshot.forEach((doc) => {
          messeges.push(doc.data());
        });
        setmesseges(messeges)
        scrol.current.scrollIntoView({ behavior: "smooth" });
        temp[0] += 1;
      });
      onSnapshot(p, (querySnapshot) => {
        const f = [];
        querySnapshot.forEach((doc) => {
          f.push(doc.data());
        });
        setU(f)

      });
    }
  }, [temp, user, to])

  //log user out
  function logout() {
    setuser(false)
    setuserc({})
    Cookies.remove("username")
    Cookies.remove("id")
    Cookies.remove("email")
    Cookies.remove("profile")
    window.location.reload(true);
  }
  return (
    <div className='background'>
      {log ? <>
        <Signup email={email} setemail={setemail} db={db} checkuser={checkuser} loginuser={loginuser} setuser={setuser} setlog={setlog} />
      </> : <>
        <Friendlist db={db} settoi={settoi} setto={setto} users={U} />
        <div className='main'>
          <Header profile={userc.profile} username={userc.username} user={user} logout={logout} />
          {user ? (
            <div className="h">
              <div className="middle">
                <Middle userc={userc} toi={toi} to={to} db={db} messeges={messeges} uid={userc.id} />
                <div ref={scrol}></div>
              </div>
            </div>
          ) : Login()}
          <Footer to={to} uid={userc.id} db={db} />
        </div>
        <Profile user={user} logout={logout} />
      </>}
    </div>
  );
}



export default App;