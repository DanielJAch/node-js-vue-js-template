import lazyLoading from './lazyLoading';

export default {
  name: 'home',
  path: '/',
  component: lazyLoading('home'),
  meta: {
    title: 'Home',
    // iconClass: 'fa fa-home',
    requiresAuthentication: false,
    omitFromMenu: true
  }
};