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
                 <el-select placeholder="图书类型" v-model="form.bookType">
                   <el-option label="计算机" value="shanghai"></el-option>
                   <el-option label="文学" value="beijing"></el-option>
                 </el-select>
               </el-form-item>

               <el-form-item label="活动时间">
                 <el-col :span="11">
                   <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                 </el-col>

                 <el-col class="line" :span="2">-</el-col>

                 <el-col :span="11">
                   <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
                 </el-col>

               </el-form-item>

               <el-form-item>
                 <el-button type="primary" >查询</el-button>
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
              <span style="margin-left: 5px">{{ scope.row.bookType }}</span>
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
              <span style="margin-left: 5px">{{ scope.row.createTime }}</span>
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
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
          type: []
        }
      }
    },

    computed:{
      ...mapGetters({
        list:'books',
        totalPages:'totalPages'

    })
     /* ...mapState([
        "page"
      ])*/
    },

    //组件加载完后执行的方法
    created:function(){
      this.$store.dispatch('getbooks');
    },

    methods: {

     /* ...mapActions(
        //"changeNum"
      ),*/

      current_change(currentPage) {
        this.$store.dispatch('changeNum',currentPage);
        this.$store.dispatch('getbooks');

      }
    }
  }

</script>

<style lang="less" scoped>

</style>
