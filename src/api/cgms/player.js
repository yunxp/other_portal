import request from '@/utils/request'

export function queryPlayerInfo(data) {
  return request({
    url: '/cgms/query_player_info',
    method: 'post',
    data
  })
}
