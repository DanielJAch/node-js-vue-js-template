import Vue from 'vue';
import Vuex from 'vuex';
import { reject, orderBy, isNil } from 'lodash';
import routing from './modules/routing';

Vue.use(Vuex);

const state = {

};

const getters = {
  menuItems: (state, { isAuthenticated }) => {
    const items = reject(state.routing.routes, route => route.meta.omitFromMenu);

    // TODO: AUTHENTICATION STUFF!!

    // if (isAuthenticated === false) {
    //   const anonymousItems = reject(items, route => route.meta.requiresAuthentication);

    //   forEach(anonymousItems, (item) => {
    //     if (item.children) {
    //       remove(item.children, child => child.meta.requiresAuthentication);
    //     }
    //   });

    //   return anonymousItems;
    // }

    return orderBy(items, (i) => { return isNil(i.meta.ordinal) ? 1000 : i.meta.ordinal; });
  }
};

const actions = {};

const mutations = {};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    routing
  }
});