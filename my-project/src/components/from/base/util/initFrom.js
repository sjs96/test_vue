import _ from 'lodash'
import input from '../data/control/input';
import ue from '../data/control/ue';
import hidden from '../data/control/hidden';
import cascader from '../data/control/cascader';
import transfer from '../data/control/transfer';
import select from '../data/control/select';
import select_multiple from '../data/control/select-multiple';
import time_interval from '../data/control/time-interval';
import upload from '../data/control/upload';
import time from '../data/control/time';
import textarea from '../data/control/textarea';
import jurisdiction from '../data/control/jurisdiction';
import {isNotNull} from '../../../../util/isNotNull'
import group from '../data/group';
// 设置控件
export function initFrom(list) {
  let newList = []
  for(let i = 0 ;i<list.length;i++){
    newList.push(initControlGroup(list[i]))
  }
  return newList;
}

export function initControlGroup(obj) {
  let newObj = _.merge({}, group,obj);
  newObj.list = setControl(newObj.list)
  newObj.ruleForm = initForm(newObj.list,newObj.ruleForm)
  newObj.rules =initRules(newObj.list,newObj.rules)
  return newObj
}

function setControl(list) {
  let newlist = []
  if(!(list&&list.length>0)){
    return list
  }
  for(let i=0;i<list.length;i++){
    if(list[i].type == 'input'){
      newlist.push(_.merge({}, input,list[i]))
    }else if(list[i].type == 'cascader'){
      newlist.push(_.merge({}, cascader,list[i]))
    }else if(list[i].type == 'transfer'){
      newlist.push(_.merge({}, transfer,list[i]))
    }else if(list[i].type == 'select'){
      newlist.push(_.merge({}, select,list[i]))
    }else if(list[i].type == 'select-multiple'){
      newlist.push(_.merge({}, select_multiple,list[i]))
    }else if(list[i].type == 'time'){
      newlist.push(_.merge({}, time,list[i]))
    }else if(list[i].type == 'time-interval'){
      newlist.push(_.merge({}, time_interval,list[i]))
    }else if(list[i].type == 'upload'){
      newlist.push(_.merge({}, upload,list[i]))
    }else if(list[i].type == 'textarea'){
      newlist.push(_.merge({}, textarea,list[i]))
    }else if(list[i].type == 'hidden'){
      newlist.push(_.merge({}, hidden,list[i]))
    }else if(list[i].type == 'jurisdiction'){
      newlist.push(_.merge({}, jurisdiction,list[i]))
    }else if(list[i].type == 'ue'){
      newlist.push(_.merge({}, ue,list[i]))
    }
    else{
      console.log("initControl时控件没有定义") // 不要删除
      newlist.push(_.merge({}, input,{}))
    }
  }

  return newlist;
}


 function initForm(list,Form) {
   if(!isNotNull(list)){
     return Form
   }
  for(let i=0;i<list.length;i++){
    if(list[i].type == 'cascader'){
      Form[list[i].name]=[];
    }else if(list[i].type == 'transfer'){
      Form[list[i].name]=[];
    }else if(list[i].type == 'upload'){
      Form[list[i].name]=[];
    }else {
      Form[list[i].name]='';
    }
  }
  return Form;
}

 function initRules(list,Rules) {
  if(!isNotNull(list)){
    return Rules
  }
  for(let i=0;i<list.length;i++){
    if(isNotNull(list[i].rules)){
      if( Rules[list[i].name]&& Rules[list[i].name].length>0){
        Rules[list[i].name] = Rules[list[i].name].concat( list[i].rules)
      }else{
        Rules[list[i].name] = list[i].rules
      }
    }
  }
  return Rules;
}
