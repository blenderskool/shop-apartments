<template>
  <div class="product">
    <header-nav class="header-nav" :transparent="!notFound" />
    <div v-if="!notFound">
      <div class="image" :style="{backgroundImage: `url(${product.images[0]})`}">
        <span class="primary white--text price">₹{{ product.price }}</span>
      </div>

      <card class="information">
        <template slot="title">
          {{ product.name }}
        </template>
        <template slot="description">
          {{ product.description }}
        </template>

        <vendor
          class="vendor"
          v-if="vendor"
          :vendor="vendor"
          allowClick
        />
      </card>

      <footer-buttons
        button1="Contact on WhatsApp"
        :button2="product.inStock ? 'Add to cart' : 'Out of stock'"
        @button1="openWhatsApp"
        @button2="addToCart"
        v-if="!inCart && product.name"
      />
      <footer-buttons
        button1="Contact on WhatsApp"
        button2="See your cart"
        @button1="openWhatsApp"
        @button2="$router.push('/cart')"
        v-else-if="inCart && product.name"
      />

      <v-snackbar v-if="!product.name" value="true" bottom>
        Loading...
      </v-snackbar>
    </div>

    <div v-else>
      <info
        title="Product not found"
        description="Product never existed, or it was deleted by the vendor"
        button = "Back to shop"
        @button="$router.push('/shop')"
        type="error"
      />
    </div>

    <v-snackbar
      color="primary"
      v-model="addedToCart"
      :timeout="1000"
      bottom
    >
      {{ product.name }} was added to cart
    </v-snackbar>
  </div>
</template>

<script>
import Header from '../components/Header'
import Card from '../components/Card'
import Info from '../components/Info'
import Vendor from '../components/Vendor'
import Footer from '../components/FooterButtons'
import { firestore } from '../firebase';

export default {
  name: 'Product',
  components: {
    'card': Card,
    'vendor': Vendor,
    'footer-buttons': Footer,
    'header-nav': Header,
    'info': Info
  },
  data() {
    return {
      product: {
        images: []
      },
      vendor: null,
      inCart: false,
      addedToCart: false,
      notFound: false
    }
  },
  methods: {
    openWhatsApp() {
      /**
       * This takes the the user to WhatsApp chat screen so that user can contact
       * the vendor directly
       * Timeout is used just to show ripple effect
       */
      setTimeout(() => {
        window.open(`https://api.whatsapp.com/send?phone=91${this.vendor.phone}`, '_blank');
      }, 250);
    },
    addToCart() {
      /**
       * This would add the current item to the cart if it's in stock
       */
      if (!this.product.inStock) return

      this.$store.commit('addToCart', Object.assign({}, this.product, {quantity: '1'}))
      this.inCart = this.addedToCart = true;
    }
  },
  created() {
    const productID = this.$route.params.id
    /**
     * Load the product, vendor initially from the store, so that the user doesn't
     * wait to load the product data from the database
     * 
     * (This approach is used, since data once shown on the page would remain static
     * and won't be updated from the server)
     */
    const product = this.$store.getters.product(productID)
    if (product) {
      this.product = product
      /**
       * If product data was available in the store, then definitely the vendor
       * data should be available, hence we load it here itself
       */
      this.vendor = this.$store.getters.vendor(product.vendorID)
    }
    else {
      /**
       * If data is not available, get product, vendor data from the database
       */
      firestore.collection('products').doc(productID).get()
      .then(product => {
        if (!product.exists) return this.notFound = true

        this.product = Object.assign({}, product.data(), { id: product.id })

        return firestore.collection('vendors').doc(this.product.vendorID).get()
      })
      .then(vendorData => {
        if (vendorData)
          this.vendor = Object.assign({}, vendorData.data(), { id: vendorData.id })
      })
      .catch(err => {
        console.log(err);
      })

    }
  }
}
</script>

<style scoped>

  .product {
    padding-bottom: 100px;
  }

  .image {
    height: 320px;
    background-size: cover;
    background-position: center;
    position: relative;
  }
  .image .price {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 8px 20px;
    font-size: 20px;
    border-top-left-radius: 5px;
  }

  .information {
    margin-top: 30px !important;
  }

  .header-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }

  .vendor {
    margin-top: 25px;
  }
</style>
