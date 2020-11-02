import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../common';
import { connect } from 'react-redux';

function RenderHomePage(props) {
  const { userData, authService } = props;

  return (
    <div className="flux">
      <h1>Hi {userData.name} Welcome to Labs Basic SPA</h1>
      <div>
        <p>
          This is an example of a common example of how we'd like for you to
          approach components.
        </p>
        <p>
          <Link to="/profile-list">Profiles Example</Link>
        </p>
        <p>
          <Link to="/example-list">Example List of Items</Link>
        </p>
        <p>
          <Link to="/datavis">Data Visualizations Example</Link>
        </p>
        <p>
          <Button
            handleClick={() => authService.logout()}
            buttonText="Logout"
          />
        </p>
      </div>
    </div>
  );
}

export default connect(state => {
  return { userData: state.postProfileReducer.userData };
}, {})(RenderHomePage);
