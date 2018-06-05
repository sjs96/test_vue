import base from './base';
import _ from 'lodash'

import {isNotNull} from '../../../../../util/isNotNull';
const myModule = {
  type:'img',
  images: [],
  modalclose: true,
  keyinput: true,
  mousescroll: true,
  showclosebutton: true,
  showcaption: true,
  imagecountseparator: 'of',
  showimagecount: true,
  showthumbnails: true,
  custom: function(val){ // 用于格式化或其他对值的操作，
    console.log('555555')
    console.log(val)
    let newList = []
    if(isNotNull(val)){
      let list = JSON.parse(val)
      if(list instanceof Array){
        for(let i=0;i<list.length;i++){
          newList.push({imageUrl:process.env.API_ROOT+list[i].url})
        }
      }
    }

    return newList;
  },
}

export default _.merge({}, base,myModule)
