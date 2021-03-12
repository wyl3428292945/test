<template>
  <div>
    <top :fixed="true"></top>
    <div class="form">
      <ul class="nav">
        <li
          v-for="(item, index) in nav"
          :key="index"
          v-html="item"
          :class="{ active: num == index }"
          @click="tab(index)"
        ></li>
      </ul>
      <div class="con_item" v-show="num == 0">
        <ul>
          <li class="clearfix">
            <b>手机号码</b>
            <input type="text" class="big_ipt" v-model="ipt.tel" />
          </li>
          <li class="clearfix">
            <b>验证码</b>
            <input type="text" class="small_ipt" v-model="ipt.testCode" />
            <span class="test_code" @click="changeCode">{{ testCode }}</span>
          </li>
        </ul>
        <a href="javascript:;" class="login" @click="login">登录</a>
        <div class="signin_item">
          <a href="javascript:;">忘记密码</a>
          <a href="javascript:;">新会员注册领优惠券</a>
        </div>
      </div>
      <div class="con_item" v-show="num == 1">
        <ul>
          <li class="clearfix">
            <b>账号</b>
            <input type="text" class="big_ipt" v-model="ipt.username" />
          </li>
          <li class="clearfix">
            <b>密码</b>
            <input type="password" class="big_ipt" v-model="ipt.pwd" />
          </li>
        </ul>
        <a href="javascript:;" class="login" @click="login2">登录</a>
        <div class="signin_item">
          <a href="javascript:;">忘记密码</a>
          <a href="javascript:;">新会员注册领优惠券</a>
        </div>
      </div>
      <div class="con_item" v-show="num == 2">
        <h3>微信登录</h3>
        <div class="wx_con">
          <img src="../assets/images/041Pn7z91xCbml2z.jpg" />
          <p>请使用微信扫描二维码登录</p>
          <p>“小蜂蜜蛋糕”</p>
        </div>
      </div>
      <div class="prompt" v-show="show">{{ prompt }}</div>
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
import top from "../components/top"
import bottom from "../components/bottom"
export default {
  name:'login',
  components:{
    top,
    bottom
  },
  data(){
    return {
      nav:['手机验证码登录','账号密码登录','<i></i>微信登录'],
      num:0,
      testCode: null,
      ipt:{
        tel:null,
        testCode:null,
        username:null,
        pwd:null
      },
      show:false,
      prompt: null
    }
  },
  created(){
    this.random()
  },
  methods:{
    tab(index){
      this.num = index
    },
    random(){
      this.testCode = Math.floor(Math.random()*(9999-1000+1)+1000)
    },
    changeCode(){
      this.random()
    },
    login(){
      this.show = true
      var that = this
      if(!/^1[3|4|5|7|8][0-9]{9}$/.test(this.ipt.tel)){
        this.prompt = "请输入正确的手机号"
      }else if(this.testCode!=this.ipt.testCode){
        this.prompt = "请输入正确的验证码"
      }else{
        this.show = false
        this.prompt = null
      } 
      setTimeout(function(){
        that.show = false
      },2000)
      if(!this.prompt){
        this.axios.post('http://localhost:3000/user',{
          tel:this.ipt.tel
        }).then(res=>{
          if(res.data.length){
            localStorage.clear()
            localStorage.username = res.data[0].tel
            if(res.data[0].shopInfo){
              console.log(JSON.parse(res.data[0].shopInfo));
              this.$store.commit('setShop',res.data[0].shopInfo)
            }
            this.$router.push('/')
          }else{
            alert('登录失败')
          }
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    login2(){
      this.show = true
      var that = this
      if(!this.ipt.username){
        this.prompt = "请输入账号"
      }else if(!this.ipt.pwd){
        this.prompt = "请输入密码"
      }else{
        this.show = false
        this.prompt = null
      } 
      setTimeout(function(){
        that.show = false
      },2000)
      if(!this.prompt){
        this.axios.post('http://localhost:3000/user',{
          username: this.ipt.username,
          pwd: this.ipt.pwd
        }).then(res=>{
          if(res.data.length){
            window.localStorage.username = res.data[0].tel
            this.$store.commit('setShop',res.data[0].shopInfo)
            this.$router.push('/')
          }else{
            alert('用户名或者密码错误')
          }
        }).catch(err=>{
          console.log(err);
        })
      }
    }
  }
}
</script>

<style scoped>
.form {
  width: 382px;
  margin: 153px auto 0;
  position: relative;
}
.nav {
  border: 1px solid #e7e7e7;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  margin-bottom: 42px;
}
.nav li {
  width: 120px;
  position: relative;
  text-align: center;
  height: 45px;
  line-height: 45px;
  cursor: pointer;
}
.active {
  background: #c8b49b;
  color: #fff;
}
.nav .active::after {
  height: 4px;
}
.nav li::after {
  content: "";
  position: absolute;
  height: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #3c2314;
  transition: height 0.3s;
}
.nav li:hover {
  background: #c8b49b;
  color: #fff;
}
.nav li:hover::after {
  height: 4px;
}
.nav li >>> i {
  background: url(../assets/images/wx.png) left no-repeat;
  width: 36px;
  height: 36px;
  background-size: 36px 36px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
}
.con_item li {
  position: relative;
  margin-bottom: 20px;
}
.con_item input {
  height: 40px;
  line-height: 40px;
  border: 1px solid #e7e7e7;
  padding: 0 20px;
  float: left;
}
.con_item .big_ipt {
  width: 236px;
}
.con_item .small_ipt {
  width: 76px;
}
.con_item b {
  font-weight: 400;
  float: left;
  width: 100px;
  margin-right: 4px;
  line-height: 42px;
  height: 42px;
}
.con_item .login {
  display: block;
  background: #3c2314;
  color: #fbf5dd;
  padding: 13px 27px;
  text-align: center;
  line-height: 14px;
  margin: 42px 0 20px;
}
.con_item a:hover {
  text-decoration: none;
}
.con_item .signin_item a:hover {
  color: #c8b49b;
}
.con_item .signin_item {
  text-align: right;
}
.con_item .signin_item a {
  margin-left: 15px;
}
.con_item h3 {
  text-align: center;
  font-size: 20px;
  font-weight: normal;
}
.con_item img {
  display: block;
  width: 280px;
  border: 1px solid #e2e2e2;
  margin: 15px auto 20px;
}
.con_item .wx_con {
  text-align: center;
  font-size: 13px;
}
.con_item .test_con {
  display: inline-block;
  width: 132px;
  height: 42px;
}
.test_code {
  float: right;
  width: 132px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  font-size: 20px;
  background-color: #e2e2e2;
  letter-spacing: 4px;
}
.prompt {
  position: absolute;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #fff;
  left: 50%;
  top: 120px;
  transform: translateX(-50%);
}
</style>