import types from '../types.js'
import axios from 'axios'
import qs from 'qs'
import BaseConfig from '../.././BaseConfig.js'

const state = {

  books:null,
  page:{
    pageSize:6,
    pageNumber:1
  }
}

const getters = {
  books(state){
    if(state.books == null){
      return null;
    }
    return state.books.page.pageInfo.list;
  },
  totalPages(state){
    if(state.books == null){
      return null;
    }
    //alert(state.books.page.pageInfo.pages);
    return state.books.page.pageInfo.pages * 10;
  }
}

const actions = {

  getbooks({commit,state}){

    //alert(123);

    //请求参数的封装
    var data = {
      pageNumber:state.page.pageNumber,
      pageSize:state.page.pageSize
    }

    axios.post(BaseConfig.BaseUrl.url + 'book/books',qs.stringify(data)).then(resp => {
      commit('get_books',resp);
    })
  },

  changeNum({commit,state},currentPage){
    commit('change_num',currentPage);
  }

}

const mutations = {
  //请求数据列表存于state
  ['get_books'](state,resp){
    state.books = resp.data;
  },

  //分页是选择的页码
  ['change_num'](state,pageNumber){
    state.page.pageNumber = pageNumber;
  }

}


export default {

  state,
  getters,
  actions,
  mutations
}
