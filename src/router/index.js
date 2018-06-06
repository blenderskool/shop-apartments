import Vue from 'vue'
import Router from 'vue-router'
import { firebase } from '@/firebase'

import index from '@/pages/index'
import shop from '@/pages/shop'
import product from '@/pages/product'
import cart from '@/pages/cart'
import confirm from '@/pages/confirmation'
import vendor from '@/pages/vendor'
import account from '@/pages/account'
import order from '@/pages/order'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/shop',
      name: 'shop',
      component: shop,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/product/:id',
      name: 'product',
      component: product,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/confirmed/:id',
      name: 'confirmation',
      component: confirm,
      meta: {
        requiresAuth: true
      },
      beforeEnter: (to, from, next) => {
        /**
         * Checks made here so that order is not confirmed directly by visiting the
         * confirmation URL
         */
        if (to.params.id && from.fullPath === '/cart?confirm=1') return next()

        next('/');
      }
    },
    {
      path: '/vendor/:id',
      name: 'vendor',
      component: vendor,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/account',
      name: 'account',
      component: account,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/order/:id',
      name: 'order',
      component: order,
      beforeEnter: (to, from, next) => {
        if (to.params.id) return next()
        
        next('/')
      },
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'order') return next()

  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('/')
  else if (!requiresAuth && currentUser) next('/shop')
  else next()
});

export default router