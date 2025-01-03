import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import UserMan from '@/pages/userMan/index'
import Money from '@/pages/money/index'
import Wallet from '@/pages/money/wallet'
import Statistics from '@/pages/statistics/index'

import Agent from '@/pages/agent/index'
import Rebate from '@/pages/agent/index-rebate'
import Capital from '@/pages/capital/index'
import AgentcyFee from '@/pages/agentcyFee/index'
import HoldPositions from '@/pages/holdPositions/index'
import Fund from '@/pages/fund/index'
import CapitalDetail from '@/pages/capitalDetail/index'
import CapitalNote from '@/pages/capitalNote/index'
import Entry from '@/pages/entry/index'
import Exit from '@/pages/exit/index'
import Login from '@/pages/login/index'

const _import = require('./import_production.js')

Vue.use(Router)

export default new Router({
  // mode :'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      meta: {title: '首页'},
      component: Home
    },
    {
      path: '/userMan',
      name: 'userMan',
      meta: {title: '用户管理'},
      component: UserMan
    },
    {
      path: '/money',
      name: 'money',
      meta: {title: '钱包管理'},
      component: Money
    },
    {
      path: '/statistics',
      name: 'statistics',
      meta: {title: '数据统计'},
      component: Statistics
    },
    {
      path: '/agent',
      name: 'agent',
      meta: {title: '代理管理'},
      component: Agent
    },
    {
      path: '/agentcyFee',
      name: 'agentcyFee',
      // 原利润明细，改为交易佣金
      meta: {title: '交易佣金'},
      component: AgentcyFee
    },
    {
      path: '/rebate',
      name: 'rebate',
      // 新增的页面和路由
      meta: {title: '返佣明细'},
      component: Rebate
    },
    {
      path: '/capital',
      name: 'capital',
      meta: {title: '资金记录'},
      component: Capital
    },
    {
      path: '/wallet',
      name: 'wallet',
      meta: {title: '钱包'},
      component: Wallet
    },
    {
      path: '/fund',
      name: 'fund',
      meta: {title: '基金记录'},
      component: Fund
    },
    {
      path: '/holdPositions',
      name: 'holdPositions',
      meta: {title: '持仓管理'},
      component: HoldPositions
    },
    {
      path: '/capitalDetail',
      name: 'capitalDetail',
      meta: {title: '资金明细'},
      component: CapitalDetail
    },
    {
      path: '/capitalNote',
      name: 'capitalNote',
      meta: {title: '资金记录'},
      component: CapitalNote
    },
    {
      path: '/entry',
      name: 'entry',
      meta: {title: '入金明细'},
      component: Entry
    },
    {
      path: '/exit',
      name: 'exit',
      meta: {title: '出金明细'},
      component: Exit
    },
    {
      path: '/login',
      name: 'login',
      meta: {title: '登录'},
      component: Login
    }
  ]
})
