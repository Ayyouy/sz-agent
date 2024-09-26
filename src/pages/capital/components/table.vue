<template>
  <div>
    <el-form :inline="true" :model="form" class="demo-form-inline" size="small">
      <el-form-item label="代理名称/ID">
        <el-input v-model="form.user" placeholder="代理名称"></el-input>
      </el-form-item>
      <el-form-item label="客户姓名/ID">
        <el-input v-model="form.user" placeholder="代理名称"></el-input>
      </el-form-item>
      <el-form-item label="代理等级">
        <el-select v-model="form.payChannel" placeholder="支付方式">
          <el-option label="支付宝" value="0"></el-option>
          <el-option label="对公转账" value="1"></el-option>
          <el-option label="其他" value=""></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资金性质">
        <el-select v-model="form.payChannel" placeholder="支付方式">
          <el-option label="支付宝" value="0"></el-option>
          <el-option label="对公转账" value="1"></el-option>
          <el-option label="其他" value=""></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="购买时间">
<!--   详情看admin项目中的 ransoms 实现     -->
        <el-date-picker
          v-model="form.rangeTime"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="订单编号">
        <el-input v-model="form.user" placeholder="代理名称"></el-input>
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
          prop="agentCode"
          label="订单编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="agentName"
          label="变动金额"
          width="180">
        </el-table-column>
        <el-table-column
          prop="agentRealName"
          label="基金账户余额">
        </el-table-column>
        <el-table-column
          prop="agentPhone"
          label="时间">
<!--          时间它有一个特殊处理方式，调试时留意一下-->
        </el-table-column>
        <el-table-column
          prop="agentLevel"
          :formatter="statusFormat"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="poundageScale"
          label="说明">
        </el-table-column>
      </el-table>
      <div class="page-box">
        <el-pagination
          class="pull-right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="list.pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="list.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="list.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/axios/api'

export default {
  props: {},
  data () {
    return {
      form: {
        user: '',
        region: '',
        pageNum: 1,
        pageSize: 15
      },
      list: {
        list: []
      },
      loading: false // 表格加载
    }
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {
    this.getList()
  },
  methods: {
    onSubmit () {
      // 查询表格
      this.getList()
    },
    handleSizeChange (val) {
      this.form.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.form.pageNum = val
      this.getList()
    },
    async getList () {
      let opts = {
        pageNum: this.form.pageNum,
        pageSize: this.form.pageSize
      }
      let data = await api.getSecondAgent(opts)
      if (data.status === 0) {
        this.list = data.data
      } else {
        this.$message.error(data.msg)
      }
    }
  }
}
</script>
