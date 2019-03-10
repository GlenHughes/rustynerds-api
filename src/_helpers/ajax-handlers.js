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
}
