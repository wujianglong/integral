<template>
  <div class="orderDteail">
    <Nav :NavText="navText"></Nav>
    <div class="orderDteail_content">
      <div class="contentImg">
        <img :src="goodList.img_url">
      </div>
      <div class="tal bgw">
        <p class="goodsName">
          {{goodList.name}}
        </p> 
        <p class="goodsDesc mt5">
          {{goodList.content}}
        </p>
        <p class="marketPrice mt5">
          <span>市场价：</span>
          <del>¥{{goodList.price}}</del>
        </p>
        <p class="needIntegral mt5">
          <span>所需积分：</span>
          <span>{{goodList.point}}</span>
        </p>
        <!-- <p class="limit mt5">
          <span>每人限量：</span>
          <span>1</span>
        </p> -->
        <p class="quantity mt5">
          <span>兑换数量</span>
          <br>
          <span class="quantityContent tac mr5 mb10">
            <span class="quantity_l fl tac" @click="minus">
              -
            </span>
            <span>{{number}}</span>
            <span class="quantity_r fr tac" @click="add">
              +
            </span>
          </span>
          <span>剩余：</span>
          <span>
            {{goodList.count}}件
          </span>
        </p>
      </div>
      <div class="orderDisplay mt5">
        <div class="orderHeader">
          <ul class="layoutFlex">
            <li class="active">
              <span>商品详情</span>
            </li>
            <!-- <li>
              <span>商品咨询（0）</span>
            </li>
            <li>
              <span>商品评价（0）</span>
            </li> -->
          </ul>
        </div>
        <div class="orderContent">
          <div>
            <span v-for="(item, index) in goodList.detail_img_urls" :key="index">
              <img :src="item" alt="">
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="btn">
      <button @click="exchangeFnc">
        立即兑换
      </button>
    </div>
  </div>
</template>
<script>
  import api from '@/api/api'
  import Nav from '@/components/Nav.vue'
  import store from '@/store/index.js'
  import {mapState} from 'vuex'
  import { MessageBox, Toast } from 'mint-ui';
  export default{
    name: 'login',
    data(){
      return {
        navText: '商品详情',
        number:1,
        goodList:[],
        integral: 0
      }
    },
    components:{
      Nav
    },
    computed:{
      ...mapState({
        integral_count: res => res.integral_count
      })
    },
    mounted () {
    },
    created(){
      this.integral = this.$route.query.integral ? Number(this.$route.query.integral) : 0
      let id = this.$route.query.id
      api.goods()
        .then((res)=>{
          let cc = res.results.filter((o) => {
            return o.id === Number(id)
          })
          this.goodList = cc[0]
        })
    },
    methods: {
      minus(){
        if(this.number > 1){
          this.number--
        }
      },
      add(){
        this.number++
      },
      exchangeFnc(){
        // let t = Number(this.number) * Number(this.goodList.point)
        if(!localStorage.getItem('token')){
          MessageBox.confirm('还未绑定账号，前往绑定？','温馨提示')
            .then(() => {
              this.$router.push('/login')
            })
            .catch(() => {})
        } else {
          let t = Number(this.number) * Number(this.goodList.point)
          if(Number(this.$route.query.integral) >= t){
            MessageBox.confirm('确认兑换','提示')
              .then(() => {
                api.exchangeOrder({
                  good_id: this.goodList.id,
                  count: this.number
                })
                  .then(()=>{
                    
                    store.commit('integralFnc', Number(this.integral_count) - t)
                    MessageBox.confirm('是否前往查看？','兑换成功')
                      .then(() => {
                        this.$router.push('/order')
                      })
                      .catch(() => {})
                  })
              })
              .catch(() => {})
          } else {
            Toast({
              message: '积分不够兑换',
              position: 'bottom',
              duration: 2000
            })
          }
        }
      }
    }
  }
</script>
<style scoped lang="stylus">
  .orderDteail_content
    padding-top 1.8rem
  .orderDteail
    background #F5F5F5
  .bgw
    padding-left 5%
  .contentImg
    img
      width 100%
  .goodsName
    color #000
    font-size 0.8rem
  .goodsDesc
    color #666
    font-size 0.6rem
  .marketPrice
    color #333
    font-size 0.6rem
  .needIntegral
    color #333
    font-size 0.6rem
  .limit
    color #333
    font-size 0.6rem
  .quantity
    color #333
    font-size 0.6rem
    .quantityContent
      width 4rem
      height 1.2rem
      line-height 1.2rem
      border 1px solid #ccc
      display inline-block
      .quantity_l
        width 1.2rem
        height 1.2rem
        display inline-block
        border-right 1px solid #ccc
        background #efefef
      .quantity_r
        width 1.2rem
        height 1.2rem
        display inline-block
        border-left 1px solid #ccc
        background #efefef
  .orderHeader 
    background #fff
    border-top 1px solid #ddd
    border-bottom 1px solid #ddd
    li
      font-size 0.6rem
      height 1.5rem
      line-height 1.5rem
      flex 1
      background #eee
    li.active
      background #fff
  .orderContent
    img
      width 100%
  .btn
    position fixed
    height 1.8rem
    bottom 0
    width 100%
    background-color rgba(0,0,0,0.5)
    button
      height 1.4rem
      width 4rem
      background-color #da4453
      border-color #da4453
      border-radius 4px
      color #fff
      border none
      margin-top 0.2rem
    
</style>
