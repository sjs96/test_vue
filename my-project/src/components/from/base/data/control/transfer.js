import base from './base';
import _ from 'lodash'

const myModule = {
  type:'transfer',                                                        //类型
  data:[],                                                                  //数据
  titles:['未选中','选中'],                                                // 描述
  ajax:{                                    //ajax 动态设置值
    url:'',                                                  //全部的值
    url2:'',                                           // 选中的值
    params2:'',                                                        // 选中值的key
    params:[],     //参数
    data_name:{key:'key',label:'label'},                              //显示和保存的键值
  }
}
export default _.merge({}, base,myModule)

