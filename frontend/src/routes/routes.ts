import React from 'react';
import { AppRoutes } from '../config';

const Home = React.lazy(() => import('../app/containers/Home'));
const Login = React.lazy(() => import('../app/containers/Auth'));
const MyProfile = React.lazy(() => import('../app/containers/MyProfile'));
const EmailTemplates = React.lazy(() => import('../app/containers/EmailTemplates'));
const AddTemplate = React.lazy(() => import('../app/containers/EmailTemplates/AddTemplate'));
const HomePage = React.lazy(() => import('../app/containers/CMS/HomePage'));
const User = React.lazy(() => import('../app/containers/User'));
const AddUser = React.lazy(() => import('../app/containers/User/AddUser'));
const Faq = React.lazy(() => import('../app/containers/CMS/FAQ'));
const AddFaq = React.lazy(() => import('../app/containers/CMS/FAQ/AddFaq'));

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
  {
    path: AppRoutes.FAQ,
    name: 'Faq',
    component: Faq,
    exact: true
  },
  {
    path: AppRoutes.ADD_FAQ,
    name: 'Add Faq',
    component: AddFaq,
    exact: true
  },
];

export default routes;
