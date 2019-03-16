import axios from "axios"
import setAuthorizationToken from "../_helpers/set-auth-token"
import { history, handleResponse, handleError } from "../_helpers"

function login(username, password) {
  return axios
    .post(`${process.env.API_URL}:${process.env.API_PORT}/api/auth`, {
      username,
      password,
    })
    .then(handleResponse)
    .then(response => {
      const { token } = response
      if (token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(response))
        setAuthorizationToken(token)
      }

      return response
    })
    .catch(handleError)
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user")
  setAuthorizationToken(false)
  history.push("/login")
}

export const userService = {
  login,
  logout,
}
