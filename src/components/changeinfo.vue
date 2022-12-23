<template>
  <div class="register">
    <div class="container">
      <div class="tit">编辑个人信息</div>
      <van-form @submit="onSubmit">
        <div style="width: 50%; background-color:aqua; display: inline-block; text-align: center;">
          <van-field v-model="userId"
                     name="ID"
                     label="用户名:"
                     readonly="readonly"
                     placeholder="请输入用户名"
                     :error-message="errMsg.ID"
                     :rules="[{ required: true, message: '请填写用户名' }]" />
          <van-field v-model="email"
                     type="text"
                     name="email"
                     label="电子邮件:"
                     placeholder="请输入电子邮件"
                     :rules="[{ validator1, message: '邮箱格式不符' }]" />
          <van-field v-model="password"
                     type="password"
                     name="password"
                     label="密码:"
                     placeholder="密码" />
          <van-field v-model="comfirmPassword"
                     type="password"
                     name="comfirmPassword"
                     label="确认密码:"
                     placeholder="确认密码"
                     :rules="[{ validator, message: '与第一次密码不一致' }]" />
        </div>
        <div style="width: 50%; display: inline-block;">
          <van-field v-model="username"
                     name="username"
                     label="昵称:"
                     placeholder="昵称" />

          <van-radio-group v-model="sex"
                           direction="horizontal">
            <span class="sexlabel">性别：</span>
            <van-radio name="男">男</van-radio>
            <van-radio name="女">女</van-radio>
          </van-radio-group>

          <van-field v-model="phone"
                     name="phone"
                     label="手机号:"
                     placeholder="请输入手机号" />
          <van-field v-model="address"
                     name="address"
                     label="地址:"
                     placeholder="请输入地址" />
        </div>

        <div style="margin: 16px;">
          <van-button round
                      block
                      type="primary"
                      native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>

      <span class="help"
            style=" cursor: pointer;"
            @click="deluserInfo()">
        注销个人信息
      </span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import md5 from 'js-md5'
import data2blob from '../../../vue-element-admin/src/components/ImageCropper/utils/data2blob'

export default {
  created () {
    axios({
      url: "https://db-api.amarea.cn/users/" + this.userId,
      method: "GET",
    }).then(res => {
      this.userinfo = res.data
      this.email = res.data.email
      this.username = res.data.name
      this.sex = res.data.sex
      this.phone = res.data.phone
      this.address = res.data.address
    })
  },
  props: ['userId'],
  data () {
    return {
      userinfo: "",
      email: "",
      password: "",
      comfirmPassword: "",
      username: "",
      sex: "男",
      phone: "",
      address: "",
      errMsg: {
        ID: '',
        email: '',
      },
    }
  },
  methods: {
    validator () {
      if (this.password === this.comfirmPassword) return true
      else return false
    },
    validator1 () {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(this.email.trim())) {
        return true
      } else {
        return false
      }
    },
    deluserInfo () {
      this.$confirm('此操作将永久删除该账户内的信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '注销成功!'
        });
        axios({
          url: "https://db-api.amarea.cn/users/" + this.userId,
          method: "DELETE",
        }).then(res => {
          this.$router.push({
            path: "/login",
            query: {
            }
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    onSubmit (values) {
      let flag = false
      if (values.email === "") values.email = this.userinfo.email
      if (values.password === "") {
        values.password = this.userinfo.password
      } else {
        flag = true
        values.password = md5(values.password)
      }
      if (values.username === "") values.username = this.userinfo.name
      if (values.phone === "") values.phone = this.userinfo.phone
      if (values.address === "") values.address = this.userinfo.address

      axios({
        url: "https://db-api.amarea.cn/users/" + this.userId,
        method: "PATCH",
        data: {
          email: values.email,
          name: values.username,
          password: values.password,
          sex: this.sex,
          phone: values.phone,
          address: values.address,
        }
      }).then(res => {
        this.$alert('修改成功', '成功', {
          callback: action => {
            if (flag) {
              this.$router.push({
                path: "/login",
                query: {
                }
              })
            }
          }
        });
      }).catch(error => {
        this.errMsg.ID = '用户名已存在'
        console.log(error);
      })
    }
  }
}
</script>

<style scoped>
.sexlabel {
  color: #646566;
  text-align: left;
  margin: 15px 15px;
}
.van-form {
  display: inline-block;
  width: 100%;
}
.register {
  height: 100vh;
  /*弹性布局居中*/
  display: flex;
  justify-content: center;
  align-items: center;
  /*渐变背景*/
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
  width: 650px;
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
  background-position-x: -280px;
}
.container span {
  font-size: 14px;
}
.container a {
  color: plum;
  text-decoration: none;
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