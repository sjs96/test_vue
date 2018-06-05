
import _ from 'lodash'
import module from '../data/module';

import {initQuery} from '../../../query/base/util/initQuery'
import {initEdit} from '../../../edit/base/util/initEdit'
import {initContent} from '../../../table/base/util/initContent'
import {my_post} from '../../../../util/util'
import {getParams} from '../../../../util/getParams';
import {isNotNull} from '../../../../util/isNotNull';
import {myMessage} from '../../../../util/message';
import store from '../../../../store/store'
import {my_download} from '../../../../util/util';
// 设置控件
export function initModule(obj) {
  let newObj = _.merge({}, module,obj)
  newObj.content = initContent(newObj.content)
  newObj.edit = initEdit(newObj.edit)
  newObj.query = initQuery(newObj.query)



  initDialog(newObj)
  for(let i=0;i<newObj.dialog.list.length;i++){
    if(newObj.dialog.list[i].type=='from'){
      newObj.dialog.list[i].data.list=newObj.dialog.from[newObj.dialog.list[i].data.from]
      newObj.dialog.list[i].data=initEdit(newObj.dialog.list[i].data)
      let hide_id = randomChar(4)
      newObj.dialog.list[i].data.hide_id=hide_id
    }
  }
  return newObj;
}
function initDialog(obj){
  let add_edit=true;
  let add_delete=true;
  let add_download=true;
  if(obj.dialog.list){
    for(let i=0;i<obj.dialog.list.length;i++){
      if(obj.dialog.list[i].name=='edit'){
        add_edit=false;
      }
      if(obj.dialog.list[i].name=='delete'){
        add_delete=false;
      }
      if(obj.dialog.list[i].name=='download'){
        add_download=false;
      }
    }
  }else{
    obj.dialog.list=[]
  }

  if(add_edit){
    obj.dialog.list.push(getEdit())
  }
  if(add_delete){
    obj.dialog.list.push(getDelete())
  }
  if(add_download){
    obj.dialog.list.push(getDownload())
  }
  return obj
}

export function initModules(map) {
  for (var key in map) {
    map[key] = initModule(map[key])
  }
  return map  ;
}
export function initActiveName(list) {
  let activeName = ''
  if(!(list&&list.length>0)){
    return activeName;
  }
  activeName= list[0].name
  for(let i = 0 ;i<list.length;i++){
    if(list[i].default){
      activeName= list[i].name
    }
  }
  return activeName;
}
function  randomChar(l) {
  var x = "0123456789qwertyuioplkjhgfdsazxcvbnm";
  var tmp = "";
  var timestamp = new Date().getTime();
  for (var i = 0; i < l; i++) {
    tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
  }
  return timestamp + tmp;
}
function getEdit(){
  return  {
    type:"from",
    name:'edit',
    data:{
      from:'editList',
      nextAndLast:false,
      title:"编辑",
      show:false,
      save:function(that){
        var params = getParams(that.edit.list)
        my_post(that.api.edit, params,(state,msg,json)=>{
          myMessage({message:'更新成功'})
          store.commit('queryNo',that)
          that.edit.show = false
        },(state,msg,json)=>{},that)
      },
    }
  }
}
function getDelete(){
  return {
    type:"select",
    name:'delete',
    data:{
      title:'提示',
      width:'30%',
      show:false,
      msg:'是否删除？',
      btn:[
        {
          text:"取消",
          click:function(that){
            that.data.show = false
          }
        },{
          text:"确认",
          type:"primary",
          click:function(that){
            let deleteItem='';
            for(let i=0;i< that.data.rows.length;i++){
              if(isNotNull(deleteItem)){
                deleteItem+=','
              }
              deleteItem+=that.data.rows[i][that.data.primaryKey];
            }

            var params = new URLSearchParams()
            params.append(that.api.delete.name,deleteItem)
            my_post(that.api.delete.url, params,(state,msg,json)=>{
              myMessage({message:'删除成功'})
              store.commit('queryNo',that)
              that.data.show = false
            },(state,msg,json)=>{
              myMessage({message:'删除失败！'})
              that.data.show = false
            })
          }
        },
      ],
    }
  }
}
function getDownload(){
  return {
    type:"select",
    name:'download',
    data:{
      title:'是否下载？',
      width:'30%',
      show:false,
      msg:'是否下载？',
      btn:[
        {
          text:"取消",
          click:function(that){
            that.data.show = false
          }
        },{
          text:"确认",
          type:"primary",
          click:function(that){
            let  val = that.data.map[that.data.key]
            if(isNotNull(val)){
              let list = JSON.parse(val)
              if(list instanceof Array){
                for(let i=0;i<list.length;i++){
                  my_download(list[i].name,list[i].url)
                }
              }
            }
            that.data.show = false
          }
        },
      ],
    }
  }
}
