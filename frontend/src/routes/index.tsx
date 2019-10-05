import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  IAppRoutesProps,
  IAppRoutesState,
  IRootState,
  IredirectPath,
} from '../interfaces';
import { showLoader, hideLoader, redirectTo } from '../actions';
import FullPageLoader from '../app/components/Loader/FullPageLoader';
import { AppRoutes } from '../config';

const DefaultLayout = React.lazy(() =>
  import('../app/containers/DefaultLayout/DefaultLayout'),
);
const Login = React.lazy(() => import('../app/containers/Auth'));

class AppRoutesComponent extends Component<IAppRoutesProps, IAppRoutesState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  render() {
    const { mainState } = this.props;
    return (
      <>
        {mainState && mainState.showLoader ? <FullPageLoader /> : null}
        <Switch>
          <Route
            exact
            path={AppRoutes.LOGIN}
            render={props => <Login {...props} {...this.props} />}
          />
          <Route
            path={AppRoutes.MAIN}
            render={props => <DefaultLayout {...props} {...this.props} />}
          />
        </Switch>
      </>
    );
  }
}

const mapStateToProps: any = (state: IRootState) => ({
  mainState: state.mainReducer,
});
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    showLoader: () => {
      dispatch(showLoader());
    },
    hideLoader: () => {
      dispatch(hideLoader());
    },
    redirectTo: (path: IredirectPath) => {
      dispatch(redirectTo(path));
    },
  };
};

/**
 *
 */
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppRoutesComponent);
