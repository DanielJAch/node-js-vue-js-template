import HomeComponent from '@/components/home';

export default {
  name: 'home',
  path: '/',
  component: HomeComponent,
  meta: {
    title: 'Home',
    iconClass: 'fa fa-home',
    requiresAuthentication: false,
    omitFromMenu: false
  }
};