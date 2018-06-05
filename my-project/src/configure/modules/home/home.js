
// table 列设置
const listDescription = [
  {value: 'dp_name', label: '部门名称', order: { show:true, field:'dp_name',  },type:'input'},
  {value: 'dp_top_name', label: '上级部门',type:'input'},
  {value: 'dp_tel', label: '联系电话', type:'input'},
  {value: 'dp_sort', label: '排序', type:'input'},
  {value: 'dp_note', label: '备注', type:'input'},
]

// 查询字段
const queryList = [
  {
    name:'base',
    btn_query:true,
    list:[
      {name:'dp_name',label:'部门名称',type:'input'},
      {name:'dp_tel',label:'联系电话',type:'input'},
      {name:'dp_topid',label:'上级部门',type:'cascader',ajax:{url:'/depart/getTree' }},
    ]
  },

]

const editList = [
  {
    name:'base',
    label:'基本',
    list:[
      { name: 'dp_name', label: '部门名称', type:'input',rules:[
        { required: true, message: '请输入部门名称', trigger: 'blur' }
      ]},
      { name: 'dp_tel', label: '联系电话', type:'input'},
      { name: 'dp_topid', label: '上级部门',  type:'cascader',ajax:{url:'/depart/getTree' }},
      { name: 'dp_sort', label: '排序', type:'input'},
      { name: 'dp_note', label: '备注', type:'input'},
      { name: 'test_time', label: 'sj', type:'time',format:'yyyy-MM-dd HH:mm:ss',                                // 显示格式
        valueFormat:'yyyy-MM-dd HH:mm:ss',},
      { name: 'dp_id',type:'hidden'},
    ]
  },
  {
    name:'optional',
    label:'职务',
    list:[                           // 要显示的内容
      {name: 'po_ids', label: '职务',type:'transfer',ajax:{                                    //ajax 动态设置值
        url:'/post/queryByAll',                                                  //全部的值
        url2:'/depart/queryByPost',                                           // 选中的值
        params2:[{type:'control',control:'dp_id',name: 'dp_id',close:''}],                                                        // 选中值的key
        params:[{type:'control',control:'dp_id',name: 'dp_id',close:''}],                                                        // 选中值的key
        data_name:{key:'po_id',label:'po_name'},                              //显示和保存的键值
      }},
    ]
  },
]

const myModule = {
  api:{
    query:'/depart/query',
    delete:{url :'/depart/delete'},
    edit:'/depart/save',
    queryById:'/depart/queryById',
  },
  content:{                                           // 内容table
    listName: '部门列表',                         // 描述
    primaryKey:'dp_id',                       //多选按钮的key,,
    listDescription: listDescription,             //列设置
  },
  edit:{
    list:editList,
  },
  query:{                                             // 查询table
    list:queryList,                              //查询的条件
  },
}
export default myModule
