import cascader from './base/data/control/cascader';
import transfer from './base/data/control/transfer';
import axios from 'axios'
import store from '../../store/store'
import {getParams} from '../../util/getParams';
import {isNotNull} from '../../util/isNotNull';
import {my_post} from '../../util/util';
import {initControlGroup} from '../from/base/util/initFrom';

//联动数据
function initAssociated(list,vm){
  for(let i=0;i<list.length;i++){
    if(list[i].associated.effective){
      if(list[i].associated.listen&&typeof(list[i].associated.listen)=="function"){
        list[i].associated.listen()
      }
      list[i].associated.listen = vm.$watch('model.ruleForm.'+list[i].name,function(newVal, oldVal){
        list[i].associated.custom(vm.model)
        } )

    }
  }
}
// 初始化控件后可以ajax获取初始值,并设置监听
export function initAjax(vm) {
  let list = vm.model.list
  if(!isNotNull(list)){
    return
  }
  initAssociated(list,vm)
  for(let i=0;i<list.length;i++){
    if(isNotNull(list[i].ajax.url)){
      if(list[i].type == 'cascader'){
        initValueCascader(vm,list[i])
        initWatch(vm,list[i],initValueCascader)
      }else if(list[i].type == 'transfer'){
        initValueTransfer(vm,list[i])
        initWatch(vm,list[i],initValueTransfer)
      }else if(list[i].type == 'select'){
        initValueSelect(vm,list[i])
        initWatch(vm,list[i],initValueSelect)
      }else if(list[i].type == 'jurisdiction'){
        initValueJurisdiction(vm,list[i])
        initWatch(vm,list[i],initValueJurisdiction)
      }
    }


  }
}
function initValueJurisdiction(vm,control){
  let params = getInitParams(vm,control)
  my_post(control.ajax.url, params,(state,msg,json)=>{
    control.tableData = json.list
    control.tableData_num = json.num
  },(state,msg,json)=>{
    control.options = json
  })

}
// 设置值
function initValueSelect(vm,control){
  let params = getInitParams(vm,control)
  my_post(control.ajax.url, params,(state,msg,json)=>{
    control.options = json
  },(state,msg,json)=>{
    control.options = json
  })

}
// 设置值
function initValueCascader(vm,control){
  let params = getInitParams(vm,control)
  my_post(control.ajax.url, params,(state,msg,json)=>{
    control.options = json
  },(state,msg,json)=>{
    control.options = json
  })
}
// 设置值
function initValueTransfer(vm,control){
  let params = getInitParams(vm,control)
  let params2 = getInitParamsList(vm,control,control.ajax.params2)
  if(!isNotNull(control.ajax.url)){
    return
  }
  my_post(control.ajax.url, params,(state,msg,json)=>{
    let data=[]
    for(let i = 0; i<json.length;i++){
      data.push({key: json[i][control.ajax.data_name.key],label:json[i][control.ajax.data_name.label]})
    }
    control.data = data
  },(state,msg,json)=>{
    control.data = []
  },"")
  if(!isNotNull(control.ajax.url2)){
    return
  }
  my_post(control.ajax.url2, params2,(state,msg,json)=>{
    vm.model.ruleForm[control.name] = json
  },(state,msg,json)=>{
    vm.model.ruleForm[control.name] = []
  },"")
}


