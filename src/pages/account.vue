<template>
  <div class="account">
    <header-nav>
      Your account
    </header-nav>

    <card>
      <div class="name">Akash</div>
      <div class="secondary--text description">
        <v-icon color="secondary">home</v-icon> P4-403
        <br>
        <v-icon color="secondary">phone</v-icon> +919972662065
      </div>
    </card>

    <card class="order-card">
      <div class="name">
        Orders
      </div>

      <div class="secondary--text empty-message" v-if="notFound">
        Orders not found
      </div>

      <router-link
        class="order"
        tag="div"
        v-for="order in orders"
        :key="order.id"
        :to="{name: 'order', params: { id: order.id }}"
        v-ripple
      >
        <!-- Only images of first three products are shown to keep the UI clean -->
        <div class="thumbs">
          <div
            class="image"
            v-for="(product, i) in order.products"
            v-if="i < 3"
            :key="product.id"
            :style="{
              backgroundImage: `url(${product.image})`,
              transform: `translate(${i*5}px, ${i*5}px)`
            }"
          />
        </div>
        <div class="details">
          <div class="name">Order on {{ order.time }}</div>
          <span class="secondary--text quantity">
            {{ getQuantity(order.products) }} items
          </span>
          <span class="primary--text price">₹{{ order.totalPrice }}</span>
        </div>
      </router-link>
    </card>

    <v-snackbar v-if="!orders.length" value="true" bottom>
      Loading...
    </v-snackbar>

  </div>
</template>

<script>
import Header from '../components/Header'
import CardBase from '../components/CardBase'
import { firestore } from '../firebase';

export default {
  name: 'account',
  components: {
    'header-nav': Header,
    'card': CardBase
  },
  data() {
    return {
      orders: [],
      notFound: false
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    getQuantity(products) {
      return products.map(product => product.quantity).reduce((prev, next) => prev+next)
    }
  },
  created() {
    firestore.collection('orders')
    .where('userID', '==', this.user.uid).get()
    .then(ordersRef => {
      if (ordersRef.empty) return this.notFound = true

      const orders = []
      ordersRef.docs.forEach(orderRef => {
        if (!orderRef.exists) return

        const orderData = orderRef.data();
        orderData.time = (new Date(orderData.created.toDate())).toDateString()
        
        orders.push(Object.assign({}, orderData, { id: orderRef.id }))
      })

      this.orders = orders

    })
    .catch(err => {
      this.notFound = true
      console.log(err)
    })
  }
}
</script>

<style scoped>

  .account {
    padding-top: 60px;
  }

  .account .name {
    font-size: 24px;
  }
  
  .account .description {
    line-height: 1.5em;
    font-size: 18px;
    margin-top: 15px;
  }

  .account >>> .card {
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .account >>> .order-card {
    padding-right: 0;
    padding-left: 0;
  }

  .account >>> .order-card .name {
    margin-left: 20px;
    margin-bottom: 10px;
  }

  .order {
    display: flex;
    align-items: center;
    padding: 8px 20px;
    border-bottom: 1px solid rgba(142, 154, 172, 0.2);
  }

  .order .thumbs {
    position: relative;
    flex: 0 0 120px;
    height: 90px;
  }

  .order .image {
    width: 100px;
    height: 80px;
    background-size: cover;
    background-position: center;
    border-radius: 3px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .order .image:first-child {    
    box-shadow: 0 10px 25px rgba(20, 23, 28, 0.1);
  }

  .order .name {
    font-size: 18px;
    margin: 0 0 5px 0 !important;
  }

  .order .quantity {
    font-size: 18px;
  }

  .order .price {
    float: right;
  }

</style>
