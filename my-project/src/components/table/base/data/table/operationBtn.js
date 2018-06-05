


const myModule = {
  tooltip:{
    disabled:function (row,content){
      return true;
    },
    content:'',
    contentFunction:function (row,content){
      return content;
    }
  },
  show:function (row){
    return true
  },
  class:'btn btn-info',
  text:'test111222',
  name:'test111222',
  disabled:false,
  type:"primary",
  size:"small",
  jurisdiction:'edit',
  disabled:function (row){
      return false;
  },
  cilck:(val,row,vm,name)=>{
    for( let i = 0;i< vm.dialog.list.length;i++){
      if(vm.dialog.list[i].name == name){
        vm.dialog.list[i].data.id=val
        vm.dialog.list[i].data.rows=[row]
        vm.dialog.list[i].data.primaryKey=vm.content.primaryKey
        vm.dialog.list[i].data.show = true
      }
    }
  }
}
export default myModule
