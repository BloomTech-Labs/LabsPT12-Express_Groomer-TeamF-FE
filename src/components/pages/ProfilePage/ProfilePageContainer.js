import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import GroomerProfilePage from './GroomerProfilePage';
import ClientProfilePage from './ClientProfilePage';

const ProfilePageContainer = () => {
  const userData = useSelector(state => state.postProfileReducer.userData);

  return (
    <div className="container" style={{ flexDirection: 'column' }}>
      {userData ? (
        userData.type === 1 ? (
          <GroomerProfilePage user={userData ? userData : {}} />
        ) : (
          <ClientProfilePage user={userData ? userData : {}} />
        )
      ) : (
        <h1>"No user Data, click home or relog please"</h1>
      )}
    </div>
  );
};

export default ProfilePageContainer;
