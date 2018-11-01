<template>
  <div class="logisticsDetail">
    <Nav :NavText="navText"></Nav>
    <div class="logisticsDetail_content">
      <div class="ml20 mt10">
        <p>
          <span>
            物流公司:
          </span>
          <span>
            {{s1}}
          </span>
        </p>
        <p class="mt5"> 
          <span>
            物流订单:
          </span>
          <span>
            {{s2}}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  import Nav from '@/components/Nav.vue'
  export default{
    name: 'login',
    data(){
      return {
        navText: '物流详情',
        textarea: '',
        s1:'',
        s2:''
      }
    },
    components:{
      Nav
    },
    created(){
      this.s1 = this.$route.query.s1
      this.s2 = this.$route.query.s2
    },
    methods: {
      
    }
  }
</script>
<style scoped lang="stylus">
  .logisticsDetail_content
    padding-top 1.8rem
    font-size 0.6rem
    >div
      text-align left
    
</style>
