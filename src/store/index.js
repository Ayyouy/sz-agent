import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  userInfo: {
    agentPhone: '',
    agentCode: '',
    agentName: '',
    agentLevel: 0,
    parentId: 0,
    agentRealName: '',
    id: ''
  },
  token: '',
  siteInfo: {}, // 站点基本信息
  loginIsShow: false,
  cardIsShow: false
}

export default new Vuex.Store({state})
