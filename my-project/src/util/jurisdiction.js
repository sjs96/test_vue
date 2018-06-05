import store from '../store/store'
import {getModuleName} from './util'
import {isNotNull} from './isNotNull';
// 设置权限
export function  setJurisdiction(){
  setJurisdictionList(store.state.menu.menuList)
}
//
function setJurisdictionList(menuList){
//如果list为空返回
  if(!isNotNull(menuList)) {
    return
  }
  //遍历list
  for(let i =0;i<menuList.length;i++){
    if(isNotNull(menuList[i].menu_linkurl)){
      store.commit('editJurisdiction',{name: getModuleName(menuList[i].menu_linkurl),buttonlist: menuList[i].buttonlist})
    }
    if(isNotNull(menuList[i].children)){
      setJurisdictionList(menuList[i].children)
    }
  }
  return
}
