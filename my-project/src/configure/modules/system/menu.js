
const listDescription = [
  {value: 'menu_name', label: '名称',type:'input'},
  {value: 'menu_parent_name', label: '上级',type:'input'},
  {value: 'menu_level', label: '等级',type:'input',custom:function(val){if(val==1){return '主页面'}else if(val==2){ return '子页面' }else{return''}}},
  {value: 'menu_linkurl', label: '路径',type:'input'},
  {value: 'menu_imgurl', label: '图标',type:'input'},
  {value: 'menu_valid', label: '是否有效',type:'input',custom:function(val){if(val==1){return '有效'}else if(val==-1){ return '无效' }else{return''}}},
]

// 查询字段
const queryList = [
  {
    btn_query:true,
    list:[
      {name: 'menu_parent_id', label: '上级',type:'select', ajax:{url:'/menu/queryByFirst'},props:{value:'menu_id',label:'menu_name',},disabled:{edit:true}},
      {name: 'menu_name', label: '名称',type:'input'},
      {name: 'menu_valid', label: '是否有效',type:'select',options:[{value:1,label:'有效'},{value:-1,label:'无效'}]},
    ]
  },
]


const editList = [
  {
    name:'base',
    btn_query:false,
    label:'基础',
    list:[
      {name: 'menu_level', label: '等级',type:'select',options:[{value:1,label:'主页面'},{value:2,label:'子页面'}],disabled:{edit:true},rules:[{ required: true, message: '请选择等级', trigger: 'blur' }]},
      {name: 'menu_parent_id', label: '上级',type:'select',rules:[{ required: true, message: '请选择上级', trigger: 'blur' }],showFunction:function(model){ if(model.ruleForm.menu_level==1){  return false}else{return true}},ajax:{url:'/menu/queryByFirst'},props:{value:'menu_id',label:'menu_name',},disabled:{edit:true},params:[{type:'control',control:'menu_level',name: 'menu_level',close:''}], },
      {name: 'menu_name', label: '名称',type:'input',rules:[{ required: true, message: '请输入名称', trigger: 'blur' }]},
      {name: 'menu_linkurl', label: '路径',type:'input',rules:[{ required: true, message: '请输入路径', trigger: 'blur' }],showFunction:function(model){ if(model.ruleForm.menu_level==1){  return false}else{return true}},},
      {name: 'menu_imgurl', label: '图标',type:'input',rules:[{ required: true, message: '请输入图标', trigger: 'blur' }],showFunction:function(model){ if(model.ruleForm.menu_level==2){  return false}else{return true}}},
      {name: 'menu_valid', label: '是否有效',type:'select',rules:[{ required: true, message: '请选择是否有效', trigger: 'blur' }],options:[{value:1,label:'有效'},{value:-1,label:'无效'}]},
      {name: 'menu_order', label: '排序',type:'input'},
      {name: 'menu_id', label: 'id',type:'hidden'},
    ]
  },
  {
    name:'jurisdiction',
    btn_query:false,
    btn_add:true,
    label:'权限',
    list:[
      {name: 'a_name', label: '描述',type:'input'},
      {name: 'a_attribute', label: '属性',type:'input'}
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
    query:'/menu/query',
    delete:{url :'/menu/delete'},
    edit:'/menu/save',
    queryById:'/menu/queryById',
  },
  content:{                                           // 内容table
    primaryKey:'menu_id',                       //多选按钮的key,,
    listDescription: listDescription,             //列设置
  },
  query:{                                             // 查询table
    list:queryList,                              //查询的条件
  },
  dialog:dialog
}
export default myModule
