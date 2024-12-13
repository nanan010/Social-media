import React, { useState } from 'react';
import './NavBar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { faHome, faUsers, faCircleUser,
    faIcons, faMessage,
    faArrowRightFromBracket,
    faPerson} from '@fortawesome/free-solid-svg-icons';

function NavBar() {
    let navigate = useNavigate();
    const [openProfile, setOpenProfile] = useState(true);

    function ProfileMenuOpen(){
        setOpenProfile(true);
    }
    function ProfileMenuClose(){
        setOpenProfile(false);
    }

    function Logout(){
        if(localStorage){
            if(localStorage.getItem('loggedIn')){
                localStorage.removeItem('loggedIn');
            }
        }
        navigate("/");
    }

    return(
    <nav className="navBar">
        <div className="logo">
            <FontAwesomeIcon icon={faIcons}></FontAwesomeIcon> 
        </div>
        <ul className="navlink">
            <li className="navitem" onClick={()=>{
                navigate("/home");
                }}> <FontAwesomeIcon icon={faHome} /> Home</li>
            <li className="navitem" onClick={()=>{
                navigate("/friends");
                }}> <FontAwesomeIcon icon={faUsers} /> Friends</li>
            <li className="navitem" onClick={()=>{navigate("/message");}}>   <FontAwesomeIcon icon={faMessage} /> Message</li>
            <li id="profile-menu" className="navitem" onMouseEnter={ProfileMenuOpen} onMouseLeave={ProfileMenuClose}>   
                <FontAwesomeIcon icon={faCircleUser} /> Profile
                {openProfile && (
                    <ul className="dropdown-menu">
                        <li onClick={()=>{navigate("/Profile")}}><FontAwesomeIcon icon={faPerson} /> My Profile</li>
                        <li onClick={Logout}><FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout</li>
                    </ul>
                )}
            </li>
        </ul>
    </nav>);
}

export default NavBar;