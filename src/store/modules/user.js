import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'


const state = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: [],
  userInfo: {},
  currentSubrole: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERINFO: (state, info) => {
    state.userInfo = info
  },
  SET_currentSubrole: (state, currentSubrole) => {
    state.currentSubrole = currentSubrole
  },
  LOGOUT_OPT(state) {
    state.token = ''
    state.currentSubrole = {}
    removeToken()
    resetRouter()
  }
}

const actions = {
  // store 设置登录后信息
  setLoginInfo({commit}, data) {
    return new Promise(resolve => {
      if(data.token){
        commit('SET_TOKEN', data.token)
        setToken(data.token)
      }
      resolve()
    })
  },
  // post 登录请求
  login({ commit, dispatch }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      let obj = {
        username: username.trim(),
        password: password,
      }
      post('login',obj).then(response => {
        if (response.data.token) {
          const data = response.data
            dispatch('setLoginInfo',data).then(v=>resolve(data))
        } else {
          reject(response.data)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  GetInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      get('userInfo').then(response => {
        const data = response.data
        if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          commit('SET_ROLES', data.roles)
        } else {
          reject('getInfo: roles must be a non-null array !')
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 登出
  LogOut({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // 前端 登出
  FedLogOut({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
