<template>
  <v-touch @panmove.prevent="panning" @panend="panComplete" :pan-options="{ direction: 'horizontal' }">
    <card class="product" :style="{transform: `translate(${delX}px)`}">
      <div class="information">
        <div
          class="image"
          :style="{backgroundImage: `url(${getImage()})`}"
          v-ripple
          @click="openProduct"
        />
        <div class="description">
          <div class="black--text name" @click="openProduct">{{ data.name }}</div>
          <div class="primary--text price">₹{{ data.price }}</div>
          <div class="secondary--text option">
            Quantity:
            <v-select
              solo
              flat
              mask="#"
              color="secondary"
              :items="['1', '2', '3']"
              class="control"
              v-model="quantity"
              :disabled="locked"
            />
          </div>
        </div>
      </div>
    </card>
  </v-touch>
</template>

<script>
import Card from './CardBase'

/** This controls the speed with which the card attains its actual position after
 * swipe is complete
 */
const swipeSpeed = 40

export default {
  name: 'CardProdcutVertical',
  components: {
    'card': Card,
  },
  props: {
    data: Object,
    locked: Boolean,
    disableLink: Boolean
  },
  data() {
    return {
      quantity: 1,
      delX: 0
    }
  },
  methods: {
    panning(e) {
      if (this.locked) return

      const delX = e.deltaX
      if (delX > 0)
        this.delX = delX

    },
    panComplete(e) {
      if (this.locked) return

      if (e.deltaX < 0) return this.delX = 0;

      if (e.distance < 230) {
        const interval = setInterval(() => {
          if (this.delX-swipeSpeed < 0) {
            this.delX = 0
          }
          else
            this.delX -= swipeSpeed

          if (this.delX <= 0)
            clearInterval(interval)
        }, 0)
      }
      else {
        const interval = setInterval(() => {
          this.delX += swipeSpeed
          if (this.delX > 500) {
            clearInterval(interval)
            this.$store.commit('removeFromCart', this.data.id)
            this.$emit('removed')
          }
        }, 0)
      }
    },
    openProduct() {
      if (this.disableLink) return

      this.$router.push(`/product/${this.data.id}`)
    },
    getImage() {
      if (this.data.images && this.data.images.length) return this.data.images[0]

      return this.data.image
    }
  },
  created() {
    this.quantity = String(this.data.quantity)
  },
  watch: {
    quantity() {
      if (this.locked) return

      this.$store.commit('setQuantity', { id: this.data.id, quantity: this.quantity })
    }
  }
}
</script>

<style scoped>

  .product {
    padding: 0 !important;
    margin-top: 10px !important;
    margin-bottom: 10px !important;
  }

  .product .information {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .product .image {
    width: 110px;
    height: 100px;
    background-size: cover;
    background-position: center;
    margin-right: auto;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  .product .description {
    padding: 8px 15px 0 15px;
    display: flex;
    flex: 1;
    min-width: 0;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .product .name {
    font-size: 24px;
    text-align: left;
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
    flex: 3;
  }

  .product .price {
    text-align: right;
    flex: 1;
  }

  .product >>> .vendor .avatar-container {
    width: 25px;
    height: 25px;
  }
  .product >>> .vendor {
    font-size: 16px;
    color: #8E9AAC;
  }

  .product .additional {
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    overflow: hidden;
  }

  .product .option {
    display: flex;
    align-items: center;
    font-size: 16px;
    flex-basis: 100%;
  }

  .product .option .control {
    flex: 0.2;
    margin-left: auto;
  }

</style>

<style>
.v-text-field--enclosed .v-input__control, .v-text-field--enclosed .v-input__slot {
  position: relative !important;
}
</style>

