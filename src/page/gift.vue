<template>
  <div class="gift">
    <Nav :NavText="navText"></Nav>
    <div class="gift_content">
      <div>
        <el-input
          type="textarea"
          :rows="10"
          placeholder="请输入您想要的商品名称及商品相关信息"
          v-model="textarea">
        </el-input>
      </div>
      <div class="mt10">
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import Nav from '@/components/Nav.vue'
  import api from '@/api/api'
  import { Toast } from 'mint-ui';
  export default{
    name: 'login',
    data(){
      return {
        navText: '积分商品意见征集',
        textarea: ''
      }
    },
    components:{
      Nav
    },
    methods: {
      submit(){
        if (!this.textarea) {
          Toast({
            message: '内容不能为空',
            position: 'bottom',
            duration: 2000
          });
          return false
        }
        api.collect({
          content: this.textarea
        })
          .then(() => {
            Toast({
              message: '提交成功',
              position: 'bottom',
              duration: 2000
            });
            this.textarea = ''
          })
      }
    }
  }
</script>
<style scoped lang="stylus">
  .gift
    .gift_content
      padding-top 1.8rem
      width 92%
      margin 1rem auto
</style>
