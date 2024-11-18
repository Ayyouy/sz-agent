<template>
  <div>
    <el-card class="box-card">
      <!--  代理返佣明细  -->
      <el-form :inline="true" :model="form" class="demo-form-inline" size="small">
        <el-form-item label="编号">
          <el-input v-model="form.p1" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="代理名称/ID">
          <el-input v-model="form.agentIdOrName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="交易者姓名/ID">
          <el-input v-model="form.agentIdOrName" placeholder="请输入"></el-input>
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
                     @change="currentSel" v-model="form.type">
            <el-option v-for="item in types" :key="item.type" :label="item.value" :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="股票代码">
          <el-input v-model="form.agentIdOrName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="市场">
          <el-select clearable filterable placeholder="所有" value-key="type" v-model="form.type">
            <el-option v-for="item in types" :key="item.type" :label="item.value" :value="item.type"></el-option>
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
          ref="elTable"
          v-loading="loading"
          :data="list.list"
          style="width: 100%">
          <el-table-column
            prop="orderNum"
            label="编号">
            <template slot-scope="scope">
              {{ scope.row.orderNum }}
            </template>
          </el-table-column>
          <el-table-column
            prop="realName"
            label="代理姓名">
            <template slot-scope="scope">
              {{ scope.row.realName }}
            </template>
          </el-table-column>
          <el-table-column
            prop="agentRealName"
            label="代理ID">
            <template slot-scope="scope">
              {{ scope.row.agentId }}
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
            prop="amount"
            label="返佣来源">
            <template slot-scope="scope">
              {{ scope.row.amount }}
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
            prop="addTime"
            label="汇率">
            <template slot-scope="scope">
              {{ scope.row.addTime | timeFormat }}
            </template>
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
            prop="type"
            label="市场">
            <template slot-scope="scope">
              {{ scope.row.type }}
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="股票代码">
            <template slot-scope="scope">
              {{ scope.row.type }}
            </template>
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
            prop="type"
            label="实际买入价格">
            <template slot-scope="scope">
              {{ scope.row.type }}
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="数量">
            <template slot-scope="scope">
              {{ scope.row.type }}
            </template>
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
            prop="type"
            label="交易时间">
            <template slot-scope="scope">
              {{ scope.row.type }}
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
  </div>
</template>

<script>
import * as api from '@/axios/api'
import * as epi from 'xlsx'
import {saveAs} from 'file-saver'

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
        orderNum: '',
        rangeTime: '',
        type: ''
      },
      list: {
        list: []
      },
      types: [],
      detail: {},
      loading: false
    }
  },
  mounted () {
    // this.getTypes()
    // this.getList()
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
      const fileName = 'rebate-page-' + this.form.pageNum + '.xlsx'
      // 获取表格的DOM元素
      const elTable = this.$refs.elTable
      const wb = epi.utils.table_to_book(elTable.$el)
      const wbout = epi.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})
      try {
        // 导出Excel文件，fileName为自定义的文件名
        saveAs(new Blob([wbout], {type: 'application/octet-stream'}), fileName)
      } catch (e) {
        if (typeof console !== 'undefined') console.error(e, wbout)
      }
      return wbout
    },
    async getTypes () {
      // let data = await api.getFinancialTypes()
      let data = {}
      if (data.status === 0) {
        this.types = data.data
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
        pageNum: this.form.pageNum,
        pageSize: this.form.pageSize,
        userIdOrName: this.form.userIdOrName,
        agentIdOrName: this.form.agentIdOrName,
        agentLevel: this.form.agentLevel,
        buyTimeStart: this.form.rangeTime ? this.form.rangeTime[0] : null,
        buyTimeEnd: this.form.rangeTime ? this.form.rangeTime[1] : null,
        orderNum: this.form.orderNum,
        type: this.form.type
      }
      // let data = await api.financial(opts)
      let data = {}
      if (data.status === 0) {
        this.list.total = data.data.total
        this.list.list = data.data.records
      } else {
        this.$message.error(data.msg)
      }
      this.loading = false
    },
    currentSel (val) {
      this.form.type = val
    },
    timeFormatTiString (val) {
      let fmt = 'yyyy-MM-dd hh:mm:ss'
      if (!val) {
        return
      }
      let date = new Date(val)
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + ''
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str))
        }
      }
      return fmt
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
