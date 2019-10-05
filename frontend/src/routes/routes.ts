import React from 'react';
import { AppRoutes } from '../config';
import Organization from '../app/containers/Organization';

const Home = React.lazy(() => import('../app/containers/Home'));
const Login = React.lazy(() => import('../app/containers/Auth'));
const MyProfile = React.lazy(() => import('../app/containers/MyProfile'));

const routes = [
  { path: AppRoutes.MAIN, exact: true, name: 'Home' },
  {
    path: AppRoutes.HOME,
    name: 'Dashboard',
    component: Home,
    exact: true,
  },
  {
    path: AppRoutes.LOGIN,
    name: '',
    component: Login,
    exact: true,
  },
  {
    path: AppRoutes.MY_PROFILE,
    name: 'Profile',
    component: MyProfile,
    exact: true,
  },
  {
    path: AppRoutes.ORGANIZATION,
    name: 'Organization',
    component: Organization,
    exact: true,
  },
];

export default routes;
