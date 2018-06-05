import {initEdit} from '../../../components/edit/base/util/initEdit'
import store from '../../../store/store'
import {getParams} from '../../../util/getParams';
import {my_post} from '../../../util/util';
import {myMessage} from '../../../util/message';
import {isNotNull} from '../../../util/isNotNull';
const validatePass = (rule, value, callback,vm) => {
  if ((!isNotNull(value))&&isNotNull(vm.model.ruleForm['ui_password2'])) {
    callback(new Error('请输入密码'));
  } else {
    callback();
  }
  vm.$refs.ruleForm.validateField('ui_password2');
};
const validatePass2 = function (rule, value, callback,vm) {
  if ((!isNotNull(value))&&isNotNull(vm.model.ruleForm['ui_password'])) {
    callback(new Error('请输入确认密码'));
  } else if (value != vm.model.ruleForm['ui_password'] ) {
    callback(new Error('两次输入密码不一致!'));
  } else {
    callback();
  }
};
// table 列设置
const listDescription = [
  {value: 'ui_name', label: '用户名',type:'input'},
  {value: 'ui_nickname', label: '昵称',type:'input'},
]

// 查询字段
const queryList = [
  {
    name:'base',
    btn_query:true,
    list:[
      {name:'ui_name',label:'部门名称',type:'input'},
      {name:'ui_nickname',label:'联系电话',type:'input'},
    ]
  },

]

const editList = [
  {
    name:'base',
    label:'基本',
    list:[
      { name: 'ui_name', label: '用户名', type:'input'},
      { name: 'ui_telno', label: '联系方式', type:'input' },
      { name: 'ui_code', label: '帐号', type:'input'},
      { name: 'ui_password_old', label: '原密码', type:'input',rules:[{ required: true, message: '请输入原密码', trigger: 'blur' }]},
      { name: 'ui_password', label: '密码', type:'input',rules:[{ validator:validatePass, trigger: 'blur' }]},
      { name: 'ui_password2', label: '确认密码', type:'input',rules:[{ validator:validatePass2, trigger: 'blur' }]},
      { name: 'ui_id',type:'hidden'},
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
    query:'/user/query',
    delete:{url :'/user/delete'},
    edit:'/user/savePassword',
    queryById:'/user/queryBaseById',
  },
  content:{                                           // 内容table

    primaryKey:'ui_id',                       //多选按钮的key,,
    listDescription: listDescription,             //列设置
  },
  query:{                                             // 查询table
    list:queryList,                              //查询的条件
  },
  dialog:dialog
}
export default myModule
