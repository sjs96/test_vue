import base from './base';
import _ from 'lodash'
import {isNotNull} from '../../../../../util/isNotNull';
import {my_download} from '../../../../../util/util';
const myModule = {
  type:'download',
  cellClick:{
  effective:true,
    type:'select',
    data:{
    msg: "是否下载？",
      show: false,
      data:{}
  },
  click: (map,key,i,cellClick,vm) => { // 用于格式化或其他对值的操作，
/*    vm.data.show=true
    vm.data.data.i=i
    vm.data.data.map=map
    vm.data.data.key=key*/
    for( let i = 0;i< vm.dialog.list.length;i++){
      if(vm.dialog.list[i].name == 'download'){
        vm.dialog.list[i].data.show = true
        vm.dialog.list[i].data.map = map
        vm.dialog.list[i].data.key = key
      }
    }
  },
    clickOk: (vm,that) => { // 用于格式化或其他对值的操作，
    let  val = vm.data.data.map[vm.data.data.key]
    if(isNotNull(val)){
      let list = JSON.parse(val)
      if(list instanceof Array){
        for(let i=0;i<list.length;i++){
          my_download(list[i].name,list[i].url)
        }
      }
    }
  },
},

  custom: function(val){ // 用于格式化或其他对值的操作，
    let str =""
    if(isNotNull(val)){
      let list = JSON.parse(val)
      if(list instanceof Array){
        for(let i=0;i<list.length;i++){
          if(str&&str.length>0){
            str += ","
          }
          str += list[i].name
        }
      }
    }

    return str;
  },
}
export default _.merge({}, base,myModule)
