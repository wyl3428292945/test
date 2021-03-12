<template>
  <div class="food">
    <top :fixed="true"></top>
    <div class="wrap">
      <div class="content">
        <h2>精选食材</h2>
        <div class="detail_mai">
          <div class="detail_item" v-for="(item,index) in food" :key="index">
            <img :src="item.img_url">
            <div class="item_info">
              <h3>{{item.name}}</h3>
              <h4>{{item.title}}</h4>
            </div>
            <div class="item_con" v-html="item.content"></div>
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
export default {
  name: 'food',
  data(){
    return {
      food:[]
    }
  },
  components:{
    top,
    bottom
  },
  created(){
    this.getFood()
  },
  methods:{
    getFood(){
      this.axios('http://localhost:3000/food').then(res=>{
        this.food = this.food.concat(res.data)
      }).catch(err=>{
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>
  .content{
    width: 770px;
    margin: 0 auto;
  }
  .content h2{
    font-size: 22px;
    color: #AA8764;
    height: 70px;
    line-height: 70px;
    border-bottom: 1px solid #E7E7E7;
    border-top: 1px solid #E7E7E7;
    text-align: center;
    font-weight: normal;
  }
  .detail_item{
    margin: 70px auto 0;
  }

  .detail_item img{
    display: block;
    width: 100%;
  }
  .item_info{
    border: 1px solid #E7E7E7;
    width: 378px;
    height: 52px;
    padding-top: 8px;
    margin: -31px auto 40px;
    position: relative;
    z-index: 10;
    background-color: #fff;
    text-align: center;
    font-size: 14px;
    line-height: 22px;
  }
  .item_info h3{
    font-weight: normal;
    color: #AA8764;
  }
  .item_info h4{
    font-weight: normal;
  }
  .item_con >>> p{
    padding-bottom: 20px;
    font-size: 12px;
  }
</style>