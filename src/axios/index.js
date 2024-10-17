import axios from 'axios' // 引入axios
import qs from 'qs' // 引入qs
import APIUrl from './api.url' // 引入api.url.js
import router from '@/router'

// axios 默认配置  更多配置查看Axios中文文档
axios.defaults.timeout = 50000 // 超时默认值
axios.defaults.baseURL = APIUrl.baseURL // 默认baseURL
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true // 表示跨域请求时是否需要使用凭证

// http request 拦截器
// 在ajax发送之前拦截 比如对所有请求统一添加header token
axios.interceptors.request.use(
  config => {
    let url = config.url
    // 1.url是登录，则token不用管了
    // 2.url不是登录，则token必须为非空才行
    if (url !== '/api/agent/login.do') {
      let token = localStorage.getItem('agent-token')
      if (token === undefined || token == null) {
        router.push('/login')
      } else {
        config.headers['token'] = token
      }
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
// http response 拦截器
// ajax请求回调之前拦截 对请求返回的信息做统一处理 比如error为401无权限则跳转到登陆界面
axios.interceptors.response.use(
  response => {
    let data = response.data
    if (data instanceof Object) {
      if (data.status === 401) {
        data.msg = '您还未登录,请先登录'
        localStorage.clear()
        router.push('/login')
      }
    }
    return response
  },
  error => {
    this.$message.error('服务器异常，请联系管理员')
    localStorage.clear()
    return Promise.reject(error)
  }
)

export default axios // 这句千万不能漏下！！！

/**
 * post 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(data))
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * get 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: data})
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * 其他delete等的封装类似
 * 可以查看中文文档 自行封装
 */
