<template>
  <div>
    <div class="home">
      <div class="display-4 ma-4 d-flex justify-center">
        All Videos
      </div>
    </div>

    <div class="d-flex flex-wrap justify-center">
      <div v-for="video in videos" :key="video.id">
        <VideoListVideo :video="video" :tags="tags" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VideoListVideo from '../components/VideoListVideo'

export default {
  components: {
    VideoListVideo
  },
  // async fetch ({ store, from }) {
  //   const isInitialPageLoad = !from

  //   if (isInitialPageLoad) {
  //     await store.dispatch('loadAllVideos')
  //     await store.dispatch('loadAllTags')
  //   }
  // },
  computed: {
    ...mapState({
      videos: state => state.videos.videos,
      tags: state => state.tags.tags
    })
  }
  // async asyncData ({ $axios }) {
  //   const response = await $axios.get('/videos')

  //   const videos = response.data.data
  //   videos.forEach((v) => {
  //     v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id)
  //   })

  //   const tags = response.data.included
  //   tags.forEach((t) => {
  //     t.attributes.id = t.id
  //   })

  //   return {
  //     videos: videos.map(v => v.attributes),
  //     tags: tags.map(t => t.attributes)
  //   }
  // }
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
