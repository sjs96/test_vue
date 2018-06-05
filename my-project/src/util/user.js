import {getCookie} from './cookie'
import {setCookie} from './cookie'
import {delCookie} from './cookie'
import store from '../store/store'
import {isNotNull} from './isNotNull';

//退出登陆
export function signOutUser(data,isCookie) {
  sessionStorage.removeItem("myLoginData");
  delCookie('myLoginData')
}
//保存登陆信息
export function loginUser(data,isCookie) {
  //设置是否自动登陆
  data['auto_login']=isCookie;
  //设置聊天框默认不打开
  data['open']=false;
  //设置聊天框默认不打开
  data['socket']="";

  let mydata = JSON.stringify(data)
  //保存登陆信息
  sessionStorage.setItem('myLoginData',mydata)

  //如果自动登陆保存到cookie，否则删除cookie
  if(isCookie){
    let expireDays = 1000 * 60 * 60 *30;
    setCookie('myLoginData',mydata,expireDays);
  }else{
    delCookie('myLoginData')
  }

  //保存到vue，有sockit，窗口的需要绑定的数据

  for(var key in data){
    store.commit('editUser',{list: [{name: key,value:data[key] }]})
  }
}
//获取登陆信息
export function getloginUser() {

    //从当前seeion取
  let myLoginData = sessionStorage.getItem("myLoginData");
  if(!isNotNull(myLoginData)){
    myLoginData = getCookie('myLoginData')
    //从cookie取
  }
  //josn转对象
  if (isNotNull(myLoginData)) {
    myLoginData = JSON.parse(myLoginData)
    if(store.state.user.loginuserid==""){
      for(var key in myLoginData){
        store.commit('editUser',{list: [{name: key,value:myLoginData[key] }]})
      }
    }
    return myLoginData
  }
  return {}
}
