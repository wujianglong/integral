<template>
  <div class="content">
    <!-- 兑换积分 -->
    <div class="exchange">
      <h1>{{ msg }}</h1>
      <p class="tal ml7 mt5 ft7" v-if="userInfo.state !== 'unbind'">
        欢迎 {{userInfo.cellphone}}用户 
        <span class="fr mr5 logisticsImg">
          <!-- <img src="../../static/image/logistics.png" alt=""> -->
          <!-- <router-link class="ml5" to="/order" tag="span">物流信息</router-link> -->
        </span>
      </p>
      <div class="exchange_input layoutFlex mt5">
        <el-input size="small" v-model="integral" placeholder="输入积分兑换码"></el-input>
        <el-button size="small" type="primary" @click="exchangeIngral">兑换</el-button>
      </div>
      <div class="exchange_header layoutFlex">
        <div class="exchange_header_l tal">
          <span class="ml5">积分兑换商品</span>
        </div>
        <div class="exchange_header_r fr">
          <span class="mr3">我的积分:</span>
          <span v-if="userInfo.state !== 'unbind'" class="red">{{userInfo.point}}</span>
          <router-link v-if="userInfo.state === 'unbind'" to="./login"><i style="color:#ec5151">绑定账号</i></router-link>
          <span class="ml3"> 积分值 ↑</span>
        </div>
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="goods_List">
      <ul>
        <li class="layoutFlex" v-for="(item, index) in goodsList" v-if="item.state === 'show'" :id="item.id" :key="index">
          <div class="goods_l mt5 mb5 mr5">
            <img :src="item.img_url" alt="">
          </div>
          <div class="goods_c tal ml5">
            <p class="goodsName fw mt5">{{item.name}}</p>
            <p class="needIntegral mt2"><span>所需积分：</span>{{item.point}}</p>
            <p class="remain mt2"><span>剩余：</span>{{item.count}}</p>
            <p class="price mt2"><span>市场价：</span>{{item.price}}</p>
          </div>
          <div class="goods_r layoutFlex tal">
            <button @click="toOrder(item.id)">立即兑换</button>
          </div>
        </li>
      </ul>
    </div>
    <!-- 更多 -->
    <div class="more" @click="moreFnc">
      <img src="../../static/image/more.png" alt="">
    </div>
    <div class="detail" v-show="detailFlag">
      <ul>
        <li>
          <!-- <router-link to="/order" tag="span">物流信息</router-link> -->
          <span @click="route1">
            物流信息
          </span>
        </li>
        <li>
          <!-- <router-link to="/gift" tag="span">礼品征集</router-link> -->
          <span @click="route2">
            礼品征集
          </span>
        </li>
        <li>
          <!-- <router-link to="/code" tag="span">兑换码列表</router-link> -->
          <span @click="route3">兑换码列表</span>
        </li>
        <li>
          <!-- <router-link to="/code" tag="span">兑换码列表</router-link> -->
          <span @click="route4">产品列表</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
