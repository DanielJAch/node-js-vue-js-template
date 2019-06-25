import Vue from 'vue';
import Vuex from 'vuex';
import { reject, orderBy, isNil } from 'lodash';
import routing from './modules/routing';

Vue.use(Vuex);

const exportState = {

};

const getters = {
  menuItems: (state) => {
    const items = reject(state.routing.routes, (route) => route.meta.omitFromMenu);

    return orderBy(items, (i) => { return isNil(i.meta.ordinal) ? 1000 : i.meta.ordinal; });
  }
};

const actions = {};

const mutations = {};

export default new Vuex.Store({
  state: exportState,
  getters,
  actions,
  mutations,
  modules: {
    routing
  }
});