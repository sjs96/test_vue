import _ from 'lodash'
import {isNotNull} from './isNotNull';
//获取参数用于setion-edit.vue 保存时获取

export function getParams(myobj) {
  let params = getParamsBase(myobj);
  let map ={}
  let name =""
  for(let param of params) {
    let str = param[0].split("__copy__");
    if(isList(myobj,str[0])){
      if(!str[1]){
        str[1]='999999995555'
      }
      name = getName(myobj,str[0])
      if(!map[name]){
        map[name]={}
      }
      if(!map[name][str[1]]){
        map[name][str[1]]={}
      }
      map[name][str[1]][str[0]]=param[1]
      params.delete(param[0])
    }
  }
  for(let key in map){
    let groupMap = map[key]
    let newList = [];
    for(let groupKey in groupMap){
      newList.push(groupMap[groupKey])
    }
    params.append(key,JSON.stringify(newList))
  }
  return params
}

function isList(myobj,name){
  for(let i=0;i<myobj.length;i++){
    let newFrom= aaaa(  myobj[i].list,myobj[i].ruleForm)
    for(var key in newFrom){
      if(key == name){
        if(myobj[i].btn_add){
          return true
        }
      }
    }
  }
  return false
}
function getName(myobj,name){
  for(let i=0;i<myobj.length;i++){
    let newFrom= aaaa(  myobj[i].list,myobj[i].ruleForm)
    for(var key in newFrom){
      if(key == name){
        return myobj[i].name
      }
    }
  }
}
export function getParamsBase(myobj) {
  var params = new URLSearchParams()
  for(let i=0;i<myobj.length;i++){
    let newFrom= aaaa(  myobj[i].list,myobj[i].ruleForm)
    for(var key in newFrom){
      if(key == 'dp_note'){
        let obj = newFrom[key]
      }
      if(isNotNull(newFrom[key])){
        params.append(key,newFrom[key])
      }else{
        params.append(key,'')
      }
    }
  }
  return params
}

function aaaa(  editList,ruleForm){
  let newFrom =  _.merge({}, ruleForm,{})
  var params = new URLSearchParams()
  // 设置特殊参数
  for(let i=0; i<editList.length;i++){
    let name = editList[i].name
    let value = newFrom[name]
    // cascader组件保存list，但只需要list中最后一个
    if(editList[i].type=='cascader'&&isNotNull(value)){
      newFrom[name] = value[value.length-1];
    }else if(editList[i].type=='jurisdiction'){
      console.log('jurisdiction')
      console.log(editList[0].tableData)
      let list = []
      for(let i= 0;i<editList[0].tableData.length;i++){
        for(let j= 0;j<editList[0].tableData[i].operation.length;j++){
          if(editList[0].tableData[i].operation[j].state&&(!editList[0].tableData[i].operation[j].disabled)){
            console.log(editList[0].tableData[i].module+":"+editList[0].tableData[i].id+"："+editList[0].tableData[i].operation[j].name)
            list.push({"id":editList[0].tableData[i].id,"name":editList[0].tableData[i].operation[j].name})
          }
        }
        if(editList[0].tableData[i].page.state&&(!editList[0].tableData[i].page.disabled)){
          list.push({"id":editList[0].tableData[i].id,"name":editList[0].tableData[i].page.name})
        }
      }
      console.log(ruleForm)
      newFrom[name] = JSON.stringify(list)
    }else if(editList[i].type=='upload'){
      console.log(111)
      console.log(value)
      console.log(ruleForm)
      console.log(editList)
      console.log(11111111111111)
      let filePath = [];
      if(isNotNull(value)){
        for(let l = 0; l < value.length;l++){
          if(value[l].response&&value[l].response.list&&value[l].response.list[0].url){
            filePath.push({"url":value[l].response.list[0].url,"name":value[l].response.list[0].name})
          }else{
            filePath.push({"url":value[l].url,"name":value[l].name})
          }
        }
      }
      newFrom[name]=JSON.stringify(filePath)
    }
  }
  return newFrom
}