import { Button} from 'element-ui'
import { MessageBox, Toast } from 'mint-ui';
export default {
  name: 'Content',
  components: {
    Button
  },
  props: {
    msg: String
  },
  data(){
    return {
      login: false,
      integral:'',
      detailFlag:false,
      token: '',
      userInfo:'',
      goodsList:[
        // {
        //   goodsId:'0',
        //   goodsName: '创意胶囊伞防紫外线',
        //   needIntegral:200,
        //   remain:10,
        //   price: 200,
        //   imgUrl:'http://www.jxdetai.com/Storage/master/product/thumbs100/100_1b7492be276345148f18336733383277.png'
        // },
        // {
        //   goodsId:'0',
        //   integral:200,
        //   remain:10,
        //   price: 200,
        //   imgUrl:'http://www.jxdetai.com/Storage/master/product/thumbs100/100_1b7492be276345148f18336733383277.png'
        // },
        // {
        //   goodsId:'0',
        //   integral:200,
        //   remain:10,
        //   price: 200,
        //   imgUrl:'http://www.jxdetai.com/Storage/master/product/thumbs100/100_1b7492be276345148f18336733383277.png'
        // },
        // {
        //   goodsId:'0',
        //   integral:200,
        //   remain:10,
        //   price: 200,
        //   imgUrl:'http://www.jxdetai.com/Storage/master/product/thumbs100/100_1b7492be276345148f18336733383277.png'
        // },
        // {
        //   goodsId:'0',
        //   integral:200,
        //   remain:10,
        //   price: 200,
        //   imgUrl:'http://www.jxdetai.com/Storage/master/product/thumbs100/100_1b7492be276345148f18336733383277.png'
        // },
        // {
        //   goodsId:'0',
        //   integral:200,
        //   remain:10,
        //   price: 200,
        //   imgUrl:'http://www.jxdetai.com/Storage/master/product/thumbs100/100_1b7492be276345148f18336733383277.png'
        // },
      ]
    }
  },
  created () {
    this.init()
  },
  mounted () {
  },
  beforeRouteLeave(to, from, next) {
    this.detailFlag = false
    next()
  },
  methods:{
    route1 () {
      if (this.userInfo.state === 'unbind'){
        MessageBox.confirm('还未绑定账号，前往绑定？','温馨提示')
          .then(() => {
            this.$router.push('/login')
          })
          .catch(() => {})
      } else {
        this.detailFlag = false
        this.$router.push('/order')
      }
    },
    route2 () {
      if (this.userInfo.state === 'unbind'){
        MessageBox.confirm('还未绑定账号，前往绑定？','温馨提示')
          .then(() => {
            this.$router.push('/login')
          })
          .catch(() => {})
      } else {
        this.detailFlag = false
        this.$router.push('/gift')
      }
    },
    route3 () {
      if (this.userInfo.state === 'unbind'){
        MessageBox.confirm('还未绑定账号，前往绑定？','温馨提示')
          .then(() => {
            this.$router.push('/login')
          })
          .catch(() => {})
      } else {
        this.detailFlag = false
        this.$router.push('/code')
      }
    },
    route4 () {
      if (this.userInfo.state === 'unbind'){
        MessageBox.confirm('还未绑定账号，前往绑定？','温馨提示')
          .then(() => {
            this.$router.push('/login')
          })
          .catch(() => {})
      } else {
        this.detailFlag = false
        this.$router.push('/productlist')
      }
    },
    init() {
      // 兑换详情接口
      // 兑换积分 历史记录列表
      
      let code = this.$route.query.code
      // 获取商品列表
      api.goods()
        .then((res)=>{
          // res.result
          // let c = [
          //   {
          //     "id": 100001,
          //     "name": "商品名称",
          //     "img_url": "http://www.jxdetai.com/Storage/master/product/thumbs100/100_1b7492be276345148f18336733383277.png",
          //     "point": 20,
          //     "count": 20,
          //     "price": "12.5",
          //     "state": "show"
          //   },
          //   {
          //     "id": 100002,
          //     "name": "商品名称",
          //     "img_url": "http://www.jxdetai.com/Storage/master/product/thumbs100/100_1b7492be276345148f18336733383277.png",
          //     "point": 20,
          //     "count": 20,
          //     "price": "12.5",
          //     "state": "show"
          //   },
          //   {
          //     "id": 100003,
          //     "name": "商品名称",
          //     "img_url": "http://www.jxdetai.com/Storage/master/product/thumbs100/100_1b7492be276345148f18336733383277.png",
          //     "point": 20,
          //     "count": 20,
          //     "price": "12.5",
          //     "state": "show"
          //   }
          // ]
          this.$set(this, 'goodsList', res.results)
        })

      // 获取code换取token
      
      let p = new Promise((resolve) =>{
        api.token({code:code})
          .then(res => {
            // this.token = res.code
            localStorage.setItem('token', res.token)
            resolve()
          })
          .catch(() => {})
      })
      
      p.then(() => {
        api.userInfo()
          .then((res) => {
            this.$set(this, 'userInfo', res)
            // this.$commit('integral', res.point)
          })
      })
    },
    exchangeIngral() {
      if (this.userInfo.state === 'unbind'){
        MessageBox.confirm('还未绑定账号，前往绑定？','温馨提示')
          .then(() => {
            this.$router.push('/login')
          })
          .catch(() => {})
      } else {
        if(!this.integral){
          Toast({
            message: '兑换码不能为空',
            position: 'bottom',
            duration: 2000
          });
        } else {
          api.exchangeIntegral({
            number: this.integral
          })
            .then((res) => {
              Toast({
                message: '兑换成功',
                position: 'bottom',
                duration: 2000
              });
              this.integral = ''
              // this.userInfo.point = Number(this.userInfo.point) + 
              // store.commit('integral', Number(this.userInfo.point) + Number(res.point))
              this.$set(this.userInfo,'point', Number(this.userInfo.point) + Number(res.point))
            })
            .catch(()=>{
              Toast({
                message: '兑换码不存在',
                position: 'bottom',
                duration: 2000
              });
            })
        }
      }
    },
    moreFnc() {
      this.detailFlag = !this.detailFlag
    },
    toOrder(id) {
      // let flag
      // if(Number(this.userInfo.point) >= Number(point)){
      //   flag = true
      // } else {
      //   flag = false
      // }

      if (this.userInfo.state === 'unbind'){
        MessageBox.confirm('还未绑定账号，前往绑定？','温馨提示')
          .then(() => {
            this.$router.push('/login')
          })
          .catch(() => {})
      } else {
        this.$router.push(`/orderdetail?id=${id}&integral=${this.userInfo.point}`)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .exchange
    .logisticsImg
      img
        width 1rem
        margin-top -0.2rem        
    .exchange_input
      width 90%
      margin-bottom 5%
      margin-left 5%
      justify-content space-between
      .el-input
        width 75%
    .exchange_header
      width 90%
      margin-left 5%
      height: 1rem
      border-left 4px #ec5151 solid
      font-size 0.65rem
      color #333
      .exchange_header_l
        flex 1
  .goods_List
    li
      width 90%
      margin-left 5%
      border-bottom 1px solid #ececec
      .goods_l
        flex 2
        img
          width 4.1rem
          height 4.1rem
      .goods_c
        flex 3
        .goodsName
          font-size 0.6rem
        .needIntegral
          font-size 0.5rem
        .remain
          font-size 0.5rem
        .price
          font-size 0.5rem
      .goods_r
        flex 2
        align-items center
        justify-content flex-end
        button
          height 1.05rem
          line-height 1.05rem
          background-color #4c9aea
          border-radius 5px
          font-size 0.6rem
          color #fff
          border none
          padding 0 5px
  .more
    position fixed
    bottom 5rem
    right 2rem
    img
      width 1.5rem!important
      height 1.5rem!important
      width 100%
  .detail
    background #fff
    border 1px solid #ccc
    font-size 0.6rem
    position fixed
    bottom 6.4rem
    right 1rem
    width 3.5rem
    li
      height 1.3rem
      line-height 1.3rem
      display block
      width 100%
      border-bottom 1px dashed #ccc
      &:last-child
        border-bottom none

</style>
