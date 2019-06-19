import types from '../types.js'
import axios from 'axios'
import qs from 'qs'
import BaseConfig from '../.././BaseConfig.js'

const state = {

  electronics:null,
  page:{
    pageSize:6,
    pageNumber:1
  },
  electronicsTypes:null,
  formDate:null
}

const getters = {
  //返回图书列表
  electronics(state){
    if(state.electronics == null){
      return null;
    }
    return state.electronics.page.pageInfo.list;
  },

  //返回总页数
  totalPages_ele(state){
    if(state.electronics == null){
      return null;
    }
    //alert(state.electronics.page.pageInfo.pages);
    return state.electronics.page.pageInfo.pages * 10;
  },

  //返回图书类型
  electronicsTypes(state){
    if(state.electronicsTypes == null){
      //alert('为空！');
      return null;
    }
    return state.electronicsTypes.electronicsType;
  }
}

const actions = {

  //从服务器加载图书列表
  getelectronics({commit,state}){

    //请求参数的封装
    var data = {
      pageNumber:state.page.pageNumber,
      pageSize:state.page.pageSize,
    }

    data = Object.assign(data, state.formDate);

    //console.log("============================="+data);

    axios.post(BaseConfig.BaseUrl.url + 'electronics/electronics',qs.stringify(data)).then(resp => {
      commit('get_electronics',resp);
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

  //从服务器加载电子类型
  getelectronicsTypes({commit,state}){

    axios.post(BaseConfig.BaseUrl.url + 'electronicstype/electronicsTypes').then(resp => {
      console.log(resp.data);
      commit('get_electronicsTypes',resp);
    })

  }


}

const mutations = {
  //请求数据列表存于state
  ['get_electronics'](state,resp){
    state.electronics = resp.data;
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
  ['get_electronicsTypes'](state,resp){
    state.electronicsTypes = resp.data.page;
  }

}


export default {

  state,
  getters,
  actions,
  mutations
}
