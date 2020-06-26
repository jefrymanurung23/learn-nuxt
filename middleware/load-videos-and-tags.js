import RSVP from 'rsvp' // promise library

export default async function ({ store, from }) {
  const isInitialPageLoad = !from

  if (isInitialPageLoad) {
    // eslint-disable-next-line import/no-named-as-default-member
    await RSVP.all([
      store.dispatch('loadAllVideos'),
      store.dispatch('loadAllTags')
    ])
  }
}