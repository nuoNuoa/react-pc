import axios from 'axios'
import { clearToken, getToken } from '@/utils'
import { history } from './history'

const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})
// 添加请求拦截器
http.interceptors.request.use((config) => {
  // 请求拦截器注入token
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
http.interceptors.response.use((response) => {
  return response.data
},
  (error) => {
    if (error.response.status === 401) {
      clearToken()
      // 跳转到登录页
      history.push('/login')
    }
    return Promise.reject(error)
  })
export { http }