<template>
  <div class="login">
    <div class="container">
      <div class="tit">忘记密码</div>
      <van-form @submit="onSubmit">
        <van-field v-model="username"
                   name="username"
                   label="用户名"
                   placeholder="用户名"
                   :error-message="errMsg.username"
                   :rules="usernameRules" />
        <van-field v-model="email"
                   type="text"
                   name="email"
                   label="电子邮件:"
                   placeholder="请输入电子邮件"
                   :error-message="errMsg.email"
                   :rules="[
                        { required: true, message: '请输入电子邮件' },
                        { pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/ , message: '邮箱格式错误'}]" />

        <div style="margin: 16px;">
          <van-button round
                      block
                      type="primary"
                      native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
      <span class="help">
        <router-link to="/login">返回登录</router-link>
      </span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  created () {
    this.username = this.$route.query.name
  },
  data () {
    return {
      username: "",
      email: "",
      errMsg: {
        username: '',
        email: '',
      },
      usernameRules: [{
        required: true,
        message: '请输入用户名',
        trigger: 'onBlur'
      }],
    }
  },
  methods: {
    onSubmit (values) {
      axios({
        url: "https://db-api.amarea.cn/users",
        method: "GET",
      }).then(res => {
        let code = 1;
        for (let i = 0; i < 3; i++) {
          code = (code * 10) + Math.round(Math.random() * 10)
        }
        res.data.forEach((item) => {
          if (item.id === values.username && item.email === values.email) {
            this.$alert('验证码为: ' + code, '验证成功', {
              callback: action => {
                this.$router.push({
                  name: "changePwd",
                  params: {
                    code: code,
                    username: values.username
                  }
                })
              }
            });
          } else {
            this.$alert('用户名或邮箱错误', '验证失败', {
              callback: action => {
              }
            });
          }
        });
      })
    },
  },
}
</script>

<style scoped>
.login {
  height: 100vh;
  /*弹性布局居中*/
  display: flex;
  justify-content: center;
  align-items: center;
  /*渐变背景*/
  background: linear-gradient(200deg, #e3c5eb, #a9c1ed);
  /*溢出影藏*/
  overflow: hidden;
}
.container {
  /*相对定位*/
  position: relative;
  z-index: 1;
  background-color: #fff;
  border-radius: 15px;
  display: flex;
  /*垂直配列*/
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 420px;
  height: 570px;
  /*阴影*/
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}
.container .tit {
  font-size: 26px;
  margin: 65px auto 70px auto;
}
.container input {
  width: 280px;
  height: 30px;
  text-indent: 8px;
  border: none;
  border-bottom: 1px solid #ddd;
  outline: none;
  margin: 12px auto;
}
.container button {
  width: 280px;
  height: 40px;
  margin: 35px auto 40px auto;
  border: none;
  background: linear-gradient(-200deg, #fac0e7, #aac2ee);
  color: #fff;
  font-weight: bold;
  letter-spacing: 8px;
  border-radius: 10px;
  cursor: pointer;
  /*动画过渡*/
  transition: 0.5s;
}
.container button:hover {
  background: linear-gradient(-200deg, #aac2ee, #fac0e7);
  background-position-x: -280px;
}
.container span {
  font-size: 14px;
}
.container a {
  color: plum;
  text-decoration: none;
}
.help {
  margin-top: 10px;
  font-size: large;
}
@keyframes square {
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  100% {
    transform: scale(0) rotate(1000deg);
    opacity: 0;
  }
}
@keyframes circle {
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 1;
    bottom: 0;
    border-radius: 0;
  }
  100% {
    transform: scale(0) rotate(1000deg);
    opacity: 0;
    bottom: 90vh;
    border-radius: 50%;
  }
}
</style>