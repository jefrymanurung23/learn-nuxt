<template>
  <div>
    <nuxt-child :video="video" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  // async asyncData ({ $axios, params }) {
  //   const response = await $axios.get(`/videos/${params.id}`)
  //   const video = response.data.data

  //   return {
  //     video
  //   }
  // },
  async fetch ({ $axios, store, params }) {
    const response = await $axios.get(`/videos/${params.id}`)
    const video = response.data.data

    store.commit('SET_CURRENT_VIDEO', video)
  },
  computed: {
    // video () {
    //   return this.$store.state.currentVideo
    // }
    ...mapState({
      video: 'currentVideo'
    })
  },
  head () {
    return {
      titleTemplate: `%s ${this.video.name} - Learn Nuxt`
    }
  }
}
</script>

<style>

</style>
