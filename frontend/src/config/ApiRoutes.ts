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

  // Oragnization Module related APIs
  GET_ORGANIZATION: {
    service: '/organization',
    url: '/get-organization',
    method: 'GET',
    authenticate: true,
  },
  ADD_ORGANIZATION: {
    service: '/organization',
    url: '/add-organization',
    method: 'POST',
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
};
