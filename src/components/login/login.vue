<template>
    <div class="login-wrap">
        <el-form :label-position="labelPosition" label-width="80px" :model="formData" class="login-form">
            <h2>用戶登錄</h2>
            <el-form-item label="賬號">
                <el-input v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item label="密碼">
                <el-input v-model="formData.password"></el-input>
            </el-form-item>
            <el-button class="login-btn" @click="handleLogin()">確認 </el-button>
        </el-form>
    </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      labelPosition: "top",
      formData: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async handleLogin() {
    //  const res = await this.$http.post("login", this.formData);
    //    console.log(res)
    //   if (res) {
    //   } else {
    //     console.log("catch");
    //     //结构赋值 const { data, meta: { msg, status } } = res.data;

    //     //登录成功,跳转首页
    //     var status = 200;
    //     // if (status === 200) {
    //     //     this.$router.push({ name: "home" });
    //     // }
    //     //提示成功
    //     this.$message({
    //       message: "恭喜你，这是一条成功消息",
    //       type: "success"
    //     });
    //     //不成功
    //   }

      console.log("异步");
        this.$http
          .post("login", this.formData)
          .then(res => {
              console.log("login")
          })
          .catch(() => {
              console.log("catch")
               //结构赋值 const { data, meta: { msg, status } } = res.data;

              //登录成功,跳转首页
              var status = 200;
              if (status === 200) {
                  this.$router.push({ name: "home" });
                  //保存客户的token值
                  localStorage.setItem('token','1')
              }
              //提示成功
              this.$message({
                  message: '恭喜你，这是一条成功消息',
                  type: 'success'
              });
              //不成功
          });
          console.log("异步")
    }
  }
};
</script>

<style>
.login-wrap {
  height: 100%;
  background: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  color: #fff;
  width: 400px;
  border-radius: 5px;
  padding-left: 20px;
}
.login-btn {
  width: 100%;
}
.el-form--label-top .el-form-item__label {
  color: #fff;
}
</style>

