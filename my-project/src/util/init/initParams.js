import {isNotNull} from '../../util/isNotNull';
import {getList} from '../../components/from/section-from';
// 设置参数用于setion-edit.vue 初始化设置
export function initParams(that,list,data,actype) {
  setNewList(list,data)
  let mylist=list.list
  for(let i = 0;i<mylist.length;i++){
    let controlList = mylist[i].list
    let ruleForm = mylist[i].ruleForm
    setControlList(mylist,i,data)
  }

  if (typeof(that.$refs[that.edit.hide_id].length) == 'undefined'){
    that.$refs[that.edit.hide_id].init()
  }else{
    for(let i=0;i<that.$refs[that.edit.hide_id].length;i++){
      that.$refs[that.edit.hide_id][i].init()
    }
  }
}
function setControlList(mylist,i,data){
  let controlList = mylist[i].list
  let ruleForm = mylist[i].ruleForm
  for(let l = 0;l<controlList.length;l++){
    ruleForm[controlList[l].name] = getVal(controlList[l],mylist[i],data,controlList[l].name)
  }
}
function  getVal(control,ruleForm,data,key){
  let val='';
  if(control.type=='cascader'){
    //alert(control.name+""+getCascaderPathAll(control.options,data[key]))
    val = getCascaderPathAll(control.options,data[key])
  /* vm.$watch('model.edit.list',function(newVal, oldVal){
      ruleForm[key] = getCascaderPathAll(control.options,data[key])
    },{
      deep: true
    })*/
  }else if(control.type=='upload'){
    if(isNotNull(data[key])){
        let list = JSON.parse(data[key])
      if(list instanceof Array){
        for(let i=0;i<list.length;i++){
          list[i].url = process.env.API_ROOT+list[i].url
        }
        val = list
      }else{
        val = [];
      }
    }else{
      val = [];
    }

  }else{
    val = data[key]
  }

  return val
}
// 获取联级下拉路径
export function getCascaderPath(list,value){
//如果list为空返回
  let returnList = []
  if(!isNotNull(list)) {
    return returnList
  }
  //遍历list
  for(let i=0;i<list.length;i++){
    // 如果值相等结束遍历
    if(list[i].value==value){
      returnList.unshift(list[i].value)
      return returnList;
    }else{
      //遍历子集
      if(!isNotNull(list[i].children)) {
        list[i].children=[]
      }
      let str = getCascaderPath(list[i].children,value)
      if(isNotNull(str)){
        str.unshift(list[i].value)
        return str
      }
    }
  }
  return returnList
}
// 获取联级下拉完整路径
export function getCascaderPathAll(list,value) {
  return getCascaderPath(list,value)
}
// 创建复制的控件
function setNewList(model,data){
  let list=model.list
 for(let i=0;i<list.length;i++){
    if(list[i].btn_add){
      let dataList = data[list[i].name]
     if(dataList instanceof Array){
        for(let l=0;l<dataList.length;l++){
          if(l==0){
            for(let key in list[i].ruleForm){
              for(let key2 in dataList[l]){
                if(key2==key){
                  list[i].ruleForm[key]=dataList[l][key2]
                  data[key]=dataList[l][key2];
                }
              }
            }
          }else{
            let obj = getList(list[i])
            for(let key in obj.ruleForm){
              for(let key2 in dataList[l]){
                let str = key.split("__copy__");
                if(key2==str[0]&&key2!=key){
                  obj.ruleForm[key]=dataList[l][key2]
                  data[key]=dataList[l][key2];
                }
              }
            }
            console.log('创建组件')
            console.log(obj)
            list.push(obj)
          }
        }
      }
    }
  }

}
/*
function setValueTransfer(vm,control){
  axios.post(url2, params).then((res) => {
    if(res.data.status == 100){
      let list = res.data.data.rows;
      let data=[]
      for(let i = 0; i<list.length;i++){
        data.push(list[i][control.ajax.params2])
      }
      ruleForm[control.name] = data
    }
  }).catch( (err) => {

  })
}
*/
