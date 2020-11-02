import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { connect } from 'react-redux';
import { postProfile } from '../../../state/actions/userActions';
import GroomerEdit from './GroomerEdit';
import ClientEdit from './ClientEdit';
import mockdata from './mockdata';

const ProfileEditContainer = ({ setProfileEdit }) => {
  console.log(setProfileEdit);
  const { authState, authService } = useOktaAuth();

  const [userRole, setUserRole] = useState(false);
  //using this two pieces of state when we have the real data flow ready

  // Im only setting up this userRole state for now to play around with rendering one component
  //or the other. In reality we would grab the user role from redux's state.
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
    <>
      <div style={{ margin: ' 0 auto' }}>
        <button onClick={handleChange}>Change User Type</button>
      </div>

      <GroomerEdit user={userData[userId]} setProfileEdit={setProfileEdit} />
    </>
  );
};

export default connect(
  state => {
    return {};
  },
  { postProfile }
)(ProfileEditContainer);
