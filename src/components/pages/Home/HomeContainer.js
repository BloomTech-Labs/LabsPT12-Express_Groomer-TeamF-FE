import React, { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { connect } from 'react-redux';
import { postUserId } from '../../../state/actions/userActions';
import RenderHomePage from './RenderHomePage';

function HomeContainer({ LoadingComponent, postUserId }) {
  const { authState, authService } = useOktaAuth();

  const [userInfo, setUserInfo] = useState(null);
  // eslint-disable-next-line
  const [memoAuthService] = useMemo(() => [authService], []);

  console.log(postUserId);

  useEffect(() => {
    let isSubscribed = true;

    memoAuthService
      .getUser()
      .then(info => {
        // if user is authenticated we can use the authService to snag some user info.
        // isSubscribed is a boolean toggle that we're using to clean up our useEffect.
        if (isSubscribed) {
          setUserInfo(info);
        }
      })
      .catch(err => {
        isSubscribed = false;
        return setUserInfo(null);
      });
    return () => (isSubscribed = false);
  }, [memoAuthService]);

  const doMe = () => {
    console.log(userInfo.sub);
    postUserId(userInfo.sub);
  };

  return (
    <>
      <button onClick={doMe}>HIIIII</button>
      {authState.isAuthenticated && !userInfo && (
        <LoadingComponent message="Fetching user profile..." />
      )}
      {authState.isAuthenticated && userInfo && (
        <RenderHomePage userInfo={userInfo} authService={authService} />
      )}
    </>
  );
}

export default connect(
  state => {
    return {};
  },
  { postUserId: postUserId }
)(HomeContainer);

// export default HomeContainer;
