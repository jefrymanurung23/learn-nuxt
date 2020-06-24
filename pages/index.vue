<template>
  <div>
    <div class="home">
      <div class="display-4 ma-4 d-flex jutify-center">
        All Videos
      </div>
    </div>

    <div class="d-flex flex-wrap">
      <div v-for="video in videos" :key="video.name">
        <VideoListVideo :video="video" :tags="tags" />
      </div>
    </div>
  </div>
</template>

<script>
import VideoListVideo from '../components/VideoListVideo'

export default {
  components: {
    VideoListVideo
  },
  async asyncData ({ $axios }) {
    const response = await $axios.get('/videos')
    const response2 = await $axios.get('/tags')
    const videos = response.data.data

    videos.forEach((v) => {
      v.tag_ids = v.tags.map(t => t.id)
    })

    const tags = response2.data.data

    return {
      videos,
      tags
    }
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
</style>
