<template>
<div class="header-container">

  <div class="left">
    <el-button type="primary" icon="el-icon-s-operation"></el-button>
    左侧按钮，实现侧边栏伸缩
  </div>

  <div class="search">
    这是放在中间的内容，还没想好

  </div>

  <div class="right">
    <div>
      打算放头像和用户名
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Header",
  data(){
    return{
      input:{

      }
    }
  },
  methods:{

  }

}
</script>

<style scoped>
.header-container{
  background-color: aqua;
  margin: 0;
  align-items: center;
  justify-content: space-between;
  display: flex;
}
</style>
