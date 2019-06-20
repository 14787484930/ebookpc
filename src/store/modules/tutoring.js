import types from '../types.js'
import axios from 'axios'
import qs from 'qs'
import BaseConfig from '../.././BaseConfig.js'

const state = {

  tutorings:null,
  page:{
    pageSize:6,
    pageNumber:1
  },
  tutoringTypes:[
    {id:0 ,name:'辅导'},
    {id:1, name:'讲座'}
  ],
  formDate:null
}

const getters = {
  //返回图书列表
  tutorings(state){
    if(state.tutorings == null){
      return null;
    }
    return state.tutorings.page.pageInfo.list;
  },

  //返回总页数
  totalPages_tutoring(state){
    if(state.tutorings == null){
      return null;
    }
    //alert(state.tutorings.page.pageInfo.pages);
    return state.tutorings.page.pageInfo.pages * 10;
  },

  //返回图书类型
  tutoringTypes(state){
    return state.tutoringTypes;
  }
}

const actions = {

  //从服务器加载图书列表
  gettutorings({commit,state}){

    //请求参数的封装
    var data = {
      pageNumber:state.page.pageNumber,
      pageSize:state.page.pageSize,
    }

    data = Object.assign(data, state.formDate);


    axios.post(BaseConfig.BaseUrl.url + 'tutoring/tutorings',qs.stringify(data)).then(resp => {
      commit('get_tutorings',resp);
    })
  },

  //分页刷新
  changeNum({commit,state},currentPage){
    commit('change_num',currentPage);
  },

  //查询条件数据
  changeData({commit,state},fdata){
    commit('change_data',fdata);
  }
}

const mutations = {
  //请求数据列表存于state
  ['get_tutorings'](state,resp){
    state.tutorings = resp.data;
  },

  //分页是选择的页码
  ['change_num'](state,pageNumber){
    state.page.pageNumber = pageNumber;
  },

  //查询条件中的数据
  ['change_data'](state,fdata){
    state.formDate = fdata;
  }

}


export default {

  state,
  getters,
  actions,
  mutations
}
