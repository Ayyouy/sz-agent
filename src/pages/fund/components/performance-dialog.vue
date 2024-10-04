<template>
  <div class="wrapper">
    <el-dialog :title="flag==0?'层级奖详情列表':'团队奖详情列表'" :visible.sync="dialogVisible" width="60%">
      <div>
        <el-row style="margin-bottom: 10px;">
          <el-col :span="24">
            <span>{{ month }}</span>
          </el-col>
        </el-row>
        <el-card class="box-card">
          <div class="table">
            <el-table
              :data="list"
              style="width: 100%">
              <el-table-column
                prop="realName"
                :label="flag==0?'代理姓名/ID':'用户姓名/ID'">
                <template slot-scope="scope">
                  {{ scope.row.realName }}/{{ scope.row.userId }}
                </template>
              </el-table-column>
              <el-table-column
                prop="agentName"
                label="归属代理/ID">
                <template slot-scope="scope">
                  {{ scope.row.agentName }}/{{ scope.row.agentId }}
                </template>
              </el-table-column>
              <el-table-column
                prop="agentLevel"
                label="代理等级">
                <template slot-scope="scope">
                  {{ scope.row.agentLevel + 1 }}级
                </template>
              </el-table-column>
              <el-table-column
                prop="buyTotal"
                :label="flag==0?'总购买金额':'购买金额'">
                <template slot-scope="scope">
                  {{ scope.row.buyTotal }}
                </template>
              </el-table-column>
              <el-table-column
                prop="redTotal"
                :label="flag==0?'总赎回金额':'赎回金额'">
                <template slot-scope="scope">
                  {{ scope.row.redTotal }}
                </template>
              </el-table-column>
              <el-table-column
                prop="redTotal"
                label="净购买额">
                <template slot-scope="scope">
                  {{ scope.row.buyTotal - scope.row.redTotal }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
        <el-row>
          <el-col :span="24" class="text-right" style="margin-top: 20px;">
            总收益：<span>{{ amounts }}</span>
          </el-col>
        </el-row>
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
      dialogVisible: false,
      list: [],
      amounts: 0,
      flag: 0,
      month: ''
    }
  },
  watch: {
    info (val) {
      if (val) {
        this.list = this.info.data
        this.amounts = this.info.amounts
        this.flag = this.info.type
        this.month = this.info.month
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
