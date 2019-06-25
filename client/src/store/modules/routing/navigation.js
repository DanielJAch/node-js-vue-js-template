import NavigationComponent from '@/components/navigation';

export default {
  name: 'navigation',
  path: '/navigation',
  component: NavigationComponent,
  meta: {
    title: 'Navigation',
    iconClass: 'fa fa-compass',
    requiresAuthentication: false,
    omitFromMenu: false
  }
};