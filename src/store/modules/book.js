import types from '../types.js'
import axios from 'axios'

const state = {

  books:{}
}

const getters = {
  books(state){
    //console.log(state.books);
    return state.books;
  }
}

const actions = {

  getbooks({commit,state}){
    axios.get('http://localhost:8080/book/books?pageNumber=1&pageSize=2&flag=1').then(resp => {
      console.log(resp);
      commit('get_books',resp);
    })
  }
}

const mutations = {
  ['get_books'](state,resp){
    state.books = resp.data;
    console.log(state.books);
  }
}


export default {

  state,
  getters,
  actions,
  mutations
}
