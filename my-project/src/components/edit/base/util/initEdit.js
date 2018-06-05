import {initFrom} from '../../../from/base/util/initFrom';
import {initActiveName} from '../../../module/base/util/initModule';
import module from '../data/edit';
import _ from 'lodash'
// 设置控件
export function initEdit(obj) {
  let newObj = _.merge({}, module,obj)
  newObj.list = initFrom(newObj.list)
  newObj.activeName = initActiveName(newObj.list)
  return newObj;
}

　
