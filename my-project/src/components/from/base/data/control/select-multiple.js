import base from './base';
import _ from 'lodash'

const myModule = {
  type:'select-multiple',                                       //类型
  data:[],                                                        //选中值
  options:[]                                                         //选项
}
export default _.merge({}, base,myModule)
