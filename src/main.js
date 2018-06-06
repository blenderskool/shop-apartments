// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueTouch from 'vue-touch'
import VueOnlinePlugin from 'vue-navigator-online'
import VueLazyBackgroundImage from 'vue-lazy-background-images/VueLazyBackgroundImage'


import App from './App'
import store from './store'
import router from './router'
import { firebase } from './firebase'

import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: '#28579D',
    secondary: '#8E9AAC',
    accent: '#27DF43',
    error: '#F73E3E'
  }
})
Vue.use(VueOnlinePlugin)
Vue.use(VueTouch)
Vue.component('lazy-background', VueLazyBackgroundImage)

let app

/* eslint-disable no-new */
firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      components: { App }
    })
  }
})
