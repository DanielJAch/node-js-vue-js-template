import Vue from 'vue';
import Router from 'vue-router';
import { omit } from 'lodash';
import routingModule from './store/modules/routing';

function generateRoutes(source = [], routes = []) {
  for (let i = 0, l = source.length; i < l; i += 1) {
    const item = omit(Object.assign({}, source[i]), 'children');

    routes.push(item);

    if (source[i].children) {
      generateRoutes(source[i].children, routes);
    }
  }

  return routes;
}

const routes = generateRoutes(routingModule.state.routes);

routes.push({ path: '*', redirect: { name: 'default' } });

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes
});