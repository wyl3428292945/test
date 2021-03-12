<template>
  <div class="prefecture">
    <top :fixed="true"></top>
    <div class="wrap">
      <div class="pre_top clearfix">
        <a v-for="(item,index) in preArr" :key="index" :href="item.url" class="img_item">
          <img :src="item.img_url">
        </a>
      </div>
      <div class="pre_item" v-for="(item,index) in preCon" :key="index">
        <h2>
          {{item.title}}
          <button @click="getShow()">{{item.btn}}</button>
        </h2>
        <div class="item_con" v-html="item.content">
        </div>
      </div>
    </div>
    <div class="mask" :class="{'hidden':close}">
      <div class="form">
        <h4>
          企业预约
          <i class="close" @click="getClose()"></i>
        </h4>
        <ul class="form_con">
          <li class="clearfix">
            <b>公司名称</b>
            <input type="text" placeholder="请输入公司名称" v-model="iptData.company">
            <div class="prompt" :class="{'hidden':show[0]}">
              <div class="triangle"></div>
              <p>请输入公司名称</p>
            </div>
          </li>
          <li class="clearfix">
            <b>联系人</b>
            <input type="text" placeholder="请输入联系人姓名" v-model="iptData.name">
            <div class="prompt" :class="{'hidden':show[1]}">
              <div class="triangle"></div>
              <p>请输入联系人</p>
            </div>
          </li>
          <li class="clearfix">
            <b>手机</b>
            <input type="text" placeholder="请输入联系人手机号" v-model="iptData.tel">
            <div class="prompt" :class="{'hidden':show[2]}">
              <div class="triangle"></div>
              <p>请输入正确手机号</p>
            </div>
          </li>
          <li class="clearfix">
            <b>需求</b>
            <textarea placeholder="请简单描述您的需求" v-model="iptData.memo"></textarea>
            <div class="prompt" :class="{'hidden':show[3]}">
              <div class="triangle"></div>
              <p>请输入需求信息</p>
            </div>
          </li>
        </ul>
        <a href="javascript:;" class="submit" @click="submit()">提交</a>
      </div>
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
import top from "../components/top";
import bottom from "../components/bottom"
export default {
  name:'prefecture',
  data(){
    return {
      preArr:[
        {
          url:"javascript:;",
          img_url:"https://images.ebeecake.com/img_c/企业试吃.jpg"
        },
        {
          url:"javascript:;",
          img_url:"https://images.ebeecake.com/img_c/专属定制.jpg"
        },
        {
          url:"javascript:;",
          img_url:"https://images.ebeecake.com/img_c/企业采购.jpg"
        }
      ],
      preCon:[],
      iptData:{
        company:null,
        name:null,
        tel:null,
        memo:null
      },
      show:[true,true,true,true],
      close:true
    }
  },
  components:{
    top,
    bottom
  },
  created(){
    this.getPre()
  },
  methods:{
    getPre(){
      this.axios('http://localhost:3000/prefecture').then(res=>{
        this.preCon = this.preCon.concat(res.data)
      }).catch(err=>{
        console.log(err);
      })
    },
    putData(){
      this.axios.put('http://localhost:3000/order',{
        company:this.iptData.company,
        name:this.iptData.name,
        tel:this.iptData.tel,
        memo:this.iptData.memo
      }).then(res=>{
        console.log(res.data);
      }).catch(err=>{
        console.log(err);
      })
    },
    getShow(){
      this.close = false
    },
    getClose(){
      this.close = true
    },
    submit(){
      if(!this.iptData.company){
        this.show.splice(0,1,false)
      }else if(!this.iptData.name){
        this.show.splice(1,1,false)
      }else if(!(/^1[3456789]\d{9}$/.test(this.iptData.tel))){
        this.show.splice(2,1,false)
        console.log(111);
      }else{
        this.show.splice(3,1,false)
      }
      if(this.iptData.company){
        this.show.splice(0,1,true)
      }
      if(this.iptData.name){
        this.show.splice(1,1,true)
      }
      if((/^1[3456789]\d{9}$/.test(this.iptData.tel))){
        this.show.splice(2,1,true)
      }
      if(this.iptData.memo){
        this.show.splice(3,1,true)
      }
      if(this.show.every(item=>item==true)){
        this.putData()
      }
    }
  }
}
</script>

<style scoped>
  .pre_top{
    width: 1230px;
    margin-left: -15px;
  }
  .img_item{
    display: block;
    float: left;
    margin: 0 15px;
    width: 380px;
    height: 280px;
  }
  .img_item img{
    display: block;
    width: 380px;
    height: 280px;
  }
  .pre_item{
    margin-top: 70px;
  }
  .pre_item h2{
    border-bottom: 1px solid #e7e7e7;
    font-size: 22px;
    color: #AA8764;
    height: 70px;
    line-height: 70px;
    position: relative;
    margin-bottom: 16px;
    font-weight: normal;
  }
  .pre_item h2 button{
    background-color: #3C2314;
    border: 0;
    color: #FBF5DD;
    font-size: 14px;
    width: 100px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    margin-left: 20px;
  }
  .item_con >>> h3{
    font-size: 18px;
    line-height: 32px;
    font-weight: normal;
  }
  .item_con >>> p{
    font-size: 12px;
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
  .form{
    position: fixed;
    left: 289px;
    top: 143px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1), 0 0 256px rgba(255, 255, 255, .3);
    background-color: #fff;
  }
  .form h4{
    height: 73px;
    line-height: 73px;
    position: relative;
    text-align: center;
    font-size: 22px;
    color: #c8b49b;
    font-weight: normal;
    margin-bottom: 5px;
  }
  .form_con{
    margin: 0 27px;
  }
  .form_con li{
    margin-bottom: 20px;
    position: relative;
  }
  .form_con b{
    font-weight: 400;
    float: left;
    width: 100px;
    margin-right: 4px;
    line-height: 42px;
    height: 42px;
  }
  .form_con input{
    width: 500px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #E7E7E7;
    padding: 0 20px;
    float: left;
    outline: none;
  }
  input::-webkit-input-placeholder,textarea::-webkit-input-placeholder{
    color:#ccc;
  }
  .form_con textarea{
    height: 100px;
    width: 500px;
    border: 1px solid #e7e7e7;
    padding: 10px 20px;
    outline: none;
  }
  .prompt{
    padding: 20px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1), 0 0 256px rgba(255, 255, 255, .3);
    border: 1px solid #999;
    background-color: #fff;
    position: absolute;
    right: -160px;
    top: -12px;
    z-index: 1027;
  }
  .submit{
    display: block;
    margin: 42px 27px 28px;
    background: #3C2314;
    color: #FBF5DD;
    padding: 13px 0;
    text-align: center;
    line-height: 14px;
  }
  .submit:hover{
    text-decoration: none;
  }
  .hidden{
    display: none;
  }
  .triangle{
    position: absolute;
    width: 0;
    height: 0;
    left: -16px;
    margin-top: -8px;
    top: 50%;
    border: 8px solid transparent;
    border-right: 8px solid #7c7c7c;
  }
  .triangle::after{
    content: "";
    position: absolute;
    top: -8px;
    left: -7px;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-right: 8px solid #fff;
  }
  .close{
    position: absolute;
    right: 29px;
    top: 31px;
    cursor: pointer;
    background: url('../assets/images/icon-sprite.png');
    background-position: -216px -256px;
    width: 12px;
    height: 11px;
  }
</style>