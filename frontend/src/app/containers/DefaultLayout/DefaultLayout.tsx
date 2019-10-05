import React, { Component, Suspense } from 'react';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import {
  IDefaultLayoutProps,
  IDefaultLayoutState,
  IRootState,
  IredirectPath,
} from '../../../interfaces';
import { AppRoutes } from '../../../config/AppRoutes';
import routes from '../../../routes/routes';
// sidebar nav config
import navigation from '../../../_nav';
import Loader from '../../components/Loader/Loader';
import {
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
import { profileInfoRequest, redirectTo } from '../../../actions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component<
  IDefaultLayoutProps,
  IDefaultLayoutState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      isAuthenticated: true,
      userDetails: {},
    };
  }

  componentDidMount() {
    console.log('gggggggggggggggggggggggggggg');
    console.log(localStorage.getItem('token'));
    if (!localStorage.getItem('token')) {
      console.log('ggggggggggggggggg');
      this.props.redirectTo({ path: AppRoutes.LOGIN });
    } else {
      console.log('fdfgjdfjgdskfj');
      this.props.profileInfo();
    }
  }

  componentDidUpdate = async (prevProps: RouteComponentProps) => {
    const { location } = this.props;
    const { pathname } = location;
    const { profileInfoReducer } = this.props;
    if (
      prevProps.location.pathname !== pathname &&
      profileInfoReducer &&
      localStorage.getItem('token')
    ) {
      this.props.profileInfo();
    }
  };

  render() {
    return (
      <div className='app'>
        <AppHeader fixed>
          <Suspense fallback={<Loader />}>
            <DefaultHeader {...this.props} />
          </Suspense>
        </AppHeader>
        <div className='app-body'>
          <AppSidebar fixed display='lg'>
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense fallback={<Loader />}>
              <AppSidebarNav navConfig={navigation} {...this.props} isOpen />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className='main'>
            <AppBreadcrumb appRoutes={routes} />
            <Container fluid>
              <Suspense fallback={<Loader />}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                      />
                    ) : null;
                  })}
                  <Redirect from={AppRoutes.MAIN} to={AppRoutes.HOME} />
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={<Loader />}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

const mapStateToProps: any = (state: IRootState) => ({
  loginReducer: state.loginReducer,
  profileInfoReducer: state.profileInfoReducer,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    profileInfo: () => {
      dispatch(profileInfoRequest());
    },
    redirectTo: (data: IredirectPath) => {
      dispatch(redirectTo(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefaultLayout);
