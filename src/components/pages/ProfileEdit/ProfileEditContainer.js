import React from 'react';
import { connect } from 'react-redux';
import { postProfile } from '../../../state/actions/userActions';
import UserEdit from './UserEdit';

const ProfileEditContainer = ({ setProfileEdit, user, postProfile }) => {
  return (
    <>
      <UserEdit
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
