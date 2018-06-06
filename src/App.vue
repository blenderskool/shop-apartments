<template>
  <div id="app" :class="{offline: !isOnline}">
    <v-app>
      <transition name="fade">
        <keep-alive include="shop">
          <router-view />
        </keep-alive>
      </transition>
    </v-app>
  </div>
</template>

<script>
import { firebase } from './firebase';

export default {
  name: 'app',
  beforeCreate() {
    this.$store.commit('addUser', firebase.auth().currentUser)
  }
}
</script>

<style>
body {
  margin: 0;
  background-color: #F8FBFF;
}

#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #14171C;
  font-weight: 700;
  font-size: 20px;
  background-color: #F8FBFF;
  transition: filter 0.3s ease;
}

.offline {
  filter: grayscale(1);
}

.title-name {
  font-size: 30px;
  font-weight: 700;
  padding: 0 20px;
  margin: 30px 0 20px 0;
}

.v-snack__content {
  height: 60px !important;
  font-size: 18px !important;
}


.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .2s;
}

.fade-enter-active {
  transition-delay: .2s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}


.slide-enter-active {
  transition: all 1.2s ease;
}
.slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.slide-enter {
  opacity: 0;
  transform: translateY(10px);
}
</style>
