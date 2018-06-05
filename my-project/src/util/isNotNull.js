
//获取参数用于setion-edit.vue 保存时获取
export function isNotNull(obj) {
  let state = true
  if(typeof obj == "string"){
    if(!(obj&&obj.length>0&&'undefined'!=obj)){
      state = false
    }
  }else if(typeof obj == "number"){
    if(obj==0){
      state = false
    }
  }else if(typeof obj == "object"){
    if(obj instanceof Date){

    }else{
      if(!(obj&&Object.keys(obj).length>0&&obj!=null&&obj!='null'&&JSON.stringify(obj) != "{}")){
        state = false
      }
    }

/*    if(!obj){
      state = false
    }
    if(JSON.stringify(obj) == "{}"){
      state = false
    }*/
  }else if(typeof obj == "function"){

  }else if(typeof obj == "undefined"){
    state = false
  }else if(typeof obj == "boolean"){
    state = obj
  }
  return state
}
