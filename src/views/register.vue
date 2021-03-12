<template>
  <div class="register">
    <top :fixed="true"></top>
    <div class="form">
      <h2>新会员注册</h2>
      <ul>
        <li class="clearfix">
          <b>账号:</b>
          <input type="text" class="big_ipt" placeholder="请输入账号" v-model="reg_ipt.username" @blur="ipt1(reg_ipt.username)">
        </li>
        <li class="clearfix">
          <b>密码:</b>
          <input type="password" class="big_ipt" placeholder="请输入密码" v-model="reg_ipt.pwd">
        </li>
        <li class="clearfix">
          <b>手机号码:</b>
          <input type="text" class="small_ipt" placeholder="请输入手机号码" v-model="reg_ipt.tel" @blur="ipt2(reg_ipt.tel)">
        </li>
      </ul>
      <div class="prompt" :class="{'hidden':hidden}">{{prompt}}</div>
      <p class="text">注册即可获得20元优惠券</p>
      <a href="javascript:;" class="reg_btn" @click="register()">注册</a>
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
import top from "../components/top"
import bottom from "../components/bottom"
export default {
  name:'register',
  components:{
    top,
    bottom
  },
  data(){
    return {
      prompt: null,
      hidden: true,
      reg_ipt:{
        username:null,
        pwd:null,
        tel:null
      }
    }
  },
  methods:{
    register(){
      var that = this
      this.hidden = false
      if(!/^[a-zA-Z0-9]{8,18}$/.test(this.reg_ipt.username)){
        this.prompt = "账号必填(数字字母组合,8-18位)"
      }else if(!/^[a-zA-Z0-9]{6,18}$/.test(this.reg_ipt.pwd)){
        this.prompt = "密码必填(数字字母组合,6-18位)"
      }else if(!/^1[3|4|5|7|8][0-9]{9}$/.test(this.reg_ipt.tel)){
        this.prompt = "手机号必填"
      }else{
        this.hidden = true
        this.prompt = null
      }
      setTimeout(function(){
        that.hidden = true
      },2000)
      if(!this.prompt){
        this.axios.put('http://localhost:3000/register',{
          username:this.reg_ipt.username,
          pwd:this.reg_ipt.pwd,
          tel:this.reg_ipt.tel
        }).then(res=>{
          alert(res.data)
          this.$router.push('/login')
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    ipt1(text){
      var that = this
      if(text){
        this.axios.post('http://localhost:3000/user',{
          username: text
        }).then(res=>{
          if(res.data.length){
            that.hidden = false
            that.prompt = "用户名已被占用"
            setTimeout(function(){
              that.hidden = true
            },3000)
          }else{
            that.hidden = true
          }
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    ipt2(text){
      var that = this
      if(text){
        this.axios.post('http://localhost:3000/user',{
          tel: text
        }).then(res=>{
          if(res.data.length){
            that.hidden = false
            that.prompt = "手机号已被注册"
            setTimeout(function(){
              that.hidden = true
            },2000)
          }else{
            that.hidden = true
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
  .form{
    margin: 180px auto 0px auto;
    width: 400px;
    position: relative;
  }
  .form h2{
    font-weight: normal;
    font-size: 18px;
    text-align: center;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 3px solid #C8B49B;
  }
  .form li{
    border-bottom: 1px solid #e7e7e7;
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
  }
  .form b{
    width: 110px;
    display: inline-block;
  }
  .form input{
    width: 130px;
    height: 30px;
    border: none;
    outline: none;
  }
  .reg_btn{
    display: block;
    background: #3C2314;
    color: #FBF5DD;
    cursor: pointer;
    width: 100px;
    padding: 10px 27px;
    margin: 30px auto 0;
    text-align: center;
  }
  .reg_btn:hover{
    text-decoration: none;
  }
  .text{
    color: #d5d5d5;
    padding-left: 10px;
    margin-top: 10px;
  }
  input::-webkit-input-placeholder,textarea::-webkit-input-placeholder{
    color:#ccc;
  }
  .hidden{
    display: none;
  }
  .prompt{
    position: absolute;
    padding: 20px;
    border: 1px solid #ccc;
    background-color: #fff;
    left: 50%;
    top: 120px;
    transform: translateX(-50%);
  }
</style>