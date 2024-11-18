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
          <div>
            <el-form :model="form" label-width="100px">
              <el-row>
                <el-col :span="24">
                  <label class="el-form-item__label" style="width: 100px;">钱包资金：</label>
                  ${{ detail.walletBalance }}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item prop="type">
                    <el-radio-group v-model="form.type">
                      <el-radio :label="0">出金111</el-radio>
                      <el-radio :label="1">转账给他人222</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item prop="amount" :label="form.type==1?'转账金额：':'金额：'">
                    <el-input-number v-model="form.amount" placeholder="请输入金额"></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-show="form.type==1" type="flex" style="width: 100%">
                <el-col :span="8">
                  <el-form-item prop="cardPerson" label="收款人：">
                    <el-input type="number" v-model="form.cardPerson" placeholder="请输入卡号或用户id"
                              @input="inputChange"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-select filterable clearable placeholder="请选择" value="请选择" @change="selectChange">
                    <el-option v-for="i in list" :key="i.walletId" :label="i.cardNum +'-'+  i.realName"
                               :value="i.cardNum +'-'+  i.realName +'-'+i.userId"></el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row v-show="form.type==1" style="width: 100%;margin-top: 30px">
                <el-col :span="8">
                  <el-form-item prop="cardName" label="收款人姓名：">
                    <el-input v-model="form.cardName" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>
        <el-row>
          <el-col :span="24" class="text-center">
            <el-button type="primary" @click="submit()">确 定</el-button>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import * as api from '@/axios/api'

export default {
  props: {},
  data () {
    return {
      form: {
        type: 0,
        amount: '',
        inCardNum: '',
        inUserId: '',
        userId: '',
        cardPerson: '',
        cardName: ''
      },
      detail: {},
      list: []
    }
  },
  created () {
    this.$store.state.activeIndex = 'wallet'
  },
  mounted () {
    this.getWallets()
  },
  methods: {
    selectChange (val) {
      let result = val.split('-')
      console.log(result)
      this.form.inCardNum = result[0]
      this.form.cardPerson = result[0]
      this.form.cardName = result[1]
      this.form.inUserId = result[2]
    },
    async inputChange () {
      this.list = []
      let opt1 = {
        userId: this.form.cardPerson
      }
      let data1 = await api.walletByUser(opt1)
      if (data1.status === 0 && data1.data !== undefined) {
        data1.data.list.forEach(item => {
          this.list.push(item)
        })
      }
      let opt2 = {
        userId: this.form.cardPerson
      }
      let data2 = await api.walletByCard(opt2)
      if (data2.status === 0 && data2.data !== undefined) {
        data2.data.list.forEach(item => {
          this.list.push(item)
        })
      }
    },
    async getWallets () {
      let opts = {
        userId: this.$store.state.userInfo.id
      }
      let data = await api.walletById(opts)
      if (data.status === 0) {
        this.detail = data.data
      } else {
        this.$message.error(data.msg)
      }
    },
    async submit () {
      if (this.form.type !== 0 && this.form.type !== 1) {
        this.$message.error('类型出错')
        return false
      }
      if (this.form.amount <= 0) {
        this.$message.error('金额出错')
        return false
      }
      let opt = {
        type: this.form.type,
        amount: this.form.amount,
        userId: this.detail.userId
      }
      if (this.form.type === 1) {
        opt.inCardNum = this.form.inCardNum
        opt.inUserId = this.form.inUserId
      }
      let data = await api.walletSend(opt)
      if (data.status === 0) {
        this.$message.success(this.form.type === 1 ? '转账成功' : '转账失败')
        await this.getWallets()
        this.form.type = 0
        this.form.amount = ''
        this.form.inCardNum = ''
        this.form.inUserId = ''
        this.form.userId = ''
        this.form.cardPerson = ''
        this.form.cardName = ''
        this.list = []
      } else {
        this.$message.error(data.msg)
      }
    }
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
