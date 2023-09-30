<template>
  <el-col :span="6">
    <el-card :body-style="{ padding: '0px' }" shadow="hover" style="border-radius: 10px">
      <el-image :src=order.cavatar class="image" style="min-height: 200px" fit="cover"></el-image>
      <div style="padding: 16px;">
        <span style="font-size: 20px;font-weight: bold">{{ order.cname }}</span>
        <div class="commodity-price" style="float: right;font-weight: bold;color: #BF360C">￥{{order.price}}</div>
        <div class="commodity-description">“ {{order.description}} ”</div>
        <div class="bottom clearfix">
          <time class="time">
            {{ order.ctime }}
          </time>
          <el-popover
              ref="popover"
              placement="button"
              width="400"
              v-model="isPopoverShow"
              trigger="click"
              title="请确认订单信息">
              <el-form >
                <el-form-item label="商品名称">
                  <span>{{order.cname}}</span>
                </el-form-item>
                <el-form-item label="订单金额">
                  <span>{{order.price}}</span>
                </el-form-item>
                <el-form-item label="订单id">
                  <span>{{order.cid}}</span>
                </el-form-item>
                <el-form-item label="买方id">
                  <span>{{studentInfo.state.stuInfo.uid}}</span>
                </el-form-item>
              </el-form>
            <div style="float: right">
              <el-button @click="this.isPopoverShow=false">再想想</el-button>
              <el-button type="primary" @click="submitBuy">现在下单</el-button>
            </div>
            <el-button size="medium" type="warning" class="button" slot="reference" round icon="el-icon-shopping-bag-2" style="margin-bottom: 20px"></el-button>
          </el-popover>

        </div>
      </div>
    </el-card>
  </el-col>
</template>

<script>
import studentInfo from "../../store/modules/studentInfo";
import {getDateTime} from "@/utils/getDateTime";

export default {
  name: "orderItem",
  computed: {
    studentInfo() {
      return studentInfo
    }
  },
  data() {
    return {
      isPopoverShow: false,
    };
  },
  props:['order'],
  methods:{
    submitBuy(){
      this.request.post("commodity/buy",{
        cid:this.$props.order.cid,
        obid:studentInfo.state.stuInfo.uid,
        ofinishdate:getDateTime()
      })
          .then(res=>{
            if (res.code==="200"){
              this.$message.success("购买成功！请到我的订单中查看~");
              this.isPopoverShow=false;
              this.refreshCommodity();
            }
          })
    },

    refreshCommodity(){
      this.$parent.$parent.loadCommodity();
    }
  },
}
</script>

<style lang="less" scoped>
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

@import "@/assets/commodity.less";

</style>
