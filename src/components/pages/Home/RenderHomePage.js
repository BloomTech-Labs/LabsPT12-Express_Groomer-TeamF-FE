import React, { useEffect } from 'react';
import { connect } from 'react-redux';

function RenderHomePage({ userData }) {
  return (
    <div className="flux" style={{ textAlign: 'center' }}>
      <p className="user-info">
        <h1>Hi {userData.name}</h1>
      </p>
      <p>
        This will be the landing page after Login, we should probably do a
        conditional rendering depending on the type of user.
      </p>
      <p>
        Groomer could be taken to his Shop page or something like that. Clients
        could be taken to the Map page or something.
      </p>
    </div>
  );
}

export default connect(state => {
  return { userData: state.postProfileReducer.userData };
}, {})(RenderHomePage);
