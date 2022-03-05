import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
     authenticated: false,
     headerTitle: '',
     snackbar: {
       message: "",
       color: "",
       isActive: false
     },
     overlay: false
  },
  mutations: {
    changeHeaderTitle(state, text) {
      state.headerTitle = text;
    },
    triggerSnackbar(state, params) {
      state.snackbar = {...params, isActive:true}
    },
    triggerOverlay(state) {
      state.overlay = !state.overlay
    },
    setAuth(state, flag) {
      state.authenticated = flag;
    }
  },
  actions: {
     
  },
  getters: {

  }
})