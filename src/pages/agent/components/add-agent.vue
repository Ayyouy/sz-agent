<template>
  <div class="wrapper">
    <el-dialog
      title="添加下级代理"
      :visible.sync="dialogVisible"
      width="50%"
      :onclose="closeDialog" :close-on-click-modal="false" :close-on-press-escape="false">
      <div>
        <el-form :model="form" ref="ruleForm" :rules="rule" class="demo-form-inline">
          <el-form-item label="代理名" prop="agentName">
            <el-input v-model="form.agentName" placeholder="代理名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="agentPwd">
            <el-input v-model="form.agentPwd" pattern="[a-zA-Z0-9]+" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item label="代理手机" prop="agentPhone">
            <br/>
            <el-row type="flex" justify="space-between">
              <el-col :span="3">
                <el-select v-model="form.payChannel">
                  <el-option v-for="item in options" :key="item" :label="item" :value="item">{{ item }}</el-option>
                </el-select>
              </el-col>
              <el-col :span="21">
                <el-input v-model="form.agentPhone" placeholder="代理手机"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="真实姓名（一经提交，无法修改）" prop="agentRealName">
            <el-input v-model="form.agentRealName" placeholder="真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="手续费比例" prop="poundageScale">
            <el-input v-model="form.poundageScale" placeholder="手续费比例，1=100%例如：0.25"></el-input>
          </el-form-item>
          <el-form-item label="交易额返佣比例" prop="deferredFeesScale">
            <el-input v-model="form.deferredFeesScale" placeholder="交易额返佣比例，1=100%例如：0.25"></el-input>
          </el-form-item>
          <el-form-item label="基金比例" prop="receiveDividendsScale">
            <el-input v-model="form.receiveDividendsScale" placeholder="基金比例，1=100%例如：0.25"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="submit('ruleForm')">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/axios/api'

export default {
  components: {},
  props: {
    getDate: {
      type: Function,
      default: function () {
      }
    }
  },
  data () {
    return {
      dialogVisible: false,
      options: ['+1', '+852', '+91', '+81', '+86', '+88', '+00', '+99'],
      form: {
        agentName: '',
        agentPwd: '',
        payChannel: '+1',
        agentPhone: '',
        agentRealName: '',
        poundageScale: '',
        deferredFeesScale: '',
        receiveDividendsScale: '',
        loginInfo: []
      },
      rule: {
        agentName: [
          {required: true, message: '请输入代理名称', trigger: 'blur'},
          {min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur'}
        ],
        agentPwd: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {validator: this.validatePwd, trigger: 'blur'}
        ],
        agentPhone: [
          {required: true, message: '请输入手机号码', trigger: 'blur'},
          {min: 7, message: '请输入正确的手机号', trigger: 'blur'}
        ],
        agentRealName: [
          {required: true, message: '请输入真实姓名', trigger: 'blur'},
          {min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur'}
        ],
        poundageScale: [
          {required: true, message: '请输入手续费比例', trigger: 'blur'}
        ],
        deferredFeesScale: [
          {required: true, message: '请输入递延费比例', trigger: 'blur'}
        ],
        receiveDividendsScale: [
          {required: true, message: '请输入分红比例', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    this.getAgentInfo()
  },
  methods: {
    closeDialog () {
      this.$refs.ruleForm.clearValidate()
      this.dialogVisible = false
    },
    validatePwd (rule, value, callback) {
      if (value === undefined || value == null || value.length === 0) {
        return callback(new Error('请输入密码'))
      }
      const regex = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*].{6,12}$/
      if (!regex.test(value)) {
        return callback(new Error('密码为6~12位数字、字母或符号'))
      }
      callback()
    },
    submit (formName) {
      // 提交
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let opts = {
            agentName: this.form.agentName,
            agentPwd: this.form.agentPwd,
            agentPhone: this.form.payChannel + this.form.agentPhone,
            agentRealName: this.form.agentRealName,
            parentId: this.loginInfo.id,
            poundageScale: this.form.poundageScale,
            deferredFeesScale: this.form.deferredFeesScale,
            receiveDividendsScale: this.form.receiveDividendsScale
          }
          let data = await api.addAgent(opts)
          if (data.status === 0) {
            this.$message.success(data.msg)
            this.dialogVisible = false
            this.form.agentName = ''
            this.form.agentPwd = ''
            this.form.agentPhone = ''
            this.form.agentRealName = ''
            this.form.poundageScale = ''
            this.form.deferredFeesScale = ''
            this.form.receiveDividendsScale = ''
            this.getDate()
          } else {
            this.$message.error(data.msg)
          }
        } else {
          return false
        }
      })
    },
    async getAgentInfo () {
      let data = await api.getAgentInfo()
      if (data.status === 0) {
        this.loginInfo = data.data
      } else {
        this.$message.error(data.msg)
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
