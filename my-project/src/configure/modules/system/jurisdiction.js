import store from '../../../store/store'
import {getParams} from '../../../util/getParams';
import {my_post} from '../../../util/util';
import {myMessage} from '../../../util/message';
// table 列设置
const listDescription = [
  {value: 'r_name', label: '角色', type:'input'},
  {value: 'j_name', label: '描述', type:'input'},
]

// 查询字段
const queryList = [
  {
    name:'base',
    btn_query:true,
    list:[
      { name: 'j_name', label: '描述',  type:'input'},
    ]
  },

]

const editList = [
  {
    name:'base',
    label:'基础',
    list:[                           // 要显示的内容
      { name: 'r_name', label: '角色',  type:'input',  disabled:{edit:true }},
      { name: 'j_name', label: '描述',  type:'input'},
      /*{ name: 'r_id', label: '角色',  type:'select',ajax:{url:"/role/queryByAll",}, props:{value:'r_id',label:'r_name',}},*/
      { name: 'j_id', label: 'id',  type:'hidden'},
    ]
  },
  {
    name:'optional',
    label:'权限',
    type:'jurisdiction',
    left_title:false,
    list:[                           // 要显示的内容
      {name: 'ids', label: '备注', type:'jurisdiction', ajax:{                          //ajax 动态设置值
        url:'/jurisdiction/getTree',params:[{type:'control',control:'r_id',name: 'r_id',close:''},{type:'control',control:'j_id',name: 'j_id',close:''}]
      }},
    ]
  },
]

const dialog ={
  list:[
    {
      type:"select",
      name:'download',
      data:{
        title:'是否下载？',
        width:'30%',
        show:false,
        msg:'是否下载？',
        btn:[
          {
            text:"取消",
            click:function(that){
              that.data.show = false
            }
          },{
            text:"确认",
            type:"primary",
            click:function(that){
              let  val = that.data.map[that.data.key]
              if(isNotNull(val)){
                let list = JSON.parse(val)
                if(list instanceof Array){
                  for(let i=0;i<list.length;i++){
                    my_download(list[i].name,list[i].url)
                  }
                }
              }
              that.data.show = false
            }
          },
        ],
      }
    },
    {
      type:"from",
      name:'edit',
      data:{
        from:'editList',
        nextAndLast:false,
        title:"编辑",
        width:"1050",
        show:false,
        save:function(that){
          var params = getParams(that.edit.list)
          my_post(that.api.edit, params,(state,msg,json)=>{
            myMessage({message:'更新成功'})
            store.commit('queryNo',that)
            that.edit.show = false
          },(state,msg,json)=>{},that)
        },
      }
    }
  ],
  from:{
    editList:editList,
  },
}
const myModule = {
  api:{
    query:'/jurisdiction/query',
    delete:{url :'/jurisdiction/delete'},
    edit:'/jurisdiction/save',
    queryById:'/jurisdiction/queryById',
  },
  content:{                                           // 内容table
    primaryKey:'j_id',                       //多选按钮的key,,
    listDescription: listDescription,             //列设置
  },

  query:{                                             // 查询table
    list:queryList,                              //查询的条件
  },
  jurisdiction: {
    query:{show:false,jurisdiction:true},                           //查询
    edit:{show:true,jurisdiction:true},                           //查询
  },
  dialog:dialog
}
export default myModule
