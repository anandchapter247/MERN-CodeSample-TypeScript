import React, { Suspense } from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import { Store } from 'redux';
import { Router } from 'react-router';
import { AppRoutes } from './config';
import configureStore from './store';

const DefaultLayout = React.lazy(() =>
  import('./app/containers/DefaultLayout/DefaultLayout'),
);
const Login = React.lazy(() => import('./app/containers/Auth'));

const history = createBrowserHistory();
const store: Store = configureStore(history);

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <Router history={history}>
          <Suspense fallback={'Loading..'}>
            <Switch>
              <Suspense fallback={'Loading...'}>
                <Route
                  exact
                  path={AppRoutes.LOGIN}
                  render={props => <Login {...props} />}
                />
                <Route
                  path={AppRoutes.MAIN}
                  render={props => <DefaultLayout {...props} />}
                />
              </Suspense>
            </Switch>
          </Suspense>
        </Router>
      </Provider>
    </>
  );
};

export default App;
