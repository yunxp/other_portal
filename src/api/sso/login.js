import request from '@/utils/request'

export function getInfo(token) {
  return request({
    url: '/sso/user/info',
    method: 'get',
    params: { token }
  })
}

// export function logout() {
//   return request({
//     url: '/sso/user/logout',
//     method: 'post'
//   })
// }
