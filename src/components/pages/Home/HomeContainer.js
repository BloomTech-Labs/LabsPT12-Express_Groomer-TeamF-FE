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

  const [memoAuthService] = useMemo(() => [authService], []);

  useEffect(() => {
    let isSubscribed = true;

    memoAuthService
      .getUser()
      .then(info => {
        if (isSubscribed) {
          postUserId(info.sub);
          postProfile(info);
        }
      })
      .catch(err => {
        isSubscribed = false;
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
    return { userData: state.postProfileReducer?.userData };
  },
  { postUserId: postUserId, postProfile: postProfile }
)(HomeContainer);
