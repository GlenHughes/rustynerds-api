import axios from "axios"
import { history } from "./history"

// - No port needed for PROD
const url =
  process.env.NODE_ENV === "development"
    ? `${process.env.API_URL}:${process.env.API_PORT}`
    : process.env.API_URL

const agent = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
})

const getAuthorizationHeader = () => {
  const user = localStorage.getItem("user")
  if (user) {
    const { token } = JSON.parse(user)
    if (token) {
      return {
        headers: {
          common: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    }
  }

  return {}
}

agent.interceptors.request.use(config => {
  const authHeaders = getAuthorizationHeader()
  return { ...config, ...authHeaders }
})

export { agent }

/* eslint-disable no-console */
export function handleResponse(response) {
  const { data, status } = response
  if (status === 401) {
    // token is invalid, logout user
    console.warn("Invalid response from server", response)
  }

  return data
}

export function handleError(error) {
  console.warn(error)
  const { status } = error.response
  if (status === 401) {
    localStorage.removeItem("user")
    history.push("/login")
  }
}
