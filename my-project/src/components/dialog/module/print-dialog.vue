<template>
  <el-dialog title="实时数据（15秒刷新一次）" width="1000px"  :show-close=false :visible.sync="data.show">
    <el-table
      :data.sync="tableData"
      id="id1777"
      style="width: 100%">
      <el-table-column
        prop="datetime"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="dianya"
        label="电压">
      </el-table-column>
      <el-table-column
        prop="dianliu"
        label="电流">
      </el-table-column>
      <el-table-column
        prop="yougonggonglv"
        label="功率">
      </el-table-column>
      <el-table-column
        prop="gonglvyinshu"
        label="功率因素">
      </el-table-column>
      <el-table-column
        prop="yougongzongdianliang"
        label="有功总电量">
      </el-table-column>
      <el-table-column
        prop="shengyudianliang"
        label="剩余电量">
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save()" >打印</el-button>
    </span>
  </el-dialog>

</template>

<script>
  import {my_post} from '../../../util/util'
  import store from '../../../store/store'
  import PageSection from '../../page/section-page.vue'
  import {mapState} from 'vuex';
  import {getParams} from '../../../util/getParams';
  import {getModuleName} from '../../../util/util';
  import {myMessage} from '../../../util/message';
  import { getCheckedList } from '../../../util/util';
  import { isNotNull } from '../../../util/isNotNull';
  import VueImages from 'vue-images'
  import HeaderSection from '../../header/section-header.vue'
  import DialogSelect from '../../dialog/module/select-dialog.vue'
  import MyDialog from '../../dialog/my-dialog.vue'
  import Print from 'print-js'
  export default {
    props: {
      data:Object,
      querya:Object,
      content:Object,
      api:Object,
    },
    data() {
      return {
        dsq:{},
        tableData: []
      }
    },
    methods: {
      save(){
        Print({
          printable: 'id1777',
          type: 'html',
          // 继承原来的所有样式
          targetStyles: ['*']
        })
      },
      query () {                //查询
        var params = new URLSearchParams(getParams(this.querya.list))
        console.log(this.api)
        my_post(this.api.query, params,(state,msg,json)=>{
          let  listContent = json.list
          console.log('listContent')
          console.log(listContent)
          this.tableData=listContent
        },(state,msg,json)=>{
        })
      },
    },
    watch: {
      'data.show': {
        handler: function (val, oldVal) {
          if(val){
            this.query ()
          }
        },
      },
    },
  }
</script>
