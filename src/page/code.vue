<template>
  <div class="gift">
    <Nav :NavText="navText"></Nav>
    <div class="code_content">
      <ul>
        <li v-for="(item, index) in tableData" :key="index">
          <span>
            {{item.number}}
          </span>
          <span>
            {{item.point+ '积分'}}
          </span>
          <span>
            {{item.updated_at && item.updated_at.split('T')[0]}}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Nav from '@/components/Nav.vue'
  import api from '@/api/api'
  export default{
    name: 'code',
    data(){
      return {
        navText: '兑换码列表',
        tableData: []
      }
    },
    components:{
      Nav
    },
    created() {
      api.exchangeCode()
        .then((res) => {
          this.tableData = res.results
        })
    }
  }
</script>
<style scoped lang="stylus">
  .code_content
    padding-top 2rem
    width 100%
    ul
      li
        display flex
        width 100%
        height 2rem
        line-height 2rem
        border-bottom 1px dashed #ddd
        font-size 0.7rem
        >span
          flex 1
</style>
