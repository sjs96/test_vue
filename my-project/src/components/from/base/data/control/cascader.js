import base from './base';
import _ from 'lodash'

const myModule = {
  type:'cascader',
  options:[],                       //选项
  props:{
    value:'value',                  //选项的值对应返回数据的字段
    label:'label',                  //选项的显示值对应返回数据的字段
    children:'children',            //选项的子集值对应返回数据的字段
    disabled:'disabled',             //选项的是否可选值对应返回数据的字段
  },
  style:{width: '190px' }
}
export default _.merge({}, base,myModule)
