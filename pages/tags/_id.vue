<template>
  <div>
    <div>
      <h1 class="display-3 ma-4 d-flex justify-center">
        Videos with Tag "{{ tag.name }}"
      </h1>
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
import VideoListVideo from '@/components/VideoListVideo'

export default {
  components: {
    VideoListVideo
  },
  async fetch ({ store, params }) {
    await store.dispatch('loadTagAndRelationships', { tagId: params.id })
  },
  computed: {
    ...mapState(['videos', 'tags']),
    tag () {
      // eslint-disable-next-line eqeqeq
      return this.tags.find(v => v.id == this.$route.params.id)
    }
  }
}
</script>

<style>

</style>
