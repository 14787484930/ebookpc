<template>
  <div id="app">

    <el-container  style="height: 98vh">
      <!--头部-->
      <el-header><span style="font-size: 42px;">啦啦啦</span></el-header>

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
                    <router-link to="/books"><el-menu-item index="1-1">图书</el-menu-item></router-link>
                  </el-menu-item-group>

                  <el-menu-item-group>
                    <router-link to="/electronics"><el-menu-item index="1-2">电子</el-menu-item></router-link>
                  </el-menu-item-group>

                  <el-menu-item-group>
                    <router-link to="/tutorings"><el-menu-item index="1-3">辅导</el-menu-item></router-link>
                  </el-menu-item-group>

                  <el-menu-item-group>
                    <router-link to="/others"><el-menu-item index="1-4">其他</el-menu-item></router-link>
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

                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>

        <!--内容-->
        <el-main>
          <router-view></router-view>


        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>

  import book from "./components/book/book.vue";

  export default {
    /*data(){
      return '';
    },*/
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

  }
</style>/*text-align: center;*/
