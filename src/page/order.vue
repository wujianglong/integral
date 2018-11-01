<template>
  <div class="order">
    <Nav :NavText="navText"></Nav>
    <div class="order_content">
      <ul>
        <li class="mt5" v-for="(item, index) in results" :key="index">
          <div class="order_h layoutFlex">
            <img class="ml5 mr5" src="../../static/image/logistics.png" alt="">
            <span class="flex1 tal">
              <span v-if="item.state === 'exchanged'">
                {{item.updated_at | timeFnc}}
              </span>
              <span v-if="item.state === 'delivered'">
                {{item.updated_at | timeFnc}}
              </span>
              <span v-if="item.state === 'completed'">
                {{item.updated_at | timeFnc}}
              </span>
            </span>
            <span class="fr mr5 color1">
              <span v-if="item.state === 'exchanged'">
                已兑换
              </span>
              <span v-if="item.state === 'delivered'">
                已发货
              </span>
              <span v-if="item.state === 'completed'">
                已完成
              </span>
            </span>
          </div>
          <div class="order_c">
            <div class="mt5 mb5 layoutFlex">
              <div class="ml5 orderImg">
                <img :src="item.good.img_url" alt="">
              </div>
              <div class="tal cloume layoutFlex ml5">
                <p class="order_name">{{item.good.name}}</p>
                <p class="order_integral">{{item.point}}<span>积分</span><span class="fr mr5">X{{item.count}}</span></p>
              </div>
            </div>
          </div>
          <div class="order_b">
            <span class="fl ml5">
              合计: <span>{{item.total}}</span>积分
            </span>
            <span v-if="item.state != 'exchanged'" class="fr mr5 weliu" @click="lookOrder(item.express_company, item.express_number)">
              查看物流
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import api from '@/api/api'
  import Nav from '@/components/Nav.vue'
  export default{
    name: 'login',
    data(){
      return {
        navText: '订单列表',
        verifyTxt: '获取验证码',
        verifyFlag: false,
        tel:"",
        ver:"",
        results:[]
      }
    },
    filters:{
      stateFnc (d){
        let n
        switch(d) {
          case 'exchanged':
            n = '已兑换'
            break
          case 'delivered':
            n = '已发货'
            break
          case 'completed':
            n = '已完成'
        }
        return n
      },
      timeFnc(s){
        let g = new Date(s)
        return g.getFullYear() + '-' + g.getMonth() + '-' + g.getDate() + ' ' + g.getHours() + ':' +g.getMinutes()
      }
    },
    components:{
      Nav
    },
    created(){
      // /api/frontend/users/orders/
      api.order()
        .then((res) => {
          this.results = res.results
        })

      api.codeList()
    },
    methods: {
      lookOrder(i, i1){
        this.$router.push('/logisticsDetail?s1=' + i +'&s2=' + i1)
      }
    }
  }
</script>
<style scoped lang="stylus">
  .color1
    color #deb35e
  .order
    height 100%
    width 100%
    background #f2f2f2
    .orderImg
      >img
        width 4rem
        height 4rem
    .order_content
      padding-top 1.8rem
      li
        background #fff
        .order_h
          height 1.5rem
          line-height 1.5rem
          font-size 0.7rem
          align-items center
          align-content center
          img
            width 0.8rem
            height 0.8rem
        .order_c
          overflow hidden
          background #f7f7f7
          .order_name
            font-size 0.8rem
          .order_integral
            font-size 0.7rem
          .cloume
            flex 1
            flex-direction column
            justify-content space-between
        .order_b
          height 1.5rem
          line-height 1.5rem
          font-size 0.7rem
          .weliu
            font-size 0.5rem
            height 1rem
            line-height 1.1rem
            padding 0 0.3rem
            margin-top 0.2rem
            display inline-block
            border-radius 1rem
            border 1px solid #ccc
</style>
