import React, { useState } from 'react';
import mockdata from './mockdata';
import GroomerProfilePage from './GroomerProfilePage';
import ClientProfilePage from './ClientProfilePage';

const ProfilePageContainer = () => {
  const [userId, setUserId] = useState(0);
  const [userData, setUserData] = useState(mockdata);

  const handleChange = () => {
    if (userId == 0) {
      setUserId(1);
    } else {
      setUserId(0);
    }
  };

  return (
    <div className="container" style={{ flexDirection: 'column' }}>
      <div>
        <button onClick={handleChange}>Change User Type</button>
      </div>
      {userId == 1 ? (
        <GroomerProfilePage user={userData[userId]} />
      ) : (
        <ClientProfilePage user={userData[userId]} />
      )}
    </div>
  );
};

export default ProfilePageContainer;
