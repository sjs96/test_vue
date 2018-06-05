import my_showFunction from '../../util/util'
import store from '../../../store/store'
// table 列设置
const listDescription = [
  {value: 'ui_landlord_name', label: '房东', type:'input'},
  {value: 'p_name', label: '电价名称',type:'input'},
  {value: 'p_price', label: '单价',type:'input',order: {show:true,asc:'p_price',desc:'p_price desc'}},
  {value: 'create_time', label: '创建时间', type:'input',order: {show:true,asc:'create_time',desc:'create_time desc'}},
  {value: 'update_time', label: '最近修改时间', type:'input',order: {show:true,asc:'update_time',desc:'update_time desc'}},
  {value: 'p_remarks', label: '备注', type:'input'},
]

// 查询字段
const queryList = [
  {
    name:'base',
    btn_query:true,
    list:[
      {name: 'ui_landlord_id', label: '房东', type:'select',ajax:{url:'/user/queryLandlord'},showFunction:function(model){return my_showFunction(model,'ui_landlord_id')},props:{value:'ui_id',label:'ui_name',}},
      {name: 'ui_manage_id', label: '房东管理员', type:'select',showFunction:function(model){return my_showFunction(model,'ui_manage_id')},ajax:{url:'/user/queryManageByLandlord',params:[{type:'control',control:'ui_landlord_id',name: 'ui_landlord_id',close:''}]},props:{value:'ui_id',label:'ui_name',}},
      {name:'p_name',label:'电价名称',type:'input'},

    ]
  },
]

const editList = [
  {
    name:'base',
    label:'基本',
    list:[
      { name: 'ui_landlord_id', label: '房东', type:'select',showFunction:function(model){return my_showFunction(model,'ui_landlord_id')},ajax:{url:'/user/queryLandlord'},props:{value:'ui_id',label:'ui_name',},rules:[{ required: true, message: '请选择房东', trigger: 'blur' }]},
      { name: 'p_price', label: '单价', type:'input',rules:[{ required: true, message: '请输入单价', trigger: 'blur' }]},
      { name: 'p_name', label: '电价名称', type:'input',rules:[{ required: true, message: '请输入电价名称', trigger: 'blur' }]},
      { name: 'p_remarks', label: '备注', type:'input'},
      { name: 'p_id',type:'hidden'},
    ]
  },
]
const dialog ={
  from:{
    editList:editList,
  },
}
const myModule = {
  api:{
    query:'/price/query',
    delete:{url :'/price/delete'},
    edit:'/price/save',
    queryById:'/price/queryById',
  },
  content:{                                           // 内容table
    primaryKey:'p_id',                       //多选按钮的key,,
    listDescription: listDescription,             //列设置

  },
  query:{                                             // 查询table
    list:queryList,                              //查询的条件
  },
  dialog:dialog
}
export default myModule
