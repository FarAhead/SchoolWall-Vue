<template>
<div>
  <div>
    <el-button type="warning" icon="el-icon-box" @click="dialogVisible = true">点我发布商品</el-button>
  </div>
  <el-dialog title="发布商品" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
    <el-form ref="commodityUpload" :model="uploadForm" label-width="80px">
      <el-form-item label="商品名称">
        <el-input v-model="uploadForm.cname"></el-input>
      </el-form-item>

      <el-form-item label="商品描述">
        <el-input v-model="uploadForm.description"></el-input>
      </el-form-item>

      <el-form-item label="售价">
        <el-input-number v-model="uploadForm.price" :min="1"></el-input-number>
      </el-form-item>

      <el-form-item label="商品图片">
        <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>






    </el-form>



    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>
  <el-row :gutter="40">
    <order-item v-for="order in orders" :key="order.cid" :order="order"></order-item>
  </el-row>
</div>
</template>

<script>
import orderItem from "@/components/card/orderItem.vue";
export default {
  name: "orderSquare",
  data(){
    return{
      //是否显示上传对话框
      dialogVisible:false,

      //发布商品的表单
      uploadForm:{
        cname:'',
        description:'',
        cavatar:'',
        price:0,
        ctime:'',
        ctype:0,
        fileToUpload:null,
        imageURL:'',
      },


      orders:[{
        cid:0,
        price:"",
        uid:0,
        cname:"",
        cavatar:"",
        description:"",
        citme:"",
        sold:0,
        ctype:""
      }],
    }
  },
  components:{
    orderItem
  },
  methods:{
    async loadCommodity(){
      await this.request.post("commodity/query")
          .then(res=>{
            if(res.code === "200"){
              this.orders = res.data;
            } else {
              this.$message.error("加载商品信息失败！")
            }
          })
    },

    //dialog关闭
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },

    async uploadCommodity(){
      try {
        //新建formData对象
        const formData = new formData();
        //添加一些表单数据
        formData.append('cname',this.uploadForm.cname);
        formData.append('description', this.uploadForm.description);
        formData.append('price', this.uploadForm.price);
        //将图片文件添加到formData
        if(this.uploadForm.fileToUpload){

        }

      } catch (error){
        console.error("上传失败：",error);
        this.$message.error("上传失败");

      }
    },

    handleAvatarSuccess(res, file) {
      this.uploadForm.imageURL = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }

  },
  mounted() {
    this.loadCommodity();
  }
}
</script>

<style scoped>

</style>
