<template>
  <div class="shop">
    <header-nav hideBack>
      Shop
    </header-nav>
    <div class="title-name">
      Selling Today
    </div>

    <div class="tiles">
      <tile color="#70ffb5">
        Veg
      </tile>
      <tile color="#FF665F">
        Non-veg
      </tile>
      <tile color="#96C5FF">
        Clothing
      </tile>
      <tile color="#FF9C76">
        Items
      </tile>
    </div>

    <catalog />

  </div>
</template>

<script>
import { firestore } from '../firebase'
import Catalog from '../components/Catalog'
import Header from '../components/Header'
import Tile from '../components/Tile'

export default {
  name: 'shop',
  components: {
    'header-nav': Header,
    'tile': Tile,
    'catalog': Catalog
  }
}
</script>

<style scoped>
  .shop {
    padding-top: 60px;
  }

  .tiles {
    padding: 0 10px 20px 20px;
    overflow-x: auto;
    overflow-y: visible;
    white-space: nowrap;
    width: 100%;
  }
  .tiles::-webkit-scrollbar {
    display: none;
  }

  .products {
    padding: 5px 15px 70px 15px;
    overflow-y: scroll;
  }

</style>
