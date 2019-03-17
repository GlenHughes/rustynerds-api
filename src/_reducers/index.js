import { combineReducers } from "redux"

import { authentication } from "./authentication.reducer"
import { alert } from "./alert.reducer"
import { rcon } from "./rcon.reducer"

const rootReducer = combineReducers({
  authentication,
  alert,
  rcon,
})

export default rootReducer
