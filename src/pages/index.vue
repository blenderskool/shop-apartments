<template>
  <div>
    <div class="verify" v-if="!user.confirmed">
      <card>
        <template slot="title">
          Let's get started
        </template>

        <v-text-field
          placeholder="Your phone number"
          required
          v-model="user.phoneNumber"
          prefix="+91"
          mask="##### #####"
          style="margin-top: 40px"
        />

        <v-text-field
          label="Enter OTP"
          type="password"
          maxlength="6"
          v-if="user.otpSent"
          v-model="user.otp"
          :hint="`Sent to +91-${user.phoneNumber}`"
          persistent-hint
        />
      </card>

      <footer-buttons
        v-if="!user.otpSent"
        button2="Continue"
        @button2="sendOTP"
        captcha
        captchaID="sign-in-button"
      />
      <footer-buttons
        button2="Confirm OTP"
        @button2="confirmOTP"
        v-else
      />
    </div>
    <div class="complete-profile" v-else>
      <card>
        <template slot="title">
          Enter additional details
        </template>

        <v-text-field
          type="text"
          label="Name"
          v-model="user.name"
          style="margin-top: 40px"
        />

        <v-text-field
          mask="A#-####"
          label="Flat no."
          v-model="user.flat"
          hint="Example A1-102"
          persistent-hint
        />
      </card>

      <footer-buttons button2="Finish" @click.native="$router.push('/shop')" />
    </div>

    <v-snackbar v-model="snack.show" :timeout="2500" bottom>
      {{ snack.text }}
    </v-snackbar>
  </div>
</template>

<script>
import { firebase } from '../firebase'
import fsdk from 'firebase'
import Card from '../components/Card'
import Footer from '../components/FooterButtons'

export default {
  data() {
    return {
      user: {
        phoneNumber: '',
        confirmed: false,
        block: 'P1',
        name: '',
        flat: '',
        otpSent: false,
        otp: ''
      },
      snack: {
        show: false,
        text: ''
      }
    }
  },
  components: {
    'card': Card,
    'footer-buttons': Footer
  },
  methods: {
    sendOTP() {
      const appVerifier = window.recaptchaVerifier
      const phoneNumber = `+91${this.user.phoneNumber}`
      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(confirmationResult => {
          window.confirmationResult = confirmationResult

          /**
           * Show the snackbar to tell user that OTP was sent
           */
          this.snack.text = `OTP was sent to ${phoneNumber}`
          this.snack.show = true
        }).catch(err => {
          // Error; SMS not sent
          console.log(err)
        });
    },
    confirmOTP() {
      window.confirmationResult.confirm(this.user.otp).then(result => {
        // User signed in successfully.
        this.$store.commit('addUser', result.user)

        /**
         * Show the snackbar to tell user that OTP was confirmed
         */
        this.snack.text = 'OTP was confirmed'
        this.snack.show = true

        this.user.confirmed = true

      }).catch(err => {
        console.log(err)
      });
    }
  },
  mounted() {
    firebase.auth().useDeviceLanguage();
    window.recaptchaVerifier = new fsdk.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': response => {
        this.user.otpSent = true;
      }
    })
  }
}
</script>

<style scoped>
  .verify, .complete-profile >>> .card {
    margin-top: 80px;
  }
</style>
