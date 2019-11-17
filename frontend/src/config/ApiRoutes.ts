import { IApiRoutes } from '../interfaces';

export const ApiRoutes: IApiRoutes = {
  ADMIN_LOGIN: {
    service: '/auth',
    url: '/login',
    method: 'POST',
    authenticate: false,
  },
  ADMIN_PROFILE: {
    service: '/auth',
    url: '/details',
    method: 'GET',
    authenticate: true,
  },
  ADMIN_PROFILE_UPDATE: {
    service: '/auth',
    url: '/update',
    method: 'PUT',
    authenticate: true,
  },
  ADMIN_CHANGE_PASSWORD: {
    service: '/auth',
    url: '/change-password',
    method: 'PUT',
    authenticate: true,
  },
  // Proxy Login
  ADMIN_PROXY_LOGIN: {
    service: '/auth',
    url: '/admin-proxy-login',
    method: 'POST',
    authenticate: true,
  },

  // User Module related APIs
  GET_USER: {
    service: '/user',
    url: '/get',
    method: 'GET',
    authenticate: true,
  },
  ADD_USER: {
    service: '/user',
    url: '/add',
    method: 'POST',
    authenticate: true,
  },
  UPDATE_USER: {
    service: '/user',
    url: '/update',
    method: 'PUT',
    authenticate: true,
  },
  VIEW_USER: {
    service: '/user',
    url: '/view',
    method: 'GET',
    authenticate: true,
  },
  UPDATE_USER_STATUS: {
    service: '/user',
    url: '/update-status',
    method: 'PUT',
    authenticate: true,
  },

  // Email Template
  ADD_TEMPLATE: {
    service: '/email-templates',
    url: '/add',
    method: 'POST',
    authenticate: true,
  },
  UPDATE_TEMPLATE: {
    service: '/email-templates',
    url: '/update',
    method: 'put',
    authenticate: true,
  },
  GET_TEMPLATE: {
    service: '/email-templates',
    url: '/get',
    method: 'get',
    authenticate: true,
  },
  VIEW_TEMPLATE: {
    service: '/email-templates',
    url: '/view',
    method: 'get',
    authenticate: true,
  },

  EXPORT_REPORT: {
    service: '/organization',
    url: '/export-report',
    method: 'GET',
    authenticate: true,
  },

    // Home Page
  ADD_HOME_PAGE: {
    service: '/homepage',
    url: '/add',
    method: 'POST',
    authenticate: true,
  },
  VIEW_HOME_PAGE: {
    service: '/homepage',
    url: '/view-homepage',
    method: 'GET',
    authenticate: true,
  },
  UPDATE_HOME_PAGE: {
    service: '/homepage',
    url: '/update-homepage',
    method: 'PUT',
    authenticate: true,
  },
  // Faq Routes
  ADD_FAQ: {
    service: '/faq',
    url: '/add',
    method: 'POST',
    authenticate: true,
  },
  GET_FAQ: {
    service: '/faq',
    url: '/get',
    method: 'GET',
    authenticate: true,
  },
  UPDATE_FAQ_STATUS: {
    service: '/faq',
    url: '/update-status',
    method: 'PUT',
    authenticate: true,
  },
  UPDATE_FAQ: {
    service: '/faq',
    url: '/uodate',
    method: 'PUT',
    authenticate: true,
  },
};
