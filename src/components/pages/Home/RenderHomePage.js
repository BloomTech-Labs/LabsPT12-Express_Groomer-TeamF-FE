import React from 'react';
import { useSelector } from 'react-redux';

function RenderHomePage() {
  const userData = useSelector(state => state.postProfileReducer.userData);

  return (
    <div className="flux" style={{ textAlign: 'center' }}>
      <div className="user-info">
        <h1>Hi {userData?.name}</h1>
      </div>
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

export default RenderHomePage;
