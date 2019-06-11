<template>
  <div id="app">

    <el-container  style="height: 98vh">
      <!--头部-->
      <el-header><span style="font-size: 42px;">西林易市</span></el-header>

      <!--中部-->
      <el-container >

        <!--导航-->
        <el-aside width="200px">

          <el-row class="tac">
            <el-col :span="24">
              <el-menu default-active="1-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
<!--======================================================================================================================-->
                <el-submenu index="1">

                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>基础管理</span>
                  </template>

                  <el-menu-item-group>
                    <el-menu-item index="1-1">图书</el-menu-item>
                  </el-menu-item-group>

                  <el-menu-item-group>
                    <el-menu-item index="1-2">电子</el-menu-item>
                  </el-menu-item-group>

                  <el-menu-item-group>
                    <el-menu-item index="1-3">辅导</el-menu-item>
                  </el-menu-item-group>

                  <el-menu-item-group>
                    <el-menu-item index="1-4">其他</el-menu-item>
                  </el-menu-item-group>

                </el-submenu>

                <el-submenu index="2">

                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>预警管理</span>
                  </template>

                  <el-menu-item-group>
                    <el-menu-item index="2-1">产品预警</el-menu-item>
                  </el-menu-item-group>

                  <el-menu-item-group>
                    <el-menu-item index="2-2">用户预警</el-menu-item>
                  </el-menu-item-group>

                  <el-menu-item-group>
                    <el-menu-item index="2-3">系统预警</el-menu-item>
                  </el-menu-item-group>

                </el-submenu>

                <el-submenu index="3">

                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>消息管理</span>
                  </template>

                  <el-menu-item-group>
                    <el-menu-item index="3-1">定时任务</el-menu-item>
                  </el-menu-item-group>

                </el-submenu>

                <el-submenu index="4">

                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>系统管理</span>
                  </template>

                  <el-menu-item-group>
                    <el-menu-item index="4-1">用户管理</el-menu-item>
                  </el-menu-item-group>

                  <el-menu-item-group>
                    <el-menu-item index="4-2">修改密码</el-menu-item>
                  </el-menu-item-group>

                </el-submenu>

                <el-submenu index="5">

                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>消息推送管理</span>
                  </template>

                  <!--<el-menu-item-group>
                    <el-menu-item index="1-1">图书</el-menu-item>
                  </el-menu-item-group>

                  <el-menu-item-group>
                    <el-menu-item index="1-2">电子</el-menu-item>
                  </el-menu-item-group>

                  <el-menu-item-group>
                    <el-menu-item index="1-3">辅导</el-menu-item>
                  </el-menu-item-group>

                  <el-menu-item-group>
                    <el-menu-item index="1-4">其他</el-menu-item>
                  </el-menu-item-group>-->

                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>

        <!--内容-->
        <el-main>

         <!-- <el-row  >
            <el-col :span="24">

                <el-form :inline="true"  class="demo-form-inline" style="text-align:left">
                  <el-form-item label="图书名称">
                    <el-input  placeholder="图书名称"></el-input>
                  </el-form-item>
                  <el-form-item label="图书类型">
                    <el-select placeholder="图书类型">
                      <el-option label="计算机" value="shanghai"></el-option>
                      <el-option label="文学" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                  </el-form-item>
                </el-form>

            </el-col>
          </el-row>-->

          <el-row :gutter="24" class="tac">
            <template>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column
                label="出版日期"
                width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
              </el-table-column>
              <el-table-column label="书名" width="180">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>姓名: {{ scope.row.name }}</p>
                    <p>住址: {{ scope.row.address }}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.name }}</el-tag>
                    </div>
                  </el-popover>
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
          <el-row :gutter="24" class="tac">
            <el-pagination
              small
              layout="prev, pager, next"
              :total="50">
            </el-pagination>
            </el-row>
          <book></book>

        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>

  import book from "./components/book/book.vue";

  export default {
    data(){
      return {
        tableData: [{
          date: '2019-05-02',
          name: 'Java编程思想',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2019-05-04',
          name: '思修',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2019-05-01',
          name: 'Mysql数据库',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2019-05-03',
          name: 'SpringBoot',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2019-05-03',
          name: 'Mybatis',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2019-05-03',
          name: 'Vue',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2019-05-03',
          name: 'Vue全家桶',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      onSubmit() {
        console.log('submit!');
      }
    },
    components:{
      book
    }
  };
</script>

<style>


  .el-header {
    background-color: #B3C0D1;
    color: #333;
    font: 20px Extra large;
  }

  .el-aside {
    /*background-color: rgba(211, 225, 242, 0.66);*/
    color: #333;
    text-align: center;
  }

  .el-main {
    color: #333;
    text-align: center;
  }
</style>
