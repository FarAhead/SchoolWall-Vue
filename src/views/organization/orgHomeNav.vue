<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="发布公告" name="announceNews"></el-tab-pane>
      <el-tab-pane label="公告管理" name="ManageNews"></el-tab-pane>
      <el-tab-pane label="组织信息" name="ManageInfo"></el-tab-pane>
    </el-tabs>
    <div class="nav-content">
      <component :is="currentComponent"></component>
    </div>

  </div>
</template>

<script>
import announceNews from "@/views/organization/news/announceNews.vue";
import ManageNews from "@/views/organization/news/ManageNews.vue";
import ManageInfo from "@/views/organization/ManageInfo.vue";

export default {
  data() {
    return {
      activeName: 'ManageInfo',
      currentComponent:'manageInfo'
    };
  },
  components:{
    announceNews,
    ManageInfo,
    ManageNews
  },
  methods: {
    handleClick(tab) {
      this.currentComponent = tab.name
    }
  }
}
</script>

<style scoped>

</style>
