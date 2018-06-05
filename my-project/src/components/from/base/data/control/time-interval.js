import base from './base';
import _ from 'lodash'

const myModule = {
  type:'time-interval',                               //类型
  format:'yyyy-MM-dd',                                //格式
  valueFormat:'yyyy-MM-dd',                             //值格式
  data:{}                                               //数据
}
export default _.merge({}, base,myModule)
