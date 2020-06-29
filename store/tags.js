import { getData, deserializeTags } from '@/utils/store-utils'

export const state = () => ({
  tags: []
})

export const mutations = {
  SET_TAGS (state, tags) {
    state.tags = tags
  },
  CREATE_TAG (state, { tag }) {
    state.tags = state.tags.concat(tag)
  },
  UPDATE_TAG_NAME (state, { tag }) {
    // eslint-disable-next-line eqeqeq
    const tagToUpdate = state.tags.find(t => t.id == tag.id)
    tagToUpdate.name = tag.name
  },
  DELETE_TAG (state, { tag }) {
    // eslint-disable-next-line eqeqeq
    state.tags = state.tags.filter(t => t.id != tag.id)
  },
  CONNECT_TAG_TO_VIDEO (state, { video, tag }) {
    video.tag_ids = video.tag_ids.concat(tag.id.toString())
    tag.video_ids = tag.video_ids.concat(video.id.toString())
  },
  DISCONNECT_TAG_FROM_VIDEO (state, { video, tag }) {
    // eslint-disable-next-line eqeqeq
    video.tag_ids = video.tag_ids.filter(tid => tid != tag.id)
    // eslint-disable-next-line eqeqeq
    tag.video_ids = tag.video_ids.filter(vid => vid != video.id)
  }
}

export const actions = {
  async loadAll ({ commit, dispatch }) {
    const { data: tags } = await getData('/tags', this.$axios) // grabing data

    deserializeTags(tags)
    commit('SET_TAGS', tags.map(t => t.attributes))
  },
  connectToVideo ({ commit }, { video, tag }) {
    this.$axios.post('/video_tags', {
      video_id: video.id,
      tag_id: tag.id
    })

    commit('CONNECT_TAG_TO_VIDEO', { video, tag })
  },
  disconnectTagFromVideo ({ commit }, { video, tag }) {
    this.$axios.post('video_tags/delete', {
      video_id: video.id,
      tag_id: tag.id
    })

    commit('DISCONNECT_TAG_FROM_VIDEO', { video, tag })
  },
  async create ({ commit }, { name }) {
    const response = await this.$axios.post('/tags', { name })
    const createdTag = response.data.data.attributes
    createdTag.id = response.data.data.id
    createdTag.video_ids = []

    commit('CREATE_TAG', { tag: createdTag })
    return createdTag
  },
  async updateName ({ commit }, { tag }) {
    await this.$axios.put(`/tags/${tag.id}`, tag)

    commit('UPDATE_TAG_NAME', { tag })
  },
  delete ({ commit }, { tag }) {
    this.$axios.delete(`/tags/${tag.id}`)
    commit('DELETE_TAG', { tag })
  }
}

export const getters = {
  // eslint-disable-next-line eqeqeq
  get: state => id => state.tags.find(t => t.id == id)
}
