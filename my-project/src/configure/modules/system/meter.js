
import my_showFunction from '../../util/util'
import {initEdit} from '../../../components/edit/base/util/initEdit'
import store from '../../../store/store'
import {getParams} from '../../../util/getParams';
import {my_post} from '../../../util/util';
import {myMessage} from '../../../util/message';
import {isNotNull} from '../../../util/isNotNull';
const fmoney = (s, n) =>{
  /*
   * 参数说明：
   * s：要格式化的数字
   * n：保留几位小数
   * */
  n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  var l = s.split(".")[0].split("").reverse(),
    r = s.split(".")[1];
  let t = "";
  for (let i = 0; i < l.length; i++) {
    t += l[i] ;
  }
  return t.split("").reverse().join("") + "." + r;
}
const m_no_cellClick2 ={
  effective:true,
  type:'table',
  isJurisdiction:false,
  click: (map,key,i,cellClick,vm) => { // 用于格式化或其他对值的操作，
    for( let i = 0;i< vm.dialog.list.length;i++){
      if(vm.dialog.list[i].name == 'realTimeData'){
        vm.dialog.list[i].data.show = true
        vm.dialog.list[i].data.map = map
      }
    }
  },
}
const cellMouseEnter={             //单元格点击事件
  effective:true,
  jurisdiction:'',
  isJurisdiction:false,
  mouse: (row, column, cell, event) => { // 用于格式化或其他对值的操作，
    console.log('cellMouseEnter----')
    console.log(row)
    console.log(column)
    console.log(cell)
    console.log(event)
    if ( row['m_electricity_notice'] > row['m_electricity']) {
      return 'warning-row'
    }
  },
}
// table 列设置
const listDescription = [
  {value: 'ui_landlord_name', label: '房东', type:'input',tableInitShow: false},
  {value: 'm_address', label: '电表名', type:'input'},
  {value: 'm_no', label: '表号(实时功率)', type:'input',order: {show:true,asc:'m_no',desc:'m_no desc'}, cellClick:m_no_cellClick2,},
  {value: 'ui_name', label: '用户名',type:'input',order: {show:true,asc:'ui_name',desc:'ui_name desc'}},
  {value: 'p_name_price', label: '电价', type:'input'},
  {value: 'm_remarks', label: '备注', type:'input'},
  {value: 'm_power', label: '门限', type:'input',tableInitShow: false},
  {value: 'meter_state', label: '状态', type:'input',custom: function(val){ // 用于格式化或其他对值的操作，
    if(val==0){return '未注册'}
    else if(val==1){return '准备注册'}
    else if(val==2){return '正常在线'}
    else if(val==-2){return '电表离线'}
    else if(val==-3){return '发送中'}
    else if(val==-4){return '异常'}
    else{return '未知'}; }},
  {value: 'm_electricity', label: '剩余电量', type:'input',order: {show:true,asc:'m_electricity',desc:'m_electricity desc'},tooltip:{
    disabled:function (row){ //租客
      if(store.state.user.r_id == store.state.user.base.role_fk){
        console.log('row----')
        console.log('m_electricity_notice'+row['m_electricity_notice']+'m_electricity'+ row['m_electricity'])
        if (isNotNull(row['m_electricity_notice']) && isNotNull(row['m_electricity'])&&row['m_electricity_notice'] > row['m_electricity']) {
          return false;
        }
      }
      return true;},
    content:"剩余电量少于告警电量",
  }, styleFunction:function (row){
    //租客
    if(store.state.user.r_id == store.state.user.base.role_fk){
      console.log('row----')
      console.log('m_electricity_notice'+row['m_electricity_notice']+'m_electricity'+ row['m_electricity'])
      if (isNotNull(row['m_electricity_notice']) && isNotNull(row['m_electricity'])&&row['m_electricity_notice'] > row['m_electricity']) {
        return "color: red";
      }
    }
    return "";
  }},
  {value: 'm_money', label: '充值总额', type:'input',tableInitShow: false,  },
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
      {name:'m_no',label:'表号',type:'input'},
      {name:'ui_name',label:'用户',type:'input'},
    ]
  },

]
const my_validator = (rule, value, callback) => {
  if(!(value && value.length==11)){
    console.log(value)
    callback(new Error('表号长度为11位'));
    return
  }
  let newStr = value.substring(0,10);
  let a = []
  let buff =0;
  let temp= [];
  for(let i=0;i<newStr.length;i++){
    a[i]=newStr.substring(i,i+1);
  }

  for(let i=0;i<5;i++){
    temp[i] = parseInt(a[i*2+1]*2);
    buff+=parseInt(a[i*2]);
    buff=parseInt(buff+temp[i]/10+temp[i]%10);
  }
  buff=buff%10;
  if(0==buff){
    newStr = newStr+buff;
  }else{
    newStr = newStr+(10-buff);
  }
  if(newStr==value){
    callback();
  }else{
    callback(new Error('电表输入有误'));
  }
}
const  editList = [
  {
    name:'editList',
    label:'基本',
    list:[
      { name: 'ui_landlord_id', label: '房东',  disabled:{edit:true },showFunction:function(model){return my_showFunction(model,'ui_landlord_id')},rules:[{ required: true, message: '请选择房东', trigger: 'blur' }], type:'select',ajax:{url:'/user/queryLandlord'},props:{value:'ui_id',label:'ui_name'}},
      { name: 'm_address', label: '电表名', type:'input'},
      { name: 'm_no', label: '表号', type:'input',  disabled:{edit:true },rules:[{ required: true, message: '请输入表号', trigger: 'blur' },{ validator: my_validator, trigger: 'blur' }]},
      { name: 'ui_id', label: '租客',showFunction:function(model){return my_showFunction(model,'ui_id')}, type:'select',ajax:{url:"/user/queryTenantByLandlord",params:[{type:'control',control:'ui_landlord_id',name: 'ui_landlord_id',close:''}]}, props:{value:'ui_id',label:'ui_name',}},
      { name: 'p_id', label: '电价',showFunction:function(model){return my_showFunction(model,'p_id')},rules:[{ required: true, message: '请选择电价', trigger: 'blur' }],  type:'select',ajax:{url:"/price/queryByLandlord",params:[{type:'control',control:'ui_landlord_id',name: 'ui_landlord_id',close:''}]}, props:{value:'p_id',label:'p_name_price'}},
      { name: 'm_electricity_notice', label: '告警电量',rules:[{ required: true, message: '请输入告警电量', trigger: 'blur' }], type:'input'},
      { name: 'm_remarks', label: '备注', type:'input'},
      { name: 'm_id',type:'hidden'},
    ]
  }
]

