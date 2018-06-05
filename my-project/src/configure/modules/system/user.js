import my_showFunction from '../../util/util'
import store from '../../../store/store'
import {getParams} from '../../../util/getParams';
import {my_post} from '../../../util/util';
import {myMessage} from '../../../util/message';
import {isNotNull} from '../../../util/isNotNull';
const validatePass = (rule, value, callback,vm) => {
  if (!isNotNull(value)) {
    callback(new Error('请输入密码'));
  } else {
    if (isNotNull(vm.model.ruleForm['ui_password2'])) {
      vm.$refs.ruleForm.validateField('ui_password2');
    }
    callback();
  }
};
const validatePass2 = function (rule, value, callback,vm) {
  console.log('validatePass2-------')
  console.log(value)
  console.log(vm.model.ruleForm['ui_password'])
  if (!isNotNull(value)) {
    callback(new Error('请输入确认密码'));
  } else if (value != vm.model.ruleForm['ui_password'] ) {
    callback(new Error('两次输入密码不一致!'));
  } else {
    callback();
  }
};
const meter_num_cellClick ={
  effective:true,
  type:'table',
  isJurisdiction:false,
  click: (map,key,i,cellClick,vm) => { // 用于格式化或其他对值的操作，
    console.log('meter_num_cellClick')
    for( let i = 0;i< vm.dialog.list.length;i++){
      console.log(vm.dialog.list[i].name)
      if(vm.dialog.list[i].name == 'meterByLandlord'){
        console.log('true')
        vm.dialog.list[i].data.show = true
        vm.dialog.list[i].data.map = map
      }
    }
  },
}
const user_num_cellClick ={
  effective:true,
  type:'table',
  isJurisdiction:false,
  click: (map,key,i,cellClick,vm) => { // 用于格式化或其他对值的操作，
    for( let i = 0;i< vm.dialog.list.length;i++){
      if(vm.dialog.list[i].name == 'userByLandlord'){
        vm.dialog.list[i].data.show = true
        vm.dialog.list[i].data.map = map
      }
    }
  },
}
// table 列设置
const listDescription = [
  {value: 'ui_code', label: '帐号',type:'input'},
  {value: 'ui_name', label: '用户名',type:'input'},
  {value: 'ui_telno', label: '联系方式',type:'input'},
  {value: 'r_name', label: '角色',type:'input'},
  {value: 'ui_landlord_name', label: '房东', type:'input'},
  {value: 'meter_num', label: '电表数量', type:'input', cellClick:meter_num_cellClick,tableInitShow: false},
  {value: 'user_num', label: '租客数量', type:'input', cellClick:user_num_cellClick,tableInitShow: false},
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
      {name:'ui_name',label:'用户名',type:'input'},
      {name: 'r_id', label: '角色', type:'select',ajax:{url:'/role/queryByAll'},props:{value:'r_id',label:'r_name',}},

    ]
  },

]
  const my_showFunctionLandlord = function (model){

      if(model.ruleForm.r_id==4||model.ruleForm.r_id==5){
        return my_showFunction(model,'ui_landlord_id')
      }else{
        return false
      }
}
const editList = [
  {
    name:'base',
    label:'基本',
    list:[
      { name: 'r_id', label: '角色', type:'select',disabled:{edit:true},ajax:{url:'/role/queryByRole'},props:{value:'r_id',label:'r_name',},rules:[{ required: true, message: '请选择角色', trigger: 'blur' }]},
      { name: 'ui_landlord_id', label: '房东', type:'select',showFunction:function(model){return my_showFunctionLandlord(model)},ajax:{url:'/user/queryLandlord'},props:{value:'ui_id',label:'ui_name'},rules:[{ required: true, message: '请选择房东', trigger: 'blur' }]},
      { name: 'ui_name', label: '用户名', type:'input',rules:[{ required: true, message: '请输入用户名', trigger: 'blur' }]},
      { name: 'ui_code', label: '帐号', type:'input',  disabled:{edit:true },rules:[{ required: true, message: '请输入帐号', trigger: 'blur' }]},
      { name: 'ui_telno', label: '联系方式', type:'input' },
      { name: 'ui_password', label: '密码', type:'input',show:{edit:false },rules:[{ required: true, message: '请输入密码', trigger: 'blur' },{ validator:validatePass, trigger: 'blur' }]},
      { name: 'ui_password2', label: '确认密码', type:'input',show:{edit:false },rules:[{ required: true, message: '请输入确认密码', trigger: 'blur' },{ validator:validatePass2, trigger: 'blur' }]},
      { name: 'ui_kmf_certificate', label: 'kmf文件', type:'upload',showFunction:function(model){ if(model.ruleForm.r_id==3){  return true}else{return false}}},
      {name: 'm_ids', label: '电表',type:'transfer',showFunction:function(model){ if(model.ruleForm.r_id==4){  return true}else{return false}},ajax:{                                    //ajax 动态设置值
        url:'/meter/queryByFree',                                                  //全部的值
        url2:'/meter/queryByMe',                                           // 选中的值
        params:[{type:'control',control:'ui_landlord_id',name: 'ui_landlord_id',close:''},{type:'control',control:'ui_id',name: 'ui_id',close:''}],                                                        // 选中值的key
        params2:[{type:'control',control:'ui_landlord_id',name: 'ui_landlord_id',close:''},{type:'control',control:'ui_id',name: 'ui_id',close:''}],                                                        // 选中值的key
        data_name:{key:'m_id',label:'m_no'},                              //显示和保存的键值
      },titles:['空闲电表','当前租客的电表'],  style:{width: '500px' } },
      { name: 'ui_id',type:'hidden'},
    ]
  },
]
const dialog ={
  list:[
    {
      type:"select",
      name:'unlock',
      data:{
        title:'是否解锁？',
        width:'30%',
        show:false,
        msg:'是否解锁？',
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
              var params = new URLSearchParams()
              params.append("default_id_",that.data.id)
              my_post(that.api.unlock, params,(state,msg,json)=>{
                myMessage({message:'删除成功'})
                store.commit('queryNo',that)
                that.data.show = false
              },(state,msg,json)=>{
                myMessage({message:'删除失败！'})
                that.data.show = false
              })
            }
          },
        ],
      }
    },
    {
      type:"select",
      name:'resetPassword',
      data:{
        title:'是否重置密码？',
        width:'30%',
        show:false,
        msg:'是否重置密码？',
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
              var params = new URLSearchParams()
              params.append("ui_id",that.data.id)
              my_post(that.api.resetPassword, params,(state,msg,json)=>{
                myMessage({message:'重置密码成功'})
                store.commit('queryNo',that)
                that.data.show = false
              },(state,msg,json)=>{
                myMessage({message:'重置密码失败！'})
                that.data.show = false
              })
            }
          },
        ],
      }
    },
    {
      type:"table",
      name:'userByLandlord',
      data:{
        from:'editList2',
        nextAndLast:false,
        title:"租客列表",
        show:false,
        listDescription:[
          {value:'ui_name',label:'租客'},
        ],
        url:'/user/queryUserByLandlord',
        save:function(that){
          let myData= [{m_id:that.edit.row.m_id,m_no:that.edit.row.m_no}];
          var params = getParams(that.edit.list)
          params.append('m_id',JSON.stringify(myData))

          my_post(that.api.gl, params,(state,msg,json)=>{
            myMessage({message:'正在设置最大功率门限'})
            that.edit.show = false
          },(state,msg,json)=>{},that)
        },
      }
    },
    {
      type:"table",
      name:'meterByLandlord',
      data:{
        from:'editList2',
        nextAndLast:false,
        title:"电表列表",
        show:false,
        listDescription:[
          {value:'m_no',label:'电表'},
          {value:'m_address',label:'电表名'},
        ],
        url:'/user/queryMeterByLandlord',
        save:function(that){
          let myData= [{m_id:that.edit.row.m_id,m_no:that.edit.row.m_no}];
          var params = getParams(that.edit.list)
          params.append('m_id',JSON.stringify(myData))

          my_post(that.api.gl, params,(state,msg,json)=>{
            myMessage({message:'正在设置最大功率门限'})
            that.edit.show = false
          },(state,msg,json)=>{},that)
        },
      }
    },
  ],
  from:{
    editList:editList,
  },
}
const operationBtn=[
  {text:'解锁',name:'unlock',jurisdiction:'unlock',
    disabled:function (row){if(row['error_state']==1){return false}else{return true}},
    tooltip:{
      disabled:function (row){if(row['error_state']==1){return false}else{return true}},
      content:"用户连续5次输错密码,帐号以锁定",
    },
  },
  {text:'重置密码',name:'resetPassword',jurisdiction:'resetPassword',},
]
const myModule = {
  api:{
    query:'/user/query',
    delete:{url :'/user/delete'},
    edit:'/user/save',
    queryById:'/user/queryById',
    unlock:'/user/unlock',
    resetPassword:'/user/resetPassword',
  },
  content:{                                           // 内容table

    primaryKey:'ui_id',                       //多选按钮的key,,
    listDescription: listDescription,             //列设置
    table:{
      operation:{
        width:300,
        btn:operationBtn,
      }
    },
  },
  query:{                                             // 查询table
    list:queryList,                              //查询的条件
  },
  dialog:dialog
}
export default myModule
