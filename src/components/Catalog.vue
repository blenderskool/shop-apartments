<template>
  <!--
    This component is used to render a card grid of products. It is used in the app
    to show products by specific category, vendor.
  -->
  <v-layout class="products" row wrap>
    <v-flex v-for="product in products" :key="product.id" xs6 md2 sm3>
      <product
        @click.native="$router.push(`/product/${product.id}`)"
        :data="product"
        :hideVendor="hideVendor"
      />
    </v-flex>
    <v-flex class="secondary--text empty-message" v-if="notFound">
      No products found
    </v-flex>

    <v-snackbar
      v-if="loading"
      bottom
      value="true"
      :timeout="3500"
    >
      Loading...
    </v-snackbar>

  </v-layout>
</template>

<script>
import Product from './CardProduct'
import { firestore } from '../firebase';

export default {
  name: 'Catalog',
  components: {
    'product': Product
  },
  props: {
    vendorID: String,
    hideVendor: Boolean
  },
  data() {
    return {
      products: [],
      loading: true,
      notFound: false
    }
  },
  watch: {
    '$store.state.products': function() {
      this.products = this.$store.getters.products(this.vendorID)
    },
    '$route': function(val, oldVal) {
      /**
       * We watch the whole route object, so that we can compare if the user
       * has come from a different page. In that case, don't re-render the catalog
       * as the shop layout is kept alive
       */
      if (val.name !== 'shop' || oldVal.name !== 'shop') return

      this.loading = true
      this.products = []
      this.notFound = false
      this.getProducts()
    }
  },
  methods: {
    getProducts() {
      let category = this.$route.query.category
      category = category ? category : 'all'

      const products = this.$store.getters.products(this.vendorID)

      if (!products || products.length === 0 || category || this.vendorID) {
        new Promise((resolve, reject) => {

          if (!this.vendorID) {
            if (category === 'all')
              resolve(firestore.collection('products').get())
            else
              resolve(firestore.collection('products')
                      .where('category', '==', category).get())
          }

          resolve(firestore.collection('products')
                  .where('vendorID', '==', this.vendorID).get())
        })
        .then(products => {
          if (products.empty) return this.notFound = true

          const productsData = [];
          products.docs.forEach(product => {
            if (!product.exists) return

            const productData = product.data()
            productData.id = product.id
            
            productsData.push(productData)
          })
          
          if (!this.vendorID) {
            this.$store.dispatch('addProducts', productsData)
          }
          else {
            this.products = productsData
          }

          this.loading = false
        })
        .catch(err => {
          this.notFound = true
          console.log(err)
        })
      }
      else {
        this.products = products
        this.loading = false
      }
    }
  },
  created() {
    this.getProducts()
  }

}
</script>

<style scoped>

  .products {
    padding: 5px 15px 70px 15px;
    overflow-y: scroll;
  }

</style>
