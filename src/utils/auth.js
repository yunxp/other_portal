import Cookies from 'js-cookie'

const TokenKey = 'cage_auth_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
