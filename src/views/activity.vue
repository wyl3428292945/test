<template>
  <div class="activity">
    <top :fixed="true"></top> 
    <div class="wrap">
      <a v-for="(item,index) in activity" :key="index" :href="item.href_url">
        <img :src="item.img_url">
      </a>
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
import top from "../components/top"
import bottom from "../components/bottom"
export default {
  name:'activity',
  data(){
    return {
      activity:[
        {
          img_url:"https://images.ebeecake.com/images/hd/180615/w570.jpg",
          href_url:"javascript:;"
        },
        {
          img_url:"https://images.ebeecake.com/images/hd/170811/w580.jpg",
          href_url:"javascript:;"
        },
        {
          img_url:"https://images.ebeecake.com/img_w/gg_04.jpg",
          href_url:"javascript:;"
        },
        {
          img_url:"https://images.ebeecake.com/img_w/gg_03.jpg",
          href_url:"javascript:;"
        }
      ]
    }
  },
  components:{
    top,
    bottom
  }
}
</script>

<style scoped>
  .wrap a{
    width: 49%;
    display: inline-block;
    margin-right: 8px;
    margin-bottom: 8px;
  }
  .wrap a img{
    display: block;
    width: 100%;
  }
</style>