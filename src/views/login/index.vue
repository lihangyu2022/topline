<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- 导航栏 -->

    <!-- 表单 -->
    <van-cell-group>
      <van-field v-model="user.mobile" required clearable label="手机号" placeholder="请输入手机号" />

      <van-field v-model="user.code" required clearable label="验证码" placeholder="请输入验证码" />
    </van-cell-group>
    <!-- /表单 -->

    <!-- 登录按钮 -->
    <div class="login-btn-box">
      <van-button type="info" @click="Onlogin">登录</van-button>
    </div>
    <!-- /登录按钮 -->
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {

    async Onlogin () {
      // 开始转圈圈
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })
      try {
        const res = await request({
          methods: 'POST',
          url: '/app/v1_0/authorizations',
          data: this.user
        })
        console.log('登陆成功', res)
        this.$toast.success('登陆成功')
      } catch (err) {
        console.log('登陆失败', err)
        this.$toast.fail('登陆失败，手机号或验证码错误')
      }
    }
  }
}
</script>

<style lang="less"  scoped>
.login {
  .login-btn-box {
    padding: 20px;
    .van-button {
      width: 100%;
    }
  }
}
</style>
