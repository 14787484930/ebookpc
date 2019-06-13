import types from '../types.js'
import axios from 'axios'
import qs from 'qs'
import BaseConfig from '../.././BaseConfig.js'

const state = {

  books:null,
  page:{
    pageSize:3,
    pageNumber:1
  }
}

const getters = {
  books(state){
    if(state.books == null){
      return null;
    }
    return state.books.page.pageInfo.list;
  }
}

const actions = {

  getbooks({commit,state}){

    alert(123);

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
    //alert(123);
    alert(currentPage.valueOf());
    commit('change_num');
  }

}

const mutations = {
  //请求数据列表存于state
  ['get_books'](state,resp){
    state.books = resp.data;
  },

  //分页是选择的页码
  ['change_num'](state,pageNumber){
    //console.log(88888888888888);
    state.page.pageNumber = pageNumber;
  }

}


export default {

  state,
  getters,
  actions,
  mutations
}
