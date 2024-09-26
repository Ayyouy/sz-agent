<template>
  <el-container>
    <el-main>
      <div class="containter">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-row type="flex" justify="left">
              <el-col :span="24">
                <strong style="font-weight: bold;font-size: 18px;margin-right: 30px">代理信息</strong>
                <strong>账号余额：{{ detail.totalMoney }}2121.00</strong>
                <el-button type="primary" size="small" style="float: right;"
                           @click="SettingColorInfo('colorform')">出金
                </el-button>
                <el-button type="primary" size="small" style="float: right;margin-right: 30px;"
                           @click="SettingColorInfo('colorform')">转账
                </el-button>
              </el-col>
            </el-row>
          </div>
          <div class="text item">
            <el-row type="flex" justify="space-around">
              <el-col :span="8">
                代理账号：{{ detail.agentName }}
              </el-col>
              <el-col :span="8">
                真实姓名：{{ detail.agentRealName }}
              </el-col>
              <el-col :span="8">
                代理ID：{{ detail.agentCode }}
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-around">
              <el-col :span="8">
                代理状态：
                {{ detail.isLock == 0 ? '正常' : '锁定' }}
              </el-col>
              <el-col :span="8">
                手机号码：{{ detail.agentPhone }}
              </el-col>
              <el-col :span="8">
                创建时间：
                <span v-if="detail.addTime">{{ detail.addTime | timeFormat }}</span>
                <span v-else></span>
              </el-col>
            </el-row>
            <el-row>
              代理邀请码：{{ detail.agentPhone }}
            </el-row>
            <el-row>
              邀请链接（APP）：
              <a :href="detail.pcUrl" target="_blank">{{ detail.pcUrl }}</a>
              <el-button v-clipboard:copy="detail.pcUrl"
                         v-clipboard:success="onCopy"
                         v-clipboard:error="onError"
                         type="text">复制
              </el-button>
            </el-row>
            <el-row>
              邀请链接（PC）：
              <a :href="detail.pcUrl" target="_blank">{{ detail.pcUrl }}</a>
              <el-button v-clipboard:copy="detail.pcUrl"
                         v-clipboard:success="onCopy"
                         v-clipboard:error="onError"
                         type="text">复制
              </el-button>
            </el-row>
          </div>
        </el-card>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import ChartBox from '../components/ChartBox'
import * as api from '@/axios/api'

export default {
  components: {
    ChartBox
  },
  props: {},
  data () {
    return {
      detail: {
        'agentName': '',
        'agentRealName': '',
        'agentPhone': ''
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    onCopy: function (e) {
      this.$message({
        message: '复制成功！',
        type: 'success'
      })
    },
    onError: function (e) {
      this.$message({
        message: '复制失败！',
        type: 'warning'
      })
    },
    async getAgentInfo () {
      let data = await api.getAgentInfo()
      if (data.status === 0) {
        this.detail = data.data
        this.$store.state.userInfo = data.data
      } else {
        this.$message.error(data.msg)
      }
    }
  },
  created () {
    this.$store.state.activeIndex = 'home'
  },
  mounted () {
    this.getAgentInfo()
  }
}
</script>
<style lang="stylus" scoped>
.containter {
  padding: 0px;
}
.el-row {
  height: 35px;
  line-height: 35px;
}

.box-card {
  margin-bottom: 15px;
}
</style>
