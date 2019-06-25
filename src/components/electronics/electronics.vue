<template>
  <div>

    <h1>电子内容</h1>

    <el-row  >
      <el-col :span="24">

        <el-form :inline="true"  class="demo-form-inline" style="text-align:left">
          <el-form-item label="电子名称">
            <el-input  placeholder="电子名称" v-model="form.electronicsName"></el-input>
          </el-form-item>

          <el-form-item label="电子类型">
            <el-select v-model="form.electronicsType" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="活动时间">
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

          <el-table-column label="书名" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 5px">{{ scope.row.electronicsName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="电子类型" width="180">
            <template slot-scope="scope">
              <span >{{ toType(scope.row.electronicsType) }}</span>
              <!--<span >{{ scope.row.bookType}}</span>-->
            </template>
          </el-table-column>

          <el-table-column label="原价" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 5px">{{ scope.row.originalPrice }}</span>
            </template>
          </el-table-column>

          <el-table-column label="现价" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 5px">{{ scope.row.presentPrice }}</span>
            </template>
          </el-table-column>

          <el-table-column label="发布日期" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 5px">{{toDate(scope.row.createTime , 'yyyy-MM-dd HH:mm',false)}}</span>
            </template>
          </el-table-column>

          <el-table-column label="微信" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 5px">{{ scope.row.weiXin }}</span>
            </template>
          </el-table-column>

          <el-table-column label="电话" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 5px">{{ scope.row.phone }}</span>
            </template>
          </el-table-column>

          <el-table-column label="浏览次数" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 5px">{{ scope.row.viewTimes }}</span>
            </template>
          </el-table-column>


          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row)">查看</el-button>
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
        :total="totalPages_ele"
        @current-change="current_change">
      </el-pagination>
    </el-row>

    <!--弹出框-->
    <!--<el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>-->

    <el-dialog title="电子详情" :visible.sync="dialogFormVisible" style="float: left">

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
        <el-col :span="8" :offset="4"><div>电子名称</div></el-col>
        <el-col :span="11"><div style="float: left">{{electronicsInfo.electronicsName}}</div></el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8" :offset="4"><div>是否有发票</div></el-col>
        <el-col :span="11"><div style="float: left">{{hasInvoice(electronicsInfo.hasInvoice)}}</div></el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8" :offset="4"><div>类型</div></el-col>
        <el-col :span="11"><div style="float: left">{{electronicsInfo.electronicsType}}</div></el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8" :offset="4"><div>原价</div></el-col>
        <el-col :span="11"><div style="float: left">{{electronicsInfo.originalPrice}}</div></el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8" :offset="4"><div>现价</div></el-col>
        <el-col :span="11"><div style="float: left">{{electronicsInfo.presentPrice}}</div></el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8" :offset="4"><div>购买日期</div></el-col>
        <el-col :span="11"><div style="float: left">{{toDate(electronicsInfo.buyDate , 'yyyy-MM-dd HH:mm',false)}}</div></el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8" :offset="4"><div>发布日期</div></el-col>
        <el-col :span="11"><div style="float: left">{{toDate(electronicsInfo.createTime , 'yyyy-MM-dd HH:mm',false)}}</div></el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8" :offset="4"><div>微信</div></el-col>
        <el-col :span="11"><div style="float: left">{{electronicsInfo.weiXin}}</div></el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8" :offset="4"><div>联系电电话</div></el-col>
        <el-col :span="11"><div style="float: left">{{electronicsInfo.phone}}</div></el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8" :offset="4"><div>浏览次数</div></el-col>
        <el-col :span="11"><div style="float: left">{{electronicsInfo.viewTimes}}</div></el-col>
      </el-row>

    </el-dialog>

    <!--确认消息-->
    <!--<el-button type="text" @click="open">点击打开 Message Box</el-button>-->

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
          electronicsName: '',
          startTime: '',
          endTime: '',
          electronicsType: ''
        },
        dialogFormVisible:false,
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
        pics:[]
      }
    },

    computed:{
      ...mapGetters({
        list:'electronics',
        totalPages_ele:'totalPages_ele',
        options:'electronicsTypes'

      })
      /* ...mapState([
         "page"
       ])*/
    },

    //组件加载完后执行的方法
    beforeCreate:function(){
      this.$store.dispatch('getelectronicsTypes');
    },
    created:function(){
      this.$store.dispatch('getelectronics');
    },

    methods: {

      /* ...mapActions(
         //"changeNum"
       ),*/

      //分页
      current_change(currentPage) {
        this.$store.dispatch('changeNum',currentPage);
        this.$store.dispatch('getelectronics');
      },

      //搜索
      queryData(){

        //alert(123)
        //将当前页初始化为1
        this.$store.dispatch('changeNum',1);

        //将form赋值给formDate
        this.$store.dispatch('changeData',this.form);

        //调用方法进行搜索
        this.$store.dispatch('getelectronics');
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

      //电子类型转换
      toType(type){

        //console.log(666);
        if(this.options == null){
          return;
        }
        var obj = this.options.find(obj =>{
          return obj.id == type;
        });
        return obj.name;
      },

      hasInvoice(type){
        if(type === 1){
          return '有';
        }
        if(type === 0){
          return '没有'
        }
      },

      //查看详情
      handleEdit(row){

        this.electronicsInfo = row;

        var pic = row.electronicsPic.split(',');
        this.pics = [];
        for(var index in pic){
          this.pics[index] = baseConfig.BaseUrl.picUrl + pic[index];
        }
        this.dialogFormVisible = true;
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
          }
          //console.log(data);
          axios.post(baseConfig.BaseUrl.url + 'electronics/delete',qs.stringify(data)).then(resp => {
            //进项数据刷新
            this.$store.dispatch('getelectronics');
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
