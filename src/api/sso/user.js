import request from '@/utils/request'

export function getUsers(params) {
  return request({
    url: '/sso/user/search',
    method: 'post',
    params
  })
}
