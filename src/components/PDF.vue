<template>
    <el-form id="pdfDom" class="form" ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
            <el-input v-model="form.name" @change="handleInput" ></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
            <el-select v-model="form.region" @change="handleSelect" placeholder="请选择活动区域">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
            <el-col :span="11">
                <el-date-picker @change="handleDate" format="yyyy-mm-dd" value-format="yyyy-mm-dd" type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
                <el-time-picker @change="handleTime" format="hh:mm:ss" value-format="hh:mm:ss" type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="即时配送">
            <el-switch v-model="form.delivery" @change="handleSwitch"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
            <el-checkbox-group v-model="form.type" >
                <el-checkbox @change="handleCheckbox" v-for="city in cityOptions" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
            <el-radio-group v-model="form.resource" @change="handleRadio">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式">
            <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
        <h1 class="testJq">{{msg}}</h1>
    </el-form>
</template> 
<script>
import qs from 'qs'
import axios from '../utils/axiosHttp.js'
import utils from '../utils/utils.js'
import $ from '../utils/jquery.js'
export default {
    data() {
        return {
            msg: '测试jquery是否引入',
            htmlTitle: '页面导出PDF文件名',
            // userName: 'input中内容改变，userName里面放的内容也不会变,绑定的value=“userName”也不会改变',
            form: {
                name: 'yhcj',
                region: '111',
                date1: '2018-09-10',
                date2: '12:00:04',
                delivery: false,
                type: ['上海','北京'],
                resource: '线上品牌商赞助',
                desc: '线上品牌商赞助上海yhcj'
            },
            options: [
                {
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ],
            cityOptions:['上海', '北京', '广州', '深圳'],
        }
    },
    mounted() {
        let hmsg = $('.testJq').text()
        console.log(hmsg);
    },
    methods: {
        handleInput() {
            // console.log(this.userName);
            console.log(this.form.name);
        },
        handleSelect() {
            console.log(this.form.region);
        },
        handleDate() {
            console.log(this.form.date1);
        },
        handleTime() {
            console.log(this.form.date2);
        },
        handleSwitch() {
            console.log(this.form.delivery);
        },
        handleCheckbox() {
            console.log(this.form.type);
        },
        handleRadio() {
            console.log(this.form.resource);
        },
        onSubmit() {
            console.log(this.form);
            // let html = this.$refs.form;
            // let _html = new Blob([html],{ "type" : "text/html;charset=urf-8" });
            // let formdata = new FormData();
            // formdata.append('file', _html, 'sdf.html');
            let form = this.form;
            this.getPdf();
            console.log('submit!');
        },
    }
}
</script>
<style scoped>

</style>


