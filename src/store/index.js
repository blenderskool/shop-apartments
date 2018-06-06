import Vue from 'vue'
import Vuex from 'vuex'
import { firestore } from '@/firebase'

Vue.use(Vuex)

function getFromCart(cart, productID) {
  return cart.filter(item => item.id === productID)
}

const store = new Vuex.Store({
  state: {
    cart: [],
    products: [],
    vendors: [],
    user: {}
  },
  getters: {
    cart: state => {
      return state.cart
    },
    totalPrice: state => {
      if (!state.cart.length) return 0;

      return state.cart
              .map(product => product.price*product.quantity)
              .reduce((prev, next) => prev + next)
    },
    products: state => vendorID => {
      if (vendorID)
        return state.products.filter(product => product.vendorID == vendorID)

      return [...state.products].sort((x, y) => x.inStock === y.inStock ? 0 : x.inStock ? -1 : 1)

    },
    product: state => productID => {
      return state.products.filter(product => product.id === productID)[0]
    },
    vendor: state => vendorID => {
      return getFromCart(state.vendors, vendorID)[0]
    }
  },
  mutations: {
    addToCart(state, product) {
      /**
       * This adds a product to the shopping cart
       */
      if (state.cart.length) {
        const items = getFromCart(state.cart, product.id)
        if (items[0]) {
          items[0].quantity = parseInt(items[0].quantity) + 1 + '';
        }
        else {
          state.cart.push(product)
        }
      }
      else {
        state.cart.push(product)
      }
    },
    emptyCart(state) {
      /**
       * This removes all the products from the cart
       */
      state.cart = []
    },
    setQuantity(state, params) {
      /**
       * This updates the quantity of specific prodcut in the cart
       */
      const item = getFromCart(state.cart, params.id)[0]
      if (!item) return

      item.quantity = params.quantity ? params.quantity : 0
    },
    removeFromCart(state, productID) {
      /**
       * Removes a product from cart
       */
      const item = getFromCart(state.cart, productID)[0]
      if (!item) return;

      state.cart.splice(state.cart.indexOf(item), 1)
    },

    addProduct(state, product) {
      state.products.push(product)
    },

    addUser(state, user) {
      state.user = user
    },

    addVendor(state, vendorData) {
      const vendor = vendorData.data()
      vendor.id = vendorData.id
      state.vendors.push(vendor)
    }
  },
  actions: {
    addProducts(context, products) {
      /**
       * This action is used to asynchronously get vendor data for every prodcut
       * that is to be added to the store, this allows us to use vendor data in
       * other parts of the app
       */
      const vendorIDs = []

      products.forEach(product => {

        /**
         * Add the product to the store first, so that it isn't caught in
         * asynchronous cycles
         */
        context.commit('addProduct', product)
        
        /**
         * Checks made here so that vendor data is recieved only once for
         * every vendor
         */
        if (vendorIDs.includes(product.vendorID)) return;
        vendorIDs.push(product.vendorID)

        /**
         * Asynchronously get vendor data now
         */
        firestore.collection('vendors').doc(product.vendorID).get()
        .then(vendorData => {
          if (!vendorData) return

          /**
           * Add the vendor data to the store
           */
          context.commit('addVendor', vendorData)
        })

      })
    }
  }
})

export default store