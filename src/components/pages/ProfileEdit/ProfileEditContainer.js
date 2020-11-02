import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { connect } from 'react-redux';
import { postProfile } from '../../../state/actions/userActions';
import GroomerEdit from './GroomerEdit';

const ProfileEditContainer = ({ setProfileEdit, user, postProfile }) => {
  const [userId, setUserId] = useState(0);

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

      <GroomerEdit
        user={user}
        profileEdit={postProfile}
        setProfileEdit={setProfileEdit}
      />
    </>
  );
};

export default connect(
  state => {
    return {};
  },
  { postProfile }
)(ProfileEditContainer);
