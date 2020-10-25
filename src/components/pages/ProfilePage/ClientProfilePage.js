import React, { useReducer } from 'react';
import profilepic from './profilepic.png';

const ClientProfilePage = ({ user }) => {
  return (
    <div className="container">
      <div className="user-profile">
        <div className="user-info">
          <h2>{user.name}</h2>
          <img className="profile-pic" src={profilepic} />
        </div>
        <div className="user-info" style={{ fontSize: '1.3rem' }}>
          <span>Email: {user.email} </span> <span>Telephone: {user.phone}</span>
        </div>
        <button className="edit">Edit profile</button>
      </div>
      <div className="favorite-groomers">
        <div className="user-info">
          <h3 style={{ borderBottom: '1px solid black' }}>
            Favorite Groomers:
          </h3>
        </div>
        <div className="groomers-mini">
          <div className="groomer-faved">
            <img className="groomer-pic" src={profilepic} />
          </div>
          <div className="groomer-faved">
            <img className="groomer-pic" src={profilepic} />
          </div>
          <div className="groomer-faved">
            <img className="groomer-pic" src={profilepic} />
          </div>
          <div className="groomer-faved">
            <img className="groomer-pic" src={profilepic} />
          </div>
          <div className="groomer-faved">
            <img className="groomer-pic" src={profilepic} />
          </div>
          <div className="groomer-faved">
            <img className="groomer-pic" src={profilepic} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfilePage;
