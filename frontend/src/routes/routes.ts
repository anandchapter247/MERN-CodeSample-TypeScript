import React from 'react';
import { AppRoutes } from '../config';
import AddTemplate from '../app/containers/EmailTemplates/AddTemplate';
import EmailTemplates from '../app/containers/EmailTemplates';
import HomePage from '../app/containers/CMS/HomePage';
import User from '../app/containers/User';
import AddUser from '../app/containers/User/AddUser';

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
    path: AppRoutes.USER,
    name: 'User',
    component: User,
    exact: true,
  },
  {
    path: AppRoutes.ADD_USER,
    name: 'Add User',
    component: AddUser,
    exact: true,
  },
  {
    path: AppRoutes.EDIT_USER,
    name: 'Update User',
    component: AddUser,
    exact: true,
  },
  {
    path: AppRoutes.EMAILTEMPLATE,
    name: 'Email Template',
    component: EmailTemplates,
    exact: true,
  },
  {
    path: AppRoutes.ADD_TEMPLATE,
    name: 'Add Template',
    component: AddTemplate,
    exact: true,
  },
  {
    path: AppRoutes.EDIT_TEMPLATE,
    name: 'Update Template',
    component: AddTemplate,
    exact: true,
  },
  {
    path: AppRoutes.ADD_HOME_PAGE,
    name: 'Home Page',
    component: HomePage,
    exact: true
  },
];

export default routes;
