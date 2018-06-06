<template>
  <!--
    This component is used to render a card grid of products. It is used in the app
    to show products by specific category, vendor.
  -->
  <v-layout class="products" row wrap>
    <v-flex v-for="product in products" :key="product.name" xs6 md2>
      <product
        @click.native="$router.push(`/product/${product.id}`)"
        :data="product"
        :hideVendor="hideVendor"
      />
    </v-flex>
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
      products: []
    }
  },
  watch: {
    '$store.state.products': function() {
      this.products = this.$store.getters.products(this.vendorID)
    }
  },
  created() {
    const products = this.$store.getters.products(this.vendorID)


    if (products && products.length !== 0)
      this.products = products
    else {
      new Promise((resolve, reject) => {

        if (!this.vendorID)
          resolve(firestore.collection('products').get())
        
        resolve(firestore.collection('products')
                .where('vendorID', '==', this.vendorID).get())
      })
      .then(products => {
        if (products.empty) return

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

      })
      .catch(err => {
        console.log(err)
      })
    }
  }

}
</script>

<style scoped>

  .products {
    padding: 5px 15px 70px 15px;
    overflow-y: scroll;
  }

</style>
