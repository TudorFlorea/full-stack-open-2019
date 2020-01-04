export const getAuthData = () => {
  const localUser = window.localStorage.getItem('loggedBlogUser')
  if (localUser) {
    return JSON.parse(localUser)
  } else {
    return null
  }
}