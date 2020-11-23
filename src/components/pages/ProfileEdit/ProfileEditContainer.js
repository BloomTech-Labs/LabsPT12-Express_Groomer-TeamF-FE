import React from 'react';
import { connect } from 'react-redux';
import { postProfile } from '../../../state/actions/userActions';
import UserEdit from './UserEdit';

const ProfileEditContainer = ({
  setProfileEdit,
  user,
  postProfile,
  userId,
}) => {
  return (
    <>
      <UserEdit
        user={user}
        profileEdit={postProfile}
        setProfileEdit={setProfileEdit}
        userId={userId}
      />
    </>
  );
};

export default connect(
  state => {
    return { userId: state.UserIdReducer.userId };
  },
  { postProfile }
)(ProfileEditContainer);
