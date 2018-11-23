<template>
  <div class="carousel">
    <!-- 顶部标题 -->
    <!-- <header class="carousel_header fw">
      <a href="" class="fl ml5">
        <img src="http://www.jxdetai.com/templates/common/images/iconfont-shouye.png?v3.2" alt="">
      </a>
      积分兑换商城
      <span class="fr mr5">
        去登录
      </span>
    </header> -->
    <!-- 轮播图 -->
    <div class="swiper_content">
        <swiper :options="swiperOption_1">
            <swiper-slide v-for="(item, index) in imgList" :key="index">
                <img :src="item" alt="">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
  </div>
</template>
<script>
  import api from '@/api/api'
  import {swiper,swiperSlide} from 'vue-awesome-swiper'
  export default{
    name: 'carousel',
    components: {
      swiper,
      swiperSlide
    },
    data(){
      return {
        swiperOption_1: {
          autoplay: {
            delay: 4000, //自动切换的时间间隔（单位ms），不设定该参数slide不会自动切换。
            stopOnLastSlide: false, //当切换到最后一个slide时，是否停止自动切换。
            disableOnInteraction: false //用户操作swiper之后，是否禁止autoplay
          },
          loop: true, //轮播循环
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true, //修改swiper的父元素时，自动初始化swiper
          pagination: {
            el: ".swiper-pagination",
            clickable: true //是否可点击
          },
        },
        imgList: []
      }
    },
    created(){
      api.banner()
        .then(res => {
          this.imgList = res.map((o) => {
            return o.img_url
          })
        })
    }
  }
</script>
<style scoped lang="stylus">
  .carousel_header
    font-size 0.7rem
    color #333333
    height 1.7rem
    line-height 1.7rem
    text-align center
    background-color #F8F8F8
    span
      font-weight normal
      color red
  .swiper_content
    img
      width 100%
      height 6rem
</style>
