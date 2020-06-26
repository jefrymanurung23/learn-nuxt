<template>
  <div>
    <div>
      <h1 class="display-3 ma-4 d-flex justify-center">
        Videos with Tag "{{ tag.name }}"
      </h1>
    </div>

    <div class="d-flex flex-wrap justify-center">
      <div v-for="video in videosOnTag" :key="video.name">
        <VideoListVideo :video="video" :tags="tags" />
      </div>
    </div>
  </div>
</template>

<script>
import VideoListVideo from '@/components/VideoListVideo'

export default {
  components: {
    VideoListVideo
  },
  async asyncData ({ $axios, params }) {
    const response = await $axios.get(`/tags/${params.id}`)
    const tag = response.data.data

    const videosOnTag = response.data.included.filter(i => i.type === 'video')
    videosOnTag.forEach((v) => {
      v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id)
    })

    const tags = response.data.included.filter(i => i.type === 'tag')
    tags.forEach((t) => {
      t.attributes.id = t.id
    })

    return {
      tag: tag.attributes,
      videosOnTag: videosOnTag.map(vid => vid.attributes),
      tags: tags.map(t => t.attributes)
    }
  }
}
</script>

<style>

</style>
