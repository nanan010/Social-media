import React, {useState,useEffect } from "react";
import './Message.css';
import NavBar from '../NavBar/NavBar.js';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { faSmile, faUser, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmojiPicker from 'emoji-picker-react';


function Message(){
    const [chats, setChats] = useState([]);
    const [selectedText, setSelectedText] = useState('');
    let [typedText, setTypedText] = useState('');
    let [showPicker, setShowPicker] = useState(false);


    useEffect(() => {
        getMessages();
    }, [])

    function openTexts(m){
        setSelectedText(m);
    }

    function SendText(){
        if(typedText.trim()!==''){
            const updatedText = {
                ...selectedText,
                messages:[...selectedText.messages, {name:"own", text:typedText.trim()}]
            }
            setSelectedText(prev=> ({
                ...prev,
                messages:[...prev.messages,{name:"own", text:typedText.trim()}]
            }));
            setTypedText('');
            updateCurrentChat(updatedText);
        }
    }

    function updateCurrentChat(updatedText){
        let id = updatedText._id;
        fetch(`http://localhost:3030/chat/${id}`,
            {
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(updatedText.messages)
            })
            .then((response)=>{response.json})
            .then((data)=>{
                console.log(data);
            })
        .catch(e =>{
            console.log("Error",e);
        })
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && typedText.trim() !== '') {
          SendText();
          setTypedText('');
        }
      };

    function getMessages(){
        fetch("http://localhost:3030/chats")
            .then((res)=>res.json())
            .then((data)=>{
                setChats(data);
            })
            .catch((e)=>{console.log("Error",e);})
    }

    function openEmojiPicker(){
        setShowPicker(p=> p?false:true);
     }
     const onEmojiClick = (emojiObject, event)=>{
         setTypedText(typedText + emojiObject.emoji);
     };


    return (<>
        <NavBar></NavBar>
        <div className="MessageParent">
            <div className="MessageList">
                <ul>
                    {chats.map((m, index)=>(

                        <li className="MessageItem" onClick={()=>{openTexts(m)}} key={index}>
                            <FontAwesomeIcon icon={faUser} className="icon" />
                            <span className="text"> {m.chat} </span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="MessageDetailPanel">
                {selectedText ?(
                    <>
                    <div className="UserHeader">{selectedText.chat}</div>
                    <div className="ChatDetails">
                        {(selectedText.messages).map((message, id)=>(
                            (message.name=='own')?
                            <p key={id} className="OwnTexts">{message.text}</p>:
                            <p key={id} className="Texts">{message.text}</p>
                            ))}
                    </div>
                    <div className="Typebox">
                        <input type="text" id="messageInput" 
                            value={typedText} 
                            onKeyDown={handleKeyPress}
                            onChange={(t)=>{setTypedText(t.target.value)}}></input>
                        <FontAwesomeIcon onClick={openEmojiPicker} icon={faSmile}></FontAwesomeIcon>
                        <FontAwesomeIcon className="sendIcon" icon={faPaperPlane} onClick={()=>SendText()}></FontAwesomeIcon>
                        <div className="EmojiContainer">
                            {showPicker &&(
                            <EmojiPicker 
                                onEmojiClick={onEmojiClick}
                                className="EmojiPicker"
                                >
                            </EmojiPicker>)}
                        </div>
                    </div>
                    </>
                ):
                (<p>No Convo</p>)
                }
            </div>
        </div>
    </>);
}

export default Message;