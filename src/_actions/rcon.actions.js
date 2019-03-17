import { rconConstants } from "../_constants"
import { rconService } from "../_services"
import { alertActions } from "."
// import { history } from "../_helpers"

function players() {
  function request() {
    return { type: rconConstants.PLAYERS_REQUEST, loading: true }
  }
  function success(response) {
    const { data, columns } = response
    return {
      type: rconConstants.PLAYERS_SUCCESS,
      data,
      columns,
      loading: false,
    }
  }
  function failure(error) {
    return { type: rconConstants.PLAYERS_FAILURE, error, loading: false }
  }

  return dispatch => {
    dispatch(request())

    rconService.players().then(
      playerList => {
        if (!playerList) {
          dispatch(failure("Error getting player list"))
          dispatch(alertActions.error("Error getting player list"))
        } else {
          dispatch(success(playerList))
        }
      },
      error => {
        dispatch(failure(error))
        dispatch(alertActions.error(error))
      },
    )
  }
}

function grantKit(steamID, kit) {
  function request() {
    return { type: rconConstants.GRANT_KIT_REQUEST, loading: true }
  }
  function success(response) {
    return {
      type: rconConstants.GRANT_KIT_SUCCESS,
      message: response.message,
      loading: false,
    }
  }
  function failure(error) {
    return { type: rconConstants.GRANT_KIT_FAILURE, error, loading: false }
  }

  return dispatch => {
    dispatch(request())

    rconService.grantKit(steamID, kit).then(
      response => {
        if (!response) {
          dispatch(failure("Error granting kit"))
          dispatch(alertActions.error("Error granting kit"))
        } else {
          dispatch(success(response))
          dispatch(alertActions.success(response.message))
        }
      },
      error => {
        dispatch(failure(error))
        dispatch(alertActions.error(error))
      },
    )
  }
}

export const rconActions = {
  players,
  grantKit,
}
