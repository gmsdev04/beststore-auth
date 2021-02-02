import Vue from 'vue';
import Vuex from 'vuex';

import Cadastro from './modules/cadastro'


Vue.use(Vuex);

export default new Vuex.Store({
  modules:{ Cadastro }
});
