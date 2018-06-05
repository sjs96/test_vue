import _ from 'lodash'
import mybtn from '../data/mybtn';
import {getModuleName} from '../../../../util/util';
import {myMessage} from '../../../../util/message';
import store from '../../../../store/store'
import {my_post_file} from '../../../../util/util';
import {getParams} from '../../../../util/getParams';
import {isNotNull} from "../../../../util/isNotNull";

// 结尾
function base_end() {
  return [
    // 收缩
    {
      class: 'fa-chevron-down', jurisdiction: 'btnUpAndDown_query', click: (vm, index) => {
      if (vm.model.show) {
        vm.model.mybtn[index].class = 'fa-chevron-up'
        vm.model.show = false
      } else {
        vm.model.mybtn[index].class = 'fa-chevron-down'
        vm.model.show = true
      }
    }
    },
    // 关闭
    {
      class: 'fa-times', jurisdiction: 'btnRemove_query', click: (vm, index) => {
      vm.model.delete = false
    }
    }
  ]
}
// 开头
function base_start(){
  return [
  //execl导出
  {class:'', text:'导出execl', jurisdiction:'execl',click:(vm,index)=>{
    vm.jurisdiction.execl.setUp;
    let myParams = getParams(vm.querya.list);
    let params = new URLSearchParams()
    let paramsMap = {}
    for(let p of myParams){
      paramsMap[p[0]]=p[1]
    }
    params.append('setUp_execl_',JSON.stringify(vm.jurisdiction.execl.setUp))
    params.append('setUp_execl_params',JSON.stringify(paramsMap))
    my_post_file(vm.jurisdiction.execl.ajax.url,params,function(){},function(){})
  }},
  //word导出
  {class:'',text:'导出word',  jurisdiction:'word',click:(vm,index)=>{
    vm.jurisdiction.execl.setUp;
    alert(vm.jurisdiction.execl.setUp)
    let params = new URLSearchParams()
    params.append('setUp',JSON.stringify(vm.jurisdiction.execl.setUp))
    my_post_file(vm.jurisdiction.execl.ajax.url,params,function(){},function(){})
  }},
  //添加
  {class:'fa-plus',  jurisdiction:'add',click:(vm,index)=>{
    for( let i = 0;i< vm.dialog.list.length;i++){
      if(vm.dialog.list[i].name == 'edit'){
        vm.dialog.list[i].data.id=''
        vm.dialog.list[i].data.show = true
      }
    }
  }},
  //删除
  {class:'fa-trash-o',jurisdiction:'delete',click:(vm,index)=>{
    console.log('delete----------')
    console.log(vm)
    for( let i = 0;i< vm.dialog.list.length;i++){
      if(vm.dialog.list[i].name == 'delete'){
        if(!isNotNull(vm.content.checkedList)){
          myMessage({message: '请选择删除的数据',type: 'warning'})
        }else{
          vm.dialog.list[i].data.show = true
          vm.dialog.list[i].data.rows=vm.content.checkedList
          vm.dialog.list[i].data.primaryKey=vm.content.primaryKey
        }
      }
    }
  }}
  ]
}


// 设置控件.
export function initMybtnContent(list) {
  let oldList = []
  oldList = oldList.concat(list,base_start(), base_end());
  let newList = []
  for(let i=0;i<oldList.length;i++){
    newList.push(_.merge({}, mybtn,oldList[i]))
  }
  return newList;
}
export function initMybtnQuery(list) {

  let oldList = []
  oldList = oldList.concat(list,base_end());
  let newList = []
  for(let i=0;i<oldList.length;i++){
    newList.push(_.merge({}, mybtn,oldList[i]))
  }
  return newList;
}
function initMybtn(list) {
  let newList = []
  for(let i=0;i<list.length;i++){
    newList.push(_.merge({}, mybtn,list[i]))
  }
  return newList;
}
