<template>
  <v-container>
    <v-row>
      <v-col md="8" cols="12">
        <div
          v-video-player:myVideoPlayer="playerOptions"
          class="video-player-box"
        />
        <!-- @ended="markPlayed" -->
      </v-col>

      <v-col md="4" cols="12">
        <div class="display-1">
          {{ video.name }}
        </div>

        <!-- <div v-if="isPlayed(video.id)" class="green--text">
          <font-awesome-icon icon="check" />
          Played
        </div>
        <div v-else>
          <v-btn
            v-if="currentUser.name"
            x-small
            @click="markPlayed"
          >
            Mark Played
          </v-btn>
        </div> -->

        <div v-html="video.description" />

        <span
          v-for="tag_id in video.tag_ids"
          :key="tag_id"
        >
          <v-btn
            :to="`/tags/${tag_id}`"
            color="green lighten-2"
            class="mr-1 mb-2"
          >
            {{ getTag(tag_id).name }}
          </v-btn>
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import 'video.js/dist/video-js.css'
import Vue from 'vue'
import { mapState } from 'vuex'

// If used in nuxt.js/ssr, you should keep it only in browser build environment
if (process.browser) {
  const VueVideoPlayer = require('vue-video-player/dist/ssr')
  Vue.use(VueVideoPlayer)
}

export default {
  // async fetch ({ store, params, from }) {
  //   const isInitialPageLoad = !from

  //   if (isInitialPageLoad) {
  //     await store.dispatch('loadAllVideos')
  //     await store.dispatch('loadAllTags')
  //   }
  // },
  computed: {
    // ...mapGetters({
    //   getTag: 'tags/get',
    //   isPlayed: 'users/videoIsPlayed'
    // }),
    ...mapState({
      videos: state => state.videos.videos,
      tags: state => state.tags.tags
    }),
    video () {
      // eslint-disable-next-line eqeqeq
      return this.videos.find(v => v.id == this.$route.params.id)
    },
    playerOptions () {
      return {
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0, 2.5, 3.0],
        sources: [{
          type: 'video/mp4',
          src: this.video.videoUrl
        }],
        poster: this.video.thumbnail,
        fluid: true
      }
    }
  },
  methods: {
    // markPlayed () {
    //   this.$store.dispatch('users/markVideoPlayed', this.video.id)
    // }
    getTag (tagId) {
      return this.tags.find(t => t.id === tagId)
    }
  }
}
</script>

<style>

</style>
