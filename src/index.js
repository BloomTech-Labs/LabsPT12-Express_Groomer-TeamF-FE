import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './state';

import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';

import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import 'antd/dist/antd.less';
import './styles/index.scss';
import { Layout } from 'antd';

import { NotFoundPage } from './components/pages/NotFound';
import { ExampleListPage } from './components/pages/ExampleList';
import { HomePage } from './components/pages/Home';
import { ProfileListPage } from './components/pages/ProfileList';
import { LoginPage } from './components/pages/Login';
import { config } from './utils/oktaConfig';
import { LoadingComponent } from './components/common';
import { ProfileForms } from './components/pages/ProfileForm/';
import { ProfilePages } from './components/pages/ProfilePage/';
import Navbar from './components/pages/Nav/Navbar';
import Header from './components/pages/Nav/Header';
import Footer from './components/pages/Nav/Footer';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById('root')
);

function App() {
  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // React Router has a nifty useHistory hook we can use at this level to ensure we have security around our routes.
  const history = useHistory();

  const authHandler = () => {
    // We pass this to our <Security /> component that wraps our routes.
    // It'll automatically check if userToken is available and push back to login if not :)
    history.push('/login');
  };

  const { Content } = Layout;

  return (
    <div className="app-wrapper">
      <Security {...config} onAuthRequired={authHandler}>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/implicit/callback" component={LoginCallback} />

          {/* any of the routes you need secured should be registered as SecureRoutes */}
          <Layout style={{ minHeight: '100vh' }}>
            <Navbar />
            <Layout>
              <Header />
              <Route exact path="/register-profile" component={ProfileForms} />
              <Route exact path="/profile-page" component={ProfilePages} />

              <Content style={{ padding: 24, minHeight: 360 }}>
                <SecureRoute
                  path="/"
                  exact
                  component={() => (
                    <HomePage LoadingComponent={LoadingComponent} />
                  )}
                />
                <SecureRoute path="/example-list" component={ExampleListPage} />

                <SecureRoute path="/profile-list" component={ProfileListPage} />
              </Content>
              <Footer />
            </Layout>
          </Layout>
        </Switch>
      </Security>
    </div>
  );
}
