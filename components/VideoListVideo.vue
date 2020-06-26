<template>
  <client-only>
    <v-hover>
      <template v-slot="{ hover }">
        <v-card
          width="340px"
          :elevation="hover ? 8 : 4"
          class="ma-2 pa-6 transition-swing"
          :to="`/watch/${video.id}`"
        >
          <v-img v-if="video.thumbnail != null" :src="video.thumbnail" />
          <v-img v-else :src="`https://vue-screencasts.s3.us-east-2.amazonaws.com/video-files/Series%3A+Building+a+VueJS+App/Thumbnails/Building+a+VueJS+app+part+1.png`" />
          <v-card-title>{{ video.name }}</v-card-title>
          <v-card-text>
            <!-- <div v-if="isPlayed(video.id)" class="green--text">
              <font-awesome-icon icon="check">
                Played
              </font-awesome-icon>
            </div> -->
          </v-card-text>
          <v-card-actions>
            <span v-for="tag_id in video.tag_ids" :key="`${video.id}-${tag_id}`">
              <v-btn
                color="green lighten-2"
                class="mr-2"
                small
                :to="`/tags/${tag_id}`"
                @mousedown.stop
              >
                {{ getTag(tag_id).name }}
              </v-btn>
            </span>
          </v-card-actions>
        </v-card>
      </template>
    </v-hover>
  </client-only>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['video', 'tags'],
  methods: {
    getTag (tagId) {
      return this.tags.find(t => t.id === tagId)
    }
  }
}
</script>

<style>

</style>
