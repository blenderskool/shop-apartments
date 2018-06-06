<template>
  <div class="confirm">
    <header-nav hideSecondary hideBack />

    <info
      title="Order confirmed"
      description="Vendors would contact you fro further queries."
      button = "Other details"
      @button="$router.push({name: 'order', params: {id: $route.params.id}})"
      type="success"
    />

    <footer-buttons
      button1="Continue shopping"
      @button1="$router.push('/shop')"
    />
  </div>
</template>

<script>
import Header from '../components/Header'
import Info from '../components/Info'
import Footer from '../components/FooterButtons'

export default {
  name: 'confirmation',
  components: {
    'header-nav': Header,
    'info': Info,
    'footer-buttons': Footer
  }
}
</script>

<style scoped>

</style>
