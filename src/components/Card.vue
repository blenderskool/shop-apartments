<template>
  <card>
    <div class="heading">
      <slot name="title" />
    </div>
    <div class="description secondary--text">
      <slot name="description" />
    </div>
    <slot />
  </card>
</template>

<script>
import CardBase from './CardBase'
export default {
  name: 'Card',
  components: {
    'card': CardBase
  }
}
</script>

<style scoped>
  .heading {
    font-weight: 700;
    font-size: 30px;
  }

  .description {
    margin-top: 10px;
    line-height: 1.4em;
  }
</style>
