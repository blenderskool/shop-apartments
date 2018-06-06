<template>
  <v-container class="info-container" text-xs-center>
    <v-layout column>
        <v-flex xs12>
          <transition name="slide" appear>
            <img :src="parseType()">
          </transition>
        </v-flex>
      <v-flex class="heading">
        {{ title }}
      </v-flex>
      <v-flex class="description secondary--text">
        {{ description }}
      </v-flex>
      <v-flex class="button-container" v-if="button">
        <span
          v-ripple
          :to="{name: 'order', params: {id: $route.params.id}}"
          class="accent white--text button"
          @click="$emit('button')"
        >
          {{ button }}
        </span>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Info',
  props: {
    image: String,
    title: String,
    description: String,
    button: String,
    type: String
  },
  methods: {
    parseType() {
      if (this.type === 'error')
        return '/static/img/error_badge.svg'
      else if (this.type === 'success')
        return '/static/img/confirmed_badge.svg'
    }
  }
}
</script>

<style scoped>

  .info-container {
    padding-top: 150px;
  }

  .heading {
    margin-top: 10px;
    font-size: 30px;
  }
  .description {
    font-size: 20px;
    line-height: 1.2em;
  }

  .button-container {
    margin-top: 50px;
  }

  .button {
    display: inline-block;
    font-size: 22px;
    font-weight: 700;
    text-transform: initial;
    border-radius: 3px;
    padding: 10px 35px;
    box-shadow: 0 10px 20px rgba(39, 223, 67, 0.3);
  }

</style>