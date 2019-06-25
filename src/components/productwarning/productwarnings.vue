<template>
  <div>

    <h1>产品预警内容</h1>

    <el-row  >
      <el-col :span="24">

        <el-form :inline="true"  class="demo-form-inline" style="text-align:left">
          <el-form-item label="商品名称">
            <el-input  placeholder="商品名称" v-model="form.productName"></el-input>
          </el-form-item>

          <el-form-item label="举报类型">
            <el-select v-model="form.reportType" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="发布时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.startTime" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
            </el-col>

            <el-col class="line" :span="2">-</el-col>

            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.endTime" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
            </el-col>

          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="queryData">查询</el-button>
          </el-form-item>

        </el-form>
      </el-col>
    </el-row>

    <el-row :gutter="24" class="tac">
      <template>
        <el-table :data="list" style="width: 100%">

          <el-table-column label="商品名称" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 5px">{{ scope.row.productName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="商品类型" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 5px">{{ toProductType(scope.row.productType) }}</span>
            </template>
          </el-table-column>

          <el-table-column label="举报类型" width="180">
            <template slot-scope="scope">
              <span >{{ toType(scope.row.reportType) }}</span>
              <!--<span >{{ scope.row.reportType}}</span>-->
            </template>
          </el-table-column>

          <el-table-column label="举报人" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 5px">{{ scope.row.weiXin }}</span>
            </template>
          </el-table-column>

          <el-table-column label="发布日期" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 5px">{{toDate(scope.row.createTime , 'yyyy-MM-dd HH:mm',false)}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                plain
                @click="handleEdit(scope.row)">查看举报</el-button>
              <el-button
                size="mini"
                type="success"
                @click="viewProduct(scope.row)">查看商品</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.row)">处理</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
      </template>
    </el-row>

    <el-row :gutter="24" class="tac" style="margin-top: 20px;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalPages"
        @current-change="current_change">
      </el-pagination>
    </el-row>

    <!--弹出框-->
    <!--<el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>-->

    <el-dialog title="举报详情" :visible.sync="dialogFormVisible" style="float: left">

      <el-row :gutter="24" style="margin-top: 30px">
        <el-col :span="8" :offset="4"><div>商品名称</div></el-col>
        <el-col :span="11"><div style="float: left">{{productwarnings.productName}}</div></el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8" :offset="4"><div>商品类型</div></el-col>
        <el-col :span="11"><div style="float: left">{{productwarnings.productType}}</div></el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8" :offset="4"><div>举报类型</div></el-col>
        <el-col :span="11"><div style="float: left">{{productwarnings.reportType}}</div></el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8" :offset="4"><div>举报人</div></el-col>
        <el-col :span="11"><div style="float: left">{{productwarnings.weiXin}}</div></el-col>
      </el-row>

    </el-dialog>

   <!--图书详情-->
    <el-dialog title="图书详情" :visible.sync="bookflag" style="float: left">

      <el-row :gutter="24">
        <el-col :span="18" :offset="3">
          <el-carousel :interval="5000" arrow="always">
            <el-carousel-item v-for="item in pics" :key="item">
              <div class="block">
                <el-image :src="item"></el-image>
              </div>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>

      <el-row :gutter="24" style="margin-top: 30px">
        <el-col :span="8" :offset="4"><div>图书名称</div></el-col>
        <el-col :span="11"><div style="float: left">{{bookInfo.bookName}}</div></el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8" :offset="4"><div>作者</div></el-col>
        <el-col :span="11"><div style="float: left">{{bookInfo.author}}</div></el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8" :offset="4"><div>类型</div></el-col>
        <el-col :span="11"><div style="float: left">{{bookInfo.bookType}}</div></el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8" :offset="4"><div>价格</div></el-col>
        <el-col :span="11"><div style="float: left">{{bookInfo.bookPrice}}</div></el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8" :offset="4"><div>发布日期</div></el-col>
        <el-col :span="11"><div style="float: left">{{toDate(bookInfo.createTime , 'yyyy-MM-dd HH:mm',false)}}</div></el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8" :offset="4"><div>微信</div></el-col>
        <el-col :span="11"><div style="float: left">{{bookInfo.weiXin}}</div></el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8" :offset="4"><div>联系电电话</div></el-col>
        <el-col :span="11"><div style="float: left">{{bookInfo.phone}}</div></el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8" :offset="4"><div>浏览次数</div></el-col>
        <el-col :span="11"><div style="float: left">{{bookInfo.viewTimes}}</div></el-col>
      </el-row>

    </el-dialog>

  </div>
</template>

