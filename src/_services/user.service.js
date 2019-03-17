import { agent } from "../_helpers/ajax-handlers"
import { history, handleResponse, handleError } from "../_helpers"

function login(username, password) {
  return agent
    .post("/api/auth", {
      username,
      password,
    })
    .then(handleResponse)
    .then(response => {
      const { token } = response
      if (token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(response))
      }

      return response
    })
    .catch(handleError)
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user")
  history.push("/login")
}

export const userService = {
  login,
  logout,
}
