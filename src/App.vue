<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
  export default {
    name: 'app',
    methods:{
      ...mapActions([
        'getData',
      ])
    },
    created(){
      this.getData()
    },
    watch:{
      $route(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      }
    }
  }
</script>
<style>
  body {
      font: 14px/1.5 "Helvetica Neue",Helvetica,Arial,"PingFang SC","\5FAE\8F6F\96C5\9ED1","\5b8b\4f53",sans-serif,tahoma;
      background: #fff;
      letter-spacing: 1.5px;
      padding: 0!important;
      overflow: auto!important;
  }
  input{
    outline: none;
  }
  a, a:active, body {
    color: #3C2314;
  }
  .el-popup-parent--hidden .top{
    padding-right: 17px;
  }
  .wrap{
    width: 1162px;
    margin: 98px auto 0;
  }
  .clearfix::after{
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
</style>
