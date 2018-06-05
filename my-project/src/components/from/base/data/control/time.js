import base from './base';
import _ from 'lodash'

const myModule = {
  type:'time',                                         // 类型
  format:'yyyy-MM-dd',                                // 显示格式
  valueFormat:'yyyy-MM-dd',                             //值格式
  data:{}                                               // 数据
}
export default _.merge({}, base,myModule)
