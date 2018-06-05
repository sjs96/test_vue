import base from './base';
import _ from 'lodash'

const myModule = {
  type:'hidden',
  focus:{                             //是否有焦点
    select:false,                       //焦点状态（同一组控件有一个状态默认第一个为true的为焦点）
    effective:false,                     //
    skip:false,                           //
  },
}
export default _.merge({}, base,myModule)
