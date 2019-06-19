/*
import types from '../types.js'
import axios from 'axios'
import qs from 'qs'
import BaseConfig from '../.././BaseConfig.js'

const state = {

  books:null,
  page:{
    pageSize:6,
    pageNumber:1
  },
  bookTypes:null,
  formDate:null
}

const getters = {
  //返回图书列表
  books(state){
    if(state.books == null){
      return null;
    }
    return state.books.page.pageInfo.list;
  },

  //返回总页数
  totalPages(state){
    if(state.books == null){
      return null;
    }
    //alert(state.books.page.pageInfo.pages);
    return state.books.page.pageInfo.pages * 10;
  },

  //返回图书类型
  bookTypes(state){
    if(state.bookTypes == null){
      //alert('为空！');
      return null;
    }
    return state.bookTypes.booktypes;
  }
}

const actions = {

  //从服务器加载图书列表
  getbooks({commit,state}){

    //请求参数的封装
    var data = {
      pageNumber:state.page.pageNumber,
      pageSize:state.page.pageSize,
    }

    data = Object.assign(data, state.formDate);

    //console.log("============================="+data);

    axios.post(BaseConfig.BaseUrl.url + 'book/books',qs.stringify(data)).then(resp => {
      commit('get_books',resp);
    })
  },

  //分页刷新
  changeNum({commit,state},currentPage){
    commit('change_num',currentPage);
  },

  //查询条件数据
  changeData({commit,state},fdata){
    commit('change_data',fdata);
  },

  //从服务器加载图书类型
  getbooktypes({commit,state}){

    axios.post(BaseConfig.BaseUrl.url + 'booktype/booktypes').then(resp => {
      //console.log(resp.data);
      commit('get_booktypes',resp);
    })

  },

  //删除操作
  /!*delete({commit,state},bookId){

    //请求参数的封装
    var data = {
      id:bookId
    }
    console.log("============================="+bookId);

    axios.post(BaseConfig.BaseUrl.url + 'book/aaa',qs.stringify(data)).then(resp => {
      //return true;
    }).catch(function (error) {
      //return false;
    })
    return true;
  },*!/



}

const mutations = {
  //请求数据列表存于state
  ['get_books'](state,resp){
    state.books = resp.data;
  },

  //分页是选择的页码
  ['change_num'](state,pageNumber){
    state.page.pageNumber = pageNumber;
  },

  //查询条件中的数据
  ['change_data'](state,fdata){
    state.formDate = fdata;
  },

  //保存加载出来的图书类型存于store中
  ['get_booktypes'](state,resp){
    state.bookTypes = resp.data.page;
  }

}


export default {

  state,
  getters,
  actions,
  mutations
}
*/
