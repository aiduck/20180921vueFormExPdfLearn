<template>
    <div>
        <el-table
        ref="singleTable"
        :data="tableData"
        style="width: 100%"
        size="medium"
        highlight-current-row
        @current-change="handleCurrentChange"
        tooltip-effect="light"
        @select="handleSelect"
        @select-all="handleSelectAll"
        @selection-change="handleSelectionChange"
        stripe
        border>
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="date"
            label="日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址">
        </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
            <el-button @click="setCurrent(tableData[1])">选中第二行</el-button>
            <el-button @click="setCurrent()">取消选择</el-button>
        </div>
        <div style="margin-top: 20px">
            <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
        <el-table
            :data="tableData2"
            style="width: 100%"
            :default-sort="{ prop: 'date', order: 'descending'}">
                <el-table-column
                    prop="date"
                    label="日期"
                    sortable
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    sortable
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址"
                    :formatter="formatter">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            msg: 'filter页面',
            tableData2: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            currentRow: null,
            multipleSelection: []
        }
    },
    methods: {
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        setCurrent(row) {
            this.$refs.singleTable.setCurrentRow(row);
        },
        toggleSelection(rows) {
        if (rows) {
            rows.forEach(row => {
                this.$refs.singleTable.toggleRowSelection(row);
            });
            } else {
            this.$refs.singleTable.clearSelection();
            }
        },
        handleSelectionChange(selecttion) {
            this.multipleSelection = selecttion;
        },
        handleSelect(selecttion,row) {
            console.log(selecttion,row)
        },
        handleSelectAll(selecttion) {
            console.log(selecttion)
        },
        formatter(row, column) {
            return row.address+row.date;
        }
    }
}
</script>

<style>

</style>
