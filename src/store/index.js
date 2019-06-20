import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import getters from './getters.js'
import book from './modules/book.js'
import electronics from './modules/electronics.js'
import other from './modules/other.js'
import tutoring from './modules/tutoring.js'
import productwarning from '/node_modules/productwarning.js'


Vue.use(Vuex);


export default new Vuex.Store({
  actions,
  getters,
  modules:{
    book,
    electronics,
    other,
    tutoring
  }
})
