<template>
  <div>
    <div class="display-1 pt-3">
      {{ video.name }}
    </div>

    <div v-html="video.description" />

    <v-combobox
      v-model="videoTags"
      :items="tags"
      item-text="name"
      multiple
      chips
      deletable-chips
      hide-selected
      return-object
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  computed: {
    ...mapState({
      videos: state => state.videos.videos,
      tags: state => state.tags.tags
    }),
    ...mapGetters({
      getTag: 'tags/get'
    }),
    video () {
      // eslint-disable-next-line eqeqeq
      return this.videos.find(v => v.id == this.$route.params.id) || {}
    },
    videoTags: {
      get () {
        const tagIds = this.video.tag_ids
        return tagIds && tagIds.map(id => this.getTag(id))
      },
      async set (newTags) {
        // eslint-disable-next-line eqeqeq
        let createdTag = newTags.find(t => typeof t == 'string')
        if (createdTag) {
          createdTag = await this.$store.dispatch('tags/create', { name: createdTag })
          this.$store.dispatch('tags/connectToVideo', { tag: createdTag, video: this.video })
        } else {
          const addedTags = _.differenceBy(newTags, this.videoTags, 'id')
          const removedTags = _.differenceBy(this.videoTags, newTags, 'id')

          if (addedTags.length > 0) {
            this.$store.dispatch('tags/connectToVideo', { tag: addedTags[0], video: this.video })
          }
          if (removedTags.length > 0) {
            this.$store.dispatch('tags/disconnectTagFromVideo', { tag: removedTags[0], video: this.video })
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
