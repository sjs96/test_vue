import base from './base';
import _ from 'lodash'

const myModule = {
  type:'select',                          // 类型
  data:{},                                // 数据
  options:[],                                // 选项
  props:{
    value:'value',                  //选项的值对应返回数据的字段
    label:'label',                  //选项的显示值对应返回数据的字段
    disabled:false,
  },
}
export default _.merge({}, base,myModule)
