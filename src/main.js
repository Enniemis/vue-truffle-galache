import Vue from 'vue'
import App from './App.vue'
// import {ethers} from 'ethers'

import Web3 from 'web3'
Vue.config.productionTip = false
Vue.prototype.Wbe3 = Web3

new Vue({
  render: h => h(App),
}).$mount('#app')
