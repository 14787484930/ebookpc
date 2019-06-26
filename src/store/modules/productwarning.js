import types from '../types.js'
import axios from 'axios'
import qs from 'qs'
import BaseConfig from '../.././BaseConfig.js'

const state = {

  productwarnings:null,
  productInfo:null,
  page:{
    pageSize:6,
    pageNumber:1
  },
  reportTypes:null,
  formDate:null
}

const getters = {
  //返回图书列表
  productwarnings(state){
    if(state.productwarnings == null){
      return null;
    }
    return state.productwarnings.page.pageinfo.list;
  },

  //返回总页数
  totalPages_report(state){
    if(state.productwarnings == null){
      return null;
    }
    //alert(state.productwarnings.page.pageInfo.pages);
    return state.productwarnings.page.pageinfo.pages * 10;
  },

  //返回图书类型
  reportTypes(state){
    if(state.reportTypes == null){
      //alert('为空！');
      return null;
    }
    return state.reportTypes.pageinfo;
  },

  //返回图书信息
  productInfo(state){
    if(state.bookInfo == null){
      return null;
    }
    return state.bookInfo;
  },
}

const actions = {

  //从服务器加载图书列表
  getproductwarnings({commit,state}){

    //请求参数的封装
    var data = {
      pageNumber:state.page.pageNumber,
      pageSize:state.page.pageSize,
    }

    data = Object.assign(data, state.formDate);
    axios.post(BaseConfig.BaseUrl.url + 'reportproduct/reportproducts',qs.stringify(data)).then(resp => {
      commit('get_productwarnings',resp);
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
  getreporttypes({commit,state}){

    axios.post(BaseConfig.BaseUrl.url + 'reporttype/reporttypeinfo').then(resp => {
      commit('get_reporttypes',resp);
    })

  },
  //获取商品详情
  getProduct({commit,state},productUsrl){

    //console.log(BaseConfig.BaseUrl.url + productUsrl);

    axios.post(BaseConfig.BaseUrl.url + productUsrl).then(resp => {
      commit('get_product',resp);
    })

  },

  //删除操作
  /*delete({commit,state},bookId){

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
  },*/



}

const mutations = {
  //请求数据列表存于state
  ['get_productwarnings'](state,resp){
    state.productwarnings = resp.data;

    //console.log("==========================" + state.productwarnings);
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
  ['get_reporttypes'](state,resp){
    state.reportTypes = resp.data.page;
    //console.log(state.reportTypes);
  },

  //保存加载出来的图书类型存于store中
  ['get_product'](state,resp){
    state.productInfo = resp.data.page.info;
  }

}


export default {

  state,
  getters,
  actions,
  mutations
}
