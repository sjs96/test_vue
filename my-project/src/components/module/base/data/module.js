import {my_post} from '../../../../util/util'
import {getParams} from '../../../../util/getParams';
import {isNotNull} from '../../../../util/isNotNull';
import {myMessage} from '../../../../util/message';
import store from '../../../../store/store'
import {my_download} from '../../../../util/util';

const myModule = {
  api:{
    query:'',                                       //查询列表的api
    delete:{url :'',name:'default_id_'},                        //删除的api
    edit:'',                                           //保存的api
    queryById:'',                                        //查询单个的api
  },
  dialog:{
    from: {
      editList: [],
    }
  },
  //表格
  content:{
    table:{
      operation:{
        btn:[

        ],
      },
      tableRowClassName:({row, rowIndex})=> {
        if (rowIndex%2 == 1) {
          return 'stripe-row';
        } else {
          return '';
        }
      }
    },
    delete:true,                                      //是否删除
    show:true,                                        //是否缩进
    orderBy: '',                                        // 排序
    queryNo:0,                                          //当值变化时查询
    saveNo:0,                                          //当值变化时保存
    deleteNo:0,                                          //当值变化时删除
    api:{
      query:'',                                       //查询列表的api
      delete:{url :'',name:'default_id_'},                        //删除的api
      edit:'',                                           //保存的api
      queryById:'',                                        //查询单个的api
    },
    page:{
      rows:10,                                          //一页几行
      total:0,                                            //共多少数据条数
      page:1,                                             //当前第几页
    },
    deleteItem:'',                                // 删除id
    listContent: [],                     //内容
    showSummary: {
      state : false,                  //是否合计
      custom:function (param){       //格式化规则
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          if (index === 1) {
            sums[index] = '';
            return;
          }
          if(index === columns.length-1){
            sums[index] = '';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = '非数字';
          }
        });
        return sums;
      },
      ajax:{
        url:"",
        setUp:[],
        data:{},
        query:true,
        custom: (param,that)=>{       //格式化规则
          if(that.content.showSummary.ajax.query){
            that.content.showSummary.ajax.query=false;
            var params = getParams(that.querya.list)
            my_post(that.content.showSummary.ajax.url, params,(state,msg,json)=>{
              that.content.showSummary.ajax.data = json
            },(state,msg,json)=>{})
          }
          let map = that.content.showSummary.ajax.data
          const sums = []
          const { columns, data } = param;
          for(let  i=0;i<that.content.showSummary.ajax.setUp.length;i++){
            let val="";



            if(isNotNull(map)){
              if(isNotNull(map[that.content.showSummary.ajax.setUp[i].name])){
                if(isNotNull(that.content.showSummary.ajax.setUp[i].unit)){
                  val = map[that.content.showSummary.ajax.setUp[i].name]+that.content.showSummary.ajax.setUp[i].unit
                }else{
                  val = map[that.content.showSummary.ajax.setUp[i].name]
                }
              }else{
                if(isNotNull(that.content.showSummary.ajax.setUp[i].default)){
                  val = that.content.showSummary.ajax.setUp[i].default
                }
              }
            }else{
              if(isNotNull(that.content.showSummary.ajax.setUp[i].default)){
                val = that.content.showSummary.ajax.setUp[i].default
              }
            }

            sums.push(val)
          }
          return sums;
        },
      }
    },
    checkedAll: false,                       // 是否全选
    checkedList:{},                           //多选按钮
    primaryKey:'',                       //多选按钮的key,
    orderBy: '',                             // 排序
    dialogDelete:false,
    header:{
      btns:{},                          //按钮设置
      mybtn:[],                         //按钮
      listName: '列表',               //头部描述
      listDescription:true,
      delete:true,                   //是否删除
      show:true,                      //是否缩进
    },                      //头部控件
  },                              //控件列表

  //查询
  query:{
    list:[],                              //控件列表
    activeName:'',                    //选中分页
    delete:true,                      //是否删除
    show:true,                         //是否显示
    header:{
      btns:{},                          //按钮设置
      mybtn:[],                         //按钮
      listName: '查询',               //头部描述
      listDescription:false,
      delete:true,                   //是否删除
      show:true,                      //是否缩进
    },                      //头部控件
  },                        //选中的分页名称
  //编辑
  edit: {
    list:[],                              //控件列表
    activeName:'',                        //选中的分页名称
    dialogShow: false,                      // 添加和修改弹出框
    editId:'',                            //编辑的id
    test:{},
    width:"650",
    nextAndLast:true,
  },                      // 添加和修改弹出框

  //权限
  jurisdiction: {
    btnExeclImport:{show:true,jurisdiction:true},                   //导入
   // execl:{show:false,jurisdiction:true,setUp:{name:'',sql:'',list:[{m_id:'id',m_no:'编号'}]},ajax:{url:'/execl/execl'}},                   //导出
    //word:{show:false,jurisdiction:true,setUp:{name:'',sql:'',list:[{m_id:'id',m_no:'编号'}]},ajax:{url:'/execl/execl'}},                   //导出
    execl:{show:false,jurisdiction:true,setUp:{name:'',sql:'',list:[]},ajax:{url:'/execl/execl'}},                   //导出
    word:{show:false,jurisdiction:true,setUp:{name:'',sql:'',list:[]},ajax:{url:'/execl/execl'}},                   //导出
    print:{show:false,jurisdiction:true,setUp:{name:'',sql:'',list:[]},ajax:{url:'/execl/execl'}},                   //导出
    btnUpAndDown_query:{show:true,jurisdiction:true},                     //查询收缩
    btnRemove_query:{show:true,jurisdiction:true},                         //查询隐藏
    btnUpAndDown_content:{show:true,jurisdiction:true},                     //内容收缩
    btnRemove_content:{show:true,jurisdiction:true},                         //内容隐藏
    query:{show:true,jurisdiction:true},                           //查询(没用)
    delete:{show:true,jurisdiction:false},                           //删除
    edit:{show:true,jurisdiction:false},                               //更新
    add:{show:true,jurisdiction:false},                              //添加
    default:{show:true,jurisdiction:true},                              //默认显示
    number:{show:true,jurisdiction:true},                              //序号列
    operation:{show:true,jurisdiction:true},                              //操作列
  },                      // 添加和修改弹出框
}
export default myModule
