<template>
  <el-form :model="model.ruleForm" :inline="true" :rules="myRules"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item v-show="item.showFunction(model)" :aaa="item.showFunction(model)" :class="item.name+'_class'"  :label="model.left_title?item.type === 'hidden'?'':item.label:''" :prop="item.name"  :key="item.name" v-for="(item, index) in model.list" v-if="(!(editId&&editId.length>0))?item.show.add?true:false:item.show.edit?true:false">
      <!--text-->
      <el-input
        :style="item.style"
        @keyup.enter.native="setFocus(index)"
        v-if="item.type === 'input'"
        :disabled="(!(editId&&editId.length>0))?item.disabled.add?true:false:item.disabled.edit?true:false"
        :placeholder="item.label"
        v-model="model.ruleForm[item.name]" ></el-input>
      <!--隐藏域-->
      <el-input
        :style="item.style"
        @keyup.enter.native="setFocus(index)"
        v-if="item.type === 'hidden'"
        :disabled="(!(editId&&editId.length>0))?item.disabled.add?true:false:item.disabled.edit?true:false"
        :placeholder="item.label"
        v-show="false"
        v-model="model.ruleForm[item.name]" ></el-input>
      <!--<input type="text" v-focus="item.focus.select" @focus="item.focus.select = true" @blur="item.focus.select = false">-->
      <!--联级下拉-->
      <el-cascader
        :style="item.style"
        @keyup.enter.native="setFocus(index)"
        v-if="item.type === 'cascader'"
        :disabled="(!(editId&&editId.length>0))?item.disabled.add?true:false:item.disabled.edit?true:false"
        clearable
        :placeholder="item.label"
        v-model="model.ruleForm[item.name]"
        :options="item.options"
        change-on-select
        :show-all-levels="false"
        filterable  ></el-cascader>
      <!--时间选择-->
      <el-date-picker
        :style="item.style"
        @keyup.enter.native="setFocus(index)"
        v-if="item.type === 'time'"
        :disabled="(!(editId&&editId.length>0))?item.disabled.add?true:false:item.disabled.edit?true:false"
        v-model="model.ruleForm[item.name]"
        type="datetime"
        :format="item.format"
        :value-format="item.valueFormat"
        :placeholder="item.label"> </el-date-picker>
      <!--时间区间选择-->
      <el-date-picker
        :style="item.style"
        @keyup.enter.native="setFocus(index)"
        v-if="item.type === 'time-interval'"
        v-model="model.ruleForm[item.name]"
        :disabled="(!(editId&&editId.length>0))?item.disabled.add?true:false:item.disabled.edit?true:false"
        type="datetimerange"
        range-separator="至"
        :format="item.format"
        :value-format="item.valueFormat"
        :start-placeholder="item.label"
        :end-placeholder="item.label"> </el-date-picker>
      <!--文本框-->
      <el-input
        :rows="5"
        :style="item.style"
        @keyup.enter.native="setFocus(index)"
        :disabled="(!(editId&&editId.length>0))?item.disabled.add?true:false:item.disabled.edit?true:false"
        v-if="item.type === 'textarea'"
        :placeholder="item.label"
        v-model="model.ruleForm[item.name]"
        type="textarea" ></el-input>
      <!--下拉单选-->
      <el-select
        :style="item.style"
        @keyup.enter.native="setFocus(index)"
        clearable
        v-if="item.type === 'select'"
        :disabled="(!(editId&&editId.length>0))?item.disabled.add?true:false:item.disabled.edit?true:false"
        :placeholder="item.label"
        :value-key="item.name"
        v-model="model.ruleForm[item.name]"
        filterable
        collapse-tags>
        <el-option v-for="info in item.options" :key="info[item.props.value]" :label="info[item.props.label]" :value="info[item.props.value]"></el-option>
      </el-select>
      <!--下拉多选-->
      <el-select
        :style="item.style"
        @keyup.enter.native="setFocus(index)"
        v-if="item.type === 'select-multiple'"
        :disabled="(!(editId&&editId.length>0))?item.disabled.add?true:false:item.disabled.edit?true:false"
        :placeholder="item.label"
        :value-key="item.name"
        v-model="model.ruleForm[item.name]"
        filterable
        multiple
        clearable
        collapse-tags >
        <el-option v-for="info in item.options" :key="info.value" :label="info.label" :value="info.value"></el-option>
      </el-select>
      <!--穿梭框-->
      <el-transfer
        :style="item.style"
        @keyup.enter.native="setFocus(index)"
        v-if="item.type === 'transfer'"
        :placeholder="item.label"
        v-model="model.ruleForm[item.name]"
        :titles="item.titles"
        :data="item.data"></el-transfer>
      <!--上传-->
      <el-upload
        :style="item.style"
        @keyup.enter.native="setFocus(index)"
        v-if="item.type === 'upload'"
        :disabled="(!(editId&&editId.length>0))?item.disabled.add?true:false:item.disabled.edit?true:false"
        class="upload-demo"
        :action="item.url"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="su"
        :before-upload="item.checkType[item.checkTypeName]"
        :data="{name:item.name}"
        :file-list="model.ruleForm[item.name]"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>

      <UE :defaultMsg="model.ruleForm[item.name]"
          :editor="item.editor"
          :disabled="(!(editId&&editId.length>0))?item.disabled.add?true:false:item.disabled.edit?true:false"
          @on-editor-change="function a(val){
            item.editor = val}"
          :config="item.config"
          :style="item.style"
          :name="item.name"
          ref="ue"
          v-if="item.type === 'ue'"></UE>
      <jurisdiction-section
        :style="item.style"
        :tableData="item.tableData"
        :tableData_num="item.tableData_num"
        v-if="item.type=='jurisdiction'"
      ></jurisdiction-section>

    </el-form-item>
    <el-button  v-if="model.btn_query"  type="primary" :class="'my_btn'" @click="query" >查询</el-button>
  <!--  <el-button  v-if="model.btn_add"  type="primary" :class="'my_btn'" @click="add" >添加一行</el-button>
    <el-button  v-if="model.btn_add"  type="primary" :class="'my_btn'" @click="add2" >添加一夜</el-button>
