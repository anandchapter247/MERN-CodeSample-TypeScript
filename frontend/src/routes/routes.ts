import React from 'react';
import { AppRoutes } from '../config';

const Home = React.lazy(() => import('../app/containers/Home'));

const routes = [
  { path: AppRoutes.MAIN, exact: true, name: 'Home' },
  {
    path: AppRoutes.HOME,
    name: '/',
    component: Home,
    exact: true,
  },
];

export default routes;
