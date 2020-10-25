import React from 'react';
import profilepic from './profilepic.png';

const GroomerProfilePage = ({ user }) => {
  return (
    <div className="container">
      <div className="user-profile">
        <div className="user-info">
          <h2>{user.name}</h2>
          <img className="profile-pic" src={profilepic}></img>
        </div>
        <div className="user-info" style={{ fontSize: '1.3rem' }}>
          <span>Email: {user.email} </span> <span>Telephone: {user.phone}</span>
        </div>
        <button className="edit">Edit profile</button>
      </div>
      <div className="favorite-groomers">
        <div className="user-info">
          <h3 style={{ borderBottom: '1px solid black' }}>Business Details:</h3>
        </div>
        <div className="groomers-mini">
          <div className="userinfo">
            <h5>Shop Name:</h5>
            Shop Location: adress #3444 dpt 52
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroomerProfilePage;
