import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  integral_count: 0
}

const getters = {
 
}

const mutations = {
  integralFnc (state, status) {
    state.integral_count = status
  }
}

const actions = {
  
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