<script>
  import {mapState,mapGetters,mapActions} from 'vuex'
  import baseConfig from '../.././BaseConfig.js'
  import axios from 'axios'
  import qs from 'qs'
  export default {

    data(){
      return {
        form: {
          bookName: '',
          startTime: '',
          endTime: '',
          reportType: ''
        },
        dialogFormVisible:false,
        bookflag:false,
        productwarnings:{
          productName:'',
          productType:'',
          reportType:'',
          weiXin:'',
          des:'',
          createTime:'',
        },
        bookInfo:{
          bookName:'',
          bookType:'',
          bookPrice:'',
          weiXin:'',
          phone:'',
          createTime:'',
          viewTimes:''
        },
        electronicsInfo:{
          electronicsName:'',
          electronicsType:'',
          originalPrice:'',
          presentPrice:'',
          buyDate:'',
          hasInvoice:'',
          weiXin:'',
          phone:'',
          createTime:'',
          viewTimes:''
        },
        tutoringInfo:{
          name:'',
          type:'',
          price:'',
          startTime:'',
          endTime:'',
          place:'',
          weiXin:'',
          phone:'',
          createTime:'',
          viewTimes:''
        },
        pics:[]
      }
    },

    computed:{
      ...mapGetters({
        list:'productwarnings',
        totalPages:'totalPages_report',
        options:'reportTypes'

      })
      /* ...mapState([
         "page"
       ])*/
    },

    //组件加载完后执行的方法
    beforeCreate:function(){
      this.$store.dispatch('getreporttypes');
    },
    created:function(){
      this.$store.dispatch('getproductwarnings');
    },

    methods: {

      /* ...mapActions(
         //"changeNum"
       ),*/

      //分页
      current_change(currentPage) {
        //console.log(123);
        this.$store.dispatch('changeNum',currentPage);
        this.$store.dispatch('getproductwarnings');
      },

      //搜索
      queryData(){

        //alert(123)
        //将当前页初始化为1
        this.$store.dispatch('changeNum',1);

        //将form赋值给formDate
        this.$store.dispatch('changeData',this.form);

        //调用方法进行搜索
        this.$store.dispatch('getproductwarnings');
        //console.log(this.$store.state)
      },

      //日期转换
      toDate(value, formatString, isString) {
        if (value === undefined || value == null || value.length === 0)
          return value;

        if (typeof (value) === "object") {
          value = value.toString();
        }

        if (formatString === undefined || formatString == null || formatString.length === 0)
          formatString = "yyyy-MM-dd";
        value=value.toString();
        var ret = '', d = "";
        if (value.indexOf("/Date(") > -1 || value.indexOf(")/") > -1||parseInt(value)>0) {  // 时间戳格式
          value = value.replace("/Date(", "").replace(")/", "");
          d = new Date(parseInt(value, 10));
        } else { // 普通字符串格式
          d = new Date(value);
        }

        var second = '' + d.getSeconds(),
          minutes = '' + d.getMinutes(),
          hours = '' + d.getHours(),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        if (hours.length < 2) hours = '0' + hours;
        if (minutes.length < 2) minutes = '0' + minutes;
        if (second.length < 2) second = '0' + second;
        if (formatString === 'yyyy-MM-dd HH:mm:ss')
          ret = [year, month, day].join('-') + " " + [hours, minutes, second].join(':');
        else if (formatString === 'yyyy-MM-dd HH:mm')
          ret = [year, month, day].join('-') + " " + [hours, minutes].join(':');
        else if (formatString === 'MM-dd')
          ret = [month, day].join('-');
        else if (formatString === 'HH:mm')
          ret = [hours, minutes].join(':');
        else if (formatString === 'MM-dd HH:mm') {
          if (isString && value.length <= 10) {
            ret = [month, day].join('-');
          }
          else {
            ret = [month, day].join('-') + " " + [hours, minutes].join(':');
          }
        } else
          ret = [year, month, day].join('-');

        return ret;
      },

      //图书类型转换
      toType(type){
        if(this.options == null){
          return;
        }
        var obj = this.options.find(obj =>{
          return obj.id == type;
        });
        return obj.name;
      },

      //商品类型
      toProductType(type){
        switch (type){
          case 1: {
            //图书
            return '图书';
          }
          case 2:{
            //电子
            return '电子';
          }
          case 3:{
            //其他
            return '其他';
          }
          return type;
        }
      },

      //查看举报详情
      handleEdit(row){

        this.productwarnings = row;
        this.dialogFormVisible = true;
      },

      //查看商品详情
      viewProduct(row){

        var flag = row.productType;
        //alert(row.productId);
        switch (flag){
          case 1: {
            //图书 加载图书信息
            //this.$store.dispatch('getProduct','book/getById/' + row.productId);
            //this.bookInfo = this.$store.state.productInfo
            this.bookflag = true;
            break;
          }
          case 2:{
            //电子
            break;
          }
          case 3:{
            //其他
            break;
          }

        }
      },

      //删除
      handleDelete(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {

          //调用方法进行删除
          var data = {
            id:row.id
          };
          axios.post(baseConfig.BaseUrl.url + 'book/delete',qs.stringify(data)).then(resp => {
            //进项数据刷新
            this.$store.dispatch('getbooks');
            //提示消息
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(function (error) {
            this.$message({
              type: 'info',
              message: '删除失败!'
            });
          })
        })
      }

    }
  }

</script>

<style lang="less" scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
