<template>
  <div class="footer">
    <div
      class="button primary--text"
      v-show="button1"
      v-ripple
      @click="$emit('button1')"
      :style="button2 ? {} : {fontSize: '20px'}"
    >
      {{ button1 }}
    </div>
    <div
      class="button accent white--text"
      v-show="button2"
      v-ripple
      @click="$emit('button2')"
    >
      {{ button2 }}
    </div>
    <div
      v-show="captcha"
      class="captcha"
      :id="captchaID"
    />
  </div>
</template>

<script>
export default {
  name: 'FooterButtons',
  props: {
    button1: String,
    button2: String,
    captchaID: String,
    captcha: Boolean
  }
}
</script>

<style scoped>
  .footer {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    height: 60px;
  }

  .footer .button {
    flex: 1;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    user-select: none;
    font-size: 20px;
  }
  .footer .button:first-child {
    background-color: #ECEFF4;
    font-size: 18px;
    box-shadow: 0 -5px 30px rgba(156, 164, 179, 0.15);
  }
  .footer .button:nth-child(2) {
    box-shadow: 0 -5px 25px rgba(39, 223, 67, 0.5);
  }

  .captcha {
    width: 0;
  }
</style>
