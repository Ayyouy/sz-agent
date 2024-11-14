<template>
  <div>
    <!--  赎回列表  -->
    <el-card class="box-card">
      <el-form :inline="true" :model="form" class="demo-form-inline" size="small">
        <el-form-item label="客户姓名/ID">
          <el-input v-model="form.userIdOrName" placeholder="请输入"></el-input>
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
        <el-form-item label="基金名称">
          <el-select clearable filterable placeholder="所有" value-key="id"
                     @change="currentSel" v-model="form.fundName">
            <el-option v-for="item in funds" :key="item.id" :label="item.name" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="购买日期">
          <el-date-picker
            v-model="form.buyTime"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd">
          </el-date-picker>
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
            width="150px"
            prop="userId"
            label="客户姓名/ID">
            <template slot-scope="scope">
              {{ scope.row.realName }}<span class="small">/{{ scope.row.userId }}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="150px"
            prop="agentId"
            label="归属代理/ID">
            <template slot-scope="scope">
              {{ scope.row.agentRealName }}<span class="small">/{{ scope.row.agentId }}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="80px"
            prop="agentLevel"
            label="代理等级">
            <template slot-scope="scope">
              {{ scope.row.agentLevel + 1 }}级
            </template>
          </el-table-column>
          <el-table-column
            prop="fundName"
            label="基金名称">
            <template slot-scope="scope">
              {{ scope.row.fundName }}
            </template>
          </el-table-column>
          <el-table-column
            width="80px"
            prop="perValue"
            label="每份净值">
            <template slot-scope="scope">
              ${{ scope.row.perValue }}
            </template>
          </el-table-column>
          <el-table-column
            width="170px"
            prop="redeemedPortion"
            label="赎回金额(份额)">
            <template slot-scope="scope">
              ${{ Number(scope.row.redeemedPortion*scope.row.perValue).toFixed(3) }}
              <span class="small">（{{ scope.row.redeemedPortion }}份）</span>
            </template>
          </el-table-column>
          <el-table-column
            width="170px"
            prop="redemptionTime"
            label="赎回时间">
            <template slot-scope="scope">
              {{ scope.row.redemptionTime| timeFormat }}
            </template>
          </el-table-column>
          <el-table-column
            prop="income"
            label="总收益">
            <template slot-scope="scope">
              ${{ Number(scope.row.income).toFixed(3) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="subscriptionFee"
            label="申购手续费">
            <template slot-scope="scope">
              ${{ Number(scope.row.subscriptionFee).toFixed(3) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="backEndLoad"
            label="赎回手续费">
            <template slot-scope="scope">
              ${{ Number(scope.row.backEndLoad).toFixed(3) }}
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            width="60px"
            prop="isLock"
            label="详情">
            <template slot-scope="scope">
              <el-button type="text" title="基金信息" size="small" @click="showDetailDialog(scope.row.fuId)">详情</el-button>
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
    <RansomsDialog :info='detail' ref="detailDialog"></RansomsDialog>
  </div>
</template>

<script>
import * as api from '@/axios/api'
import RansomsDialog from './components/positions-dialog.vue'

export default {
  components: {
    RansomsDialog
  },
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      form: {
        fundName: '',
        userIdOrName: '',
        agentIdOrName: '',
        agentLevel: '',
        buyTime: '',
        fundId: '',
        pageNum: 1,
        pageSize: 10
      },
      list: {
        list: []
      },
      funds: [],
      detail: {},
      loading: false
    }
  },
  mounted () {
    this.getFunds()
    this.getList()
  },
  methods: {
    handleSizeChange (val) {
      this.form.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.form.pageNum = val
      this.getList()
    },
    onSubmit () {
      this.form.pageNum = 1
      this.getList()
    },
    async getFunds () {
      let opts = {
        fName: ''
      }
      let data = await api.getFunds(opts)
      if (data.status === 0) {
        this.funds = data.data
      } else {
        this.$message.error(data.msg)
      }
    },
    async getList () {
      if (this.loading) {
        return
      }
      this.loading = true
      // 获取表格数据
      let opts = {
        userIdOrName: this.form.userIdOrName,
        agentIdOrName: this.form.agentIdOrName,
        agentLevel: this.form.agentLevel,
        buyTime: this.form.buyTime,
        fundId: this.form.fundId,
        isRedeem: 1,
        pageNum: this.form.pageNum,
        pageSize: this.form.pageSize
      }
      let data = await api.positions(opts)
      if (data.status === 0) {
        this.list = data.data
      } else {
        this.$message.error(data.msg)
      }
      this.loading = false
    },
    showDetailDialog (val) {
      this.getDetailPosition(val)
    },
    async getDetailPosition (val) {
      let opts = {
        id: val
      }
      let data = await api.detailPositions(opts)
      if (data.status === 0) {
        this.$refs.detailDialog.dialogVisible = true
        this.detail = data.data
        let amounts = 0
        data.data.list.forEach(item => {
          amounts += item.amount
        })
        this.detail.amounts = amounts
        this.detail.flag = 1
      } else {
        this.$message.error(data.msg)
      }
    },
    currentSel (val) {
      this.form.fundId = val.id
      this.form.fundName = val.name
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
.small{
  font-size: 12px;
  color: #999;
}
</style>