const  rechargeList = [
  {
    name:'rechargeList',
    label:'基本',
    list:[
      { name: 'p_price', label: '单价', type:'input', disabled:{add:true,edit:true }},
      { name: 'p_name', label: '电价名称', type:'input', disabled:{add:true,edit:true }},
      { name: 'p_money', label: '金额', type:'input',  associated :{listen:{},effective:true,custom:function(model){
        model.ruleForm.r_electricity=fmoney(model.ruleForm.p_money/model.ruleForm.p_price,2)
      }}},
      { name: 'r_electricity', label: '电量', type:'input', disabled:{add:true,edit:true }},
      { name: 'o_remarks', label: '备注', type:'input'},
      { name: 'p_id',type:'hidden'},
    ]
  }
]
const  rechargeList2 = [
  {
    name:'rechargeList',
    label:'基本',
    list:[
      { name: 'p_money', label: '金额', type:'input',  associated :{listen:{},effective:true,custom:function(model){
        model.ruleForm.r_electricity=fmoney(model.ruleForm.p_money/model.ruleForm.p_price,2)
      }}},
      { name: 'o_remarks', label: '备注', type:'input'},
    ]
  }
]
const editList2 = [
  {
    name:'editList2',
    label:'基本',
    list:[
      { name: 'm_power', label: '功率', type:'input'},
    ]
  }
]
const dialog ={
  list:[
    {
      type:"select",
      name:'qdl',
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
    {
      type:"select",
      name:'kg_on',
      data:{
        title:'提示',
        width:'30%',
        show:false,
        msg:'是否合闸？',
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
              let params = new URLSearchParams()
              let myData= [];
              for(let i=0;i< that.data.rows.length;i++){
                myData.push({
                  m_id:that.data.rows[i].m_id,
                  m_no:that.data.rows[i].m_no,
                  start:0,
                })
              }
              params.append('m_id',JSON.stringify(myData))
              my_post(that.api.setKG, params,(state,msg,json)=>{
                myMessage({message:msg})
                that.data.show = false
                store.commit('queryNo',that)
              },(state,msg,json)=>{
              })
            }
          },
        ],
      }
    },
    {
      type:"select",
      name:'kg_off',
      data:{
        title:'提示',
        width:'30%',
        show:false,
        msg:'是否开闸？',
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
                myData.push({
                  m_id:that.data.rows[i].m_id,
                  m_no:that.data.rows[i].m_no,
                  start:1,
                })
              }
              let params = new URLSearchParams()
              params.append('m_id',JSON.stringify(myData))
              my_post(that.api.setKG, params,(state,msg,json)=>{
                myMessage({message:msg})
                that.data.show = false
                store.commit('queryNo',that)
              },(state,msg,json)=>{
              })
            }
          },
        ],
      }
    },
    {
      type:"select",
      name:'qd',
      data:{
        title:'提示',
        width:'30%',
        show:false,
        msg:'是否清除窃电状态？',
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
              let myData= [];
              for(let i=0;i< that.data.rows.length;i++){
                myData.push({m_id:that.data.rows[i].m_id,m_no:that.data.rows[i].m_no})
              }
              let params = new URLSearchParams()
              params.append('m_id',JSON.stringify(myData))
              my_post(that.api.setQD, params,(state,msg,json)=>{
                myMessage({message:msg})
                that.data.show = false
              },(state,msg,json)=>{
              })
            }
          },
        ],
      }
    },
    {
      type:"select",
      name:'error',
      data:{
        title:'提示',
        width:'30%',
        show:false,
        msg:'是否清除异常状态？',
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
              let myData= [];
              for(let i=0;i< that.data.rows.length;i++){
                myData.push({m_id:that.data.rows[i].m_id,m_no:that.data.rows[i].m_no})
              }
              let params = new URLSearchParams()
              params.append('m_id',JSON.stringify(myData))
              my_post(that.api.removeError, params,(state,msg,json)=>{
                myMessage({message:msg})
                that.data.show = false
                store.commit('queryNo',that)
              },(state,msg,json)=>{
              })
            }
          },
        ],
      }
    },
    {
      type:"from",
      name:'recharge',
      data:{
        from:'rechargeList',
        nextAndLast:false,
        title:"充值",
        show:false,
        saveText:"充值",
        save:function(that){
          console.log('that.edit.rows')
          console.log(that.edit.rows)
          var params = getParams(that.edit.list)
          let myData= [];
          for(let i=0;i< that.edit.rows.length;i++){
            console.log({m_id:that.edit.rows[i].m_id,m_no:that.edit.rows[i].m_no})
            myData.push({
              m_id:that.edit.rows[i].m_id,
              m_no:that.edit.rows[i].m_no,
              p_money:params.get('p_money'),
              p_price:that.edit.rows[i].p_price,
              o_remarks:params.get('o_remarks')
            })
          }

          console.log("json"+JSON.stringify(myData))
          params.append('m_id',JSON.stringify(myData))

          my_post(that.api.recharge, params,(state,msg,json)=>{
            myMessage({message:msg})
            that.edit.show = false
          },(state,msg,json)=>{},that)
        },
      }
    },
    {
      type:"from",
      name:'recharge2',
      data:{
        from:'rechargeList2',
        nextAndLast:false,
        title:"充值",
        show:false,
        saveText:"充值",
        save:function(that){
          console.log('that.edit.rows')
          console.log(that)
          console.log(that.edit.rows)
          var params = getParams(that.edit.list)
          let myData= [];
          for(let i=0;i< that.edit.rows.length;i++){
            console.log({m_id:that.edit.rows[i].m_id,m_no:that.edit.rows[i].m_no})
            myData.push(
              {
                m_id:that.edit.rows[i].m_id,
                m_no:that.edit.rows[i].m_no,
                p_money:params.get('p_money'),
                p_price:that.edit.rows[i].p_price,
                o_remarks:params.get('o_remarks')
              })
          }
          console.log("json"+JSON.stringify(myData))
          params.append('m_id',JSON.stringify(myData))

          my_post(that.api.recharge, params,(state,msg,json)=>{
            myMessage({message:msg})
            that.edit.show = false
          },(state,msg,json)=>{},that)
        },
      }
    },
    {
      type:"from",
      name:'gl',
      data:initEdit({
        from:'editList2',
        nextAndLast:false,
        title:"设置最大功率门限",
        show:false,
        save:function(that){
          let myData= [];
          var params = getParams(that.edit.list)
          for(let i=0;i< that.edit.rows.length;i++){
            myData.push({
              m_id:that.edit.rows[i].m_id,
              m_no:that.edit.rows[i].m_no,
              m_power:params.get('m_power')
            })
          }
          params.append('m_id',JSON.stringify(myData))

          my_post(that.api.gl, params,(state,msg,json)=>{
            myMessage({message:msg})
            that.edit.show = false
          },(state,msg,json)=>{},that)
        },
      })
    },
    {
      type:"realTime",
      name:'realTimeData',
      data:initEdit({
        from:'editList2',
        nextAndLast:false,
        title:"实时数据（15秒刷新一次）",
        show:false,
        titleFunction:function (data){
          if(data.map){
            return '表号:'+data.map.m_no+','+data.title
          }else{
            return data.title
          }
        },
        save:function(that){
          let myData= [{m_id:that.edit.row.m_id,m_no:that.edit.row.m_no}];
          var params = getParams(that.edit.list)
          params.append('m_id',JSON.stringify(myData))

          my_post(that.api.gl, params,(state,msg,json)=>{
            myMessage({message:'正在设置最大功率门限'})
            that.edit.show = false
          },(state,msg,json)=>{},that)
        },
      })
    },
  ],
  from:{
    editList:editList,
    rechargeList:rechargeList,
    rechargeList2:rechargeList2,
    editList2:editList2,
  },
}
const off=1;
const on=0;
const operationBtn=[
  {text:'充值',name:'recharge',jurisdiction:'recharge',
    disabled:function (row){if(row['m_state']==2){return false}else{return true}},
    tooltip:{
      disabled:function (row){if(row['m_state']!=2){return false}else{return true}},
      content:"电表未注册成功",
    },
  },
  {text:'清异常',name:'error',jurisdiction:'error',width:100,
    disabled:function (row){if(row['m_error']!=0){return false}else{return true}},
    tooltip:{
      disabled:function (row){if(row['m_error']!=0){return false}else{return true}},
      content:"电表异常",
    },
  },
  {text:'合闸',name:'kg_on',jurisdiction:'kg_on',width:100,
    show:function (row){
        if(row['m_kg_fd']==off||row['m_kg_fk']==off){
          return true
        }else{
          return false
        }
    },
    disabled:function (row){
      //房东
      if(store.state.user.r_id == store.state.user.base.role_fd){
        return false
      }else{
        if(row['m_kg_fd']==off){
          return true
        }
      }
      return false
    },
    tooltip:{
      disabled:function (row){
        //房东
        if(store.state.user.r_id == store.state.user.base.role_fd){
          return true
        }else{
          if(row['m_kg_fd']==off){
            return false
          }
        }
        return true
      },
      content:"房东已经开闸",
    },
  },
  {text:'开闸',name:'kg_off',jurisdiction:'kg_off',width:100,
    show:function (row){
      //房东
      if(row['m_kg_fd']==on&&row['m_kg_fk']==on){
        return true
      }else{
        return false
      }
    },
    disabled:function (row){
      //房东
      if(store.state.user.r_id == store.state.user.base.role_fd){
        return false
      }else{
        if(row['m_kg_fd']==off){
          return true
        }
      }
      return false
    },
  },


]


