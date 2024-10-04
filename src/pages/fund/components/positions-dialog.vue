<template>
  <div class="wrapper">
    <el-dialog title="基金信息" :visible.sync="dialogVisible" width="60%">
      <div>
        <el-card class="box-card">
          <el-row>
            <el-col :span="10">
              客户姓名：<span>{{ fund.realName }}/{{ fund.userId }}</span>
            </el-col>
            <el-col :span="10">
              购买时间：<span>{{ fund.buyTime | timeFormat }}</span>
            </el-col>
            <el-col :span="4" class="text-right">
              封锁期：<span>{{ fund.blackoutPeriod }}天</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              每份净值：<span>{{ fund.perValue }}</span>
            </el-col>
            <el-col :span="10">
              购买份额：<span>{{ fund.buyPortion }}份</span>
            </el-col>
            <el-col :span="4" class="text-right">
              购买金额：<span>{{ fund.buyPortion * fund.perValue }}</span>
            </el-col>
          </el-row>
          <el-row v-if="flag==0">
            <el-col :span="10">
              持仓份额：<span>{{ fund.redemptionPortion }}份</span>
            </el-col>
            <el-col :span="10">
              赎回份额：<span>{{ fund.redeemedPortion }}份</span>
            </el-col>
            <el-col :span="4" class="text-right">
            </el-col>
          </el-row>
          <hr v-show="list.length>0">
          <el-row class="auxiliary" v-for="item in list" :key="item.id">
            <el-col :span="7">
              订单编号：<span>{{ item.orderNum }}</span>
            </el-col>
            <el-col :span="7">
              时间：<span>{{ item.addTime | timeFormat }}</span>
            </el-col>
            <el-col :span="3">
              收益：<span>{{ item.amount }}</span>
            </el-col>
            <el-col :span="7" class="text-right">
              说明：<span>{{ item.remark }}</span>
            </el-col>
          </el-row>
        </el-card>
<!--        <el-row>-->
<!--          <el-col :span="24" class="text-right" style="margin-top: 20px;">-->
<!--            总收益：<span>{{ amounts }}</span>-->
<!--          </el-col>-->
<!--        </el-row>-->
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      fund: {},
      list: [],
      amounts: 0,
      flag: 0
    }
  },
  watch: {
    info(val) {
      if (val) {
        this.fund = this.info.fund
        this.list = this.info.list
        this.amounts = this.info.amounts
        this.flag = this.info.flag
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-row {
  padding-top: .2rem;
  padding-bottom: .2rem;
}

hr {
  border-color: #ececec;
}

.account-box {
  text-align: center;
  background: #f1f3f8;
  border-radius: 8px;
  padding-top: 10px;

  .title {
    font-size: 12px;
    color: #acafb8;
    line-height: 20px;
  }

  .number {
    line-height: 20px;
    margin-bottom: 8px;
  }
}
</style>
