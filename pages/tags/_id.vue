<template>
  <div>
    <div>
      <h1 class="display-3 ma-4 d-flex justify-center">
        Videos with Tag "{{ tag.name }}"
      </h1>
    </div>

    <div class="d-flex flex-wrap justify-center">
      <div v-for="video in videosOnTag" :key="video.id">
        <VideoListVideo :video="video" :tags="tags" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VideoListVideo from '@/components/VideoListVideo'

export default {
  components: {
    VideoListVideo
  },
  // async fetch ({ store, params, from }) {
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
    }),
    videosOnTag () {
      return this.videos.filter((v) => {
        return this.tag.video_ids.includes(v.id.toString())
      })
    },
    tag () {
      // eslint-disable-next-line eqeqeq
      return this.tags.find(v => v.id == this.$route.params.id)
    }
  }
}
</script>

<style>

</style>