function initWatch(vm,control,watch){
  initWatchList(vm,control,watch,control.ajax.params)
}
// 动态监听绑定的控件以更新控件数据
function initWatchList(vm,control,watch,paramsList){
  if(!isNotNull(paramsList)){
    return
  }
  for(let i=0; i<paramsList.length;i++){
    if(paramsList[i].type == 'control'){
      // 删除原来的监听
      if(paramsList[i].listen&&typeof(paramsList[i].listen)=="function"){
        //alert("删除原来监听："+paramsList[i].name)
        paramsList[i].listen()
      }else{

      }
      let mylist = vm.modelList
      for(let l= 0;l<mylist.length;l++){
        let controlList = mylist[l].ruleForm
        for(var key in controlList){
          if(key == paramsList[i].control){
            paramsList[i].listen = vm.$watch('modelList.'+l+'.ruleForm.'+key,function(newVal, oldVal){
              watch(vm,control)
            } )
          }
        }
      }
      // 绑定监听

    }
  }
}
//获取联动参数（ajax 的参数）
function getInitParams(vm,control){
  return getInitParamsList(vm,control,control.ajax.params)
}
function getInitParamsList(vm,control,paramsList){

  let list = vm.modelList

  let ruleForm = {}
  for(let i=0;i<list.length;i++){
    ruleForm = _.merge({}, ruleForm,list[i].ruleForm)
  }
  var params = new URLSearchParams()
  if(!isNotNull(paramsList)){
    return params
  }
  for(let l=0; l<paramsList.length;l++){
    if(paramsList[l].type == 'control'){                                // 如果是控件，取控件的值
      if(ruleForm[paramsList[l].control]){
        params.append(paramsList[l].name,ruleForm[paramsList[l].control])
      }else{
        params.append(paramsList[l].name,"")
      }
    }else if(paramsList[l].type == 'text'){                             // 如果不是控件，直接取值
      params.append(paramsList[l].name,paramsList[l].value)
    }
  }
  return params
}

//设置控件获取焦点
export function setFocus(vm,index){
  let list = vm.model.list
  if(index>-1&&!list[index].focus.effective){
    return
  }
  let item = getEl(vm,index)
  if(!item){
    vm.$emit('complete',{});
    return
  }
  let el = vm.$el
  let type = item.type
  let cls = 'el-input';
  let tag = 'input';
  if(type == 'input'){
    cls = 'el-input';
    tag = 'input';
  }else if(type == 'hidden'){
    cls = 'el-input';
    tag = 'input';
  }else if(type == 'cascader'){
    cls = 'el-cascader';
    tag = 'input';
  }else if(type == 'time'){
    cls = 'el-date-editor';
    tag = 'input';
  }else if(type == 'time-interval'){
    cls = 'el-date-editor';
    tag = 'input';
  }else if(type == 'textarea'){
    cls = 'el-textarea';
    tag = 'textarea';
  }else if(type == 'select'){
    cls = 'el-select';
    tag = 'input';
  }else if(type == 'select-multiple'){
    cls = 'el-select';
    tag = 'input';
  }else if(type == 'transfer'){
    cls = 'el-transfer';
    tag = 'input';
  }else if(type == 'upload'){
    cls = 'upload-demo';
    tag = 'button';
  }
  el.getElementsByClassName(item.name+'_class')[0].getElementsByTagName(tag)[0].focus();
}

// 获取下一个获取焦点的控件
function getEl(vm,index){
  let item;
  let list = vm.model.list
  for(let i=index+1;i<list.length;i++){
    if(list[i].focus.effective&&!list[i].focus.skip){
      item  = list[i]
      break;
    }
  }
  return item
}
function getRandomName(){
  let timestamp=new Date().getTime()
  let num = Math.floor(Math.random()*100000);
  return '__copy__'+timestamp+"_"+num+"__"
}
export function getList(model){
  let list = _.merge([], model.list)
  let newList = []
  let copyName = getRandomName()
  for(let i=0;i<list.length;i++){
    if(!list[i].copy){
      list[i].name=list[i].name+copyName
      list[i].copy=true
      let params = list[i].ajax.params
      for(let l=0;l<params.length;l++){
        params[l].control=params[l].control+copyName
      }
      newList.push(list[i])
    }
  }
  let obj = initControlGroup({list:newList,ruleForm:{},rules:{}})
  obj.name=model.name+copyName
  obj.label=model.label
  obj.copy=true
  return obj
}
