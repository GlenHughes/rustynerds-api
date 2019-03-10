import { alertConstants } from "../_constants"

function success(message) {
  return { type: alertConstants.SUCCESS, message }
}

function info(message) {
  return { type: alertConstants.INFO, message }
}

function warn(message) {
  return { type: alertConstants.WARN, message }
}

function error(message) {
  return { type: alertConstants.ERROR, message }
}

function clear() {
  return { type: alertConstants.CLEAR }
}

export const alertActions = {
  success,
  info,
  warn,
  error,
  clear,
}
