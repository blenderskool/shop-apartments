<template>
  <div class="cart">
    <header-nav :hideSecondary="locked">
      {{ locked ? 'Confirm your order' : 'In your cart' }}
    </header-nav>

    <div class="secondary--text products">
      <product
        v-for="product in cart"
        :key="product.id"
        :data="product"
        @removed="itemRemoved(product)"
        :locked="locked"
        :disableLink="locked"
      />

      <div class="message" v-if="cart.length && !locked">
        Swipe products to right to remove them from cart
      </div>
      <div class="message" v-if="!cart.length && !locked">
        Your cart looks empty! Start shopping
      </div>
    </div>

    <div class="total" v-if="cart.length">
      <div class="label">
        Total
      </div>
      <div class="primary--text price">
        ₹{{ totalPrice }}
      </div>
    </div>

    <footer-buttons
      button1="Continue shopping"
      button2="Checkout"
      @button1="$router.push('/shop')"
      @button2="$router.push('/cart?confirm=1')"
      v-if="cart.length"
    />
    <footer-buttons
      button1="Back to shop"
      @button1="$router.push('/shop')"
      v-else
    />

    <footer-buttons
      button2="Confirm Order"
      @button2="confirmOrder"
      v-if="locked && cart.length"
    />

    <v-snackbar
      color="primary"
      bottom
      v-model="snack.show"
      :timeout="2000"
    >
      {{ snack.text }}
    </v-snackbar>
  </div>
</template>

<script>
import Header from '../components/Header'
import Card from '../components/CardProductVert'
import FooterButtons from '../components/FooterButtons'
import { firebase } from '../firebase';

export default {
  name: 'cart',
  components: {
    'header-nav': Header,
    'product': Card,
    'footer-buttons': FooterButtons
  },
  data() {
    return {
      snack: {
        show: false,
        text: ''
      },
      locked: false
    }
  },
  computed: {
    cart() {
      return this.$store.getters.cart
    },
    totalPrice() {
      return this.$store.getters.totalPrice
    }
  },
  methods: {
    itemRemoved(product) {
      this.snack.text = `Removed ${product.quantity} ${product.name} from cart`
      this.snack.show = true
    },
    confirmOrder() {
      /**
       * Confirms the order, and empties the cart items
       */
      if (!this.cart || !this.cart.length) return
      const products = []

      this.cart.forEach(product => {
        products.push({
          quantity: parseInt(product.quantity),
          price: product.price,
          name: product.name,
          image: product.images[0],
          vendorID: product.vendorID,
          id: product.id
        })
      })

      firebase.firestore()
      .collection('orders')
      .add({
        userID: this.$store.state.user.uid,
        totalPrice: this.totalPrice,
        products
      })
      .then(orderRef => {
        this.$store.commit('emptyCart')
        this.$router.push(`/confirmed/${orderRef.id}`)

      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  watch: {
    '$route.query.confirm': function() {
      this.locked = Boolean(this.$route.query.confirm)
    }
  }
}
</script>

<style scoped>
  
  .cart {
    padding-top: 60px;
    padding-bottom: 140px;
  }

  .total {
    position: fixed;
    bottom: 60px;
    right: 0;
    left: 0;
    padding: 10px 20px;
    font-size: 24px;
    display: flex;
    background-color: #F8FBFF;
  }
  .total .label {
    margin-right: auto;
  }
  .total .price {
    margin-left: auto;
  }

  .products {
    margin: 20px 0 0 0;
  }

  .products .message {
    text-align: center;
    font-size: 18px;
    margin: 20px 20px 0 20px;
  }
</style>
