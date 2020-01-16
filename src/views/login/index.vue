<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- /导航栏 -->

    <!-- 表单 -->
    <ValidationgObserver>
      <validationProvider name="手机号" rules="required" >
        <van-field v-model="user.mobile" clearable placeholder="请输入手机号">
          <van-icon slot="left-icon" name="phone" />
        </van-field>

      </validationProvider>
      <validationProvider>
        <van-field v-model="user.code" clearable placeholder="请输入验证码">
          <van-icon class-prefix="icon" name="smartphone" slot="left-icon" />
          <van-count-down
            v-if="isCountDownShow"
            slot="button"
            :time="1000 * 5"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            slot="button"
            size="small"
            type="primary"
            round
            @click="onSendSmsCode"
          >发送验证码</van-button>
        </van-field>
      </validationProvider>
    </ValidationgObserver>
    <!-- /表单 -->

    <!-- 登录按钮 -->
    <div class="login-btn-box">
      <van-button type="info" @click="onLogin">登录</van-button>
    </div>
    <!-- /登录按钮 -->
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'

export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    async onLogin () {
      // 开始转圈圈

      // this.$toast.loading({
      //   duration: 2, // 持续时间，0表示持续展示不停止
      //   forbidClick: true, // 是否禁止背景点击
      //   message: '登录中...' // 提示消息
      // })
      try {
        const res = await login(this.user)
        console.log('登陆成功', res)
        this.$toast.success('登陆成功')
      } catch (err) {
        console.log('登陆失败', err)
        this.$toast.fail('登陆失败，手机号或验证码错误')
      }
    },
    async onSendSmsCode () {
      // 1. 获取手机号
      const { mobile } = this.user
      // 2. 校验手机号是否有效

      // 3. 发送验证码
      try {
        // 显示倒计时
        this.isCountDownShow = true

        // 发送
        await getSmsCode(mobile)
      } catch (err) {
        console.log(err)

        // 发送失败，关闭倒计时
        this.isCountDownShow = false

        if (err.response.status === 429) {
          this.$toast('请勿频繁发送')
          return
        }

        this.$toast('发送失败')
      }
    }
  }
}
</script>

<style lang="less"  scoped>
.login {
  .login-btn-box {
    padding: 16px 27px;
    .van-button {
      width: 100%;
    }
  }
}
</style>
