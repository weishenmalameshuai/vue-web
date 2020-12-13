import {MessageBox, Message} from 'element-ui'
import {get, post} from '@/api/request'

/*
  全局常用方法
 */

window.get = function (url, query, configs) {
  return get(url, query, configs)
}

window.post = function (url, data, configs) {
  return post(url, data, configs)
}

window.se = function (mes) {
  if (!mes) {
    mes = "操作失败";
  }
  Message({
    showClose: true,
    message: mes,
    type: 'error'
  })
}

window.sw = function (mes) {
  if (!mes) {
    mes = "操作失败";
  }
  Message({
    showClose: true,
    message: mes,
    type: 'warning'
  })
}

window.ss = function (mes) {
  if (!mes) {
    mes = "保存成功";
  }
  Message({
    showClose: true,
    message: mes,
    type: 'success'
  })
}

window.sc = function (s, mes, e) {
  if (!mes) {
    mes = "此操作将删除数据, 是否继续?";
  }
  MessageBox.confirm(mes, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(s).catch(e);
}