const heandbtn =  [
    {class:'', text:'充值', jurisdiction:'recharge',click:(vm,index)=>{
      for( let i = 0;i< vm.dialog.list.length;i++){
        if(vm.dialog.list[i].name == 'recharge2'){
          if(!isNotNull(vm.content.checkedList)){
            myMessage({message: '请选择充值的电表',type: 'warning'})
          }else{
            vm.dialog.list[i].data.show = true
            vm.dialog.list[i].data.rows=vm.content.checkedList
            vm.dialog.list[i].data.primaryKey=vm.content.primaryKey
          }
        }
      }
    }},
    {class:'', text:'清电量', jurisdiction:'qdl',click:(vm,index)=>{
      for( let i = 0;i< vm.dialog.list.length;i++){
        if(vm.dialog.list[i].name == 'qdl'){
          if(!isNotNull(vm.content.checkedList)){
            myMessage({message: '请选择清电量的电表',type: 'warning'})
          }else{
            vm.dialog.list[i].data.show = true
            vm.dialog.list[i].data.rows=vm.content.checkedList
            vm.dialog.list[i].data.primaryKey=vm.content.primaryKey
          }
        }
      }
    }},
    {class:'', text:'清窃电', jurisdiction:'qd',click:(vm,index)=>{
      for( let i = 0;i< vm.dialog.list.length;i++){
        if(vm.dialog.list[i].name == 'qd'){
          if(!isNotNull(vm.content.checkedList)){
            myMessage({message: '请选择清窃电的电表',type: 'warning'})
          }else{
            vm.dialog.list[i].data.show = true
            vm.dialog.list[i].data.rows=vm.content.checkedList
            vm.dialog.list[i].data.primaryKey=vm.content.primaryKey
          }
        }
      }
    }},
    {class:'', text:'设门限', jurisdiction:'gl',click:(vm,index)=>{
      for( let i = 0;i< vm.dialog.list.length;i++){
        if(vm.dialog.list[i].name == 'gl'){
          if(!isNotNull(vm.content.checkedList)){
            myMessage({message: '请选择设门限的电表',type: 'warning'})
          }else{
            vm.dialog.list[i].data.show = true
            vm.dialog.list[i].data.rows=vm.content.checkedList
            vm.dialog.list[i].data.primaryKey=vm.content.primaryKey
          }
        }
      }
    }},
    {class:'', text:'合闸', jurisdiction:'kg_on',click:(vm,index)=>{
      for( let i = 0;i< vm.dialog.list.length;i++){
        if(vm.dialog.list[i].name == 'kg_on'){
          if(!isNotNull(vm.content.checkedList)){
            myMessage({message: '请选择设门限的电表',type: 'warning'})
          }else{
            vm.dialog.list[i].data.show = true
            vm.dialog.list[i].data.rows=vm.content.checkedList
            vm.dialog.list[i].data.primaryKey=vm.content.primaryKey
          }
        }
      }
    }},
    {class:'', text:'开闸', jurisdiction:'kg_off',click:(vm,index)=>{
      for( let i = 0;i< vm.dialog.list.length;i++){
        if(vm.dialog.list[i].name == 'kg_off'){
          if(!isNotNull(vm.content.checkedList)){
            myMessage({message: '请选择设门限的电表',type: 'warning'})
          }else{
            vm.dialog.list[i].data.show = true
            vm.dialog.list[i].data.rows=vm.content.checkedList
            vm.dialog.list[i].data.primaryKey=vm.content.primaryKey
          }
        }
      }
    }},
  ]
