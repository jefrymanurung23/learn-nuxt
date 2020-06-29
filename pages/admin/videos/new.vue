<template>
  <v-container>
    <v-row>
      <v-col md="3" cols="12">
        <h1>Video Create Page</h1>
        <VideoEditForm :video="video" :save-video="createVideo" button-text="Create Video" />
      </v-col>
      <v-col md="9" cols="12">
        <VideoListVideo :video="video" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VideoListVideo from '@/components/VideoListVideo'
import VideoEditForm from '@/components/VideoEditForm.vue'

export default {
  components: {
    VideoListVideo,
    VideoEditForm
  },
  data () {
    return {
      video: {}
    }
  },
  methods: {
    async createVideo () {
      const video = await this.$store.dispatch('videos/create', this.video)
      this.$store.dispatch('snackbar/setSnackbar', { text: `You have successfully created a new video, ${video.name}.` })
      this.$router.push(`/watch/${video.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
