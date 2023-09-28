<template>
  <el-col :span="5">
    <el-card :body-style="{ padding: '0px' }">
      <el-image :src=order.cavatar class="image"></el-image>
      <div style="padding: 14px;">
        <span>{{ order.cname }}</span>
        <div class="commodity-price">￥{{order.price}}</div>
        <div class="bottom clearfix">
          <time class="time">{{ order.ctime }}</time>
          <el-button size="medium"  class="button">我想要</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</template>

<script>
export default {
  name: "orderItem",
  data() {
    return {

    };
  },
  props:['order'],
}
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.button {
  float: right;
}

.image {
  width: 100%;
  display: block;
}



</style>
