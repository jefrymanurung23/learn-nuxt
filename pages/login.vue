<template>
  <v-container>
    <h1>Login</h1>

    <UserAuthForm button-text="Login" :submit-form="loginUser" />
  </v-container>
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm'

export default {
  components: {
    UserAuthForm
  },
  methods: {
    async loginUser (loginInfo) {
      try {
        await this.$auth.loginWith('local', {
          data: loginInfo
        })

        this.$store.dispatch('snackbar/setSnackbar', { text: `Terima kasih sudah signing in, ${this.$auth.user.name}` })
        this.$route.push('/')
      } catch (error) {
        // eslint-disable-next-line eqeqeq
        if (this.$auth.user.email != loginInfo.email) {
          this.$store.dispatch('snackbar/setSnackbar', { color: 'red', text: 'Terdapat masalah saat signing up. Tolong coba lagi.' })
        }
      }
    }
  }
}
</script>

<style>

</style>
