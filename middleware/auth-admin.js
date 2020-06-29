export default async function ({ $auth, redirect, store }) {
  const user = await $auth.state.user

  if (user && user.admin) {

  } else {
    store.dispatch('snackbar/setSnackbar', { color: 'red', text: 'Terdapat masalah saat signing in. Tolong coba lagi.' })
    redirect('/')
  }
}
