import store from '../../store/store'
export default function   my_showFunction(model,type){
  let role_xtgly = store.state.user.base.role_xtgly;
  let role_ejxtgly = store.state.user.base.role_ejxtgly;
  let role_fd = store.state.user.base.role_fd;
  let role_fdgly = store.state.user.base.role_fdgly;
  let role_fk = store.state.user.base.role_fk;
  let role_error = store.state.user.base.role_error;

  if(type == 'ui_landlord_id'){
    if(store.state.user.r_id==role_fd){
      model.ruleForm.ui_landlord_id=store.state.user.loginuserid
      return false
    }else if(store.state.user.r_id==role_fk){
      model.ruleForm.ui_landlord_id=store.state.user.ui_landlord_id
      return false
    }else if(store.state.user.r_id==role_fdgly){
      model.ruleForm.ui_landlord_id=store.state.user.ui_landlord_id
      return false
    }else {
      return true
    }
  }else if(type == 'ui_manage_id'){
    if(store.state.user.r_id==role_fd){
      return false
    }else if(store.state.user.r_id==role_fk){
      return false
    }else if(store.state.user.r_id==role_fdgly){
      model.ruleForm.ui_manage_id=store.state.user.loginuserid
      return false
    }else{
      return true
    }
  }else if(type == 'ui_tenant_id'){
    if(store.state.user.r_id==role_fd){
      return true
    }else if(store.state.user.r_id==role_fk){
      model.ruleForm.ui_tenant_id=store.state.user.loginuserid
      return false
    }else if(store.state.user.r_id==role_fdgly){
      return true
    }else{
      return true
    }
  }else if(type == 'p_id'){
    if(store.state.user.r_id==role_fd){
      return true
    }else if(store.state.user.r_id==role_fk){
      return false
    }else if(store.state.user.r_id==role_fdgly){
      return false
    }else{
      return true
    }
  }else if(type == 'ui_id'){
    if(store.state.user.r_id==role_fd){
      return true
    }else if(store.state.user.r_id==role_fk){
      return false
    }else if(store.state.user.r_id==role_fdgly){
      return false
    }else{
      return true
    }
  }else{
    return true;
  }
}
