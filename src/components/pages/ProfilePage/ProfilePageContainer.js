import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import GroomerProfilePage from './GroomerProfilePage';
import ClientProfilePage from './ClientProfilePage';

const ProfilePageContainer = () => {
  const userData = useSelector(state => state.postProfileReducer.userData);
  const [userId, setUserId] = useState(1);

  const handleChange = () => {
    if (userId === 0) {
      setUserId(1);
    } else {
      setUserId(0);
    }
  };

  return (
    <div className="container" style={{ flexDirection: 'column' }}>
      <div className="user-info" style={{ width: 320 }}>
        <button
          className="edit"
          style={{ width: 140, height: 30 }}
          onClick={handleChange}
        >
          Change User Type
        </button>
        <span style={{ fontSize: '1.2rem' }}>
          {userId === 1 ? 'Groomer' : 'Client'}
        </span>
      </div>
      {userId === 1 ? (
        <GroomerProfilePage user={userData ? userData : {}} />
      ) : (
        <ClientProfilePage user={userData ? userData : {}} />
      )}
    </div>
  );
};

export default ProfilePageContainer;
