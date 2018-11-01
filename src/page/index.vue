<template>
  <div class="index">
    <Carousel/>
    <Content/>
  </div>
</template>
<script>
  import Content from '@/components/Content.vue'
  import Carousel from '@/components/Carousel.vue'
  export default{
    name: 'index',
    components:{
      Content,
      Carousel
    },
    data(){
      return {
        name: 'hah'
      }
    },
    created(){
    }
  }
</script>
