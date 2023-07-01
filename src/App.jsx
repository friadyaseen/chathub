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
  //whether user alrdey exists or not
  let [usere, setusere] = useState(false);
  //user credentials
  let [userc, setuserc] = useState({});
  //wheter user alredy logged in or not
  let [user, setuser] = useState(false)
  //for user name text box
  let [username, setusername] = useState("")
  //fo emial text box
  let [email, setemail] = useState("")
  //whether user is loggin in or signing up
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

  //to check for rendering loops
  console.log("renderd")

  //gives login window
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

  //logs user in or signs user up
  async function loguser(e) {
    e.preventDefault()
    //check weather text boxes are empty or not
    if (username !== "" && email !== "") {
      //if user wants to log in
      if (log) {
        loginuser();
        setuser(true)
      }
      //else user wants to sign up
      else {
        //check weather user alredy exist or not
        const userSnapshot = await checkuser()
        //if user exists  
        if (!userSnapshot.empty) {
          //show user alredy exists messege
          setusere(true)
        } else {
          //add user to database
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
          loginuser()
          setuser(true)
        }
      }
    }
  }
//set user credentials
  async function loginuser()
  {
    const userSnapshot = await checkuser()
    userSnapshot.forEach(doc => {
      setuserc({
        email: doc.data().email,
        username: doc.data().username,
        id: doc.data().id
      })})
  }
//check to see if user exists or not
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