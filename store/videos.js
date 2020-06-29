/* eslint-disable eqeqeq */
import { getData, deserializeVideos } from '@/utils/store-utils'

export const state = () => ({
  videos: []
})

export const mutations = {
  SET_VIDEOS (state, videos) {
    state.videos = videos
  },
  ADD_VIDEO (state, video) {
    const videos = state.videos.concat(video)
    state.videos = videos
  },
  DELETE_VIDEO (state, videoId) {
    const videos = state.videos.filter(v => v.id != videoId)
    state.videos = videos
  },
  EDIT_VIDEO (state, video) {
    // eslint-disable-next-line no-unused-vars
    let v = state.videos.find(vid => vid.id == video.id)
    v = video
  }
}

export const actions = {
  async loadAll ({ commit }) {
    const { data: videos } = await getData('/videos', this.$axios)

    deserializeVideos(videos)
    commit('SET_VIDEOS', videos.map(v => v.attributes))
  },

  async create ({
    commit
  }, video) {
    const response = await this.$axios.post('/videos', video)
    let savedVideo = response.data.data
    savedVideo = {
      id: savedVideo.id,
      ...savedVideo.attributes
    }
    commit('ADD_VIDEO', savedVideo)
    return savedVideo
  },
  async delete ({
    commit
  }, video) {
    const response = await this.$axios.delete(`/videos/${video.id}`)
    if (response.status == 200 || response.status == 204) {
      commit('DELETE_VIDEO', video.id)
    }
  },
  async edit ({
    commit
  }, video) {
    const response = await this.$axios.put(`/videos/${video.id}`, video)
    const newVideo = response.data.data.attributes
    commit('EDIT_VIDEO', newVideo)
    return newVideo
  }
}

export const getters = {
  // eslint-disable-next-line eqeqeq
  get: state => id => state.videos.find(v => v.id == id)
}
