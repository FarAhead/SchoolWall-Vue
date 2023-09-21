<template>
  <div>
    <el-card class="box-card">
      <h2>重置密码</h2>
      <el-form
          :model="form"
          status-icon
          :rules="rules"
          ref="loginForm"
          label-position="left"
          label-width="70px"
          class="login-from"
      >
        <el-form-item label="姓  名" prop="uname">
          <el-input v-model="user.uname"></el-input>
        </el-form-item>
        <el-form-item label="学  号" prop="uid">
          <el-input v-model="user.uid"></el-input>

        </el-form-item>
        <el-form-item label="密  码" prop="upwd">
          <el-input
              type="password"
              v-model="user.upwd"
              autocomplete="off"
          ></el-input>
        </el-form-item>

      </el-form>
      <div class="btnGroup">
        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
        <router-link to="/register">
          <el-button style="margin-left:10px">注册</el-button>
        </router-link>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "forgetPass"
  data(){
    return{
      form:{

      }
    }
  }

}
</script>

<style scoped>

</style>
