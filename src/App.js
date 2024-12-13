// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

import React from "react";
import './App.css';
import { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Home.js';
import Message from "./Message/Message.js";
import FriendsTab from "./Friends/Friends.js";
import Profile from "./Profile/Profile.js";

function UserForm(){
    let [showLogin, setShowLogin] = useState(true);
    let navigate = useNavigate();

    function OpenSignupPage(){
        setShowLogin(false);
    }
    
    function GoBack(){
        setShowLogin(true);
    }

    function UserSignupForm(){
        let [userName, setUserName] = useState('');
        let [password, setPassword] = useState('');
        let [cpassword, setCPassword] = useState('');


        function handleUserName(e){
            setUserName(e.target.value);
        }
        
        function handleCPassword(e){
            setCPassword(e.target.value);
        }

        function handlePassword(e){
            setPassword(e.target.value);
        }

        async function Signup(event){
            event.preventDefault();
            console.log("uname",userName);
            if(password!= cpassword){
                alert("Passwords must match!");
            }
            else{
                try{
                    fetch('http://localhost:3030/signup', {
                        method: "POST",
                        headers: {  'Content-Type': 'application/json',},
                        body: JSON.stringify({uname: userName, password: password})
                    }).then((res)=> console.log("Success",res));
                    alert("Signed Up! Please Login.")
                    toast.success("singed up");
                    setCPassword('');
                    setPassword('');
                    setUserName('');
                } catch(e){
                    console.log('error',e);
                }
            }

        }

        return(
            <div className="UserCard">
                <form id="userform">
                    <div>
                        <a id="backToLogin" href="#" onClick={GoBack}>Back</a>
                    </div>
                    <div className="formElement">
                        <label htmlFor="name">User Name/Email</label><br></br>
                        <input type="text" value={userName} onChange={handleUserName} id="name"></input>
                    </div>
                    <div className="formElement">
                        <label htmlFor="pwd">Password</label><br></br>
                        <input type="password" value={password} onChange={handlePassword} id="pwd"></input>
                    </div>
                    <div className="formElement">
                        <label htmlFor="pwd">Confirm Password</label><br></br>
                        <input type="password" value={cpassword} onChange={handleCPassword} id="cpwd"></input>
                    </div>
                    <Button text={'Sign Up'} onClick={Signup}></Button>
                </form>
            </div>
        );
    } 

    function UserLoginForm(){
        let [userName, setUserName] = useState('');
        let [password, setPassword] = useState('');

        function handleUserName(e){
            setUserName(e.target.value);
        }

        function Login(event){
            event.preventDefault();
            fetch('http://localhost:3030/login',
                {
                    method:'POST',
                    headers:{'Content-Type':'application/json',},
                    body: JSON.stringify({uname: userName, password: password})
                }
            ).then((res)=>res.json())
            .then((data) => {
                if(data==null){
                    alert("Wrong Username and/or password!");
                    storeLogin(false);
                } else{
                    alert("Success!");
                    storeLogin(true);
                    navigate('/home');
                }
            })
            .catch(e => {
                    console.log("error",e);
                }
            );
        }

        function storeLogin(login){
            if(localStorage!==null){
                localStorage.setItem("loggedIn", login);
            }
        }
       
        function handlePassword(e){
            setPassword(e.target.value);
        }
        return(
            <div className="UserCard">
                <form id="userform">
                    <div className="formElement">
                        <label htmlFor="name">User Name/Email</label><br></br>
                        <input type="text" value={userName} onChange={handleUserName} id="name"></input>
                    </div>
                    <div className="formElement">
                        <label htmlFor="pwd">Password</label><br></br>
                        <input type="password" value={password} onChange={handlePassword} id="pwd"></input>
                    </div>
                    <Button text={'Login'} onClick={Login}></Button>
                    <a id="signup" href="#" onClick={OpenSignupPage}>Sign Up</a>
                </form>
            </div>
        );
    }

    if (localStorage.getItem('loggedIn')!=null){
        console.log("logged in");
        navigate("/home");
    } else{
        if(showLogin){
            return(
                <>
                    <UserLoginForm/>
                </>
            );
        } else{
            return(
                <>
                    <UserSignupForm/>
                </>
            );
        }
    }
}


function Button({text, onClick}){
    return(<>
        <button onClick={onClick} className="buttonClass">{text}</button>
    </>);
}

function SocialMedia(){
    return(
        <div>
            <UserForm></UserForm>
        </div>
    );
}

function App(){
    return(
        // <SocialMedia/>
        <Router>
            <Routes>
                <Route path="/" element={<SocialMedia/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/message" element={<Message/>} />
                <Route path="/friends" element={<FriendsTab/>} />
                <Route path="/profile" element={<Profile/>} />
            </Routes>
        </Router>
    );
}
export default App;