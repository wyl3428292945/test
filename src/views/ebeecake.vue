<template>
  <div class="container">
    <div class="banner">
      <div class="header clearfix">
        <div class="header-text">
          <p>北京</p>
          <p>六环内免费配送</p>
          <p>4006 106 798</p>
        </div>
      </div>
      <top :fixed="false"></top>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in banner" :key="index" :style="{background:'url('+ item.image +') center'}">
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <bottom></bottom>
    </div>
    <div class="show">
      <div v-for="(item,index) in show" :key="index" class="show-con">
        <h2 class="show-h2 clearfix">
          <span>{{item.title}}</span>
          <a :href="item.url">更多</a>
        </h2>
        <div class="show-d clearfix">
          <div v-for="(show,index) in getShow(item.title)" :key="index" class="show_item" @click="jump(show.id,item.title)">
              <div class="small_img">
                <img :src="show.small_img">
              </div>
              <div class="big_img">
                <img :src="show.big_img" alt="">
              </div>
              <div class="item_info">
                <p class="title">{{show.title}}</p>
                <p class="price">{{show.price}}</p>
              </div>
          </div>
        </div>
      </div>
      <div class="show-con">
        <h2 class="show-h2 clearfix">
          <span>瞬间</span>
          <a href="javascript:;">更多</a>
        </h2>
        <div class="show-d clearfix">
          <div class="last-left" @click="show1">
            <div class="last-vide">
              <img src="../assets/images/indexVideo.jpg">
            </div>
          </div>
          <div class="last-right">
            <img src="../assets/images/w_sj.jpg">
            <div class="last-info">
              <p>蛋糕年度销量排行榜</p>
              <a href="javascript:;">查看详情</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mask" :class="{'display':hidden}">
      <div class="video">
        <div class="del" @click="hidden1">
          <i></i>
        </div>
        <video id="EB_video" class="video-js" muted autoplay="autoplay" controls="" preload="auto" width="640" height="368" poster="http://images.ebeecake.com/img_c/indexVideo.jpg"><source src="http://images.ebeecake.com/vidio/new_vidio_1.mp4" type="video/mp4"></video>
      </div>
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
import top from '../components/top'
import bottom from '../components/bottom'
import Swiper from 'swiper'
export default {
    name: 'ebeecake',
    components:{
      top,
      bottom
    },
    data(){
      return {
        hidden:true,
        banner:[
          {
            url:'javascript:;',
            image:require("../assets/images/banner_img1.jpg")
          },
          {
            url:'javascript:;',
            image:require("../assets/images/banner_img2.jpg")
          },
          {
            url:'javascript:;',
            image:require("../assets/images/banner_img3.jpg")
          },
          {
            url:'javascript:;',
            image:require("../assets/images/banner_img4.jpg")
          },
          {
            url:'javascript:;',
            image:require("../assets/images/banner_img5.jpg")
          },
          {
            url:'javascript:;',
            image:require("../assets/images/banner_img6.jpg")
          }
        ],
        show: [
          {
            title:'人气推荐',
            url:"/cake"
          },
          {
            title:'庆生蛋糕',
            url:"/cake"
          },
          {
            title:'咖啡下午茶',
            url:"/tea"
          },
          {
            title:'精选食材',
            url:"/food"
          }
        ]
      }
    },
    mounted(){
      new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: '.swiper-pagination',
        paginationBulletRender: function (swiper, index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
        loop: true,
        spaceBetween: 30,
        effect: 'fade',
        autoplay: 3000,
        autoplayDisableOnInteraction: false
      });
    },
    methods:{
      getShow(i){
        return this.$store.state.con.filter(item=>item.zs==i)
      },
      show1(){
        this.hidden=false
      },
      hidden1(){
        this.hidden=true
      },
      jump(i,t){
        if(t!='精选食材'){
          this.$router.push('/detail?id='+i)
        }else{
          this.$router.push('/food')
        }
      }
    }
}
</script>

