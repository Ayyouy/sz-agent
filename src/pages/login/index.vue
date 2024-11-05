<template>
  <div class="wrapper">
    <div class="lowin">
      <div class="lowin-brand bounceOut">
        <!-- <img src="../../assets/image/logo-mini.png" alt="logo"> -->
        <img class="logo-img" :src="$store.state.siteInfo.siteLogoSm" alt="logo">
      </div>
      <div class="lowin-wrapper">
        <div class="lowin-box lowin-login">
          <div class="lowin-box-inner">
            <p>代理后台登录</p>
            <div class="lowin-group">
              <label>账户名</label>
              <div style="flex: 1;flex-direction: row;display: flex">
                <select class="lowin-select" v-model="select">
                  <option v-for="item in options" :key="item" :label="item" :value="item">{{ item }}</option>
                </select>
                <input v-model="phone" min="7" minlength="7" type="text" placeholder="请输入账号"
                       class="lowin-input">
              </div>
            </div>
            <div class="lowin-group password-group">
              <label>密码</label>
              <input v-model="password" pattern="[a-zA-Z0-9]+" type="password" name="password" placeholder="请输入密码"
                     class="lowin-input">
            </div>
            <!--            <div class="lowin-group password-group">-->
            <!--              <label>验证码</label>-->
            <!--              <img @click="refreshImg" class='code-img' :src="adminUrl+'/code/getCode.do?time=' + imgCodeTime" alt="验证码">-->
            <!--              <input v-model="code2" type="text" @keyup.enter="toLogin" placeholder="验证码" name="code"-->
            <!--                     class="lowin-input">-->
            <!--            </div>-->
            <button @click="toLogin" class="lowin-btn login-btn">
              登录
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as api from '@/axios/api'
import {isNull} from '@/utils/utils'

export default {
  components: {},
  props: {},
  data () {
    return {
      adminUrl: null,
      code2: '',
      name: '',
      phone: '',
      select: '+1',
      options: ['+1', '+852', '+91', '+81', '+86', '+88', '+00', '+99'],
      password: '',
      imgCodeTime: 0
    }
  },
  mounted () {
    this.adminUrl = process.env.API_HOST
    if (this.adminUrl === undefined) {
      this.adminUrl = ''
    }
    this.getSiteInfo()
  },
  methods: {
    async getSiteInfo () {
      // 获取站点信息
      let data = await api.getSiteInfo()
      if (data.status === 0) {
        this.$store.state.siteInfo = data.data
      } else {
        this.$message.error(data.msg)
      }
    },
    pwdReg (value) {
      const regex = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*].{6,12}$/
      return regex.test(value)
    },
    async toLogin () {
      // 登录
      if (isNull(this.phone) || this.phone.length < 7) {
        this.$message.error('请输入正确的账户名')
      } else if (isNull(this.password)) {
        this.$message.error('请输入密码')
      } else if (!this.pwdReg(this.password)) {
        this.$message.error('密码为6~12位，数字、字母或符号')
        // } else if (isNull(this.code2)) {
        //   this.$message.error('请输入验证码')
      } else {
        let opts = {
          agentPhone: this.select + this.phone,
          agentPwd: this.password,
          verifyCode: this.code2
        }
        let data = await api.login(opts)
        if (data.status === 0) {
          this.$store.state.userInfo.phone = data.data.agentPhone
          this.$store.state.userInfo.agentCode = data.data.agentCode
          this.$store.state.userInfo.agentName = data.data.agentName
          this.$store.state.userInfo.agentLevel = data.data.agentLevel
          this.$store.state.userInfo.parentId = data.data.parentId
          this.$store.state.token = data.data.token
          localStorage.setItem('agent-token', data.data.token)
          this.$store.state.userInfo.agentRealName = data.data.agentRealName
          this.$store.state.userInfo.id = data.data.id
          this.$router.push('/home')
        } else {
          this.$message.error(data.msg)
        }
      }
    },
    refreshImg () {
      this.adminUrl = ''
      this.imgCodeTime = Date.now()
      this.dialogImgShow = false
      let this_ = this
      setTimeout(() => {
        this_.adminUrl = process.env.API_HOST
        if (this_.adminUrl === undefined) {
          this_.adminUrl = ''
        }
        this_.dialogImgShow = true
      }, 500)
    },
    async checkCode () {
      let data = await api.checkCode({code: this.code2})
      return data
    }
  }
}
</script>
<style scoped>
.lowin .lowin-group.password-group {
  position: relative;
}

.code-img {
  float: right;
  width: 100px;
  height: 45px;
  line-height: 45px;
  position: absolute;
  right: 0;
  top: 19px;
  background: #fff;
}

</style>
