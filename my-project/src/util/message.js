import { Message } from 'element-ui';
import {isNotNull} from './isNotNull'
export function myMessage(data) {
  if(!isNotNull(data.type)){
    data.type =  'success'
  }
  Message({message: data.message,type: data.type})
}
