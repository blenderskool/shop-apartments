<template>
  <div class="card">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CardBase'
}
</script>

<style scoped>
  .card {
    padding: 20px 20px;
    margin: 0 20px;
    border-radius: 3px;
    background-color: #ffffff;

    box-shadow: 0 10px 25px rgba(20, 23, 28, 0.1);
  }
</style>
