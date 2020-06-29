<template>
  <v-container>
    <h1>Register</h1>

    <UserAuthForm button-text="Register" :submit-form="registerUser" has-name="true" />
  </v-container>
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm'

export default {
  components: {
    UserAuthForm
  },
  methods: {
    async registerUser (registerationInfo) {
      try {
        await this.$axios.post('/users', registerationInfo)

        await this.$auth.loginWith('local', {
          data: registerationInfo
        })

        this.$store.dispatch('snackbar/setSnackbar', { text: `Terima kasih sudah signing up, ${this.$auth.user.name}` })
        this.$route.push('/')
      } catch (error) {
        // eslint-disable-next-line eqeqeq
        if (this.$auth.user.email != registerationInfo.email) {
          this.$store.dispatch('snackbar/setSnackbar', { color: 'red', text: 'Terdapat masalah saat signing up. Tolong coba lagi.' })
        }
      }
    }
  }
}
</script>

<style>

</style>
