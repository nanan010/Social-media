import React, { useState, useEffect } from 'react';
import './Friends.css';
import NavBar from '../NavBar/NavBar.js';

const initialFriendsList = [
  { id: 1, name: 'John Doe', avatar: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_1280.png', online: true },
  { id: 2, name: 'User 1', avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', online: false },
  { id: 3, name: 'User 2', avatar: 'https://cdn.pixabay.com/photo/2014/04/03/10/32/businessman-310819_1280.png', online: true },
  { id: 4, name: 'User 3', avatar: 'https://cdn.pixabay.com/photo/2014/04/02/14/10/female-306407_1280.png', online: false },
];

const FriendItem = ({ friend, onRemove }) => (
  <div className="friend-item">
    <img src={friend.avatar} alt={friend.name} className="friend-avatar" onError={(e) => { e.target.src = 'https://placehold.co/50x50'; }}/>
    <div className="friend-details">
      <span className="friend-name">{friend.name}</span>
      <span className={`friend-status ${friend.online ? 'online' : 'offline'}`}>
        {friend.online ? 'Online' : 'Offline'}
      </span>
    </div>
    <button className="remove-friend" onClick={() => onRemove(friend._id)}>Remove</button>
  </div>
);

const Friends = () => {
const [friends, setFriends] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [filterOnline, setFilterOnline] = useState(false);
const [newFriendName, setNewFriendName] = useState('');

const removeFriend = (id) => {
  fetch(`http://localhost:3030/friends/${id}`, {
    method: "DELETE"
  })
  .then((res) => {
      if (res.ok) {
          setFriends((prevFriends) => prevFriends.filter(friend => friend._id !== id));
      } else {
          console.error("Failed to remove friend");
      }
  })
  .catch((e) => console.error("Error:", e));
};

function addFriends(newFriends){
  fetch("http://localhost:3030/friends",{
    method: "POST",
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(newFriends)
  })
  .then((response)=>{ return response.json();})
  .then((data)=>{
    setFriends((prevFriends) => [...prevFriends, data]); 
    setNewFriendName(""); 
  })
  .catch(e =>{
    console.log("Error",e);
  })
}

const addFriend = () => {
  if (newFriendName) {
    const newFriend = {
      //id: friends.length + 1,
      name: newFriendName,
      avatar: 'https://via.placeholder.com/50x50',
      online: true, 
    };
    addFriends(newFriend);
  }
};

const filteredFriends = friends.filter(friend => {
  const matchesSearch = friend.name.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesStatus = filterOnline ? friend.online : true;
  return matchesSearch && matchesStatus;
});


function getFriends(){
  fetch("http://localhost:3030/friends")
      .then((res)=>res.json())
      .then((data)=>{
          setFriends(data);
      })
      .catch((e)=>{console.log("Error",e);})
}

useEffect(() => {
  getFriends();},[])

  return (<>
    <NavBar></NavBar>
    <div className="friends-tab">
      <h2>Your Friends</h2>

      <input
        type="text"
        className="search-bar"
        placeholder="Search friends..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <label className="filter-toggle">
        <input
          type="checkbox"
          checked={filterOnline}
          onChange={() => setFilterOnline(!filterOnline)}
        />
        Show only online friends
      </label>

      <div className="add-friend-container">
        <input
          type="text"
          className="new-friend-input"
          placeholder="Add a new friend..."
          value={newFriendName}
          onChange={(e) => setNewFriendName(e.target.value)}
        />
        <button className="add-friend" onClick={addFriend}>
          Add Friend
        </button>
      </div>

      <div className="friends-list">
        {filteredFriends.length ? (
          filteredFriends.map(friend => (
            <FriendItem key={friend._id} friend={friend} onRemove={removeFriend} />
          ))
        ) : (
          <p>No friends found.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default Friends;
