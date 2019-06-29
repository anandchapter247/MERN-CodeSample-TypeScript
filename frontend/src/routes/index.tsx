import React, { Component, Suspense } from "react";
import { Switch, Route } from "react-router";
import { IAppRoutesProps, IAppRoutesState, IRootState } from "../interfaces";
import { connect } from "react-redux";
const HomeComponent = React.lazy(() => import("../app/containers/Home"));

class AppRoutes extends Component<IAppRoutesProps, IAppRoutesState> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: ""
    };
  }
  render() {
    return (
      <Switch>
        <Suspense fallback={"Loading..."}>
          <Route path={"/"} component={HomeComponent} />
        </Suspense>
      </Switch>
    );
  }
}
const mapStateToProps: any = (state: IRootState) => ({
  loginReducer: state.loginReducer
});

/**
 *
 */
export default connect(mapStateToProps)(AppRoutes);
