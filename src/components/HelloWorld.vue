<template>
  <div class="hello">
    <el-button  size="small" type="primary" @click="testAxios">测试axios</el-button>
    <!-- <el-upload
      class="upload-demo"
      ref="upload"
      name="uploadFile"
      action="/api/file/savefile"
      multiple
      :limit="5"
      :on-exceed="handleExceed"
      :data="upLoadData"
      :on-change="handleChange"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">select file</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">upload to server</el-button>
      <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
    </el-upload> -->

    <el-upload
      class="upload-demo"
      ref="upload"
      name="uploadFile"
      action="/api/uploads/savefile"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :data="upLoadData"
      :on-remove="handleRemove" 
      :file-list="fileList"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>

    <div style="text-align: right;">
      <el-button slot="trigger" size="small" type="primary"  @click="downloadFinishFile">下载附件</el-button>
    </div>
    <textarea>
      {{testData}}
    </textarea>
  </div>
</template>

<script>
import qs from 'qs'
import axios from '../utils/axiosHttp.js'
import utils from '../utils/utils.js'
export default {
  data () {
    return {
      fileList: [],
      // upLoadData: {
      // file_id: '', 后端自己生成
      //   report_id: '666',
      // file_name: '888',
      // file_address: '', 后端存储的地址
      //   file_submit_time: '0000'
      // },
      testData: 'yhcj'
    }
  },
  computed:{
    upLoadData:function(){
      return {
        report_id: utils.randomId(),
        file_submit_time: utils.formatDate() 
      };
    }
  },
  methods: {
    testAxios() {
      //  axios
      //   .get("/api/file/testget")
      //   .then(res => {
      //     console.log(res.data);
      //     if(res.data.code === 200) {
      //       this.testData = res.data.data
      //       res.data.data.map((item, index) => {
      //         console.log(item);
      //         console.log(index);
      //       })
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      let upLoadData = this.upLoadData
      // qs 的方法
      // let obj= {
      //     method: "query_sql_dataset_data",
      //     projectId: "85",
      //     appToken: "7d22e38e-5717-11e7-907b-a6006ad3dba0",
      //     datasetId: " 12564701"
      // };
      // console.log(obj)
      // qs.stringify(obj);
      // console.log(qs.stringify(obj));
      console.log(qs.stringify(upLoadData))
      axios
        .post("/api/file/testpost",qs.stringify(upLoadData))
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {

          }
        })
        .catch(err => {
          console.log(err);
        });
      // axios.get("/api/file/testget", { params: upLoadData })
      // //成功返回
      // .then(response => {
      //     console.log(response);
      // })
      // //失败返回
      // .catch(error => {
      //     console.log(error);
      // })
    },
    // 多文件上传超出提示
    handleExceed(files, fileList) {
      this.$message.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
    },
    // handleChange(file){
    //   console.log(file);
    //   this.fileList.push({
    //     name: file.name,
    //     url: 'http://'
    //   })
    // },
    // // 上传成功后的回调
    // uploadSuccess (response, file, fileList) {
    //   console.log('上传文件', response);
    // },
    // // 上传错误
    // uploadError (response, file, fileList) {
    //   console.log('上传失败，请重试！');
    // },
    // beforeUpload(file) {
    //   console.log(file.name);
    // },
    submitUpload() {
      console.log(this.upLoadData);
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 下载结题材料
    downloadFinishFile() {
      console.log('下载材料');
      let id = {
        id: '0120180912c659bfc'
      };
      axios
      .post("/api/file/fileinfo",qs.stringify(id))
      .then(res => {
        console.log(res);
        if (res.data.code == 200) {
          // let fileName = res.data.data.fileName;
          // let address = res.data.data.address;
          let {fileName,address} = res.data.data;
          let iframe = document.createElement("iframe");
          iframe.style.display = "none";
          iframe.src = '/api/download?filePath=' + address + '&fileName=' + fileName;
          iframe.onload = function() {
            document.body.removeChild(iframe);
          };
          document.body.appendChild(iframe);
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
