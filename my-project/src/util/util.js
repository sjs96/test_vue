import {getloginUser} from './user'
import {signOutUser} from './user'
import store from '../store/store'
import {myMessage} from './message';
import {isNotNull} from './isNotNull';
import axios from 'axios'
// 获取模块名，用于content.vue
export function getModuleName(name) {
  if (isNotNull(name))
    return name.substring(1);
  else
    return '555555515151515151548';
}
export function handleClose(done,vm) {
  vm.$confirm('确认关闭？')
    .then(_ => {
      done();
    })
    .catch(_ => {});
}
export function validate(vm,list,callback) {
  let state= true
  let activeName = '';
  if (typeof(list.length) == 'undefined'){
    activeName = my_validate(list)
    if(activeName&&activeName.length>0){
      state = false
    }
  }else{
    for(let i =0;i<list.length;i++){
      if(!state){
        break
      }
      activeName = my_validate(list[i])
      if(activeName&&activeName.length>0){
        state = false
      }
    }
  }
  if(state){
    callback()
    return  false
  }else{
    if(vm.edit){
      vm.edit.activeName=activeName
    }else{
      vm.query.activeName=activeName
    }
  }
}


function my_validate(list){
  let activeName ='';
  let fields = list.$children[0].fields;
  for(let i=0;i<fields.length;i++) {
    if (fields[i].$attrs.aaa) {
      list.$refs.ruleForm.validateField(fields[i].prop, (valid) => {
        if (valid && valid.length > 0) {
          activeName = list.model.name
        }
      });
    }
  }
  return activeName;
}
export function getCheckedList(list,primaryKey) {
  let checkedList = {};
  if(!isNotNull(list)){
    return checkedList;
  }
  for(let i = 0;i<list.length;i++){
    checkedList[i]=false;
  }
  return checkedList;
}
export function getCheckedList22(list,primaryKey) {
  let checkedList = {};
  if(!isNotNull(list)){
    return checkedList;
  }
  list.forEach(function (item) {
    checkedList[item[primaryKey]]=false;
  })
  return checkedList;
}


// 特殊参数
export function setSpecialParams(config) {
  var params = new URLSearchParams()
  var searchParams = new URLSearchParams(config.data);
  const token = getloginUser().token; //获取Cookie
  const loginuserid = getloginUser().loginuserid; //获取Cookie
  if('/api/depart/editpost' == config.url){
    let str=''
    let top_dp_id = searchParams.get('dp_topid');
    let po_ids =searchParams.get('po_ids');
    for(let i=0;i<po_ids.length;i++){
      if(isNotNull(str)){
        str += '◆'
      }
      str += top_dp_id+'◇'+po_ids[i]
    }
    params.append('strpostid',str)
  }
  params.append('token',token)
  params.append('loginuserid',loginuserid)
  return params+'&'+config.data
}
// 跳转页面
export function  goTo(menu,mv){
  let to = menu.menu_linkurl
  if(isNotNull(to)) {
    if(to === 'signOut'){
      signOutUser()
      mv.$router.push({path:'/'})
      store.state.user.socket.disconnect();

    }else{
      mv.$router.push({path:to})
    }
  }else{
    if(menu.menu_ifturn==1){
      menu.menu_ifturn=0;
    }else{
      menu.menu_ifturn=1;
    }
  }
}
//ajax请求
export function my_post(api,params,ok,err,vm){
  if(api.substring(0,5).indexOf("/api/") != -1 ){
    api = api.substring(4)
  }
  axios.post(process.env.API_ROOT+api, params).then((res) => {
    ajaxState(res,ok,err,vm)
  }).catch( (err) => {
    if(vm&&vm.edit){
      vm.edit.sendState = true
    }
   // myMessage({message:'访问路径错误'})
  })
}
export function my_post_file(api,params,ok,err){
  if(api.substring(0,5).indexOf("/api/") != -1 ){
    api = api.substring(4)
  }
  axios.post(process.env.API_ROOT+api, params).then((res) => {
    my_download(res.data.json.fileName,res.data.json.url)
    //  ajaxState(res,ok,err)
  }).catch( (err) => {
    // myMessage({message:'访问路径错误'})
  })
}
export function  my_download(fileName,url){
  if ('download' in document.createElement('a')) { // 非IE下载
    const elink = document.createElement('a')
    elink.download = fileName
    elink.style.display = 'none'
    elink.href =  process.env.API_ROOT+url
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href) // 释放URL 对象
    document.body.removeChild(elink)
  }
}
//验证ajax 是否成功
export function ajaxState(res,ok,err,vm){
  if(res.data.state == 100){
    ok(res.data.state,res.data.msg,res.data.json)
  }else{
    if(vm&&vm.edit){
      vm.edit.sendState = true
    }
    myMessage({message:res.data.msg})
    err(res.data.state,res.data.msg,res.data.json)
  }
}
//验证ajax 是否成功
export function errMessage(err){
  if (err && err.response) {
    switch (err.response.status) {
      case 400: {myMessage({message:'请求错误'})} break
      case 401: {myMessage({message:'未授权，请登录'})} break
      case 403: {myMessage({message:'拒绝访问'})} break
      case 404: {myMessage({message:'请求地址出错'})} break
      case 408: {myMessage({message:'请求超时'})} break
      case 500: {myMessage({message:'服务器内部错误'})} break
      case 501: {myMessage({message:'服务未实现'})} break
      case 502: {myMessage({message:'网关错误'})} break
      case 503: {myMessage({message:'服务不可用'})} break
      case 504: {myMessage({message:'网关超时'})} break
      case 505: {myMessage({message:'HTTP版本不受支持'})} break
      default:
    }
  }
}
export function getImg(img) {
  let newList = []
  if (isNotNull(img)) {
    let list = JSON.parse(img)
    if (list instanceof Array) {
      for (let i = 0; i < list.length; i++) {
        newList.push({url: process.env.API_ROOT + list[i].url,name:list[i].name})
      }
    }
  }
  return newList;
}
