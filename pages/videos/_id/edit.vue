<template>
  <div>
    <h1>Editing {{ video.name }}</h1>
    <nuxt-link :to="`/videos/${video.id}`">
      <button>Go back to Show</button>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['video'],
  head: {
    title: 'Edit'
  }
}
</script>

<style>

</style>
