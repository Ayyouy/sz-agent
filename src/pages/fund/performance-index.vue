<template>
  <div>
    <!--  代理业绩统计  -->
    <el-card class="box-card">
      <el-form :inline="true" :model="form" class="demo-form-inline" size="small">
        <el-form-item label="月份">
          <el-select clearable filterable v-model="form.farMonth" placeholder="所有">
            <el-option v-for="item in months" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="代理名称/ID">
          <el-input v-model="form.agentIdOrName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="代理等级">
          <el-select clearable filterable v-model="form.agentLevel" placeholder="所有">
            <el-option label="一级代理" value="0"></el-option>
            <el-option label="二级代理" value="1"></el-option>
            <el-option label="三级代理" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="奖励类型">
          <el-select clearable filterable v-model="form.frType" placeholder="所有">
            <el-option label="团队奖" value="0"></el-option>
            <el-option label="层级奖" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="table">
        <el-table
          v-loading="loading"
          :data="list.list"
          style="width: 100%">
          <el-table-column
            prop="farMonth"
            label="时间">
            <template slot-scope="scope">
              {{ scope.row.farMonth }}
            </template>
          </el-table-column>
          <el-table-column
            prop="agentName"
            label="代理姓名/ID">
            <template slot-scope="scope">
              {{ scope.row.agentName }}/{{ scope.row.agentId }}
            </template>
          </el-table-column>
          <el-table-column
            prop="floatRate"
            label="代理等级">
            <template slot-scope="scope">
              {{ scope.row.agentLevel + 1 }}级
            </template>
          </el-table-column>
          <el-table-column
            prop="transState"
            label="上月业绩">
            <template slot-scope="scope">
              ${{ scope.row.lastMonthIncome }}
            </template>
          </el-table-column>
          <el-table-column
            prop="transState"
            label="本月业绩">
            <template slot-scope="scope">
              ${{ scope.row.monthIncome }}
            </template>
          </el-table-column>
          <el-table-column
            prop="monthIncome"
            label="本月差额">
            <template slot-scope="scope">
              <span v-if="scope.row.frType==1">
                 {{ scope.row.monthIncome - scope.row.lastMonthIncome }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="transState"
            label="奖励比例">
            <template slot-scope="scope">
              {{ scope.row.frRatio }}%
            </template>
          </el-table-column>
          <el-table-column
            prop="income"
            label="收益额">
            <template slot-scope="scope">
             <span v-if="scope.row.frType==1">
                 ${{ (scope.row.monthIncome - scope.row.lastMonthIncome) * scope.row.frRatio / 100 }}
              </span>
              <span v-else-if="scope.row.frType==0">
                ${{ scope.row.monthIncome * scope.row.frRatio / 100 }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="frType"
            label="奖励类型">
            <template slot-scope="scope">
              <el-tag :type="scope.row.frType==1?'':'warning'">
                {{ scope.row.frType == 1 ? '团队奖' : '层级奖' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            width="60px"
            prop="isLock"
            label="详情">
            <template slot-scope="scope">
              <el-button type="text" title="详情" size="small" @click="showDetailDialog(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page-box">
          <el-pagination
            class="pull-right"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="list.pageNum"
            :page-sizes="[10, 20, 30, 40,50]"
            :page-size="list.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="list.total">
          </el-pagination>
        </div>
      </div>
    </el-card>
    <PerformanceDialog :info='detail' ref="performanceDialog"></PerformanceDialog>
  </div>
</template>

<script>
import * as api from '@/axios/api'
import PerformanceDialog from './components/performance-dialog.vue'

export default {
  components: {
    PerformanceDialog
  },
  props: {},
  data() {
    return {
      form: {
        frType: '',
        farMonth: '',
        agentIdOrName: '',
        agentLevel: '',
        pageNum: 1,
        pageSize: 10
      },
      list: {
        list: []
      },
      months: [],
      detail: {},
      loading: false
    }
  },
  mounted() {
    this.lastTwelveMonths()
    this.getList()
  },
  methods: {
    lastTwelveMonths() {
      let date = new Date()
      let currentYear = date.getFullYear()
      let currentMonth = date.getMonth() + 1
      for (let i = 0; i < 12; i++) {
        let year = currentYear
        let month = currentMonth - i
        if (month <= 0) {
          year -= 1
          month += 12
        }
        let monthStr = month < 10 ? '0' + month : `${month}`
        this.months.push(year + '-' + monthStr)
      }
      // this.months.reverse()
    },
    handleSizeChange(val) {
      this.form.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.form.pageNum = val
      this.getList()
    },
    onSubmit() {
      this.form.pageNum = 1
      this.getList()
    },
    async getList() {
      if (this.loading) {
        return
      }
      this.loading = true
      // 获取表格数据
      let opts = {
        frType: this.form.frType === '' ? 1 : this.form.frType,
        farMonth: this.form.farMonth,
        agentIdOrName: this.form.agentIdOrName,
        agentLevel: this.form.agentLevel,
        pageSize: this.form.pageSize,
        pageNum: this.form.pageNum
      }
      let data = await api.incomes(opts)
      if (data.status === 0) {
        this.list = data.data
      } else {
        this.$message.error(data.msg)
      }
      this.loading = false
    },
    showDetailDialog(val) {
      let opts = {
        type: val.frType,
        month: val.farMonth,
        agentId: val.agentId
      }
      this.getDetailPerformance(opts)
    },
    async getDetailPerformance(opts) {
      let data = await api.incomesDetail(opts)
      if (data.status === 0) {
        this.$refs.performanceDialog.dialogVisible = true
        let amounts = 0
        data.data.forEach(item => {
          amounts += item.amount
        })
        this.detail = data
        this.detail.amounts = amounts
        this.detail.type = opts.type
        this.detail.month = opts.month
      } else {
        this.$message.error(data.msg)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.table .el-table .warning-row {
  background: rgba(245, 108, 108, .1);
}

.table {
  .show {
    border: 1px solid #2196F3;
    margin-right: 8px;
    padding: 0 2px;
    font-size: 12px;
    border-radius: 4px;
    color: #2196F3;

    &.red {
      border-color: #ff0000;
      color: #ff0000;
    }
  }
}
</style>
