import {getModuleName} from '../util/util';
const mutations={

  edit2222(state,data){
      let list = data.list
      for(var i = 0;i<list.length;i++){
        state.modules[data.name].content[list[i].name]=list[i].value
      }
  },
  editUser(state,data){
    let list = data.list
    for(var i = 0;i<list.length;i++){
      state.user[list[i].name]=list[i].value
    }
  },
  editChat(state,msg){
    state.user.chatRecord.push(msg)
  },
  editQuery2222(state,data){
      let list = data.list
      for(var i = 0;i<list.length;i++){
        state.modules[data.name].query[list[i].name]=list[i].value
      }
  },

  editJurisdiction(state,data){
    let buttonlist = data.buttonlist
    for(var key in buttonlist){
      if(buttonlist[key]==1){
        state.modules[data.name].content.btns[key].jurisdiction=true
      }else {
        state.modules[data.name].content.btns[key].jurisdiction=false
      }
    }
  },
  tableSeeting(state,data){

    let list = data.list
    for(var i = 0;i<list.length;i++){
      state.tableSeeting[list[i].name]=list[i].value
    }
  },
  editMenu(state,data){

      let list = data.list
      for(var i = 0;i<list.length;i++){
        state.menu[list[i].name]=list[i].value
      }
  },
  editJurisdiction(state,data){

    let list = data.list
    for(var i = 0;i<list.length;i++){
      state.jurisdiction[list[i].name]=list[i].value
    }
  },
  editValue(state,data){
    let list = data.list
    for(var i = 0;i<list.length;i++){
      state.modules[data.name][data.listNname].list[data.index][list[i].name] = list[i].value
    }
  },
  queryNo(state,vm){                        //设置重新查询
    state.modules[getModuleName(vm.$route.path)].content.showSummary.ajax.query=true;
    state.modules[getModuleName(vm.$route.path)].content.queryNo=state.modules[getModuleName(vm.$route.path)].content.queryNo+1
  },

}

export default mutations
