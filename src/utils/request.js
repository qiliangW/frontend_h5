import axios from 'axios'
import store from '../store'
import router from '../router'
import { AppService } from '../services/AppStorageService'

let corpId =  AppService.getCorpId() == '' ?  import.meta.env.VITE_CORP_ID   :  AppService.getCorpId() 
let apiUrl =  AppService.getApiUrl() == '' ?   import.meta.env.VITE_API_URL :  AppService.getApiUrl() 
// import.meta.env.VITE_API_URL=>默认解析的是env文件
// 创建axios实例
const service = axios.create({
  baseURL: '', // api的base_url
  timeout: 15000, // 请求超时时间
  withCredentials: false,
})

// request拦截器
service.interceptors.request.use(config => {
  
  // if(!config.data.hasOwnProperty('user_token')){
  //   config.data['user_token'] = userName
  // }

  // if(store.getters.user_token){
  //   if(config.method=="post"){
  //     if(!config.data.hasOwnProperty('user_token')){
  //         config.data['user_token'] = companyId 
  //     }
  //   }
  // }
  
  if(config.method=="post"){
    if(config.data instanceof FormData){
      config.data.append('corp_id',corpId);
    }
    config.data['corp_id'] = corpId;
  }else{
    config.params['corp_id'] = corpId;
  }
 console.log(config);
  return config
  
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      return Promise.reject(res)
    }
    return res
  },
  error => {
    console.log('无法连接服务器')
    console.log('err' + error)// for debug
    return Promise.reject(error)
  }
)

export default service
