import React, { useState } from 'react';
import './Home.css';
import NavBar from './NavBar/NavBar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { faHome, faUsers, faCircleUser, faThumbsUp, faShare,
    faIcons, faMessage,
    faArrowRightFromBracket, 
    faSmile} from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as likeSolid, faFaceSmile, faComment } from '@fortawesome/free-regular-svg-icons';
import EmojiPicker from 'emoji-picker-react';



function Home() {
    let post1 = {username: "User 1", posturl:'https://media.gettyimages.com/id/1394456695/photo/a-woman-at-the-airport-holding-a-passport-with-a-boarding-pass.jpg?s=1024x1024&w=gi&k=20&c=2hnQL2hWMdZBH9MaLxCDkSHU3dYi0V8a7CAyEY2-_Bg='};
    let post2 = {username: "User 2", posturl:'https://media.gettyimages.com/id/1927195976/photo/portrait-of-scottish-fold-cat-lying-on-a-scratching-post.jpg?s=2048x2048&w=gi&k=20&c=p3DNAAYf-pDZUfhzpaG7f_RmFIW5A60CXQkny7WynlQ=' };
    let post3 = {username: "User 3", posturl:'https://media.gettyimages.com/id/1417994961/photo/golden-retriever-looking-sad.jpg?s=1024x1024&w=gi&k=20&c=Lf293H6ixocDb_1H3rYcmHqCC1dM3ud_mfqPOWaGBSY=' };
    return (
        <div>
            <NavBar></NavBar>
            <Posts post={post1}></Posts>
            <Posts post={post2}></Posts>
            <Posts post={post3}></Posts>
        </div>
    );
}


let cid=0;

function Posts({post}) {
    let [like, setLike] = useState(0);
    let [likedByYou, setYouLiked] = useState(false);
    let [commentSection, showComments] = useState('none');
    let [currComment, setCurrComment] = useState('');
    let [comment, setComments] = useState([]);
    let [showPicker, setShowPicker] = useState(false);

    function incrementLikeCount(){
        if(likedByYou){
            setYouLiked(false);
            setLike(like -1);
        } else{
            setLike(like+1);
            setYouLiked(true);
        }
    }

    function getIconColor(){
        if (likedByYou){
            return 'blue';
        } else{
            return 'black';
        }

    }

    function openComments(){
        if (commentSection=='flex'){
            showComments('none');
        } else{
            showComments('flex');
        }
    }

    function addComment(){
        setComments([...comment,{id: cid++, comment: currComment}]);
        setCurrComment('');
        setShowPicker(false);
    }

    function openEmojiPicker(){
       setShowPicker(p=> p?false:true);
    }
    const onEmojiClick = (emojiObject, event)=>{
        setCurrComment(currComment + emojiObject.emoji);
    };
 

    return(
        <>
            <div className='Post'>
                <div className='PostHeader'>
                    <FontAwesomeIcon className="ProfilePhoto" icon={faCircleUser} size='2x'></FontAwesomeIcon>
                    <div className='ProfilePhoto'>{post.username}</div>
                </div>
                <img src={post.posturl} alt='Image'>
                </img>
                <div className="PostFooter">
                    {/* Like */}
                    <FontAwesomeIcon className='PostOptions' 
                        icon={likedByYou? faThumbsUp : likeSolid}
                        onClick={()=>incrementLikeCount()}
                        style={{color:getIconColor()}}/>
                    <div className='PostOptionsText'>{like}</div>

                    {/* Comment */}
                    <FontAwesomeIcon className='PostOptions' 
                        icon={faComment} 
                        onClick={()=>openComments()}/>
                    <div className='PostOptionsText'>{comment.length}</div>

                    {/* Share */}
                    <FontAwesomeIcon className='PostOptions' icon={faShare} />
                </div>

                {/* Comment list and input section */}
                <div className='PostComments' style={{display: commentSection}}>
                    <div className='CommentList'>
                       { comment.map((c, index)=>(
                        <div className="IndividualComment" key={c.id}>
                            {c.comment}<br></br>
                        </div>
                       ))}
                    </div>
                    <div className="EmojiPickerContainer">
                            {showPicker &&(
                            <EmojiPicker 
                                onEmojiClick={onEmojiClick}
                                className='CommentEmojiPopup'
                                >
                            </EmojiPicker>)}
                        </div>
                    <div className='PostCommentInput'>
                        <input className='PostCommentsTextbox' 
                            type='text' 
                            value={currComment}
                            onChange={(t)=>{
                                setCurrComment(t.target.value);
                                setShowPicker(false);
                                }}>
                        </input>
                        <FontAwesomeIcon 
                            className='CommentEmoji' 
                            onClick={openEmojiPicker}
                            icon={faFaceSmile}>
                        </FontAwesomeIcon>
                        <button className='PostCommentButton' 
                            onClick={addComment}>Post
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;