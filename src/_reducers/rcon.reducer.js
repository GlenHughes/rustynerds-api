import { rconConstants } from "../_constants"

const initialState = {
  data: [],
  columns: [],
}

export function rcon(state = initialState, action) {
  switch (action.type) {
    case rconConstants.PLAYERS_REQUEST:
      return { ...state, loading: true }

    case rconConstants.PLAYERS_SUCCESS:
      return {
        data: action.data,
        columns: action.columns,
        loading: false,
      }
    case rconConstants.PLAYERS_FAILURE:
      return { ...state, loading: false }
    default:
      return { ...state, loading: false }
  }
}
