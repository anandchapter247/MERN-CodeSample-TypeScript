import { AppRoutes } from './config';

export default {
  items: [
    {
      name: 'Dashboard',
      url: AppRoutes.HOME,
      icon: 'fa fa-dashboard',
    },
    {
      name: 'Users',
      icon: 'fa fa-users',
      url: AppRoutes.ORGANIZATION,
    },
    {
      name: 'Email Templates',
      icon: 'fa fa-envelope',
      url: AppRoutes.EMAILTEMPLATE,
    },
  ],
};
