<template>
  <v-toolbar
    class="toolbar"
    :class="{transparent}"
    dark
    fixed
    :color="transparent ? 'transparent' : 'primary'"
  >
    <v-btn
      icon
      v-if="!hideBack"
      @click="$router.go(-1)"
    >
      <v-tooltip bottom>
        <v-icon slot="activator" medium>arrow_back</v-icon>
        <span>Back</span>
      </v-tooltip>
    </v-btn>

    <v-toolbar-title style="font-weight: 700">
      <slot />
    </v-toolbar-title>
    
    <v-spacer />

    <v-tooltip bottom>
      <v-btn
        icon
        slot="activator"
        class="cart"
        to="/cart"
        v-if="!hideSecondary"
      >
        <v-icon>shopping_cart</v-icon>
        <div class="error counter">{{ cartItems }}</div>
      </v-btn>
      <span>Cart</span>
    </v-tooltip>

    <!-- Tooltip component is attached to the icon instead of the button so that
    the margin isn't destroyed -->
    <v-btn
      icon
      to="/account"
      v-if="!hideSecondary"
    >
      <v-tooltip bottom>
        <v-icon slot="activator">account_circle</v-icon>
        <span>Account</span>
      </v-tooltip>
    </v-btn>

  </v-toolbar>
</template>

<script>
export default {
  name: 'Header',
  props: {
    transparent: Boolean,
    hideBack: Boolean,
    hideSecondary: Boolean
  },
  computed: {
    cartItems() {
      const cart = this.$store.getters.cart
      if (!cart.length) return 0;

      return cart
              .map(product => product.quantity)
              .reduce((prev, next) => parseInt(prev) + parseInt(next))
    }
  }
}
</script>

<style scoped>
  .toolbar {
    box-shadow: 0 8px 30px rgba(40, 87, 157, 0.45);
    z-index: 2;
  }

  .transparent {
    box-shadow: none;
    background-color: rgba(20, 23, 28, 0.4) !important;
  }
  .cart {
    position: relative;
  }
  .counter {
    width: 18px;
    height: 18px;
    border-radius: 100%;

    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: 700;
    font-size: 15px;
  }
</style>
