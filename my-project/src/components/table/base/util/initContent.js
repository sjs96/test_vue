import {initHeader} from '../../../header/base/util/initHeader'
import {isNotNull} from '../../../../util/isNotNull'
import input from '../../../table/base/data/table/input';
import img from '../../../table/base/data/table/img';
import download from '../../../table/base/data/table/download';
import operationBtn from '../../../table/base/data/table/operationBtn';
// 设置控件
export function initContent(newObj) {
  newObj.header = initHeader(newObj.header,'initContent')
  newObj.listDescription = initTable(newObj.listDescription)
  newObj.listDescriptionShow = initListDescriptionShow(initTable(newObj.listDescription))
  newObj.table.operation.btn = initOperationBtn(newObj.table.operation.btn)
  return newObj;
}


function initListDescriptionShow(list) {
  let listDescriptionShow = []
  if(!isNotNull(list)){
    return listDescriptionShow
  }
  for(let i=0;i<list.length;i++){
    if(list[i].tableInitShow){
      listDescriptionShow.push(list[i].value)
    }
  }
  return listDescriptionShow;
}

function initTable(list) {
  let newlist = []
  if(!isNotNull(list)){
    return list
  }
  for(let i=0;i<list.length;i++){
    if(list[i].type == 'input'){
      newlist.push(_.merge({}, input,list[i]))
    }else if(list[i].type == 'download'){
      newlist.push(_.merge({}, download,list[i]))
    }else{
      newlist.push(_.merge({}, img,list[i]))
    }
  }
  return newlist;
}
export  function initOperationBtn(obj) {
  console.log('initOperationBtn----------')
  console.log(obj)
  let newObj =[]
  for(let i=0;i<obj.length;i++){
    newObj.push(_.merge({}, operationBtn,obj[i]))
  }
  newObj.push(_.merge({}, operationBtn,{text:'编辑',name:'edit',jurisdiction:'edit'}))
  newObj.push(_.merge({}, operationBtn,{text:'删除',name:'delete',type:'danger',jurisdiction:'delete'}))
  console.log(newObj)
  return newObj;
}



