import React, { useState } from 'react';
import { connect } from 'react-redux';
import GroomerProfilePage from './GroomerProfilePage';
import ClientProfilePage from './ClientProfilePage';

const ProfilePageContainer = ({ userData }) => {
  const [userId, setUserId] = useState(1);

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
        <GroomerProfilePage user={userData} />
      ) : (
        <ClientProfilePage user={userData} />
      )}
    </div>
  );
};

export default connect(state => {
  return { userData: state.postProfileReducer.userData };
}, {})(ProfilePageContainer);
