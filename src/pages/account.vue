<template>
  <div class="account">
    <header-nav>
      Your account
    </header-nav>

    <card>
      <template slot="title">Akash</template>
      <template slot="description">
        <v-icon color="secondary">home</v-icon> P4-403
        <br>
        <v-icon color="secondary">phone</v-icon> +919972662065
      </template>
    </card>

    <card>
      <template slot="title">Orders</template>
    </card>

  </div>
</template>

<script>
import Header from '../components/Header'
import Card from '../components/Card'
import { firestore } from '../firebase';

export default {
  name: 'account',
  components: {
    'header-nav': Header,
    'card': Card
  },
  data() {
    return {
      orders: []
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  created() {
    firestore.collection('orders')
    .where('userID', '==', this.user.uid).get()
    .then(ordersRef => {
      if (ordersRef.empty) return

      const orders = []
      ordersRef.docs.forEach(orderRef => {
        if (!orderRef.exists) return
        
        orders.push(Object.assign({}, orderRef.data(), { id: orderRef.id }))
      })

      this.orders = orders

    })
  }
}
</script>

<style scoped>

  .account {
    padding-top: 60px;
  }
  
  .account >>> .description {
    line-height: 1.85em;
  }

  .account >>> .card {
    margin-top: 15px;
    margin-bottom: 15px;
  }

</style>
