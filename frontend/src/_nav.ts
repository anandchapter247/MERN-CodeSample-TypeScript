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
    {
      name: 'CMS',
      icon: 'icon-grid',
      url: AppRoutes.ADD_HOME_PAGE,
      children: [
        {
          name: "Home Page",
          url: AppRoutes.ADD_HOME_PAGE,
          icon: "icon-home",
        },
      ],
    },
  ],
};
