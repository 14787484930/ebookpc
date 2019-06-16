<template>
  <div>

    <h1>图书内容</h1>

   <el-row  >
         <el-col :span="24">

             <el-form :inline="true"  class="demo-form-inline" style="text-align:left">
               <el-form-item label="图书名称">
                 <el-input  placeholder="图书名称" v-model="form.bookName"></el-input>
               </el-form-item>

               <el-form-item label="图书类型">
                 <el-select v-model="form.bookType" clearable placeholder="请选择">
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
                   <el-date-picker type="date" placeholder="选择日期" v-model="form.startTime" style="width: 100%;"></el-date-picker>
                 </el-col>

                 <el-col class="line" :span="2">-</el-col>

                 <el-col :span="11">
                   <el-date-picker type="date" placeholder="选择日期" v-model="form.endTime" style="width: 100%;"></el-date-picker>
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
              <span style="margin-left: 5px">{{ scope.row.bookName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="作者" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 5px">{{ scope.row.author }}</span>
            </template>
          </el-table-column>

          <el-table-column label="图书类型" width="180">
            <template slot-scope="scope">
              <span >{{ toType(scope.row.bookType) }}</span>
            </template>
          </el-table-column>

          <el-table-column label="价格" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 5px">{{ scope.row.bookPrice }}</span>
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
                @click="handleEdit(scope.$index, scope.row)">查看</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

  </div>
</template>

<script>
  import {mapState,mapGetters,mapActions} from 'vuex'
  export default {

    data(){
      return {
        form: {
          bookName: '',
          startTime: '',
          endTime: '',
          bookType: ''
        }
      }
    },

    computed:{
      ...mapGetters({
        list:'books',
        totalPages:'totalPages',
        options:'bookTypes'

    })
     /* ...mapState([
        "page"
      ])*/
    },

    //组件加载完后执行的方法
    beforeCreate:function(){
      this.$store.dispatch('getbooktypes');
    },
    created:function(){
      this.$store.dispatch('getbooks');
    },

    methods: {

     /* ...mapActions(
        //"changeNum"
      ),*/

     //分页
      current_change(currentPage) {
        this.$store.dispatch('changeNum',currentPage);
        this.$store.dispatch('getbooks');
      },

      //搜索
      queryData(){

        //alert(123)
         //将当前页初始化为1
        this.$store.dispatch('changeNum',1);

        //将form赋值给formDate
        this.$store.dispatch('changeData',this.form);

        //调用方法进行搜索
        this.$store.dispatch('getbooks');
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
        //console.log(666);
        var obj = this.options.find(obj =>{
            return obj.id == type;
        });
        return obj.name;
      }


    }
  }

</script>

<style lang="less" scoped>

</style>
