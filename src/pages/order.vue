<template>
  <div class="order">
    <header-nav hideSecondary>
      Order details
    </header-nav>

    <div class="secondary--text products">
      <product
        v-for="product in order.products"
        :key="product.id"
        :data="product"
        locked
      />
    </div>

  </div>
</template>

<script>
import Header from '../components/Header'
import Product from '../components/CardProductVert'
import firebase from 'firebase'

export default {
  name: 'order',
  components: {
    'header-nav': Header,
    'product': Product
  },
  data() {
    return {
      order: {}
    }
  },
  created() {
    firebase.firestore().collection('orders').doc(this.$route.params.id).get()
    .then(orderRef => {
      if (!orderRef.exists) return this.$router.go(-1)

      this.order = orderRef.data()
    })
  }
}
</script>

<style scoped>
  .order {
    padding-top: 60px;
  }
</style>
