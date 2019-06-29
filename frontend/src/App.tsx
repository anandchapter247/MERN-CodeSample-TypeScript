import React, { Suspense } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import configureStore from "./store";
import { Store } from "redux";
import { Router } from "react-router";
import { Container } from "react-bootstrap";

const AppRoutes = React.lazy(() => import("./routes"));

const history = createBrowserHistory();
const store: Store = configureStore(history);

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <Container fluid>
          <Router history={history}>
            <Suspense fallback={"Loading.."}>
              <AppRoutes />
            </Suspense>
          </Router>
        </Container>
      </Provider>
    </>
  );
};

export default App;
