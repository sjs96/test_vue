import my_showFunction from '../../util/util'
import {initEdit} from '../../../components/edit/base/util/initEdit'
import store from '../../../store/store'
import {getParams} from '../../../util/getParams';
import {my_post} from '../../../util/util';
import {myMessage} from '../../../util/message';
import { Notification } from 'element-ui';
import Print from 'print-js'
// table 列设置
const listDescription = [
  {value: 'ui_landlord_name', label: '房东', type:'input'},
  {value: 'o_type', label: '类型', type:'input',order: {show:true,asc:'o_type',desc:'o_type desc'},  custom: function(val){ // 用于格式化或其他对值的操作，
    if(val==1){return '售电'}else if(val==-1){return '清电'} else{return '未知'}; },},
  {value: 'ui_name', label: '用户名',type:'input',order: {show:true,asc:'ui_name',desc:'ui_name desc'}},
  {value: 'm_no', label: '表号', type:'input',order: {show:true,asc:'m_no',desc:'m_no desc'}},
  {value: 'p_total', label: '售电量', type:'input',order: {show:true,asc:'p_total',desc:'p_total desc'}},
  {value: 'p_price', label: '单价', type:'input'},
  {value: 'p_money', label: '金额', type:'input',order: {show:true,asc:'p_money',desc:'p_money desc'}},
  {value: 'o_state', label: '状态', type:'input',custom: function(val){ // 用于格式化或其他对值的操作，
    if(val==1){return '未完成'}else if(val==2){return '生成token'}else if(val==3){return '完成'} else{return '未知'}; }},
  {value: 'create_time', label: '提交时间', type:'input',order: {show:true,asc:'create_time',desc:'create_time desc'}},
  {value: 'update_time', label: '充值时间', type:'input',order: {show:true,asc:'update_time',desc:'update_time desc'}},
  {value: 'o_token', label: 'Token', type:'input'},
  {value: 'o_remarks', label: '备注', type:'input'},
]

// 查询字段
const queryList = [
  {
    name:'base',
    btn_query:true,
    list:[
      {name: 'ui_landlord_id', label: '房东', type:'select',ajax:{url:'/user/queryLandlord'},showFunction:function(model){return my_showFunction(model,'ui_landlord_id')},props:{value:'ui_id',label:'ui_name',}},
      {name: 'ui_tenant_id', label: '租客', type:'select',showFunction:function(model){return my_showFunction(model,'ui_tenant_id')},ajax:{url:'/user/queryTenantByLandlord',params:[{type:'control',control:'ui_landlord_id',name: 'ui_landlord_id',close:''}]},props:{value:'ui_id',label:'ui_name',}},
      {name: 'ui_manage_id', label: '房东管理员', type:'select',showFunction:function(model){return my_showFunction(model,'ui_manage_id')},ajax:{url:'/user/queryManageByLandlord',params:[{type:'control',control:'ui_landlord_id',name: 'ui_landlord_id',close:''}]},props:{value:'ui_id',label:'ui_name',}},
      { name: 'time_start', label: '开始时间', type:'time'},
      { name: 'time_end', label: '结束时间', type:'time'},
    ]
  },

]

const editList = [
]
const operationBtn=[
  {text:'打印',name:'printOrder'  ,jurisdiction:"printOrder",
    disabled:function (row){if(row['o_state']!=1){return false}else{return true}},
    tooltip:{
      disabled:function (row){if(row['o_state']==1){return false}else{return true}},
      content:"尚未生成token",
    },
    cilck:(val,row,vm,name)=>{
    console.log(vm)
      var params = new URLSearchParams()
      params.append('o_id',row.o_id)
      my_post(vm.api.getOrderInfo, params,(state,msg,json)=>{
      },(state,msg,json)=>{
      },vm)
    }},
]

const dialog ={
  list:[
    {
      type:"select",
      name:'printOrder',
      data:{
        title:'提示',
        width:'30%',
        show:false,
        msg:'是否清除剩余电量？',
        btn:[
          {
            text:"取消",
            click:function(that){
              console.log(that)
              console.log(this)
              that.data.show = false
            }
          },{
            text:"确认",
            type:"primary",
            click:function(that){
              console.log('that------------')
              console.log(that)
              let myData= [];
              for(let i=0;i< that.data.rows.length;i++){
                myData.push({m_id:that.data.rows[i].m_id,m_no:that.data.rows[i].m_no})
              }
              let params = new URLSearchParams()
              params.append('m_id',JSON.stringify(myData))
              my_post(that.api.empty, params,(state,msg,json)=>{
                myMessage({message:msg})
                that.data.show = false
              },(state,msg,json)=>{
              })
            }
          },
        ],
      }
    },
  ],
  from:{
    editList:editList,
  },
}
const myModule = {
  api:{
    query:'/order/query',
    delete:{url :'/order/delete'},
    edit:'/order/save',
    queryById:'/order/queryById',
    getOrderInfo:'/order/getOrderInfo',
  },
  content:{                                           // 内容table
    primaryKey:'o_id',                       //多选按钮的key,,
    listDescription: listDescription,             //列设置
    showSummary: {
      state: true,
      ajax:{
        url:"/order/queryTotal",
          setUp:[{default:'合计'},{default:''},{name:'add_electricity',unit:'kWh(售电)',default:'0'},{name:'add_money',unit:'元(售电)',default:'0'},{name:'del_electricity',unit:'kWh(退款)',default:'0'},{name:'del_money',unit:'元(退款)',default:'0'}],
      },
    },
    table: {
      operation: {
        btn: operationBtn,
      },
    }
  },
  query:{                                             // 查询table
    list:queryList,                              //查询的条件
  },
  dialog:dialog,
  jurisdiction: {
    btnExeclImport: {show: true, jurisdiction: true},                   //导入
    printOrder: {show: true, jurisdiction: true},                   //打印
    execl: {
      show: true,
      jurisdiction: true,
      setUp: {
        name: '订单统计',
        sql: 'order.queryByExecl',
        list: [{
          ui_landlord_name: '房东',
          o_type_str: '类型',
          ui_name:'用户名',
          m_no:'表号',
          p_total:'售电量',
          p_price:'单价',
          p_money: '金额',
          o_state_str: '状态',
          create_time: '提交时间',
          update_time: '充值时间',
          o_token: 'Token',
          o_remarks: '备注',
        }],
      },
    },                   //导出
  }
}
export default myModule
