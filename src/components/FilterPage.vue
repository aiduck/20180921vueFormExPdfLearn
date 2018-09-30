<template>
    <div>
        <h1>{{msg}}</h1>
        <div>
            <el-button @click="enterFilter" type="primary"> 筛选 </el-button>
            <el-button @click="quitFilter" type="success" >退出筛选</el-button>
        </div>
        <!-- 筛选框 -->
        <filter-box
            :dialogVisible="showFilterBox"
            :tmpl="filterTmpl"
            :filter="filter"
            :valueLabelMap="valueLabelMap"
            :keyFormatMap="Object.assign({},keyFormatMap)"
            @sendFilter="receiveFilter"
            @inputChange="inputChange"
            @handleClear="inputClear">
        </filter-box>
        <!-- 表格 -->
        <el-table
            :data="tableData"
            border
            stripe
            :row-key="getRoWKeys"
            style="width: 100%">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item v-for="(value, key) in expandFormatMap" :key="key" :label="value">
                            <span>{{ props.row[key]}}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                type="index"
                width="50"
                :resizable="false">
            </el-table-column>
            <el-table-column
                v-for="(value, key) in keyFormatMap"
                :label="value"
                :key="key"
                :prop="key"
                :resizable="false">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import FilterBox from "./FilterBox";
import qs from 'qs'
import axios from '../utils/axiosHttp.js'
export default {
    components: { FilterBox },
    data() {
        return {
            msg: 'FilterPage 页面',
            // 表格数据
            tableData: [
                {
                    id:'20160502',
                    studentId: '20160502',
                    name: '王小虎1',
                    phone: '999999',
                    status: '可用',
                    institute: '医学院', //学院
                    specialty: '临床医学', //专业
                    class: '141', //班级
                    gender: '男', //性别
                    email: '2833339707@qq.com'
                }, {
                    id:'20160504',
                    studentId: '20160504',
                    name: '王小虎2',
                    phone: '8888888',
                    status: '可用',
                    institute: '医学院', //学院
                    specialty: '口腔医学', //专业
                    class: '162', //班级
                    gender: '女', //性别
                    email: '289722207@qq.com'
                }, {
                    id:'20160501',
                    studentId: '20160501',
                    name: '王小虎3',
                    phone: '7777777',
                    status: '可用',
                    institute: '外国语学院', //学院
                    specialty: '日语', //专业
                    class: '152', //班级
                    gender: '男', //性别
                    email: '2897ddd07@qq.com'
                }, {
                    id:'20160503',
                    studentId: '20160503',
                    name: '王小虎4',
                    phone: '666666',
                    status: '不可用',
                    institute: '外国语学院', //学院
                    specialty: '英语', //专业
                    class: '171', //班级
                    gender: '女', //性别
                    email: '289707@qq.com'
                }
            ],
            valueLabelMap:{
                status: [
                    {
                        value: "可用",
                        label: "可用"
                    },
                    {
                        value: "不可用",
                        label: "不可用"
                    }
                ],
                //学院信息
                institute: [],
                //专业信息
                specialty: [],
                //班级信息
                class: [],
                gender: [
                    {
                        value: "男",
                        label: "男"
                    },
                    {
                        value: "女",
                        label: "女"
                    }
                ]
            },
            // 表格头部标签
            keyFormatMap: {
                studentId: "用户名",
                name: "姓名",
                phone: "手机号码",
                status: "用户状态"
            },
            // expand中隐藏的标签
            expandFormatMap: {
                institute: "学院",
                specialty: "专业",
                class: "班级",
                gender: "性别",
                email: "邮箱"
            },
            // 筛选表格
            showFilterBox: false,
            filterTmpl: {
                studentId: {
                    label: "用户名",
                    inputType: 0 // 0 代表 input
                },
                name: {
                    label: "姓名",
                    inputType: 0 // 0 代表 input
                },
                status: {
                    label: "用户状态",
                    inputType: 1 // 1 代表下拉框
                },
                institute: {
                    label: "学院",
                    inputType: 1
                },
                specialty: {
                    label: "专业",
                    inputType: 1,
                    //是否可用填写
                    disabled: true
                },
                class: {
                    label: "班级",
                    inputType: 1,
                    disabled: true
                },
                gender: {
                    label: "性别",
                    inputType: 1
                }
            },
            filter: {
                //搜索条件
                studentId: "", //用户名
                name: "", //姓名
                status: "", //用户状态
                institute: "", //学院
                specialty: "", //专业
                class: "", //班级
                gender: "", //性别
            },
        }
    },
    mounted () {
        this.initAcademyData();
    },
    methods: {
        getRoWKeys(row) {
            return row.id;
        },
        initAcademyData(){
            axios
            .get('/api/academyesc/queryAcademy')
            .then(res => {
                if(res.data.code === 200){
                    this.valueLabelMap.institute = res.data.data.map((item) => {
                        return {
                            label: item.academy,
                            value: item.academy
                        };
                    });
                }
                console.log(this.valueLabelMap.institute);
            })
            .catch(err => {
                console.log(res.msg)
            })
        },
        chooseMajorData(academyId) {
            let dataAcademy = {
                academyId: academyId
            }
            axios
            .post("/api/academyesc/queryMajor",dataAcademy)
            .then(res => {
                if (res.data.code == 200) {
                    this.valueLabelMap.specialty = res.data.data.map(i => {
                        return {
                            label: i.major,
                            value: i.major
                        };
                    });
                    this.filterTmpl.specialty.disabled = false;
                    console.log(this.valueLabelMap.specialty);
                }
            })
            .catch(err => {
                console.log(err);
            });
        },
        chooseClassData(classId) {
            let dataAcademy = {
                classId: classId
            }
            axios
            .post("/api/academyesc/queryClass",dataAcademy)
            .then(res => {
                if (res.data.code === 200) {
                    console.log(res);
                    this.valueLabelMap.class = res.data.data.map(i => {
                        return {
                            label: i._class,
                            value: i._class
                        };
                    });
                    this.filterTmpl.class.disabled = false;
                    console.log(this.valueLabelMap.class);
                }
            })
            .catch(err => {
                console.log(err);
            });
        },
        enterFilter() {
            console.log('筛选按钮');
            this.showFilterBox = true;
        },
        quitFilter() {
            console.log('退出筛选按钮');
        },
        receiveFilter(filter) {
            if (filter !== undefined) {
                this.filter = filter;
                console.log(filter);
                console.log("发送筛选条件");
                let filter2 = {
                    user_sex: '女'
                }
                axios
                .get('/api/user/queryUserByFilter', {
                    params: {
                        param: filter2,
                        pageNum: 2,
                        pageSize: 10
                    }
                })
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
            }
            this.showFilterBox = false;
        },
        async inputChange() {
            const value = arguments[0];
            const type = arguments[1].label;
            switch(type) {
                case "学院":
                    this.chooseMajorData(value);
                    break;
                case "专业":
                    this.chooseClassData(value);
                    break;
            }
        },
        inputClear(type) {
            if (type == "学院") {
                this.filterTmpl.specialty.disabled = true;
                this.filterTmpl.class.disabled = true;
            } else if (type == "专业") {
                this.filterTmpl.class.disabled = true;
            }
        },

    },
    watch: {
        filter: {
        
        }
    }
}
</script>
<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
