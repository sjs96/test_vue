<template>
  <el-dialog :title="data.title" width="1000px"  :show-close=false :visible.sync="data.show">
    <el-table
      :data="tableData"
      style="width: 100%"
      max-height="500">
      <el-table-column
        :prop="description.value"
        :label="description.label"
        :key="description.label"
        v-for="description in data.listDescription">
      </el-table-column>
    </el-table>
  </el-dialog>

</template>

<script>
  import {my_post} from '../../../util/util'
  import {isNotNull} from '../../../util/isNotNull'
  export default {
    props: {
      data:Object,
    },
    data() {
      return {
        dsq:{},
        tableData: [],
        first:true,
      }
    },
    methods: {
      query(){
        console.log('query')
        console.log(this.data)
        let params = new URLSearchParams()
        let that = this
        params.append('ui_id',this.data.map.ui_id)
        my_post(this.data.url, params,(state,msg,json)=>{
            that.tableData=json
        },(state,msg,json)=>{
          that.tableData=[]
        })
       console.log('query2')
      },

    },
    watch: {
      'data.show': {
        handler: function (val, oldVal) {
          if(val){
            this.query()
          }
        },
      },
    },
  }
</script>
