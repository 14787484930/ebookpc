<template>
  <div>
    <h1>辅导内容</h1>
    <p>{{books}}</p>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {

    computed:{
      ...mapGetters([
        'books'
      ])
    },

    //组件加载完后执行的方法
    created:function(){
      this.$store.dispatch('getbooks');
    }
  }

</script>

<style lang="less" scoped>

</style>
