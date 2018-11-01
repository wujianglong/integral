<template>
  <div class="productList">
    <Nav :NavText="navText"></Nav>
    <div class="productList_content">
      <div class="layoutFlex select_content">
        <div class="selectText">
          请选择产品类型：
        </div>
        <el-select v-model="value" @change="selectChange" size = "small" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="product_list">
        <ul>
          <li class="layoutFlex" v-for="(item, index) in data" :key="index">
            <div class="ml5 mr5">
              <img :src="item.img_url" alt="">
            </div>
            <div class="product_txt layoutFlex">
              <p>
                {{item.brand}} {{ item.name}}
              </p>
              <p>
                系列： {{item.series}}
              </p>
              <p>
                包装：{{item.pack}}
              </p>
              <p>
                规格：{{item.size}}
              </p>
              <p>
                价值: <span class="red">{{item.point}}积分</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="mt5">
        <el-pagination
          background
          pager-count = 3
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
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
        navText: '产品列表',
        number:1,
        goodList:[],
        integral: 0,
        options: [{
          value: '飞鹤',
          label: '飞鹤'
        }, {
          value: '每一',
          label: '每一'
        }],
        value: '',
        total:100,
        data: ''
      }
    },
    components:{
      Nav
    },
    created(){
      this.update(1)
    },
    methods:{
      update(i){
        api.product({
          params:{
            page: i,
          }
        })
          .then(res => {
            this.data = res.results
            this.total = res.results.length
          })
      },
      handleCurrentChange(val){
        this.update(val)
      },
      selectChange(val){
        console.log(val)
      }
    }
  }
</script>
<style scoped lang="stylus">
  .red
    color #ec5151
  .productList
    .productList_content
      padding-top 1.8rem
      .select_content
        display none
        padding 0.5rem 0.5rem
        align-items center
        .selectText
          font-size 0.7rem
      .product_list
        ul
          li
            border-bottom 1px solid #eee
            padding 0.5rem 0
            img
              width 4.3rem
              height 4.3rem
            p
              font-size 0.6rem
              text-align left
        .product_txt
          justify-content: space-between;
          flex-direction: column;
</style>
