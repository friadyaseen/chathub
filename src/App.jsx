import './App.css';
import Header from './Header'
import Middle from './Middle'
import Footer from './Footer'

import React, { useEffect, useState } from 'react';

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, orderBy, query, onSnapshot, doc, getDocs, where } from "firebase/firestore";
import 'firebase/firestore'
import 'firebase/auth'



const firebaseConfig = {
  apiKey: "AIzaSyAG_OPmOnNF2D5hwhmhJeoKwPnV5XGj4po",
  authDomain: "data-7f85e.firebaseapp.com",
  databaseURL: "https://data-7f85e-default-rtdb.firebaseio.com",
  projectId: "data-7f85e",
  storageBucket: "data-7f85e.appspot.com",
  messagingSenderId: "608100569615",
  appId: "1:608100569615:web:7c8e268d3b45237ac1c97a",
  measurementId: "G-MNL44MFR0H"
};

const db = getFirestore(initializeApp(firebaseConfig))
let temp = [0];

//ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
function App() {
  let [messeges, setmesseges] = useState([]);
  let [usere, setusere] = useState(false);
  let [userc, setuserc] = useState({});
  let [user, setuser] = useState(false)
  let [username, setusername] = useState("")
  let [email, setemail] = useState("")
  let log = false;
  //listen to the database for changes in messege collections
  const q = query(collection(db, "messeges"), orderBy("createdAt"));
  useEffect(() => {
    onSnapshot(q, (querySnapshot) => {
      const messeges = [];
      querySnapshot.forEach((doc) => {
        messeges.push(doc.data());
      });
      setmesseges(messeges)
      temp[0] += 1;
    });
  }, [temp])

  console.log("renderd")

  function Login() {
    return (<div className='loginc'>
      <form onSubmit={loguser} className='login'>
        {usere ? <label className='usere'>User alredy exists</label> : <></>}
        <label>Email</label>
        <input autoComplete="off" value={email} onChange={e => setemail(e.target.value)} type='email' className='log-txt'></input>
        <label>Username</label>
        <input autoComplete="off" value={username} onChange={e => setusername(e.target.value)} type='text' id='username' className='log-txt'></input>
        <div className='btn-c'>
          <button onClick={() => log = true} className='log-btn'>Login</button>
          <button onClick={() => log = false} className='log-btn'>Sing Up</button>
        </div>
      </form>
    </div>)
  }

  async function loguser(e) {
    e.preventDefault()
    if (username !== "" && email !== "") {
      if (log) {
        console.log("logged")
        const userSnapshot = await checkuser()
        userSnapshot.forEach(doc => {
          setuserc({
            email: doc.data().email,
            username: doc.data().username,
            id: doc.data().id
          })})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        setuser(true)
      }
      else {
        const userSnapshot = await checkuser()

        if (!userSnapshot.empty) {
          setusere(true)
        } else {
          setusere(false)
          let temp1 = username
          let temp2 = email
          setusername("")
          setemail("")
          const deccref = await addDoc(collection(db, 'users'), {
            username: temp1,
            email: temp2,
            id: crypto.randomUUID()
          })
        }
      }
    }
  }

  async function checkuser() {
    const userRef = collection(db, "users");

    const q = query(userRef, where("email", "==", email));

    return await getDocs(q);
  }
  return (
    <div className='background'>
      {user}
      <div className='main'>
        <Header />
        {user ? <Middle messeges={messeges} /> : Login()}
        <Footer db={db} />
      </div>
    </div>
  );
}



export default App;