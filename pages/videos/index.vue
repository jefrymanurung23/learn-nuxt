<template>
  <div>
    <h1>Videos</h1>
    <div v-for="video in $store.state.videos" :key="video.id">
      <nuxt-link :to="`/videos/${video.id}`">
        {{ video.name }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  // async asyncData ({ $axios }) {
  //   const response = await $axios.get('/videos')
  //   const videos = response.data.data

  //   return {
  //     videos
  //   }
  // }
  async fetch ({ $axios, store }) {
    const response = await $axios.get('/videos')
    const videos = response.data.data

    store.commit('SET_VIDEOS', videos)
  }
}
</script>

<style>

</style>
