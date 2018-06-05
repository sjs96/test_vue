
// table 列设置
const listDescription = [
  {value: 'r_name', label: '角色名称',type:'input'},
]

// 查询字段
const queryList = [
  {
    name:'base',
    btn_query:true,
    list:[
      {name:'r_name',label:'角色名称',type:'input'},
    ]
  },

]

const editList = [
  {
    name:'base',
    label:'基本',
    list:[
      { name: 'r_name', label: '角色名称', type:'input',rules:[{ required: true, message: '请输入角色名称', trigger: 'blur' }]},
      { name: 'r_id',type:'hidden'},
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
    query:'/role/query',
    delete:{url :'/role/delete'},
    edit:'/role/save',
    queryById:'/role/queryById',
  },
  content:{                                           // 内容table
    primaryKey:'r_id',                       //多选按钮的key,,
    listDescription: listDescription,             //列设置
  },
  query:{                                             // 查询table
    list:queryList,                              //查询的条件
  },
  dialog:dialog
}
export default myModule
