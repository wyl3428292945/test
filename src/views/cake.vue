<template>
  <div class="cake">
    <top :fixed="true"></top>
    <div class="nav">
      <div v-for="(item, index) in tab" :key="index" class="nav-item clearfix">
        <p>{{ item.name }}</p>
        <div class="tab-item">
          <span @click="getId(item.type_id,'all',0)" :class="{'active':num[item.type_id-1]==0}" class="all">全部</span>
          <em>|</em>
          <span v-for="(ty_item, index1) in getType(item.type_id)" :key="index1" @click="getId(item.type_id,ty_item.type,index1+1)" :class="{'active':num[item.type_id-1]==index1+1}" class="tab-span">
            {{ty_item.type}}
          </span>
        </div>
      </div>
    </div>
    <div class="content clearfix">
      <h2>{{classify=="all"?null:classify}} {{taste=="all"?null:taste}} {{crowd=="all"?null:crowd}}</h2>
      <div v-for="(item,index) in getCon(classify,taste,crowd)" :key="index" class="show_item" @click="jump(item.id)">
        <div class="small_img">
          <img :src="item.small_img">
        </div>
        <div class="big_img">
          <img :src="item.big_img" alt="">
        </div>
        <div class="item_info">
          <p class="title">{{item.title}}</p>
          <p class="price">{{item.price}}</p>
        </div>
      </div>
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
import top from "../components/top";
import bottom from "../components/bottom"
export default {
  name: "cake",
  components: {
    top,
    bottom
  },
  data() {
    return {
      classify: 'all',
      taste: 'all',
      crowd: 'all',
      num: [0,0,0],
      type: [],
      tab: [
        {
          name: "分类",
          type_id: 1,
        },
        {
          name: "口味",
          type_id: 2,
        },
        {
          name: "人群",
          type_id: 3,
        },
      ]
    };
  },
  created() {
    this.getTab();
    this.routerTab()
  },
  watch:{
    $route(){
      this.routerTab()
    }
  },
  methods: {
    routerTab(){
      if(this.$route.fullPath=="/tea"){
        this.num[0] = 4
        this.classify = '下午茶'
      }
      if(this.$route.fullPath=="/cake"){
        this.num[0] = 0
        this.classify = 'all'
      }
    },
    getTab() {
      this.axios.get("http://localhost:3000/type")
        .then((res) => {
          this.type = this.type.concat(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getType(i) {
      return this.type.filter(item => item.type_id == i);
    },
    getCon(a,b,c){
      var con = JSON.parse(JSON.stringify(this.$store.state.con)).filter(item=>item.zs!="精选食材")
      if(a!='all'){
        con = con.filter(item => item.classify.indexOf(a)!=-1)
      }
      if(b!='all'){
        con = con.filter(item => item.taste.indexOf(b)!=-1)
      }
      if(c!='all'){
        con = con.filter(item => item.crowd.indexOf(c)!=-1)
      }
      return con
    },
    getId(i,text,index){
      if(i==1){
        this.classify=text
      }else if(i==2){
        this.taste=text
      }else{
        this.crowd=text
      }
      this.num[i-1]=index
    },
    jump(i){
      this.$router.push('/detail?id='+i)
    }
  }
};
</script>

<style scoped>
  .nav{
    width: 1162px;
    margin: 98px auto 0;
  }
  .nav-item{
    height: 48px;
    line-height: 48px;
    font-size: 14px;
  }
  .nav-item p{
    color: #aaa;
    float: left;
  }
  .nav-item em{
    margin-right: 7px;
  }
  .active{
    color:#c8b49b;
  }
  .tab-item{
    margin-left: 42px;
    float: left;
    color: #3c2314;
  }
  .all{
    padding: 0 28px;
  }
  .tab-span{
    padding: 0 21px;
  }
  .content{
    width: 1176px;
    margin: 20px auto 0;
    padding-top: 20px;
    border-top: 1px solid #E9E9E9;
  }
  .content>h2{
    font-size: 18px;
    height:34px;
    line-height: 34px;
    font-weight: normal;
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
</style>