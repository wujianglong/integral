import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import "../static/css/swiper-4.3.5.min.css";
import "../static/js/rem.js";
import VueAwesomeSwiper from "vue-awesome-swiper";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import store from './store/index.js'


Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI)
Vue.use(Mint);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
