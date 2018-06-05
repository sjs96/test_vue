<!--主题内容table的头部-->
<template>
  <header class="panel-heading">
    {{model.listName}}
    <!--功能开始-->
   <span class="tools pull-right">
      <el-select  @visible-change="setTableSetting" v-model="content.listDescriptionShow" v-if="content.listDescription.length>0&&model.listDescription" multiple collapse-tags style="margin-right: 20px;float: left" placeholder="请选择">
        <el-option v-for="item in content.listDescription" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <a href="javascript:;"  class="fa " :class="item.class" v-if="jurisdiction[item.jurisdiction]&&jurisdiction[item.jurisdiction].show&&jurisdiction[item.jurisdiction].jurisdiction"  @click=' test(item.click,index)' v-for="(item, index) in model.mybtn">{{item.text}}</a>
    </span>
    <!--功能开始-->
  </header>
</template>
<script>
  import { Notification } from 'element-ui';
  import Print from 'print-js'
  import {isNotNull} from "../../util/isNotNull";
  import {getloginUser} from '../../util/user'
  import {getModuleName} from '../../util/util';
  import {my_post} from '../../util/util';
  import store from '../../store/store'
  export default {
    props: {
      model: Object,
      querya:Object,
      edit: Object,
      content:Object,
      jurisdiction:Object,
      dialog:Object,
    },
    methods: {
      test(callback,index){
        callback(this,index)
      },
      setTableSetting(show){
        if(!show){
          let params = new URLSearchParams()
          params.append('table_setting_model',getModuleName(this.$route.path))
          params.append('ui_id',getloginUser().loginuserid)
          params.append('table_setting_content',JSON.stringify(this.content.listDescriptionShow))
          my_post("/tableSeeting/save", params,(state,msg,json)=>{},(state,msg,json)=>{})
        }
      },
    },
  };
</script>
