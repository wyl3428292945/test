<template>
  <div class="footer">
    <div class="wrap">
      <ul class="footer_nav">
        <li v-for="(item,index) in nav" :key="index" @mousemove="show(index)">
          {{item.name}}
        </li>
      </ul>
      <div class="hidden" v-show="br">
        <img src="../assets/images/ewm_wx.jpg" alt="">
      </div>
      <p>
        Copyright © 2009-2020 ebeecake 易贝可（北京）食品有限公司 京ICP备09081733号 京公网安备110105014692
        <br>
        公司电话：4006106798
        <a style="color:#AA8764;" href="javascript:;">
          食品经营许可证：JY11105110232865
        </a>
        <a style="color:#AA8764;" href="javascript:;">
          食品生产许可证：SC12411051114584
        </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bottom',
  data(){
    return {
      nav: [
        {
          name:'关于我们',
          path: 'javascript:;'
        },
        {
          name:'最新活动',
          path: 'javascript:;'
        },
        {
          name:'企业专区',
          path: 'javascript:;'
        },
        {
          name:'公益合作',
          path: 'javascript:;'
        },
        {
          name:'招聘',
          path: 'javascript:;'
        },
        {
          name:'公众号',
          path: 'javascript:;'
        }
      ],
      br: false
    }
  },
  methods:{
    show(i){
      if(i==5){
        this.br = true
      }else{
        return;
      }
    }
  }
}
</script>

<style scoped>
  .footer{
      background: url(../assets/images/footer.png) center repeat-x;
      margin-top: 252px;
  }
  .wrap{
    height: 280px;
    overflow: hidden;
    position: relative;
  }
  .footer_nav{
    background: url(../assets/images/footer_log.png) no-repeat;
    color: #AA8764;
    margin: 73px auto 20px;
    height: 69px;
    padding: 0 0 58px 131px;
  }
  .footer_nav li{
    float: left;
    padding: 55px 34px 0 40px;
    background: url(../assets/images/footer_point.png) 0 59px no-repeat;
    height: 14px;
    line-height: 14px;
  }
  /* .footer_nav li:last-of-type{

  } */
  .wrap p{
    color: #9B9B9B;
    font-size: 12px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 1.5px;
  }
  .wrap p a:first-of-type{
    margin: 0 10px;
  }
  .wrap p a:hover{
    text-decoration: none;
  }
  .hidden{
    position: absolute;
    top: 26px;
    right: 125px;
    border: 1px solid #e7e7e7;
    padding: 5px;
    background-color: #fff;
  }
  .hidden img{
    width: 120px;
    height: 120px;
  }
</style>