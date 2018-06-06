<template>
  <div class="tile" :style="tileStyles(color)" v-ripple>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Tile',
  props: ['color'],
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

      return {
        backgroundColor: color,
        backgroundImage: `linear-gradient(135deg, ${color} 1%, ${this.darkenColor(color)} 100%)`,
        boxShadow: `0px 5px 30px ${this.hexToRgba(color)}`
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

    border-radius: 5px;
    color: #ffffff;
    font-weight: 700;
    font-size: 20px;
    margin: 0 5px;
    cursor: pointer;
    user-select: none;
    transition: transform 0.2s ease;
  }
  .tile:active {
    transform: translateY(1px);
  }
</style>
