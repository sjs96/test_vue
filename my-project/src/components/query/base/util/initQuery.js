import {initFrom} from '../../../from/base/util/initFrom';
import {initActiveName} from '../../../module/base/util/initModule';
import {initHeader} from '../../../header/base/util/initHeader'

// 设置控件
export function initQuery(newObj) {
  newObj.list = initFrom(newObj.list)
  newObj.activeName = initActiveName(newObj.list)
  newObj.header = initHeader(newObj.header,'initQuery')
  return newObj;
}
