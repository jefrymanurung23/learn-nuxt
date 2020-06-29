<template>
  <v-container>
    <VideoEditForm :video="video" :save-video="saveVideo" button-text="Save Video" />
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import VideoEditForm from '@/components/VideoEditForm.vue'

export default {
  components: {
    VideoEditForm
  },
  computed: {
    ...mapState({
      videos: state => state.videos.videos
    }),
    ...mapGetters({
      getVideo: 'videos/get'
    }),
    video () {
      // eslint-disable-next-line eqeqeq
      return this.getVideo(this.$route.params.id)
    }
  },
  methods: {
    async saveVideo () {
      const video = await this.$store.dispatch('videos/edit', this.video)
      this.$store.dispatch('snackbar/setSnackbar', { text: `You have successfully edited your video, ${video.name}.` })
      this.$router.push('/admin/videos')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
