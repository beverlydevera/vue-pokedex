import './assets/css/reset.css';
import './assets/css/loader.css';

import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

/** 
 * Using vue-js-modal library
*/
import vmodal from 'vue-js-modal';
Vue.use(vmodal);

new Vue({
  render: h => h(App),
}).$mount('#app')
