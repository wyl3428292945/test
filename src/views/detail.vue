<template>
  <div>
    <top :fixed="true"></top>
    <div class="con">
      <div class="con-top" :style="{background: 'url(' + detailCon.bgImg + ') no-repeat center bottom'}">
        <div class="top-text">
          <h2>{{detailCon.title}}</h2>
          <p>{{detailCon.desc}}</p>
          <div class="price">{{detailCon.price}}</div>
          <div class="info_btn">
            <button class="add_buy" @click="addBuy(detailCon.title,detailCon.price)">{{addStr}}</button>
            <button class="buy_now" @click="buyNow(detailCon.title,detailCon.price)">{{BuyStr}}</button>
          </div>
        </div>
      </div>
      <div class="con_mai">
        <img :src="detailCon.desc_img1">
        <img :src="detailCon.desc_img2">
      </div>
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
import top from "../components/top"
import bottom from "../components/bottom"
export default {
  name: "detail",
  components:{
    top,
    bottom
  },
  data(){
    return {
      detailCon:{
        title: null,
        desc: null,
        price: null,
        desc_img1:null,
        desc_img2:null,
        bgImg:null
      },
      addStr: "加入购物袋",
      BuyStr: "立即购买",
      shopImg: null
    }
  },
  created(){
    this.getDetail()
    this.getCake()
  },
  methods:{
    getDetail(){
      this.axios.get("http://localhost:3000/detail?id="+this.$route.query.id).then(res=>{
        this.detailCon = res.data[0]
      }).catch(err=>{
        console.log(err);
      })
    },
    getCake(){
      this.axios.get("http://localhost:3000/show?id="+this.$route.query.id).then(res=>{
        this.shopImg = res.data[0].small_img
      }).catch(err=>{
        console.log(err);
      })
    },
    addBuy(t,p){
      var that = this
      var obj = {
        shopImg: this.shopImg,
        title: t,
        price: p,
        num: 1
      }
      this.$store.commit('setCart',obj)
      this.addStr="正在加入购物袋"
      setTimeout(function(){
        that.addStr = "加入购物袋"
      },500)
    },
    buyNow(t,p){
      var that = this
      var obj = {
        shopImg: this.shopImg,
        title: t,
        price: p,
        num: 1
      }
      this.$store.commit('setCart',obj)
      this.BuyStr="跳转结算页面"
      setTimeout(function(){
        that.BuyStr = "加入购物袋"
        that.$router.push('/balance')
      },500)
    }
  }
}
</script>

<style scoped>
  .con-top{
    position: relative;
    height: 650px;
    z-index: 10;
  }
  .top-text{
    position: absolute;
    width: 420px;
    border: 1px solid #e7e7e7;
    padding: 30px 0;
    background-color: #fff;
    left: 50%;
    margin-left: 126px;
    top: 154px;
    z-index: 100;
  }
  .top-text h2{
    font-size: 28px;
    line-height: 28px;
    margin: 0 26px;
    font-weight: normal;
  }
  .top-text p{
    margin: 40px 26px 0;
    font-size: 12px;
  }
  .price{
    display: inline-block;
    border: 1px solid #C8B49B;
    padding: 0 10px;
    min-width: 52px;
    margin: 20px 0 0 26px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    border: 1px solid #3C2314;
    background: url(../assets/images/selected.png) bottom right no-repeat;
  }
  .info_btn{
    margin: 26px 26px 0;
    display: flex;
    justify-content: space-between;
  }
  .info_btn button{
    width: 170px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    outline: none;
  }
  .add_buy{
    border: 1px solid #3C2314;
    background-color: #3C2314;
    color: #FBF5DD;
  }
  .buy_now{
    border: 1px solid #E9E9E9;
    background-color: #fff;
  }
  .con_mai{
    width: 1162px;
    margin: 120px auto 0;
    padding: 0 0 38px;
  }
  .con_mai img{
    display: block;
    width: 100%;
  }
</style>