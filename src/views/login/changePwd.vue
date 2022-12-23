<template>
  <div class="login">
    <div class="container">
      <div class="tit">修改密码</div>
      <van-form @submit="onSubmit">
        <van-field v-model="code"
                   name="code"
                   label="验证码"
                   placeholder="验证码"
                   :error-message="errMsg.code"
                   :rules="usernameRules" />
        <van-field v-model="password"
                   type="password"
                   name="password"
                   label="密码:"
                   placeholder="密码"
                   :rules="[{ required: true, message: '请填写密码' }]" />
        <van-field v-model="comfirmPassword"
                   type="password"
                   name="comfirmPassword"
                   label="确认密码:"
                   placeholder="确认密码"
                   :rules="[{ validator, message: '与第一次密码不一致' }]" />

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
import md5 from 'js-md5'

export default {
  created () {
    this.username = this.$route.query.name
  },
  data () {
    return {
      code: "",
      password: "",
      comfirmPassword: "",
      errMsg: {
        code: '',
      },
      usernameRules: [{
        required: true,
        message: '请输入验证码',
        trigger: 'onBlur'
      }],
    }
  },
  methods: {
    validator () {
      if (this.password === this.comfirmPassword) return true
      else return false
    },
    onSubmit (values) {
      if (values.code == this.$route.params.code) {
        axios({
          url: "https://db-api.amarea.cn/users/" + this.$route.params.username,
          method: "PATCH",
          data: {
            password: md5(values.password),
          }
        }).then(res => {
          this.$alert('修改成功', '成功', {
            callback: action => {
              this.$router.push({
                path: "/login",
              })
            }
          });
        })
      } else {
        this.$alert('验证码错误', '验证失败', {
          callback: action => {
          }
        });
      }
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