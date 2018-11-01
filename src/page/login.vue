<template>
  <div class="login">
    <Nav :NavText="navText"></Nav>
    <div class="login_content">
      <el-input class="mt10 mb10" v-model="tel" v-focus="telFocus" placeholder="输入需要绑定的手机号码"></el-input>
      <div class="layoutFlex verifyCode mb10">
        <el-input class="mr5" v-model="ver" v-focus="verFocus" placeholder="请输入验证码"></el-input>
        <el-button type="primary" @click="getCode">{{verifyTxt}}</el-button>
      </div>
      <el-button type="primary" @click="bindFnc()">绑定</el-button>
    </div>
  </div>
</template>
<script>
  import Nav from '@/components/Nav.vue'
  import api from '@/api/api'
  import { Toast } from 'mint-ui'
  export default{
    name: 'login',
    data(){
      return {
        navText: '绑定手机号',
        verifyTxt: '获取验证码',
        verifyFlag: false,
        tel:"",
        ver:"",
        telFocus: false,
        verFocus: false
      }
    },
    components:{
      Nav
    },
    directives: {
      focus: {
        update: function (el, value) {
          if (value) {
            el.focus()
          }
        }
      }
    },
    created(){
    },
    methods: {
      getCode() {
        let z = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
        if(!z.test(this.tel)){
          Toast({
            message: '手机号格式不对',
            position: 'bottom',
            duration: 2000
          });
          this.telFocus = true
          return false
        }

        if (!this.verifyFlag){

          api.captcha({'cellphone': this.tel})
          this.verifyFlag = true
          let i = 60
          let inter = setInterval(()=>{
            if (i <=0 ){
              this.verifyFlag = false
              clearInterval(inter)
              this.verifyTxt = `获取验证码`
            } else {
              i--
              this.verifyTxt = `${i}s`
            }
            
          },1000)
        }
      },
      bindFnc () {
        // 提交绑定
        api.bind({
          'cellphone': this.tel, 
          'code': this.ver
        })
          .then(() => {
            Toast({
              message: '手机号绑定成功',
              position: 'bottom',
              duration: 2000
            });
            setTimeout(() => {
              window.location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1cf833c38629383a&redirect_uri=http%3A%2F%2Fwww.wujianglong.com.cn%2Fintegral%2F&response_type=code&scope=snsapi_base&state=1234#wechat_redirect')
            }, 2000);
          })
      },
      confirmBind() {
        let z = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
        if(!z.test(this.tel)){
          Toast({
            message: '手机号格式不对',
            position: 'bottom',
            duration: 2000
          });
          this.telFocus = true
          return false
        }

        
        
        // this.tel 
        // this.ver 
      }
    }
  }
</script>
<style scoped lang="stylus">
  .login
    height 100%
    width 100%
    background #f2f2f2
    .login_content
      padding-top 1.8rem
      width 90%
      margin-left 5%
      input
        border 1px solid #999
      .el-button
        width 100%
    .verifyCode
      .el-input
        flex 1
      button
        width 30%!important
        
</style>
