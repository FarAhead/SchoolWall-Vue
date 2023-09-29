<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的发帖" name="myQuestion"></el-tab-pane>
      <el-tab-pane label="我的收藏" name="myFavorite"></el-tab-pane>
      <el-tab-pane label="我的订单" name="myOrder"></el-tab-pane>
      <el-tab-pane label="我卖出的" name="mySold"></el-tab-pane>
      <el-tab-pane label="个人信息" name="myInfo"></el-tab-pane>
    </el-tabs>
    <div class="nav-content">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>
<script>

import myQuestion from "@/views/student/question/myQuestion.vue";
import myOrder from "@/views/student/order/myOrder.vue";
import mySold from "@/views/student/order/mySold.vue";
import myFavorite from "@/views/student/favorite/myFavorite.vue";
import myInfo from "@/views/student/studentInfo.vue"

export default {
  data() {
    return {
      activeName: 'myQuestion',
      currentComponent:'myQuestion'
    };
  },
  components:{
    myQuestion,
    myFavorite,
    myOrder,
    mySold,
    myInfo
  },
  methods: {
    handleClick(tab) {
      this.currentComponent = tab.name
    }
  }
};
</script>
<style scoped>

</style>
