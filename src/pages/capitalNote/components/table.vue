<template>
  <div>
    <el-card class="box-card">
      <el-form :inline="true" :model="form" class="demo-form-inline" size="small">
        <el-form-item label="订单编号" prop="orderNum">
          <el-input v-model="form.orderNum" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="frType">
          <el-select filterable v-model="form.frType" placeholder="请选择">
            <el-option v-for="(item,index) in options" :key="index" :label="item.value" :value="item.type">{{
                item.value
              }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="form.rangeTime"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="table">
        <el-table
          v-loading="loading"
          :data="list.list"
          style="width: 100%">
          <el-table-column
            prop="orderNum"
            label="订单编号">
          </el-table-column>
          <el-table-column
            prop="amount"
            label="变动金额">
          </el-table-column>
          <el-table-column
            prop="balance"
            label="基金账户余额">
          </el-table-column>
          <el-table-column
            prop="addTime"
            label="时间">
            <template slot-scope="scope">
              <span>{{ scope.row.addTime | timeFormat }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="frType"
            label="类型">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="说明">
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
    </el-card>
  </div>
</template>

<script>
import * as api from '@/axios/api'

export default {
  data () {
    return {
      form: {
        orderNum: '',
        frType: '',
        addTimeStart: '',
        addTimeEnd: '',
        rangeTime: '',
        pageNum: 1,
        pageSize: 10
      },
      list: {
        list: []
      },
      options: [],
      loading: false // 表格加载
    }
  },
  mounted () {
    this.getList()
    this.getTypes()
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
      // 查询表格
      this.form.pageNum = 1
      this.getList()
    },
    async getTypes () {
      let data = await api.getUserCapitalTypes()
      if (data.status === 0) {
        this.options = data.data
      } else {
        this.$message.error(data.msg)
      }
    },
    async getList () {
      // 获取表格数据
      let opts = {
        orderNum: this.form.orderNum,
        frType: this.form.frType,
        addTimeStart: this.form.rangeTime ? this.form.rangeTime[0] : null,
        addTimeEnd: this.form.rangeTime ? this.form.rangeTime[1] : null,
        pageNum: this.form.pageNum,
        pageSize: this.form.pageSize
      }
      this.loading = true
      let data = await api.getUserCapitalNotes(opts)
      if (data.status === 0) {
        data.data.list.forEach(item => {
          if (item.amount !== 0) {
            item.amount = item.amount > 0 ? '+$' + Number(item.amount).toFixed(2) : '-$' + Number(item.amount).toFixed(2)
          }
        })
        this.list = data.data
      } else {
        this.$message.error(data.msg)
      }
      this.loading = false
    }
  }
}
</script>