<style scoped>
  .container{
    min-width: 1162px;
  }
  a:hover{
    text-decoration: none;
  }
  .banner{
    position: relative;
    height: 650px;
  }
  .header{
    width: 1162px;
    margin: 0 auto;
    position: relative;
    z-index: 10;
  }
  .header-text{
    width: 284px;
    height: 52px;
    font-size: 14px;
    color: #3c2314;
    line-height: 52px;
    float: right;
    padding-top: 24px;
    display: flex;
    justify-content: space-between;
  }
  .top{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    padding-top: 40px;
    z-index: 10;
  }
  .el-popup-parent--hidden .top{
    padding: 40px 0 0!important;
  }
  .swiper-container {
      width: 100%;
      height: 650px;
      position: absolute;
      top: 0;
      left: 0;
  }
  .swiper-slide {
      background-position: center;
      background-size: cover;
  }
  .swiper-pagination >>> .swiper-pagination-bullet{
    width: 28px;
    height: 28px;
    line-height: 28px;
    border: 1px solid #AA8764;
    color:#AA8764;
    background: 0;
    opacity: 1;
  }
  .swiper-pagination >>> .swiper-pagination-bullet-active{
    color: #fff;
    background-color: #3c2314;
    border-color: #3c2314;
  }
  .show{
    width: 1162px;
    margin: 0 auto;
  }
  .show-con{
    padding-top: 20px;
  }
  .show-con:nth-child(odd) h2 span{
    padding: 28px 63px 0 0;
    font-size: 22px;
    background: url(../assets/images/row_tit1.png) no-repeat right bottom;
    line-height: 36px;
    float: left;
  }
  .show-con:nth-child(even) h2 span{
    padding: 28px 0 0 70px;
    font-size: 22px;
    background: url(../assets/images/row_tit2.png) no-repeat left bottom;
    line-height: 36px;
    float: left;
  }
  .show-h2 a{
    float: right;
    line-height: 36px;
    color: #3C2314;
    font-size: 14px;
    font-weight: normal;
    margin-top: 28px;
  }
  .show-d{
    width: 1176px;
    margin-left: -7px
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
  .show_item:hover{
    box-shadow: 0 0 15px #aaa;
  }
  .show_item:hover .big_img{
    opacity: 1;
  }
  .show_item:hover .big_img img{
    transform: scale(1.3);
  }
  .item_info{
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
  .title{
    color: #3c2314;
  }
  .price{
    color: #aa8764;
  }
  .last-left,.last-right{
    margin: 28px 7px;
    width: 574px;
    height: 378px;
    overflow: hidden;
    float: left;
  }
  .last-left:hover,.last-right:hover{
    box-shadow: 0 0 15px #aaa;
  }
  .last-right{
    position: relative;
  }
  .last-info{
    position: absolute;
    height: 58px;
    width: 516px;
    padding: 0 14px;
    border: 1px solid #e7e7e7;
    left: 50%;
    background-color: #fff;
    margin-left: -273px;
    bottom: 42px;
    line-height: 58px;
    font-size: 14px;
    color: #3c2314;
  }
  .last-info p{
    float: left;
  }
  .last-info a{
    float: right;
    color: #3c2314;
  }
  .last-info a:hover{
    color: #C8B49B;
    box-shadow: 0 0 15px #aaa;
  }
  .mask{
    position: fixed;
    left:0;
    top:0;
    width:100%;
    height: 100%;
    background-color: rgba(0,0,0,.7);
    z-index: 999;
  }
  .video{
    position: fixed;
    left: 356px;
    top: 194px;
    z-index: 1024;
    width: 640px;
    height: 368px;
    border: 1px solid #999;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1), 0 0 256px rgba(255, 255, 255, .3);
  }
  .video video{
    outline: none;
  }
  .del{
    height: 20px;
    line-height: 20px;
    width: 21px;
    position: absolute;
    right: 1px;
    top: 1px;
    background-color: #fff;
    opacity: .3;
    z-index: 1000;
  }
  .del i{
    position: absolute;
    right: 4px;
    top: 4px;
    width: 12px;
    height: 12px;
    background: url(../assets/images/icon-sprite.png) -216px -256px;
  }
  .display{
    display: none;
  }
</style>