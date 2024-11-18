<template>
  <div class="wrapper">
    <el-dialog
      :title="info?info.positionType==1?'持仓详情（模拟）':'持仓详情':'' "
      :visible.sync="dialogVisible"
      width="60%">
      <div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-row v-if="info">
              <el-col :span="8">
                {{ info ? info.nickName : '-' }}
                <span class="small">({{info ? info.userId : '-'}})</span>
              </el-col>
              <el-col :span="16" :class="info.withStatus == 3?'yellow text-right':'text-right'">
                {{
                  info ? info.withStatus == 0 ? '审核中' : info.withStatus == 1 ? '出金成功' : info.withStatus == 2 ? '出金失败' : '出金取消' : '-'
                }}
              </el-col>
            </el-row>
          </div>
          <div class="text box-content">
            <el-row>
              <el-col :span="24">
                订单号：
                <span>
                                {{ info ? info.bankNo : '-' }}
                            </span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                出金金额：
                <span>
                                ￥{{ info ? info.withAmt : '-' }}
                            </span>
              </el-col>
              <el-col :span="8">
                手续费：
                <span>
                                ￥{{ info ? info.withFee : '-' }}
                            </span>
              </el-col>
              <el-col v-if="info" :span="8">
                应转账金额：
                <span class="number">
                                ￥{{ info.withAmt - info.withFee }}
                            </span>
              </el-col>
            </el-row>
            <el-row>
              <el-col v-if="info && info.withMsg" :span="24">
                取消原因：{{ info ? info.withMsg : '' }}
              </el-col>
            </el-row>
            <el-row v-if="info && info.transTime">
              <el-col>
                {{ info.transTime | timeFormat }}
              </el-col>
            </el-row>
            <el-row class="small">
              提现银行卡详情：
            </el-row>
            <el-row v-if="info">
              <el-col :span="12">
                银行名称：
                {{ info ? info.bankName : '-' }}
                <el-button v-clipboard:copy="info.bankName"
                           v-clipboard:success="onCopy"
                           v-clipboard:error="onError"
                           type="text">复制
                </el-button>
              </el-col>
              <el-col :span="12">
                支行名称：
                {{ info ? info.bankAddress : '-' }}
                <el-button v-clipboard:copy="info.bankAddress"
                           v-clipboard:success="onCopy"
                           v-clipboard:error="onError"
                           type="text">复制
                </el-button>
              </el-col>
              <el-col :span="24">
                银行卡号：
                {{ info ? info.bankNo : '-' }}
                <el-button v-clipboard:copy="info.bankAddress"
                           v-clipboard:success="onCopy"
                           v-clipboard:error="onError"
                           type="text">复制
                </el-button>
              </el-col>
            </el-row>
            <el-row class="auxiliary">
              <el-col v-if="info" :span="12">
                申请时间：
                <span>{{ info.applyTime | timeFormat }}</span>
              </el-col>
              <el-col v-if="info && info.transTime" class="text-right" :span="12">
                出金时间：
                <span>{{ info.transTime | timeFormat }}</span>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  components: {},
  props: {
    info: {
      type: Object,
      default: function () {
        return {
          accountType: 0,
          agentId: 0,
          agentName: '',
          enableAmt: 0,
          id: 0,
          idCard: '',
          isActive: 0,
          isLock: 0,
          phone: '0',
          profitAndLose: 0,
          realName: '',
          regAddress: '',
          riskRate: 0,
          userAmt: 0
        }
      }
    }
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  watch: {},
  computed: {},
  created () {
  },
  mounted () {
  },
  methods: {
    onCopy: function (e) {
      this.$message({
        message: '复制成功！',
        type: 'success'
      })
    },
    onError: function (e) {
      console.log(e)
      this.$message({
        message: '复制失败！',
        type: 'warning'
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
