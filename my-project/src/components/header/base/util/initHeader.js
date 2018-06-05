import {initMybtnContent,initMybtnQuery} from '../../../header/base/util/initMybtn'

// 设置控件
export function initHeader(newObj,type) {
  if(type == 'initContent'){
    newObj.mybtn = initMybtnContent(newObj.mybtn)
  }else{
    newObj.mybtn = initMybtnQuery(newObj.mybtn)
  }
  return newObj;
}