-->  </el-form>
</template>
<script>
  //
//  :disabled="(!(editId&&editId.length>0))?item.disabled.add?true:false:item.disabled.edit?true:false"
  import {mapState} from 'vuex';
  import {setFocus} from './section-from';
  import {initAjax} from './section-from';
  import {getList} from './section-from';
  import {isNotNull} from '../../util/isNotNull';
  import JurisdictionSection from './jurisdiction/section-jurisdiction.vue'
  import _ from 'lodash'
  import UE from './ue/ue.vue';
  export default {
    name:'from',
    mounted () {              //初始化
      this.init()
    },
    components: {
      JurisdictionSection,UE
    },
    computed: {
      // a computed getter
      myRules: function () {
        let that = this
        // `this` points to the vm instance
        for(var key in this.model.rules){
          for(let i=0;i<this.model.rules[key].length;i++){
            if(isNotNull(this.model.rules[key][i]['validator'])){
              let my = this.model.rules[key][i].validator;
              let that = this
              this.model.rules[key][i]['validator'] = function (rule, value, callback)  {
                my(rule, value, callback,that )
              }
            }
          }
        }
        return this.model.rules;
      }
    },
    props: {
      model:Object,
      modelList:Array,
      editId:String,
    },
    methods: {

      getP(){
        this.getUEContent()
      },
      getUEContent() {
        if(!(this.$refs&&this.$refs.ue)){
          return
        }
        let list = this.$refs.ue;
        if (typeof(list.length) == 'undefined'){
          this.setUEContent(list.getUEContent());
        }else{
          for(let i =0;i<list.length;i++){
            this.setUEContent(list[i].getUEContent());
          }
        }
      },
      initUEContent() {
        if(!(this.$refs&&this.$refs.ue)){
          return
        }
        let list = this.$refs.ue;
        if (typeof(list.length) == 'undefined'){
         list.init()
        }else{
          for(let i =0;i<list.length;i++){
            list[i].init()
          }
        }
      },
      setUEContent(obj){
        for(var key in this.model.ruleForm){
          if(obj.name==key){
            this.model.ruleForm[key]=obj.content;
          }
        }
      },
      setFocus(index){
        if(this.model.list.length==1 && this.model.list[0].type=='jurisdiction'){
          return;
        }
        setFocus(this,index)
      },
      query () {
        this.$emit('complete',{});
      },

      add(name){
        if(this.model.name==name){
          let obj = getList(this.model)
          for(let i=0;i<obj.list.length;i++){
            this.model.list.push(obj.list[i])
          }
          for(var key in obj.ruleForm){
            this.$set(this.model.ruleForm,key, obj.ruleForm[key]);
          }
          for(var key in obj.rules){
            this.$set(this.model.rules,key, obj.rules[key]);
          }
          initAjax(this)
        }

      },
      add2(name){
        if(this.model.name==name){
          let obj = getList(this.model)
          this.modelList.push(obj)
          initAjax(this)
        }
      },
      init (){
        let list = this.model.list
        if(!isNotNull(list)){
          return
        }
        for(let i=0;i<list.length;i++){
          if(list[i].focus.effective&&!list[i].focus.skip){
            this.setFocus(i-1)
            break;
          }
        }
        initAjax(this)
        this.initUEContent()
      },
      handleRemove(file, fileList) {


        for(let i=0;i<this.model.list.length;i++){
          if(this.model.list[i].name == response.name){
            this.model.ruleForm[response.name]=[]
            for(let l=0;l<fileList.length;l++){
              this.model.ruleForm[response.name].push(fileList[l])
            }
          }
        }
      },
      handlePreview(file) {
      },
      su(response, file, fileList){
        for(let i=0;i<this.model.list.length;i++){
          if(this.model.list[i].name == response.name){
            this.model.ruleForm[response.name]=[]
            for(let l=0;l<fileList.length;l++){
              this.model.ruleForm[response.name].push(fileList[l])
            }
          }
        }
      }
    },

  };
</script>
<style  scoped  rel="stylesheet/scss">
  .my_btn {
    background-color: #424F63;
    border-color: #374152;
    color: #FFFFFF;
    padding: 12px 12px;
  }
  input[type=file] {
    display: none !important;
  }
  .upload-demo input[type=file]{
    display: none !important;
  }
  .el-upload__input {
    display: none !important;
  }
  .my_btn:hover, .btn-primary:focus, .btn-primary:active, .btn-primary.active, .open .dropdown-toggle.btn-primary {
    background-color: #374152;
    border-color: #2e3644;
    color: #FFFFFF;
    padding: 12px 12px;
  }
</style>
