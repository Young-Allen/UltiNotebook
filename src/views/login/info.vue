<template>
  <div class="info">
    <div class="container">
      <h3>登录</h3>
      <p>1. 未输入时会进行提示</p>
      <p>2. 用户名或密码错误时会进行错误校验并提示</p>
      <h3>注册</h3>
      <p>1.表单为空时，会进行提示</p>
      <p>2.当两次密码不一样时，会提示密码不一致</p>
      <p>3.当用户名存在时，会提示用户名已存在</p>
      <p>4.密码采用md5加密存储在数据库中</p>
      <p>5.注册成功时，自动跳转登录界面，并填充好用户名</p>
      <span>
        <router-link to="/login">返回</router-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.info {
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