const myModule = {
  api:{
    query:'/meter/query',
    delete:{url :'/meter/delete'},
    edit:'/meter/save',
    queryById:'/meter/queryById',
    recharge:'/recharge/save',
    gl:'/meter/setGL',
    setKG:'/meter/setKG',
    setQD:'/meter/setQD',
    empty:'/recharge/empty',
    removeError:'/meter/removeError',
  },
  content:{                                           // 内容table
    header: {
      mybtn: heandbtn,                         //按钮
    },
    table:{
      operation:{
        width:250,
        btn:operationBtn,
      },
      tableRowClassName:({row, rowIndex})=> {
        //租客
        if(store.state.user.r_id == store.state.user.base.role_fk){
          if (row['meter_state'] == -2) {
            return 'danger-row'
          } else if ( row['m_electricity_notice'] > row['m_electricity']) {
            return 'warning-row'
          } else if (rowIndex % 2 == 1) {
            return 'stripe-row'
          } else {
            return ''
          }
        }else{
          if (row['meter_state'] == -2) {
            return 'danger-row'
          } else if (rowIndex % 2 == 1) {
            return 'stripe-row'
          } else {
            return ''
          }
        }
        //其他

      }
    },
    primaryKey:'m_id',                       //多选按钮的key,,
    listDescription: listDescription,             //列设置
  },
  query:{                                             // 查询table
    list:queryList,                              //查询的条件
  },
  dialog:dialog
}
export default myModule
