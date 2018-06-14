<template>
  <!--
    This component is used to display different product categories. It follows
    a horizontal tile based system which works well for organizing small amounts
    of products
  -->
  <router-link
    tag="div"
    class="tile"
    :style="tileStyles(color)"
    v-ripple
    :to="{ name: 'shop', query: { category: name !== 'all' ? name : undefined }}"
  >
    <img :src="image" v-if="image">
    {{ name }}
  </router-link>
</template>

<script>
export default {
  name: 'Tile',
  props: ['color', 'name'],
  computed: {
    image() {
      if (this.name === 'veg')
        return '/static/img/svgs/cat_veg.svg'
      else if (this.name === 'non-veg')
        return '/static/img/svgs/cat_nonveg.svg'
      else if (this.name === 'clothing')
        return '/static/img/svgs/cat_clothing.svg'
    }
  },
  methods: {
    hexToRgba(hex) {
      /**
       * Converts hex color to rgba type that will used in box-shadow
       */
      let rgb = [
        parseInt(hex.slice(1, 3), 16),
        parseInt(hex.slice(3, 5), 16),
        parseInt(hex.slice(5, 7), 16)
      ];

      return `rgba(${rgb.join()}, 0.3)`;
    },
    darkenColor(color) {
      const rgb = [color.substring(1,3), color.substring(3,5), color.substring(5,7)];
      return `rgb(${rgb.map(c => Math.round((parseInt(c, 16) * 0.55))).join()})`;
    },
    tileStyles(color) {

      let category = this.$route.query.category
      category = category ? category : 'all'

      return {
        backgroundColor: color,
        backgroundImage: `linear-gradient(135deg, ${color} 1%, ${this.darkenColor(color)} 100%)`,
        boxShadow: `0px 5px 30px ${this.hexToRgba(color)}`,
        opacity: category === this.name ? '0.5' : '1'
      }
    }
  }
}
</script>

<style scoped>
  .tile {
    width: 110px;
    height: 80px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    flex-direction: column;

    border-radius: 5px;
    color: #ffffff;
    font-weight: 700;
    font-size: 18px;
    text-transform: capitalize;
    margin: 0 3px;
    cursor: pointer;
    user-select: none;
    transition: transform 0.2s ease;
  }
  .tile:active {
    transform: translateY(1px);
  }
  .tile:first-child {
    margin-left: 0;
  }

  .tile img {
    height: 22px;
    margin-bottom: 5px;
  }
</style>
