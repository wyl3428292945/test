<template>
  <div>
    <top :fixed="true"></top>
    <div class="wrap">
      <h2>购物袋</h2>
      <div v-if="shoppingCart.length">
        <div v-for="(item,index) in shoppingCart" :key="index" class="con_item">
          <img :src="item.shopImg">
          <h4>{{item.title}}</h4>
          <p class="price">
            {{item.price}}
          </p>
          <p class="item_num">
            <i class="down_num" @click="changeNum(item.title,-1)"></i>
            <span>{{item.num}}</span>
            <i class="up_num" @click="changeNum(item.title,1)"></i>
          </p>
          <p class="item_sum">￥{{item.num*getPrice(item.price)}}</p>
          <el-button class="del" type="text" @click="changeNum(item.title,0)">删除</el-button>
        </div>
      </div>
      <div v-else>
        <p style="padding:150px 0;text-align:center;border-bottom:1px solid #e7e7e7">购物车中还没有商品，赶紧选购吧</p>
      </div>
      <div class="parts">
        <h3>选购配件</h3>
        <ul>
          <li v-for="(item,index) in parts" :key="index">
            <img :src="item.shopImg">
            <span>{{item.title}}</span>
            <p class="parts_add" @click="setParts(item.title,item.price,item.shopImg)">
              <i></i>
              添加
            </p>
          </li>
        </ul>
      </div>
      <div class="sum_info">
        <div class="info_left">
          <a href="/cake">继续购物</a>
          <el-button class="shopClear" type="text" @click="shopClear">清空</el-button>
        </div>
        <div class="info_right">
          <p>{{count}}件商品|总金额<span>￥{{getSum}}</span></p>
        </div>
        <p class="balance">结算</p>
      </div>
      <div class="show clearfix">
        <h3>更多推荐</h3>
        <div v-for="(show,index) in getShow('人气推荐')" :key="index" class="show_item" @click="jump(show.id)">
          <div class="small_img">
            <img :src="show.small_img">
          </div>
          <div class="big_img">
            <img :src="show.big_img" alt="">
          </div>
          <div class="show_info">
            <p class="show_title">{{show.title}}</p>
            <p class="show_price">{{show.price}}</p>
          </div>
        </div>
      </div>
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
import top from "../components/top"
import bottom from "../components/bottom"
import {mapState} from 'vuex'
export default {  
  name:'balance',
  components:{
    top,
    bottom
  },
  data(){
    return {
      parts:[
        {
          title: '鲜花',
          price: '￥300/11支',
          shopImg: 'http://images.ebeecake.com/img_w/3647.jpg'
        },
        {
          title:'额外餐具',
          price:'￥1/件',
          shopImg:'http://images.ebeecake.com/img_w/3646.jpg'
        },
        {
          title:'生日套件',
          price:'￥1/件',
          shopImg:'http://images.ebeecake.com/img_w/3644.jpg'
        },
        {
          title:'挂耳咖啡',
          price:'￥36/件',
          shopImg:'http://images.ebeecake.com/img_w/3642.jpg'
        },
        {
          title:'数字蜡烛',
          price:'￥5/2支',
          shopImg:'http://images.ebeecake.com/img_w/3645.jpg'
        },
        {
          title:'圆蜡',
          price:'￥5/件',
          shopImg:'http://images.ebeecake.com/img_w/3643.jpg'
        }
      ]
    }
  },
  methods:{
    getShow(i){
      return this.con.filter(item=>item.zs==i)
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
    getPrice(p){
      p = p.split('/')[0].replace("￥","")
      return parseInt(p) 
    },
    setParts(t,p,s){
      var obj = {
        title: t,
        price: p,
        shopImg: s,
        num: 1
      }
      this.$store.commit('setCart',obj)
    },
    jump(i){
      this.$router.push('/detail?id='+i)
    },
    shopClear(){
      this.$confirm('此操作将删除所有商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.$store.commit('setCart',"")
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  },
  computed:{
    ...mapState(['shoppingCart','count','con']),
    getSum(){
      var sum = 0
      this.shoppingCart.forEach(item => {
        sum+=item.num * this.getPrice(item.price)        
      });
      return sum
    }
  }
}
</script>

<style scoped>
  .wrap h3{
    font-size: 18px;
    font-weight: normal;
    margin-bottom: 25px;
  } 
  .wrap h2{
    font-size: 18px;
    font-weight: normal;
    padding-bottom: 25px;
    border-bottom: 1px solid #E7E7E7;
  }
  .con_item{
    padding: 28px 0 28px 8px;
    height: 98px;
    border-bottom: 1px solid #E7E7E7;
    position: relative;
  }
  .con_item img{
    float: left;
    width: 98px;
    height: 98px;
    border: 1px solid #eee;
  }
  .con_item h4{
    float: left;
    width: 300px;
    font-size: 18px;
    margin: 10px 0 0 14px;
    font-weight: normal;
  }
  .price {
    float: left;
    width: 100px;
    margin:10px 0 0 270px;
  }
  .item_num{
    float: left;
    margin:10px 0 0 90px 
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
  .item_sum{
    float: left;
    margin: 10px 0 0 90px;
    color: #AA8764;
  }
  .del{
    position: absolute;
    right: 70px;
    bottom: 50px;
    color: #AAA;
  }
  .parts{
    background-color: #f9f9f9;
    padding: 5px 0 14px 5px;
    margin: 28px 0;
    border-bottom: 1px solid #E7E7E7;
  }
  .parts ul{
    display: flex;
    justify-content: space-between;
  }
  .parts li{
    width: 180px;
    height: 98px;
    border: 1px solid #E7E7E7;
    background-color: #fff;
    transition: all .2s;
    position: relative;
  }
  a:hover{
    text-decoration: none;
  }
  .parts li span{
    position: absolute;
    top: 4px;
    right: 4px;
  }
  .parts_add{
    position: absolute;
    bottom: 4px;
    right: 4px;
  }
  .parts li:hover{
    box-shadow: 0 0 15px #aaa;
  }
  .parts_add{
    color: #AAA;
  }
  .parts_add i{
    display: inline-block;
    background-image: url(../assets/images/icon-sprite.png);
    background-position: -228px -256px;
    width: 10px;
    height: 10px;
  }
  .sum_info{
    overflow: hidden;
    height: 80px;
    padding:  12px 0;
    position: relative;
    border-bottom: 1px solid #E7E7E7;
  }
  .balance{
    position: absolute;
    bottom: 12px;
    right: 10px;
    text-align: center;
    padding: 10px 28px;
    background: #3C2314;
    color: #FAF5DC;
  }
  .info_left{
    float: left;
  }
  .shopClear{
    color: #3c2314;
    margin-left: 47px;
  }
  .info_right{
    float: right;
  }
  .info_right span{
    display: inline-block;
    width: 78px;
    text-align: right;
  }
   .show_item{
    float: left;
    width: 280px;
    height: 280px;
    margin: 28px 7px;
    position: relative;
    overflow: hidden;
  }
  .small_img,.big_img{
    position: absolute;
  }
  .small_img img{
    width: 100%;
    height: auto;
  }
  .big_img{
    opacity: 0;
    transition: all .8s;
  }
  .big_img img{
    transition: all .8s;
  }
  .show{
    width: 1176px;
    margin-left: -7px;
    padding-top: 42px;
  }
  .show_item:hover{
    box-shadow: 0 0 15px #aaa;
  }
  .show_item:hover .big_img{
    opacity: 1;
  }
  .show_item:hover .big_img img{
    transform: scale(1.3);
  }
  .show_info{
    position: absolute;
    width: 250px;
    height: 50px;
    border: 1px solid #e7e7e7;
    left: 14px;
    bottom: 14px;
    background-color: rgba(255,255,255,.7);
    padding-top: 8px;
    z-index: 100;
    text-align: center;
    font-size: 14px;
    line-height: 22px;
  }
  .show_title{
    color: #3c2314;
  }
  .show_price{
    color: #aa8764;
  }
</style>