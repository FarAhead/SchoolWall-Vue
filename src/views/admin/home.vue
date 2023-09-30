<template>
<div class="main-container">
  <el-col :span="10">
    <div class="grid-content bg-purple">
      <div class="user-card" style="height: 300px">
        <div class="icon&name" style="display: grid; grid-template-columns: 150px 1fr;align-items: center">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="100" ></el-avatar>
          <div class="userName"><h1>admin</h1></div>
        </div>
        <div class="description">
          <h3>这是admin用户</h3>
        </div>
      </div>
    </div>
  </el-col>
  <el-col :span="14" class="grid-right">
    <div>
    <h3>这里是一些统计数据</h3>
  </div>
  </el-col>
</div>
</template>

<script>
export default {
  name: "home"
}
</script>

<style scoped>
.grid-right{
  background-color: white;
  border-radius: 10px;
  justify-content: center;
}

</style>
