<template>
  <div class="nav">
    <!-- 顶部标题 -->
    <header class="carousel_header layoutFlex">
      <span class="return fl ml5 mt5" @click="toIndex"></span>
      <span style="flex:1">
        {{NavText}}
      </span>
      <!-- <a href="" class="fr mr5" @click="toIndex">
        <img src="../../static/image/iconfont-shouye.png" alt="">
      </a> -->
    </header>
  </div>
</template>
<script>
  export default{
    name: 'nav1',
    props: [
      'NavText'
    ],
    data(){
      return {
        'name':'wjl'
      }
    },
    methods:{
      toIndex(){
        window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/')
      },
      toIndex1(){
        window.location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1cf833c38629383a&redirect_uri=http%3A%2F%2Fwww.wujianglong.com.cn%2Fintegral%2F&response_type=code&scope=snsapi_base&state=1234#wechat_redirect')
      }
    }
  }
</script>
<style scoped lang="stylus">
  .nav
    height 1.8rem
    line-height 1.8rem
    background #fff
    position fixed
    top 0
    width 100%
  .return
    display inline-block
    width 0.7rem
    height 0.7rem
    border-left 1px solid #666
    border-bottom 1px solid #666
    transform rotate(45deg)
</style>
