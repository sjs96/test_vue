
// table 列设置
const listDescription = [
  {value: 'p_name', label: '名称222', type:'input'},
  {value: 'p_download', label: '可下载文件',type:'download'},
]

// 查询字段
const queryList = [
  {
    name:'base',
    btn_query:true,
    list:[
      {name:'p_name',label:'名称',type:'input'},
    ]
  },

]

const editList = [
  {
    name:'base',
    label:'基本',
    list:[
      { name: 'p_name', label: '名称', type:'input',rules:[{ required: true, message: '请输入名称', trigger: 'blur' }]},
      { name: 'p_download', label: '可下载文件', type:'upload'},
      { name: 'p_id',type:'hidden'},
    ]
  },
  {
    name:'content',
    label:'内容',
    list:[
      { name: 'p_content', label: '内容', type:'ue'},
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
    query:'/problem/query',
    delete:{url :'/problem/delete'},
    edit:'/problem/save',
    queryById:'/problem/queryById',
  },
  content:{                                           // 内容table
                        // 描述
    primaryKey:'p_id',                       //多选按钮的key,,
    listDescription: listDescription,             //列设置
  },
  query:{                                             // 查询table
    list:queryList,                              //查询的条件
  },
  dialog:dialog
}
export default myModule
