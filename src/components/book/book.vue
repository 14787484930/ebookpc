<template>
  <div>

    <h1>图书内容</h1>

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

    /*data(){
      return
    },*/

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
