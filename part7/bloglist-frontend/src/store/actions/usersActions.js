import UsersService from '../../services/users'

export const INIT_USERS = 'INIT_USERS'

export const initUsers = () => {
  return async dispatch => {
    const users = await UsersService.getAll()
    dispatch({
      type: INIT_USERS,
      data: users
    })
  }
}