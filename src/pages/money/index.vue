<template>
  <el-container>
    <el-main>
      <div class="containter">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-row type="flex" justify="left">
              <el-col :span="24">
                <strong style="font-weight: bold;font-size: 18px;margin-right: 30px">钱包</strong>
              </el-col>
            </el-row>
          </div>
          <div class="text item">
            <el-row type="flex" justify="space-around">
              <el-col :span="12">
                钱包资金：{{ detail.agentName }}
              </el-col>
              <el-col :span="12">
                钱包资金：{{ detail.agentRealName }}
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-around">
              <el-col :span="12">
                <!--  此form需要与另外一个form数据联动，即下面的金额联动，联调接口时再细节调整 -->
                <el-form v-model="xxxx">
                  <el-form-item>
                    <el-radio-group v-model="xxxx">
                      <el-radio label="1">出金</el-radio>
                      <el-radio label="2">转账给他人</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <!--  此form需要与另外一个form数据联动，即下面的金额联动，联调接口时再细节调整 -->
                <el-form v-model="xxxx">
                  <el-form-item>
                    <el-radio-group v-model="xxxx">
                      <el-radio label="1">出金</el-radio>
                      <el-radio label="2">转账给他人</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form v-model="xxxx">
                  <el-form-item>
                    金额：
                    <el-input-number placeholder="请输入金额"></el-input-number>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form v-model="xxxx">
                  <el-form-item>
                    转账金额：
                    <el-input-number placeholder="请输入金额"></el-input-number>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">收款人姓名：</el-col>
              <el-col :span="12">收款人账号：
                <el-select value="">
                </el-select>
                <el-input></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                收款人银行：
              </el-col>
              <el-col :span="12">
                收款人姓名：
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12"></el-col>
              <el-col :span="12"></el-col>
            </el-row>
            <el-row>
              <el-col :span="12"></el-col>
              <el-col :span="12"></el-col>
            </el-row>
            <el-row>
              <el-col :span="12"></el-col>
              <el-col :span="12"></el-col>
            </el-row>
          </div>
        </el-card>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import * as api from '@/axios/api'

export default {
  props: {},
  data() {
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
      console.log(e)
      this.$message({
        message: '复制失败！',
        type: 'warning'
      })
    },
    async getAgentInfo() {
      let data = await api.getAgentInfo()
      if (data.status === 0) {
        this.detail = data.data
        this.$store.state.userInfo = data.data
      } else {
        this.$message.error(data.msg)
      }
    }
  },
  created() {
    this.$store.state.activeIndex = 'money'
  },
  mounted() {
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
