<template>
  <div class="vendor">
    <header-nav />

    <card class="information">
      <img :src="vendor.avatar">
      <div class="details">
        <div class="name">{{ vendor.name }}</div>
        <div class="secondary--text description">{{ vendor.description }}</div>
      </div>
    </card>

    <div class="title-name">{{ vendor.name }}'s store</div>

    <catalog
      :vendorID="$route.params.id"
      hideVendor
    />

    <footer-buttons
      button2="Contact on WhatsApp"
      @button2="openWhatsApp"
    />
  </div>
</template>

<script>
import Header from '../components/Header'
import Catalog from '../components/Catalog'
import Card from '../components/CardBase'
import Footer from '../components/FooterButtons'
import { firestore } from '../firebase'

export default {
  name: 'vendor',
  components: {
    'header-nav': Header,
    'card': Card,
    'footer-buttons': Footer,
    'catalog': Catalog
  },
  data() {
    return {
      vendor: {},
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
  },
  created() {
    const vendorID = this.$route.params.id
    if (!vendorID) return

    const vendor = this.$store.getters.vendor(vendorID)

    if (vendor) {
      this.vendor = vendor
    }
    else {
      firestore.collection('vendors').doc(vendorID).get()
      .then(vendorData => {
        this.vendor = vendorData.data()
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

  .vendor {
    padding-top: 80px;
    padding-bottom: 100px;
  }

  .information {
    display: flex;
    align-items: center;
  }

  .information img {
    height: 80px;
    border-radius: 100%;
    flex-basis: auto;
  }

  .information .details {
    margin-left: 15px;
  }

  .information .name {
    font-size: 24px;
    font-weight: 700;
  }

  .information .description {
    margin-top: 5px;
    line-height: 1.25em;
    font-size: 18px;
  }

</style>
