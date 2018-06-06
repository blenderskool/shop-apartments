<template>
  <div
    class="product"
    :style="data.inStock ? {} : {opacity: 0.4}"
  >
    <card v-ripple>
      <lazy-background
        :image-source="data.images[0]"
        image-class="product-image"
        loading-image="/static/img/loader.png"
        error-image="/static/img/loader.png"
      />
      <div class="description">
        <div class="name">
          {{ data.name }}
        </div>
        <div class="details">
          <div class="primary--text price">₹{{ data.price }}</div>
          <vendor
            class="vendor"
            v-if="vendor && !hideVendor"
            :vendor="vendor"
          />
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import CardBase from './CardBase'
import Vendor from './Vendor'

export default {
  name: 'CardProduct',
  props: ['data', 'hideVendor'],
  components: {
    'card': CardBase,
    'vendor': Vendor
  },
  computed: {
    vendor() {
      if (this.hideVendor) return

      return this.$store.getters.vendor(this.data.vendorID)
    }
  }
}
</script>

<style scoped>

  .product >>> .card {
    padding: 0;
    margin: 10px 5px;
    cursor: pointer;
  }

  .product .product-image {
    height: 140px;
    width: 100%;
    background-size: cover;
    background-position: center;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  .product .name {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-x: hidden;
  }

  .product .description {
    padding: 8px 15px 1px 15px;
  }

  .product >>> .vendor .avatar-container {
    width: 25px;
    height: 25px;
  }
  .product >>> .vendor {
    font-size: 16px;
    color: #8E9AAC;
  }

  .product .details {
    margin-top: 5px;
    margin-bottom: 0;
  }

  .product .price {
    margin-bottom: 5px;
  }

</style>
