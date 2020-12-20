import store from '../store'
import urls from './urls'
import QS from 'qs'
import request from '@/utils/request'

export function post(url, data = {}, configs) {
  return joinParams(url, data, configs, 'post')
}

export function get(url, query = {}, configs) {
  return joinParams(url, query, configs, 'get')
}

export function joinParams(url, param, configs, method) {
  const obj = {
    method: method
  }
  const pp = {}
  pp.lang = 'zh_CN'
  const getters = store.getters
  if (getters.token) pp.token = getters.token
  for (const key in param) {
    if (key !== 'token' && key !== 'lang') {
      pp[key] = param[key]
    }
  }
  // eslint-disable-next-line eqeqeq
  if (method == 'get') obj.params = pp
  // eslint-disable-next-line eqeqeq
  if (method == 'post') obj.data = QS.stringify(pp)
  obj.url = urls[url]
  const confs = configs || {}

  let headers = confs && confs.headers || ''
  if (!headers) headers = {}
  headers['Content-type'] = 'application/x-www-form-urlencoded'
  headers.__startTime = new Date().getTime()
  if (typeof confs.noErrorToast !== 'undefined') headers.__noErrorToast = confs.noErrorToast
  if (typeof confs.noLoading !== 'undefined') headers.__noLoading = confs.noLoading
  if (typeof confs.timeout !== 'undefined') headers.__timeout = confs.timeout
  obj.headers = headers
  return new Promise((resolve, reject) => {
    request(obj).then(resolve, reject)
  })
}
