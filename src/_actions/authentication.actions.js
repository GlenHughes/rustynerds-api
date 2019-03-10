import { userConstants } from "../_constants"
import { userService } from "../_services"
import { alertActions } from "."
import { history } from "../_helpers"

function login(username, password) {
  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user }
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user }
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error }
  }

  return dispatch => {
    dispatch(request({ username }))

    userService.login(username, password).then(
      user => {
        if (!user) {
          dispatch(failure("Invalid login"))
          dispatch(alertActions.error("Invalid login"))
        } else {
          dispatch(success(user))
          history.push("/test")
        }
      },
      error => {
        dispatch(failure(error))
        dispatch(alertActions.error(error))
      },
    )
  }
}

function logout() {
  userService.logout()
  return { type: userConstants.LOGOUT }
}

export const authenticationActions = {
  login,
  logout,
}
