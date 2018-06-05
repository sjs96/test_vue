
// table 列设置
const listDescription = [
  {value: 'n_type', label: '类型', type:'input'},
  {value: 'n_content', label: '描述',type:'input'},
]

// 查询字段
const queryList = [
  {
    name:'base',
    btn_query:true,
    list:[
      {name:'n_type',label:'类型',type:'input'},
    ]
  },

]

const editList = [
  {
    name:'base',
    label:'基本',
    list:[
      { name: 'p_name', label: '名称', type:'input'},
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
    query:'/notice/query',
    delete:{url :'/notice/delete'},
    edit:'/notice/save',
    queryById:'/notice/queryById',
  },
  content:{                                           // 内容table

    primaryKey:'n_id',                       //多选按钮的key,,
    listDescription: listDescription,             //列设置
  },
  query:{                                             // 查询table
    list:queryList,                              //查询的条件
  },
  dialog:dialog
}
export default myModule
