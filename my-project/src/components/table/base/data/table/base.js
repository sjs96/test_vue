const myModule = {
  value: '',                //提交表单的name
  label: '',                //页面显示的文本
  tableInitShow: true,        //是否默认显示在列表中
  order: {                   //排序（如果show为true, field 和 （asc,desc）必须有一个，优先field）
    show:false,                //是否排序(默认没有排序)
    field:'',                    //排序的字段
    asc:'',                     //排序的sql1
    desc:'',                    //排序的sql2
  },
  type:'input',              //控件类型  (默认input)
  custom: function(val){ // 用于格式化或其他对值的操作，
    return val;
  },
  cellClick:{             //单元格点击事件
    effective:false,
    jurisdiction:'',
    isJurisdiction:false,
    click: (val,i,vm) => { // 用于格式化或其他对值的操作，
      vm.data.show=true
      vm.data.data.i=i
      vm.data.data.val=val
    },
  },
  cellMouseEnter:{             //单元格点击事件
    effective:false,
    jurisdiction:'',
    isJurisdiction:false,
    mouse: (row, column, cell, event) => { // 用于格式化或其他对值的操作，
      console.log('cellMouseEnter----')
      console.log(row)
      console.log(column)
      console.log(cell)
      console.log(event)
    },
  },
  tooltip:{
    disabled:function (row){return true},
    content:"",
  },
  styleFunction:function (row){
    return "";
  }
}
export default myModule
