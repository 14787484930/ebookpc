import types from '../types.js'
import axios from 'axios'
import qs from 'qs'
import BaseConfig from '../.././BaseConfig.js'

const state = {

  others:null,
  page:{
    pageSize:6,
    pageNumber:1
  },
  formDate:null
}

const getters = {
  //返回图书列表
  others(state){
    if(state.others == null){
      return null;
    }
    return state.others.page.pageInfo.list;
  },

  //返回总页数
  totalPages_other(state){
    if(state.others == null){
      return null;
    }
    //alert(state.others.page.pageInfo.pages);
    return state.others.page.pageInfo.pages * 10;
  }
}

const actions = {

  //从服务器加载图书列表
  getothers({commit,state}){

    //请求参数的封装
    var data = {
      pageNumber:state.page.pageNumber,
      pageSize:state.page.pageSize,
    }

    data = Object.assign(data, state.formDate);

    //console.log("============================="+data);

    axios.post(BaseConfig.BaseUrl.url + 'other/others',qs.stringify(data)).then(resp => {
      commit('get_others',resp);
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
  ['get_others'](state,resp){
    state.others = resp.data;
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
  ['get_othertypes'](state,resp){
    state.otherTypes = resp.data.page;
  }

}


export default {

  state,
  getters,
  actions,
  mutations
}
