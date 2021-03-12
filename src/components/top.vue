<template>
  <div class="top" :class="{'fixed':fixed}">
    <div class="wrap">
      <h1>
        <a href="javascript:;"></a>
      </h1>
      <el-menu
          :default-active="activeIndex" router
          class="el-menu-demo" active-text-color="#C8B49B" text-color="#3C2314"
          mode="horizontal">
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/cake">蛋糕</el-menu-item>
          <el-menu-item index="/tea">下午茶</el-menu-item>
          <el-menu-item index="/food">精选食材</el-menu-item>
          <el-menu-item index="/activity">最新活动</el-menu-item>
          <el-menu-item index="/prefecture">企业专区</el-menu-item>
      </el-menu>
      <div class="login_wrap">
          <p v-if="!username">
            <a href="/login">登录</a>
            |
            <a href="/register">注册</a>
          </p>
          <p class="user" v-else>{{username}}
            <el-button  style="color:#C8B49B" type="text" @click="out">退出</el-button>
          </p>
          <i @click="shopShow">
            <em>{{count}}</em>
          </i>
          <div class="shopBagPop" :class="{'hidden':hidden}">
            <ul v-if="shoppingCart.length">
              <li v-for="(item,index) in shoppingCart" :key="index" class="clearfix">
                <img :src="item.shopImg" alt="">
                <div class="shop_right">
                  <div class="shop_top">
                    <p>{{item.title}}</p>
                    <span class="price">{{item.price.split('/')[0]}}</span>
                  </div>
                  <div>
                    <p class="item_num">
                      <i class="down_num" @click="changeNum(item.title,-1)"></i>
                      <span>{{item.num}}</span>
                      <i class="up_num" @click="changeNum(item.title,1)"></i>
                    </p>
                    <el-button class="del" type="text" @click="changeNum(item.title,0)">删除</el-button>
                  </div>
                </div>
              </li>
            </ul>
            <p v-else style="padding:20px 0 20px 20px;height:98px;width:400px;margin:0">
              购物袋中还没有商品，赶紧选购吧!
            </p>
            <div class="check_btn">
              <p @click="jump2()">立即结算</p>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "top",
  props:{
    fixed: {
      type: Boolean
    }
  },
  data() {
    return {
      activeIndex: this.$route.fullPath,
      hidden: true,
      username: window.localStorage.username
    };
  },
  mounted(){
    document.addEventListener('click',e=>{
      if(!this.$el.contains(e.target)){
          this.hidden=true 
      }
    })
  },
  methods:{
    shopShow(){
      this.hidden = false
    },
    changeNum(t,n){
      var obj = {
        title: t,
        num: n
      }
      if(n==0){
        this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.$store.commit('setCart',obj)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }else{
        this.$store.commit('setCart',obj)
      } 
    },
    out(){
      this.$confirm('是否确定退出', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        window.localStorage.clear()
        this.$router.go(0)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });          
      });
    },
    jump2(){
      this.$router.push('/balance')
    }
  },
  computed:{
    ...mapState(['shoppingCart','count'])
  }
};
</script>

<style scoped>
  .hidden{
    display: none;
  }
  .fixed{
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: 0;
    border-bottom: 1px solid #e7e7e7;
    background-color: #fff;
    z-index: 999;
  }
  h1>a{
    display: block;
    height: 70px;
    width: 175px;
    background: url(../assets/images/header_logo_text.png) center center no-repeat;
    line-height: 200px;
    overflow: hidden;
  }
  .wrap{
    width: 1162px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .el-menu{
    background: 0;
  }
  .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover,.el-menu--horizontal>.el-submenu .el-submenu__title:hover,.el-menu-item:hover {
    background: 0;
  }
  .el-menu.el-menu--horizontal {
    border: none;
  }
  .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
      color: #C8B49B!important;
  }
  .el-menu--horizontal>.el-menu-item{
    height: 70px;
    line-height: 70px;
    padding: 0;
    margin-right: 42px;
    border: none!important;
  }
  .login_wrap{
    display: flex;
    position: relative;
  }
  .login_wrap a{
    height: 70px;
    line-height: 70px;
    font-size: 14px;
    color: #3C2314;
    margin: 0 8px;
  }
  .login_wrap p{
    margin-right: 28px;
  }
  .login_wrap>i{
    display: inline;
    height: 26px;
    width: 22px;
    margin-top: 22px;
    background: url(../assets/images/shop_bag.png) -1px 0 no-repeat;
    position: relative;
  }
  .login_wrap em{
    position: absolute;
    right: -22px;
    top: 50%;
    transform: translateY(-50%);
    height: 16px;
    width: 16px;
    border: 1px solid #3C2314;
    color: #FBF5DD;
    line-height: 16px;
    font-size: 12px;
    text-align: center;
    background: #3C2314;
    border-radius: 10px;
    letter-spacing: .5px;
  }
  .login_wrap a:hover{
    color: #C8B49B;
    text-decoration: none;
  }
  .shopBagPop{
    position: absolute;
    background-color: #fff;
    right: 0;
    border: 1px solid #e7e7e7;
    box-shadow: 0 2px 10px 0 #777;
    top: 60px;
    z-index: 100;
    color: #3C2314;
  }
  .shopBagPop ul{
    width: 420px;
    padding: 0;
    max-height: 462px;
    overflow-y: auto;
  }
  .shopBagPop li{
    padding: 20px 0 20px 20px;
    border-bottom: 1px solid #e7e7e7;
    height: 98px;
    margin: 0;
  }
  .shopBagPop img{
    width: 96px;
    height: 96px;
    border: 1px solid #e7e7e7;
    float: left;
  }
  .shop_right{
    float: left;
    margin-left: 14px;
  }
  .shop_right>div{
    width: 246px;
    height: 48px;
    line-height: 48px;
    position: relative;
  }
  .shop_top{
    display: flex;
    justify-content: space-between;
  }
  .shop_top span{
    color: #aa8764;
  }
  .del{
    color: #aaa;
    float: right;
  }
  .check_btn{
    padding: 28px 0;
    height: 42px;
  }
  .check_btn p{
    float: right;
    line-height: 42px;
    height: 42px;
    margin-right: 28px;
    background-color: #3C2314;
    color: #FBF5DD;
    padding: 0 28px;
  }
  .item_num{
    position: absolute;
    top: 14px;
    right: 60px;
  }
  .item_num span{
    float: left;
    width: 36px;
    text-align: center;
    line-height: 20px;
  }
  .item_num i{
    text-align: center;
    display: block;
    float: left;
    cursor: pointer;
    width: 20px;
    height: 20px;
    background-image: url(../assets/images/icon-sprite.png);
  }
  .down_num{
    background-position: -128px -256px;
  }
  .up_num{
    background-position: -88px -256px;
  }
  .user{
    line-height: 70px;
  }
</style>