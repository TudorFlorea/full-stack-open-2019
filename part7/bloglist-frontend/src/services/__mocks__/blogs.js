const blogs = [
  {
    id: '5a451e30b5ffd44a58fa79ab',
    likes: 22,
    title: 'Titles',
    url: 'hhts',
    user: {
      username: 'names',
      name: 'ss'
    }
  },
  {
    id: '5a451e30b5ffd44a58fa79ac',
    likes: 12,
    title: 'Title',
    url: 'hht',
    user: {
      username: 'snames',
      name: 'sss'
    }
  }
]

const setToken = () => {}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }