import React, { useEffect } from 'react';
import { connect } from 'react-redux';

function RenderHomePage({ userData }) {
  return (
    <div className="flux">
      <h1 className="user-info">Hi {userData.name}</h1>
      <h2>
        This will be the landing page after Login, we should probably do a
        conditional rendering depending on the type of user
      </h2>
    </div>
  );
}

export default connect(state => {
  return { userData: state.postProfileReducer.userData };
}, {})(RenderHomePage);
