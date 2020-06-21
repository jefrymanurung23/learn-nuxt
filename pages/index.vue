<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        learn-nuxt
      </h1>
      <h2 class="subtitle">
        Learn {{ name }}
      </h2>
      <div class="links">
        <nuxt-link to="/videos" class="button--green">
          Videos
        </nuxt-link>
        <nuxt-link to="/about" class="button--grey">
          About
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  asyncData () {
    return new Promise((resolve) => {
      // eslint-disable-next-line nuxt/no-timing-in-fetch-data
      setTimeout(function () {
        resolve({ name: 'Nuxt' })
      }, 1000)
    })
  }
  // menambahkan title page
  // head () {
  //   return {
  //     title: 'Learn Nuxt'
  //   }
  // }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
