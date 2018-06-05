<template>
  <el-table
    :data="tableData"
    :span-method="objectSpanMethod"
    style="width: 100%">
    <el-table-column
      prop="module"
      label="模块"
      width="150">
    </el-table-column>
    <el-table-column label="权限">
      <el-table-column
        prop="page"
        label="页面"
        width="120">
        <template slot-scope="scope">
          <!--{{tableData}}-->
          <!-- `checked` 为 true 或 false -->
          <el-checkbox v-model="scope.row.page.state" :disabled="scope.row.page.disabled">{{scope.row.page.label}}</el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <!-- `checked` 为 true 或 false -->

          <el-checkbox v-model="opera.state" :key="opera.name" :disabled="opera.disabled" v-for="opera in scope.row.operation">{{opera.label}}</el-checkbox>

<!--          <el-checkbox v-model="scope.row.operation.edit.state" :disabled="scope.row.operation.edit.disabled">更新</el-checkbox>
          <el-checkbox v-model="scope.row.operation.delete.state" :disabled="scope.row.operation.delete.disabled">删除</el-checkbox>
          <el-checkbox v-model="scope.row.operation.query.state" :disabled="scope.row.operation.query.disabled">查询</el-checkbox>-->
        </template>
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    methods: {
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        let module_num = this.module_num
        for(let i = 0;i<module_num.length;i++){
          if(rowIndex >= module_num[i].min && rowIndex <= module_num[i].max && columnIndex === 0 ){
            return this.merge(rowIndex, columnIndex,module_num[i])
          }
        }
        return {
          rowspan: 1,
          colspan: 1
        };
      },
      merge(rowIndex, columnIndex,obj){
        let min = obj.min
        let max = obj.max
        if (columnIndex === 0) {
          if (rowIndex == min) {
            return {
              rowspan: max-min+1,
              colspan: 1
            };
          }else if(rowIndex >min && rowIndex <= max){
            return {
              rowspan: 0,
              colspan: 0
            };
          }else{
            return {
              rowspan: 1,
              colspan: 1
            };
          }
        }
      }
    },
    props: {
      tableData:Array,
      tableData_num:Array,
    },
    computed: {
      // 计算属性的 getter
      module_num: function () {
        let module_num = [];
        let min = 0;
        let max = 0;
        for(let i=0;i<this.tableData_num.length;i++){
          max = min+this.tableData_num[i]-1
          module_num.push({min:min,max:max})
          min = max+1;
        }
        return module_num
      }
    },
    data() {
      return {
        xz: {home_add:true},
      };
    }
  }
</script>
