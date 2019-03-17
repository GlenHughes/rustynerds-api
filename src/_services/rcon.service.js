import { handleResponse, handleError } from "../_helpers"
import { agent } from "../_helpers/ajax-handlers"

function players() {
  return agent
    .get("/api/players")
    .then(handleResponse)
    .then(response => response)
    .catch(handleError)
}

function grantKit(steamID, kit) {
  return agent
    .post("/api/grantKit", {
      steamID,
      kit,
    })
    .then(handleResponse)
    .then(response => response)
    .catch(handleError)
}

export const rconService = {
  players,
  grantKit,
}
