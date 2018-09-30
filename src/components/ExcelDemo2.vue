<template>
    <div>
        <div> 需要存入数据库</div>
        <input type="file" @change="importFile(this)" id="imFile" style="display: none"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
        <!-- 导出 -->
        <a id="downlink"></a>
        <el-button class="button" @click="uploadFile()">导入</el-button>
        <el-button class="button" @click="downloadFile(excelData)">导出</el-button>
        <!--展示导入信息-->
        <el-table :data="excelData" tooltip-effect="dark">  
            <el-table-column label="学院" prop="academy" show-overflow-tooltip></el-table-column>
            <el-table-column label="学院状态" prop="academy_status" show-overflow-tooltip></el-table-column>
        </el-table>
    </div>
</template>

<script>
    // 引入xlsx
    var XLSX = require('xlsx')
    import qs from 'qs'
    import axios from '../utils/axiosHttp.js'
    import utils from '../utils/utils.js'
    export default {
        data() {
            return {
                fullscreenLoading: false, // 加载进度条
                imFile: '', // 导入文件el
                excelData: []
            }
        },
        methods: {
            initExcelData() {
                axios
                .get('/api/excel/queryAcademy')
                .then(res => {
                    console.log(res)
                    this.excelData = res.data.data;
                })
                .catch(err => {
                    console.log(res.msg)
                })
            },
            uploadFile() {
                this.imFile.click()
            },
            downloadFile(excelData){
                // 表格标题
                let data = [{
                    academy: '学院',
                    academy_status: '学院状态'
                }]
                data = data.concat(excelData)
                // 文件名
                this.downloadExl(data, '学院名单')
            },
            // 导入
            importFile() {
                this.fullscreenLoading = true;
                let obj = this.imFile;
                if (!obj.files) {
                    this.fullscreenLoading = false
                    return
                }
                var f = obj.files[0];
                var reader = new FileReader();
                // console.log(f);
                // console.log(reader);
                let $t = this
                // console.log($t);
                reader.onload = function (e) {
                    var data = e.target.result  
                    if ($t.rABS) {
                        $t.wb = XLSX.read(btoa(this.fixdata(data)), {  // 手动转化
                            type: 'base64'
                        });
                    } else {
                        $t.wb = XLSX.read(data, {
                            type: 'binary'
                        });
                    }
                    let json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[0]]);
                    $t.analyzeData(json);
                    $t.dealFile($t.analyzeData(json)) // analyzeData: 解析导入数据
                }
                if (this.rABS) {
                    reader.readAsArrayBuffer(f)
                } else {
                    reader.readAsBinaryString(f)
                }
            },
            fixdata(data) {  // 文件流转BinaryString
                var o = ''
                var l = 0
                var w = 10240
                for (; l < data.byteLength / w; ++l) {
                    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
                }
                o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
                return o
            },
            analyzeData(data) {  // 此处可以解析导入数据
                return data
            },
            dealFile(data) {   // 处理导入的数据
                // 处理导入的数据内容
                var dataAcademy = [];
                data.map((item, index) => {
                    console.log(item);
                    dataAcademy.push({
                        academy: item.学院,
                        academy_status: item.学院状态
                    })
                })
                console.log(dataAcademy)
                // 初始化imFile的value值
                // 初始化进度为false
                this.imFile.value = ''
                this.fullscreenLoading = false
                if (data.length <= 0) {
                    this.errorDialog = true
                    this.errorMsg = '请导入正确信息'
                } else {
                    //最后就是将数据存入后端
                    axios
                        // .post("/api/excel/saveAcademy",qs.stringify(dataAcademy))
                        .post("/api/excel/saveAcademy",dataAcademy)
                        .then(res => {
                            console.log(res);
                            if (res.data.code == 200) {
                                this.excelData = dataAcademy
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    
                }
            },
            // 导出
            downloadExl(json, downName, type) {  // 导出到excel
                let keyMap = [] // 获取键
                for (let k in json[0]) {
                    keyMap.push(k)
                }
                console.info('keyMap', keyMap, json)
                let tmpdata = [] // 用来保存转换好的json
                json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
                    v: v[k],
                    position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
                }))).reduce((prev, next) => prev.concat(next)).forEach(function (v) {
                    tmpdata[v.position] = {
                    v: v.v
                    }
                })
                let outputPos = Object.keys(tmpdata)  // 设置区域,比如表格从A1到D10
                let tmpWB = {
                    SheetNames: ['mySheet'], // 保存的表标题
                    Sheets: {
                    'mySheet': Object.assign({},
                        tmpdata, // 内容
                        {
                        '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
                        })
                    }
                }
                let tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB,
                    {bookType: (type === undefined ? 'xlsx' : type), bookSST: false, type: 'binary'} // 这里的数据是用来定义导出的格式类型
                ))], {
                    type: ''
                })  // 创建二进制对象写入转换好的字节流
                var href = URL.createObjectURL(tmpDown)  // 创建对象超链接
                this.outFile.download = downName + '.xlsx'  // 下载名称
                this.outFile.href = href  // 绑定a标签
                this.outFile.click()  // 模拟点击实现下载
                setTimeout(function () {  // 延时释放
                    URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
                }, 100)
            },
            getCharCol(n) { // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
                let s = ''
                let m = 0
                while (n > 0) {
                    m = n % 26 + 1
                    s = String.fromCharCode(m + 64) + s
                    n = (n - m) / 26
                }
                return s
            },
            s2ab: function (s) { // 字符串转字符流
                var buf = new ArrayBuffer(s.length)
                var view = new Uint8Array(buf)
                for (var i = 0; i !== s.length; ++i) {
                    view[i] = s.charCodeAt(i) & 0xFF
                }
                return buf
            },
        },
        mounted () {
            this.imFile = document.getElementById('imFile')
            this.outFile = document.getElementById('downlink')
            this.initExcelData();
        },
    }

</script>

<style>
.el-table th>.cell {
  text-align: center;
}
.button {
  margin-bottom: 20px;
}
</style>
