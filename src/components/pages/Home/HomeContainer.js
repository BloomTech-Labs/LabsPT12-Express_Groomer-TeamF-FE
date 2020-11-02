import React, { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { connect } from 'react-redux';
import { postUserId, postProfile } from '../../../state/actions/userActions';
import RenderHomePage from './RenderHomePage';

function HomeContainer({
  LoadingComponent,
  postUserId,
  postProfile,
  userData,
}) {
  const { authState, authService } = useOktaAuth();

  // eslint-disable-next-line
  const [memoAuthService] = useMemo(() => [authService], []);

  useEffect(() => {
    let isSubscribed = true;

    memoAuthService
      .getUser()
      .then(info => {
        // if user is authenticated we can use the authService to snag some user info.
        // isSubscribed is a boolean toggle that we're using to clean up our useEffect.
        if (isSubscribed) {
          postUserId(info.sub);
          postProfile(info);
        }
      })
      .catch(err => {
        isSubscribed = false;
        console.log(err);
      });
    return () => (isSubscribed = false);
  }, [memoAuthService]);

  return (
    <>
      {authState.isAuthenticated && !userData && (
        <LoadingComponent message="Fetching user profile..." />
      )}
      {authState.isAuthenticated && userData && (
        <RenderHomePage authService={authService} />
      )}
    </>
  );
}

export default connect(
  state => {
    return { userData: state.postProfileReducer.userData };
  },
  { postUserId: postUserId, postProfile: postProfile }
)(HomeContainer);
