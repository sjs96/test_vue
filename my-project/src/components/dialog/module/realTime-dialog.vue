<template>
  <el-dialog :title="data.titleFunction(data)" width="1000px"  :show-close=false :visible.sync="data.show">
    <el-table
      :data.sync="tableData"
      style="width: 100%">
      <el-table-column
        prop="datetime"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="dianya"
        label="电压(V)">
      </el-table-column>
      <el-table-column
        prop="dianliu"
        label="电流(A)">
      </el-table-column>
      <el-table-column
        prop="yougonggonglv"
        label="功率(kW)">
      </el-table-column>
      <el-table-column
        prop="gonglvyinshu"
        label="功率因素">
      </el-table-column>
      <el-table-column
        prop="yougongzongdianliang"
        label="有功总电量(kWh)">
      </el-table-column>
      <el-table-column
        prop="shengyudianliang"
        label="剩余电量(kWh)">
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
        first:true
      }
    },
    methods: {
      realTimeData(){
        console.log("--------11-------")
        console.log(this)
        console.log("---------11------")
        let that = this
        let params = new URLSearchParams()
        params.append('m_no',"0"+this.data.map.m_no)
        params.append('first',this.first)
        console.log("realTimeData")
        console.log(this.data.map.m_no)
        my_post("/meter/realTimeData", params,(state,msg,json)=>{
          console.log('json-----------')
          console.log(json)
          if(isNotNull(json)){
            that.tableData.splice(0,0,json)
            if(that.tableData.length>5){
              that.tableData.splice(5,1);
            }
          }

        },(state,msg,json)=>{
          that.tableData.splice(0,0,json)
          if(that.tableData.length>5){
            that.tableData.splice(5,1);
          }
        })
        this.first = false
      },
      setInterval () {         //删除
        this.first = true;
        this.tableData.splice(0,this.tableData.length);
        this.realTimeData()
        this.dsq = window.setInterval(()=>{
          this.realTimeData()
        },15*1000)
      },
      clearInterval () {         //删除
        window.clearInterval(this.dsq)
        console.log('clearInterval')
      }
    },
    watch: {
      'data.show': {
        handler: function (val, oldVal) {
          if(val){
            this.setInterval()
          }else{
            this.clearInterval()
          }
        },
      },
    },
  }
</script>
