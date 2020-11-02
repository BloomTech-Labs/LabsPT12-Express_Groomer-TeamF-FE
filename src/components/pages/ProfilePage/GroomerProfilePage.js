import React, { useState } from 'react';
import { ProfileEditForm } from '../ProfileEdit';
import profilepic from './profilepic.png';

const GroomerProfilePage = ({ user }) => {
  const [profileEdit, setProfileEdit] = useState(false);

  const handleChanges = e => {
    setProfileEdit(true);
  };

  return (
    <>
      <div className="container">
        {profileEdit ? (
          <ProfileEditForm setProfileEdit={setProfileEdit} user={user} />
        ) : (
          <div className="user-profile">
            <div className="user-info">
              <h2>{user.name}</h2>
              <img className="profile-pic" src={profilepic}></img>
            </div>
            <div className="user-info" style={{ fontSize: '1.3rem' }}>
              <span>Email: {user.email} </span>{' '}
              <span>Username: {user.preferred_username}</span>
              <span>Other Info: {user.family_name}</span>
            </div>
            <button className="edit" onClick={handleChanges}>
              Edit profile
            </button>
          </div>
        )}
        <div className="favorite-groomers">
          <div className="user-info">
            <h3 style={{ borderBottom: '1px solid black' }}>
              Business Details:
            </h3>
          </div>
          <div className="groomers-mini">
            <div className="userinfo">
              <h5>Shop Name:</h5>
              Shop Location: adress #3444 dpt 52
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroomerProfilePage;
