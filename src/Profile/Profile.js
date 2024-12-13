import React, { useEffect } from 'react';
import './Profile.css';
import NavBar from '../NavBar/NavBar.js';

const user = {
    name: "User 1",
    avatar: "https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_1280.png",
    location: "Los Angels, CA",
    posts: 120,
    followers: 450,
    following: 300,
    interests: ["JavaScript", "React", "Node.js", "CSS", "UI/UX Design"],
    friends: [
      { id: 1, name: "John", avatar: "https://via.placeholder.com/40" },
      { id: 2, name: "Emma", avatar: "https://via.placeholder.com/40" },
      { id: 3, name: "Harry", avatar: "https://via.placeholder.com/40" },
      { id: 4, name: "Ron", avatar: "https://via.placeholder.com/40" },
      { id: 5, name: "Hermione", avatar: "https://via.placeholder.com/40" }
    ]
  };

function getUserProfile(){
  return fetch("http://localhost:3030/user_profile")
  .then((res=>res.json()))
  .catch((e)=>{console.log("Error",e);
    throw e;
  })
}

(async () => {
  try {
      const user1 = await getUserProfile();
      console.log("user", user1);
  } catch (error) {
      console.error("Error fetching user profile:", error);
  }
})();

const Profile = () => {
  return (
    <>
    <NavBar></NavBar>
    <div className="profile-tab">
      <div className="profile-header">
        <img src={user.avatar} alt={`${user.name}'s avatar`} className="profile-avatar" />
        <h2 className="profile-name">{user.name}</h2>
      </div>

      <div className="profile-info">
        <p className="profile-location">
          <span role="img" aria-label="location">📍</span> {user.location}
        </p>
      </div>

      <div className="profile-stats">
        <div className="stat-item">
          <span className="stat-value">{user.posts}</span>
          <span className="stat-label"> Posts</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{user.followers}</span>
          <span className="stat-label"> Followers</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{user.following}</span>
          <span className="stat-label"> Following</span>
        </div>
      </div>

      <div className="profile-interests">
        <h3>Interests</h3>
        <div className="interest-tags">
          {user.interests.map((interest, index) => (
            <span key={index} className="interest-tag">{interest}</span>
          ))}
        </div>
      </div>

      <div className="profile-friends">
        <h3>Friends</h3>
        <div className="friends-list">
          {user.friends.map(friend => (
            <div  key={friend.id} className='friend-item'>
            <img src={friend.avatar} alt={friend.name} className="friend-avatar" />
            <p className='friend-name'>{friend.name}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
    </>
  );
};

export default Profile;
