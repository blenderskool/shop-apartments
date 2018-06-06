<template>
  <span @click="openProduct">
    <div class="avatar-container">
      <img :src="vendor.avatar">
    </div>
    {{ vendor.name }}
  </span>
</template>

<script>
export default {
  name: 'Vendor',
  props: {
    vendor: {
      type: Object,
      default: {}
    },
    allowClick: Boolean
  },
  methods: {
    openProduct() {
      if (this.allowClick)
        this.$router.push(`/vendor/${this.vendor.id}`)
    }
  }
}
</script>

<style scoped>

  span {
    display: inline-flex;
    align-items: center;
  }

  .avatar-container {
    width: 35px;
    height: 35px;
    border-radius: 100%;
    overflow: hidden;
    display: inline-block;
    vertical-align: middle;
    margin-right: 7px;
  }
  .avatar-container img {
    height: 100%;
    width: 100%;
  }

</style>
