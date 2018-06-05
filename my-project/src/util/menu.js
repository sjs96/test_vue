import store from '../store/store'
import {getloginUser} from './user'
import {my_post} from './util'
import {getModuleName} from './util'
import {setJurisdiction} from './jurisdiction'
import {isNotNull} from './isNotNull';

// 设置Menu
export function setMenu() {
console.log('setMenu--------------------')
console.log(this)
console.log(getloginUser())
  let loginuserid = getloginUser().loginuserid
  let menuList = store.state.menu.menuList
  let jurisdictionList = store.state.jurisdiction.jurisdictionList
  let tableSeeting = store.state.tableSeeting
  if((!isNotNull(menuList))&&isNotNull(loginuserid)){

    var params = new URLSearchParams()
    my_post('/menu/getMenuTree', params,(state,msg,json)=>{
      store.commit('editMenu',{list: [{name: 'menuList',value: json}]})
      // 设置权限
      setJurisdiction()
    },(state,msg,json)=>{ })
  }
  if((!isNotNull(jurisdictionList))&&isNotNull(loginuserid)){
    var params = new URLSearchParams()
    my_post('/jurisdiction/getJurisdiction', params,(state,msg,json)=>{
      set(json)
      store.commit('editJurisdiction',{list: [{name: 'jurisdictionList',value: json}]})
    },(state,msg,json)=>{ })
  }
  console.log('tableSeeting-------------')
  console.log(tableSeeting)
  if((!isNotNull(tableSeeting))&&isNotNull(loginuserid)){
    console.log('queryByUIID-------------')
    var params = new URLSearchParams()
    my_post('/tableSeeting/queryByUIID', params,(state,msg,json)=>{
      for (var key in json) {
        store.state.modules[key].content.listDescriptionShow=json[key]
        console.log(key+"::::"+json[key])
      }
    },(state,msg,json)=>{ })
  }
}
function set(jurisdiction){
  for(let i=0;i<jurisdiction.length;i++){
   if(store.state.modules[getModuleName(jurisdiction[i].menu_linkurl)].jurisdiction[jurisdiction[i].jd_name]){
      store.state.modules[getModuleName(jurisdiction[i].menu_linkurl)].jurisdiction[jurisdiction[i].jd_name].jurisdiction=true
    }else{
      store.state.modules[getModuleName(jurisdiction[i].menu_linkurl)].jurisdiction[jurisdiction[i].jd_name]={show:true,jurisdiction:true}
    }
  }
}
