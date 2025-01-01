<template>
  <div>
      <!--  代理返佣明细  -->
      <el-form :inline="true" :model="form" class="demo-form-inline" size="small">
        <el-form-item label="编号">
          <el-input v-model="form.positionSn" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="代理名称/ID">
          <el-input v-model="form.agentIdOrName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="交易者姓名/ID">
          <el-input v-model="form.userIdOrName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="代理等级">
          <el-select clearable filterable v-model="form.agentLevel" placeholder="所有">
            <el-option label="一级代理" value="0"></el-option>
            <el-option label="二级代理" value="1"></el-option>
            <el-option label="三级代理" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="返佣来源">
          <el-select clearable filterable placeholder="所有" value-key="type"
                     v-model="form.feeType">
            <el-option label="入仓手续费" value="1"></el-option>
            <el-option label="平仓手续费" value="2"></el-option>
            <el-option label="延递费(留仓费)" value="3"></el-option>
            <el-option label="分红" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="股票代码">
          <el-input v-model="form.stockCode" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="市场">
          <el-select clearable filterable placeholder="所有" value-key="type" v-model="form.stockPlate">
            <el-option label="科创" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易时间">
          <el-date-picker
            v-model="form.rangeTime"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
          <el-button type="primary" size="small" @click="onExport">导出</el-button>
        </el-form-item>
      </el-form>
      <div class="table">
        <el-table
          id="table"
          v-loading="loading"
          :data="list.list"
          style="width: 100%">
          <el-table-column
            prop="positionSn"
            label="编号">
          </el-table-column>
          <el-table-column
            prop="agentName"
            label="代理姓名/ID">
            <template slot-scope="scope">
              {{ scope.row.agentName }}
              <span class="small">
              /{{ scope.row.agentId }}
            </span>
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
            prop="feeType"
            label="返佣来源">
            <template slot-scope="scope">
              <span v-if="scope.row.feeType==1">入仓手续费</span>
              <span v-else-if="scope.row.feeType==2">平仓手续费</span>
              <span v-else-if="scope.row.feeType==3">延递费(留仓费)</span>
              <span v-else-if="scope.row.feeType==4">分红</span>
              <span v-else>未知</span>
            </template>
          </el-table-column>
          <el-table-column
            width="120px"
            prop="balance"
            label="余额(本国货币)">
            <template slot-scope="scope">
              {{ scope.row.balance }}
            </template>
          </el-table-column>
          <el-table-column
            prop="fundName"
            label="返佣比例">
            <template slot-scope="scope">
              {{ scope.row.fundName }}
            </template>
          </el-table-column>
          <el-table-column
            width="120px"
            prop="money"
            label="佣金(本国货币)">
            <template slot-scope="scope">
              ${{ Number(scope.row.money).toFixed(3) }}（{{ scope.row.portion }}份）
            </template>
          </el-table-column>
          <el-table-column
            prop="rate"
            label="汇率">
          </el-table-column>
          <el-table-column
            prop="type"
            label="佣金($)">
            <template slot-scope="scope">
              {{ scope.row.type }}
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="结算时间">
            <template slot-scope="scope">
              {{ scope.row.type }}
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="交易员姓名">
            <template slot-scope="scope">
              {{ scope.row.type }}
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="交易者ID">
            <template slot-scope="scope">
              {{ scope.row.type }}
            </template>
          </el-table-column>
          <el-table-column
            prop="stockPlate"
            label="市场">
          </el-table-column>
          <el-table-column
            prop="stockCode"
            label="股票代码">
          </el-table-column>
          <el-table-column
            prop="type"
            label="方向">
            <template slot-scope="scope">
              {{ scope.row.type }}
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="开/平仓">
            <template slot-scope="scope">
              {{ scope.row.type }}
            </template>
          </el-table-column>
          <el-table-column
            prop="buyOrderPrice"
            label="实际买入价格">
            <template slot-scope="scope">
              {{ Number(scope.row.buyOrderPrice).toFixed(2) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="orderNum"
            label="数量">
          </el-table-column>
          <el-table-column
            prop="type"
            label="手续费率">
            <template slot-scope="scope">
              {{ scope.row.type }}
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="订单编号">
            <template slot-scope="scope">
              {{ scope.row.type }}
            </template>
          </el-table-column>
          <el-table-column
            prop="buyOrderTime"
            label="交易时间">
            <template slot-scope="scope">
              {{ scope.row.buyOrderTime|timeFormat }}
            </template>
          </el-table-column>
        </el-table>
        <div class="page-box">
          <el-pagination
            class="pull-right"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="form.pageNum"
            :page-sizes="[10, 20, 30, 40,50]"
            :page-size="form.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="list.total">
          </el-pagination>
        </div>
      </div>
  </div>
</template>

<script>
import * as api from '@/axios/api'
import * as XLSX from 'xlsx'

export default {
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近六个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      form: {
        pageNum: 1,
        pageSize: 10,
        userIdOrName: '',
        agentIdOrName: '',
        agentLevel: '',
        stockPlate: '',
        stockCode: '',
        rangeTime: '',
        positionSn: '',
        feeType: ''
      },
      list: {
        list: []
      },
      loading: false
    }
  },
  mounted () {
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
    onExport () {
      // element-ui 表格中的 fixed 属性会导致多出一个 table，进而导致下载重复内容，所以这里需要删除掉
      // 由于 fixed 有两种形式：left(默认)或right，所以要进行两种类型的删除
      // let table = this.$refs.elTable
      let table = document.getElementById('table').cloneNode(true)
      if (table.querySelector('.el-table__fixed') != null) {
        table.removeChild(table.querySelector('.el-table__fixed'))
      }
      if (table.querySelector('.el-table__fixed-right') != null) {
        table.removeChild(table.querySelector('.el-table__fixed-right'))
      }
      let header = table.querySelector('.el-table__header-wrapper')
      let body = table.querySelector('.el-table__body-wrapper')
      let th = header.childNodes[0].querySelectorAll('th')
      for (let key in th) {
        if (th[key].innerText === '操作') {
          th[key].remove()
        }
      }
      let td = body.childNodes[0].childNodes[1].querySelectorAll('td')
      for (let key = 0; key < td.length; key++) {
        if (td[key].querySelectorAll('.el-button').length > 0) {
          td[key].remove()
        }
      }
      const fileName = 'RebatePage' + this.form.pageNum + '.xlsx'
      let wb = XLSX.utils.table_to_book(table, {raw: true})
      XLSX.writeFile(wb, fileName)
    },
    async getList () {
      if (this.loading) {
        return
      }
      this.loading = true
      // 获取表格数据
      let opts = {
        pageNum: this.form.pageNum,
        pageSize: this.form.pageSize,
        userIdOrName: this.form.userIdOrName,
        agentIdOrName: this.form.agentIdOrName,
        agentLevel: this.form.agentLevel,
        stockPlate: this.form.stockPlate,
        stockCode: this.form.stockCode,
        buyTimeStart: this.form.rangeTime ? this.form.rangeTime[0] : null,
        buyTimeEnd: this.form.rangeTime ? this.form.rangeTime[1] : null,
        positionSn: this.form.positionSn,
        feeType: this.form.feeType
      }
      let data = await api.getAgentBackList(opts)
      if (data.status === 0) {
        this.list.total = data.data.total
        this.list.list = data.data.records
      } else {
        this.$message.error(data.msg)
      }
      this.loading = false
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
