/* eslint-disable no-unused-vars */
export const getData = async function (url, axios) {
  const response = await axios.get(url)

  return {
    data: response.data.data,
    included: response.data.included
  }
}

export const deserializeVideos = function (videos) {
  videos.forEach((v) => {
    v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id)
  })
}

export const deserializeTags = function (tags) {
  tags.forEach((t) => {
    t.attributes.id = t.id
    t.attributes.video_ids = t.relationships.videos.data.map(vid => vid.id)
  })
}
