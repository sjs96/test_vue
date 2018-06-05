import Vue from 'vue';
import Vuex from 'vuex';
import state from '../configure/state';
import mutations from './mutations';
Vue.use(Vuex);


export default new Vuex.Store({
  state,mutations
});
