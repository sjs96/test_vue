<template>
  <el-dialog :title="edit.title" :visible.sync="edit.show" :modal-append-to-body="false" :width="edit.width+'px'"  :before-close="handleClose"  >
    <el-tabs v-model="edit.activeName" v-if="edit.list.length>1" >
      <el-tab-pane :label="item.label" :name="item.name" :key="item.name"  v-for="(item, index) in edit.list">
        <from-section  @complete="save" :model="item" :modelList="edit.list" :ref="edit.hide_id" :editId="edit.id+''" ></from-section>
      </el-tab-pane>
    </el-tabs>
    <from-section  @complete="save" v-else :model="edit.list[0]" :modelList="edit.list" :editId="edit.id+''" :ref="edit.hide_id" ></from-section>

    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addClick()" v-if="add">添加一页</el-button>
        <el-button type="primary" @click="delClick()" v-if="del">删除本页</el-button>
        <el-button type="primary" @click="last()" v-if="edit.id&&edit.nextAndLast&&lastId!=0">上一条</el-button>
        <el-button type="primary" @click="next()"  v-if="edit.id&&edit.nextAndLast&&nextId!=0">下一条</el-button>
        <el-button type="primary" @click="save()" >{{edit.saveText}}</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import store from '../../../store/store'
  import {mapState} from 'vuex';
  import {getParams} from '../../../util/getParams';
  import {initParams} from '../../../util/init/initParams';
  import FromSection from '../../from/section-from.vue'
  import {getModuleName} from '../../../util/util';
  import {handleClose} from '../../../util/util';
  import {validate} from '../../../util/util';
  import {ajaxState} from '../../../util/util';
  import {my_post} from '../../../util/util';
  import {initControlGroup} from '../../from/base/util/initFrom';
  import {getList} from '../../from/section-from';
  import {initActiveName} from '../../module/base/util/initModule';
  import {myMessage} from '../../../util/message';
  export default {

    data () {
      return {
        first:true,
        lastId:0,
        nextId:0,
        add:false,
        del:false,
      }
    },
    watch: {
      'edit.activeName': {
        handler: function (val, oldVal) {
          this.getIF()
          this.getIFDel()
        },
      },
    },
    updated () {              //初始化
      console.log(1)
      if(this.edit.show){
        if(this.first){
          this.queryById()
          console.log(2)
          this.edit.sendState = true;
          if (typeof(this.$refs[this.edit.hide_id].length) == 'undefined'){
            this.$refs[this.edit.hide_id].init()
            console.log(3)
            console.log(this)
          }else{
            for(let i=0;i<this.$refs[this.edit.hide_id].length;i++){
              this.$refs[this.edit.hide_id][i].init()
              console.log(4)
            }
          }
        }
        this.first=false
        console.log(5)
      }else{
        this.first=true
        console.log(6)
      }
      console.log(7)
    },
    components: {
      FromSection,                      //内容
    },
    props: {
      edit:Object,
      content:Object,
      primaryKey:String,
      api:Object,
    },
    methods: {
      addClick(){
        if (typeof(this.$refs[this.edit.hide_id].length) == 'undefined'){
          this.$refs[this.edit.hide_id].add2(this.edit.activeName)
        }else{
          for(let i=0;i<this.$refs[this.edit.hide_id].length;i++){
            this.$refs[this.edit.hide_id][i].add2(this.edit.activeName)
          }
        }
      },
      delClick(){
        let newActiveName=""
        for(let i=0;i<this.edit.list.length;i++){
          if(this.edit.list[i].name==this.edit.activeName){
            console.log('sc'+this.edit.activeName)
            this.edit.list.splice(i,1);
            this.edit.activeName=newActiveName
            return
          }else{
            newActiveName=this.edit.list[i].name
          }
        }
      },
      getIF(){
        for(let i=0;i<this.edit.list.length;i++){
          if(this.edit.list[i].name==this.edit.activeName){
            if(this.edit.list[i].btn_add){
              this.add=true;
            }else{
              this.add=false;
            }
            return
          }
        }
        this.add=false;
      },
      getIFDel(){
        console.log(this.edit.activeName)
        console.log(this.edit)
        for(let i=0;i<this.edit.list.length;i++){
          console.log(this.edit.list[i].name+":::"+this.edit.activeName)
          if(this.edit.list[i].name==this.edit.activeName){
            console.log(this.edit.list[i].copy)
            if(this.edit.list[i].copy){
              console.log('dffdfdf')
              this.del=true;
            }else{
              this.del=false;
            }
            return
          }
        }
        console.log('false')
        this.del=false;
      },
      getNewList(){
        let newList =[]
        let controlList =[]
        for(let i=0;i<this.edit.list.length;i++){

          //删除复制的页面
          if(!this.edit.list[i].copy){
            newList.push(this.edit.list[i])
            let controlList =[]
            //删除复制的控件
            for(let l=0;l<this.edit.list[i].list.length;l++){
              if(!this.edit.list[i].list[l].copy){
                controlList.push(this.edit.list[i].list[l])
              }

            }
            let obj = initControlGroup({list:controlList,ruleForm:{},rules:{}})
            this.edit.list[i].list = obj.list
            this.edit.list[i].ruleForm = obj.ruleForm
            this.edit.list[i].rules = obj.rules
          }
        }
        this.edit.list =newList
        this.edit.activeName=initActiveName(this.edit.list)
      },

      handleClose(done) {
        handleClose(done,this)
      },
      getP(list) {
        console.log(list)
        if (typeof(list.length) == 'undefined'){
          list.getP()
        }else{
          for(let i =0;i<list.length;i++){
            list[i].getP()
          }
        }
      },
      save() {
        if(!this.edit.sendState){
          myMessage({message:'正在发送中，请稍等。'})
          return
        }
        this.getP(this.$refs[this.edit.hide_id])
        console.log('this')
        console.log(this)
        console.log(this)
        return validate(this,this.$refs[this.edit.hide_id],() => {
          this.edit.sendState=false;
          if(typeof this.edit.save == 'function'){
            this.edit.save(this);
          }else{
            let setting = {
              state:3,
              setting:[
                {name:'编号',field:'bh',type:'String',custom:{},children:[]},
                {name:'id',field:'id',type:'String',custom:{},children:[]}
              ]
            }
            var params = getParams(this.edit.list)
            params.append('setting',$.parseJSON(setting))
            my_post(this.api.edit, params,(state,msg,json)=>{
              myMessage({message:'更新成功'})
              store.commit('queryNo',this)
            },(state,msg,json)=>{
            },this)
          }
        })
      },
      last(){
        this.edit.id =this.lastId
        this.queryById()
      },
      next(){
        this.edit.id =this.nextId
        this.queryById()
      },
      queryById() {
        this.getNewList()
        if(!this.edit.id){
          initParams(this,this.edit,[],'ADD')
          return
        }
        var params = new URLSearchParams()
        params.append(this.primaryKey,this.edit.id)
        params.append("default_id_",this.edit.id)

        my_post(this.api.queryById, params,(state,msg,json)=>{
          initParams(this,this.edit,json,'UPD')
          let listContent = this.content.listContent
          for(let i=0;i<listContent.length;i++){
            if(listContent[i][this.primaryKey]==this.edit.id){
              if(listContent[i-1]&&listContent[i-1][this.primaryKey]){
                this.lastId=listContent[i-1][this.primaryKey]
              }else{
                this.lastId=0
              }
              if(listContent[i+1]&&listContent[i+1][this.primaryKey]){
                this.nextId=listContent[i+1][this.primaryKey]
              }else{
                this.nextId=0
              }
            }
          }
        },(state,msg,json)=>{})
      },
    },
    store
  };
</script>
