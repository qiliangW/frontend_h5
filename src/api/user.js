import request from '../utils/request'

export const postUserId = (query)=> {
  return request({
    url: '/api/postUserId',
    method: 'get',
    params: query 
  })
}

export const getCode = (query)=> {
  return request({
    url: '/api/postDynamicCode',
    method: 'get',
    params: query 
  })
}

