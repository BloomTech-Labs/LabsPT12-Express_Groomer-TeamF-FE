import React, { useState, useEffect, useMemo } from 'react';
import profilepic from './profilepic.png';
import axios from 'axios';
import { ProfileEditForm } from '../ProfileEdit';
import { useOktaAuth } from '@okta/okta-react';
import { axiosWithAuth } from '../../../utils/axiosWithAuth';

const GroomerProfilePage = ({ user }) => {
  useEffect(() => {
    // console.log('trying this')
    // axiosWithAuth().get(`https://labspt12-express-groomer-f-api.herokuapp.com/profiles/${userId}`)
    //     .then(response => {
    //         console.log(response)
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
  }, []);

  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  // eslint-disable-next-line
  const [memoAuthService] = useMemo(() => [authService], []);

  useEffect(() => {
    let isSubscribed = true;

    memoAuthService
      .getUser()
      .then(info => {
        // if user is authenticated we can use the authService to snag some user info.
        // isSubscribed is a boolean toggle that we're using to clean up our useEffect.
        if (isSubscribed) {
          setUserInfo(info);
        }
      })
      .catch(err => {
        isSubscribed = false;
        return setUserInfo(null);
      });
    return () => (isSubscribed = false);
  }, [memoAuthService]);

  console.log(userInfo);

  const [profileEdit, setProfileEdit] = useState(false);

  const handleChanges = e => {
    setProfileEdit(true);
  };

  return (
    <>
      <div className="container">
        GROOMER
        {profileEdit ? (
          <ProfileEditForm setProfileEdit={setProfileEdit} />
        ) : (
          <div className="user-profile">
            <div className="user-info">
              <h2>{user.name}</h2>
              <img className="profile-pic" src={profilepic}></img>
            </div>
            <div className="user-info" style={{ fontSize: '1.3rem' }}>
              <span>Email: {user.email} </span>{' '}
              <span>Telephone: {user.phone}</span>
            </div>
            <button
              style={{ border: '1px solid red' }}
              className="edit"
              onClick={handleChanges}
            >
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
