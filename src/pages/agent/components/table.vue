<template>
  <div>
    <el-form :inline="true" :model="form" class="demo-form-inline" size="small">
      <el-form-item label="代理名称/ID">
        <el-input v-model="form.user" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.user" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="邀请码">
        <el-input v-model="form.user" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="代理等级">
        <el-select v-model="form.payChannel" placeholder="所有">
          <el-option label="所有" value="-1"></el-option>
          <el-option label="一级代理" value="0"></el-option>
          <el-option label="二级代理" value="1"></el-option>
          <el-option label="三级代理" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="table">
      <div class="table-top-btn">
        <el-row class="text-right">
          <el-button type="primary" size="small" @click="addAgent" plain>添加下级代理</el-button>
        </el-row>
      </div>
      <el-table
        v-loading="loading"
        :data="list.list"
        style="width: 100%">
        <el-table-column
          prop="agentCode"
          label="邀请码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="agentName"
          label="代理名称/ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="agentRealName"
          label="真实姓名">
        </el-table-column>
        <el-table-column
          prop="agentPhone"
          label="手机号码">
        </el-table-column>
        <el-table-column
          prop="agentLevel"
          :formatter="statusFormat"
          label="手续费比例">
        </el-table-column>
        <el-table-column
          prop="poundageScale"
          label="交易额比例">
        </el-table-column>
        <el-table-column
          prop="deferredFeesScale"
          label="股票收益">
        </el-table-column>
        <el-table-column
          prop="receiveDividendsScale"
          label="基金收益">
        </el-table-column>
        <el-table-column
          prop="totalMoney"
          label="总收益">
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
    <addAgentDialog :getDate='getList' ref="addAgentDialog"></addAgentDialog>

  </div>

</template>

<script>
import * as api from '@/axios/api'
import addAgentDialog from './add-agent'

export default {
  components: {
    addAgentDialog
  },
  props: {},
  data() {
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
  created() {
  },
  mounted() {
    this.getList()
  },
  methods: {
    onSubmit() {
      // 查询表格
      this.getList()
    },
    handleSizeChange(val) {
      this.form.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.form.pageNum = val
      this.getList()
    },
    async getList() {
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
    },
    addAgent() {
      // 添加代理
      this.$refs.addAgentDialog.dialogVisible = true
    },
    statusFormat: function (row, column) {
      let status = row.agentLevel + "级"
      return status
    }
  }
}
</script>
