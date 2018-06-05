const myModule = {
  value: '',                //提交表单的name
  label: '',                //页面显示的文本
  disabled:{                  //是否禁用
    add:false,                //添加新纪录(默认不禁用)
    edit:false                //更新新纪录(默认不禁用)
  },
  type:'input',              //控件类型  (默认input)
  show:{                  //是否显示
    add:true,                //添加新纪录(默认显示)
    edit:true                //更新新纪录(默认显示)
  },
  ajax:{                          //ajax 动态设置值
    url:'',                           // url
    params:[],                         // 参数可以跟控件绑定（control），也可以是单独的数据（text） {type:'control',control:'dp_topid',name: 'dp_topid',close:''}{type:'text',value:'aaa',name: 'no'}
  },
  associated :{                          //联动数据
    custom:function(){},                           // 方法
    params:[],                         // 参数可以跟控件绑定（control），也可以是单独的数据（text） {type:'control',control:'dp_topid',name: 'dp_topid',close:''}{type:'text',value:'aaa',name: 'no'}
  },
  rules:[],                             //表单验证
  focus:{                             //是否有焦点
    select:false,                       //焦点状态（同一组控件有一个状态默认第一个为true的为焦点）
    effective:true,                     //是否开启 默认开启
    skip:false,                           //是否略过  默认不略过
  },
  style:{width: '190px' }  ,                          //自定义样式主要是宽度 490px 190px
  showFunction:function(model){              // 自定义什么情况下显示隐藏
    return true;
  },
  listen:{},  //监听
  copy:false,   //是否是复制的控件
  associated :{     // 当前控件值改变执行
    listen:{},
    effective:false,
    custom:function(map){}
  },
}
export default myModule
