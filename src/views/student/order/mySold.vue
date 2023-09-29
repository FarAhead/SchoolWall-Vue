<template>
  <div>
    <el-empty v-if="isEmpty" description="暂无数据"></el-empty>
    <sold-item v-else v-for="mySold in mySolds" :key="mySold.oid" :mySold="mySold"></sold-item>
  </div>
</template>

<script>
import soldItem from "@/components/card/soldItem.vue";
import studentInfo from "@/store/modules/studentInfo";
export default {
  name: "myOrder",
  data(){
    return{
      isEmpty:true,
      mySolds:[
        {
          oid:'',
          osid:'',
          price: '',
          cname:'',
          cid:'',
          description:'',
          ocreatedate:'',
          ofinishdate:'',
        }
      ],
    }
  },
  components:{
    soldItem
  },
  methods:{
    fetchMySold(){
      this.request.post("order/query2",{
        uid:studentInfo.state.stuInfo.uid
      })
          .then(res=> {
            if(res.code==="200"){
              if (res.data){
                this.isEmpty=false;
                this.mySolds =  res.data;
              }
            } else {
              this.$message.error("获取数据失败！")
            }
          })
    },
  },
  mounted() {
    this.fetchMySold();
  }
}
</script>

<style scoped>

</style>
