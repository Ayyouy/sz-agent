<template>
  <div class="wrapper">
    <el-dialog title="团队奖详情" :visible.sync="dialogVisibleZero" width="60%">
      <div>
        <el-row style="margin-bottom: 10px">
          <el-col :span="24">
            <span>{{ month }}</span>
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 10px">
          <el-col :span="8">
            <span>本月持仓额：${{ amounts }}</span>
          </el-col>
          <el-col :span="8">
            <span>差额：${{ ducAmounts }}</span>
          </el-col>
          <el-col :span="8">
            <span>奖励比例：{{ frRatio }}%</span>
          </el-col>
        </el-row>
        <el-card class="box-card">
          <div class="table">
            <el-table
              :data="list"
              style="width: 100%">
              <el-table-column
                prop="realName"
                label="用户姓名/ID">
                <template slot-scope="scope">
                  {{ scope.row.realName }}<span class="small">/{{ scope.row.userId }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="agentName"
                label="归属代理/ID">
                <template slot-scope="scope">
                  {{ scope.row.agentName }}<span class="small">/{{ scope.row.agentId }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="agentLevel"
                label="代理等级">
                <template slot-scope="scope">
                  {{ Number.parseInt(scope.row.agentLevel) + 1 }}级
                </template>
              </el-table-column>
              <el-table-column
                prop="lastMonthIncome"
                label="上月持仓额">
                <template slot-scope="scope">
                  ${{ Number(scope.row.lastMonthIncome).toFixed(2) }}
                </template>
              </el-table-column>
              <el-table-column
                prop="monthIncome"
                label="本月持仓额">
                <template slot-scope="scope">
                  ${{ Number(scope.row.monthIncome).toFixed(2) }}
                </template>
              </el-table-column>
              <!--              <el-table-column-->
              <!--                prop="income"-->
              <!--                label="差额">-->
              <!--                <template slot-scope="scope">-->
              <!--                  ${{ Number(scope.row.monthIncome - scope.row.lastMonthIncome).toFixed(2) }}-->
              <!--                </template>-->
              <!--              </el-table-column>-->
            </el-table>
          </div>
        </el-card>
      </div>
    </el-dialog>
    <el-dialog title="层级奖详情" :visible.sync="dialogVisibleOne" width="60%">
      <div>
        <el-row style="margin-bottom: 10px;">
          <el-col :span="12">
            <span>{{ month }}</span>
          </el-col>
          <el-col :span="12" class="text-right">
            <span>合计：${{ amounts }}</span>
          </el-col>
        </el-row>
        <el-card class="box-card">
          <div class="table">
            <el-table
              :data="list"
              style="width: 100%">
              <el-table-column
                prop="realName"
                label="代理姓名/ID">
                <template slot-scope="scope">
                  {{ scope.row.realName }}<span class="small">/{{ scope.row.userId }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="ID"
                label="账号">
                <template slot-scope="scope">
                </template>
              </el-table-column>
              <el-table-column
                prop="agentName"
                label="归属代理/ID">
                <template slot-scope="scope">
                  {{ scope.row.agentName }}<span class="small">/{{ scope.row.agentId }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="agentLevel"
                label="代理等级">
                <template slot-scope="scope">
                  {{ Number.parseInt(scope.row.agentLevel) + 1 }}级
                </template>
              </el-table-column>
              <el-table-column
                prop="monthIncome"
                label="业绩">
                <template slot-scope="scope">
                  ${{ Number(scope.row.monthIncome).toFixed(2) }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
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
  data () {
    return {
      dialogVisibleZero: false,
      dialogVisibleOne: false,
      list: [],
      amounts: 0,
      ducAmounts: 0,
      month: '',
      frRatio: ''
    }
  },
  watch: {
    info (val) {
      if (val) {
        this.list = this.info.data
        this.amounts = this.info.amounts
        this.ducAmounts = this.info.ducAmounts
        this.month = this.info.month
        this.frRatio = this.info.frRatio
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
