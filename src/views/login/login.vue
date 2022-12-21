<template>
  <div class="login">
    <div class="container">
      <div class="tit">登录</div>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field v-model="username"
                     name="username"
                     label="用户名"
                     placeholder="用户名"
                     :error-message="errMsg.username"
                     :rules="usernameRules" />
          <van-field v-model="password"
                     type="password"
                     name="password"
                     label="密码"
                     placeholder="密码"
                     :error-message="errMsg.password"
                     :rules="passwordRules" />
        </van-cell-group>

        <div style="margin: 16px;">
          <van-button round
                      block
                      type="primary"
                      native-type="submit">
            登录
          </van-button>
        </div>
      </van-form>
      <span>没有账号？<router-link to="/register">去注册</router-link></span>
      <span class="help">
        <router-link to="/info">找回密码</router-link>
      </span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import md5 from 'js-md5'

export default {
  created () {
    this.username = this.$route.query.name
  },
  data () {
    return {
      username: "",
      password: "",
      errMsg: {
        password: '',
        username: '',
      },
      usernameRules: [{
        required: true,
        message: '请输入用户名',
        trigger: 'onBlur'
      }],
      passwordRules: [{
        required: true,
        message: '请输入密码',
        trigger: 'onBlur'
      }]
    }
  },
  methods: {
    onSubmit (values) {
      axios({
        url: " http://localhost:3000/users",
        method: "GET",
      }).then(res => {
        res.data.forEach((item) => {
          if (item.id === values.username && item.password === md5(values.password)) {
            this.$router.push({
              path: "/home",
              query: {
                userInfo: values.username
              }
            })
          } else {
            this.errMsg.password = '用户名或密码错误'
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