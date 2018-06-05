<!--主题内容table-->
<template>
  <!--头部结束-->
  <transition name="el-zoom-in-top">
    <div class="panel-body" v-show="content.header.show">
      <el-table
        :data="content.listContent"
        ref="singleTable"
        border
        :row-class-name="tableRowClassName"
        :show-summary="content.showSummary.state"
        :summary-method="myShowSummary"
        @sort-change="sortChange"
        @selection-change="selectionChange"
        @cell-click="cellClick"
        @cell-mouse-enter="cellMouseEnter"
        style="width: 100%">
        <el-table-column
          type="selection"
          fixed

          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          v-if="jurisdiction.number.show&&jurisdiction.number.jurisdiction"
          style="color: #00a0e9"
          fixed="left"
          width="50">
        </el-table-column>


        <el-table-column
          :prop="description.value"
          :label="description.label"
          :key="description.label"
          :sortable="description.order.show?'custom':false"
          v-if="content.listDescriptionShow.indexOf(description.value)!== -1"
          v-for="description in content.listDescription">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="description.tooltip.content" :disabled="description.tooltip.disabled(scope.row)" placement="top" >
              <span v-if="description.type === 'input'" :style="description.styleFunction(scope.row)">{{description.custom(scope.row[description.value])}}</span>
              <span v-else-if="description.type === 'download'" >
                <a>{{description.custom(scope.row[description.value])}}</a>
              </span>
              <vue-images v-else-if="description.type === 'img'" :imgs="description.custom(scope.row[description.value])"
                          :modalclose="description.modalclose"
                          :keyinput="description.keyinput"
                          :mousescroll="description.mousescroll"
                          :showclosebutton="description.showclosebutton"
                          :showcaption="description.showcaption"
                          :imagecountseparator="description.imagecountseparator"
                          :showimagecount="description.showimagecount"
                          :showthumbnails="description.showthumbnails"
                          >
              </vue-images>
              <span v-else >{{description.custom(scope.row[description.value])}}</span>
            </el-tooltip>

          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          fixed="right"
          v-if="jurisdiction.operation.show&&jurisdiction.operation.jurisdiction"
          :width="getw()">
          <template slot-scope="scope">
          <!--  <button :class="btnItem.class" :disabled="btnItem.disabled" type="button" v-if="jurisdiction[btnItem.jurisdiction]&&jurisdiction[btnItem.jurisdiction].show&&jurisdiction[btnItem.jurisdiction].jurisdiction" @click="btnItem.cilck(scope.row[content.primaryKey],scope.row,{content,edit,dialog})" v-for="btnItem in content.table.operation.btn">{{btnItem.name}}</button>-->

            <el-tooltip class="item" effect="dark" :content="btnItem.tooltip.contentFunction(scope.row,btnItem.tooltip.content)" :disabled="btnItem.tooltip.disabled(scope.row)" placement="top" :key="btnItem.name" v-for="btnItem in content.table.operation.btn">
              <span :ref="'btnItem_'+btnItem.name">
                <el-button  :type="btnItem.type" :size="btnItem.size" :disabled="btnItem.disabled(scope.row)"  v-if="jurisdiction[btnItem.jurisdiction]&&jurisdiction[btnItem.jurisdiction].show&&jurisdiction[btnItem.jurisdiction].jurisdiction&&btnItem.show(scope.row)" @click="btnItem.cilck(scope.row[content.primaryKey],scope.row,{content,edit,dialog,api},btnItem.name)"  >{{btnItem.text}}</el-button>
              </span>
            </el-tooltip>


          </template>
        </el-table-column>

      </el-table>


      <!--分页开始-->
      <page-section :page="content.page" ></page-section>
      <!--分页结束-->
    </div>
  </transition>
</template>


<style >
  .sorting{
    background: url(../../assets/bootstrap/js/data-tables/images/sort_both.png) no-repeat center right
  }
  .sorting_desc{
    background: url(../../assets/bootstrap/js/data-tables/images/sort_desc.png) no-repeat center right
  }
  .sorting_asc{
    background: url(../../assets/bootstrap/js/data-tables/images/sort_asc.png) no-repeat center right
  }
  .el-table .stripe-row {
    background: #FAFAFA;
  }
  .el-table .warning-row {
    background: #EEE685;
  }

  .el-table .danger-row {
    background: oldlace;
  }
</style>
<script>
  import store from '../../store/store'
  import PageSection from '../page/section-page.vue'
  import {mapState} from 'vuex';
  import {getParams} from '../../util/getParams';
  import {getModuleName} from '../../util/util';
  import {myMessage} from '../../util/message';
  import { getCheckedList } from '../../util/util';
  import { isNotNull } from '../../util/isNotNull';
  import VueImages from 'vue-images'
  import HeaderSection from '../header/section-header.vue'
  import DialogSelect from '../dialog/module/select-dialog.vue'
  import MyDialog from '../dialog/my-dialog.vue'
  import {my_post} from '../../util/util';
  import $ from 'jquery'
  import jQuery from 'jquery'
  import niceScroll from 'jquery.nicescroll';
  export default {
    components: {
      PageSection,             // 底部组件
      HeaderSection,              // 头部组件
      DialogSelect,
      VueImages,
    },
    props: {
      content:Object,
      querya:Object,
      edit:Object,
      jurisdiction:Object,
      dialog:Object,
      api:Object
    },
    data() {
      return {
        btnWidth:0,
      }
    },
    methods: {
      cellMouseEnter(row, column, cell, event){
        for(let i=0;i<this.content.listDescription.length;i++){
          if(this.content.listDescription[i].value==column.property){
            if(this.content.listDescription[i].cellMouseEnter.effective){
              let jurisdictionName = this.content.listDescription[i].cellMouseEnter.jurisdiction
              if(!this.content.listDescription[i].cellMouseEnter.isJurisdiction||(this.jurisdiction[jurisdictionName]&&this.jurisdiction[jurisdictionName].show&&this.jurisdiction[jurisdictionName].jurisdiction)){
                this.content.listDescription[i].cellMouseEnter.mouse(row, column, cell, event)
              }
            }
          }
        }
      },
      getw(){
        let width =25;
        for(var key in this.$refs){
          if(key.length>8&&key.substring(0,8)=='btnItem_'){
            let b=true
            for(let i = 0;i<this.$refs[key].length;i++){
              if(this.$refs[key][i].getBoundingClientRect()&&b){
                width +=  (this.$refs[key][i].getBoundingClientRect().width)
                b =false
              }
            }
          }
        }
        if(width==25){
          width=70
        }
        return  parseInt(width)
      },
      cellClick(row, column, cell, event){
        for(let i=0;i<this.content.listDescription.length;i++){
          if(this.content.listDescription[i].value==column.property){
            if(this.content.listDescription[i].cellClick.effective){
              let jurisdictionName = this.content.listDescription[i].cellClick.jurisdiction
              if(!this.content.listDescription[i].cellClick.isJurisdiction||(this.jurisdiction[jurisdictionName]&&this.jurisdiction[jurisdictionName].show&&this.jurisdiction[jurisdictionName].jurisdiction)){
                this.content.listDescription[i].cellClick.click(row,column.property,i,this.content.listDescription[i].cellClick,this)
              }
            }
          }
        }
      },
      tableRowClassName({row, rowIndex}) {
       return this.content.table.tableRowClassName({row, rowIndex})
      },
      sortChange(a, b, c) {
        for(let i = 0;i<this.content.listDescription.length;i++){
          if(this.content.listDescription[i].value == a.prop){
            this.setOrder (this.content.listDescription[i].order)
            return
          }
        }
        this.content.orderBy = ''
        store.commit('queryNo',this)
      },
      myShowSummary(param){
        if(this.content.showSummary.ajax.url&&this.content.showSummary.ajax.url.length>0){
          return this.content.showSummary.ajax.custom(param,this)
        }else{
          return this.content.showSummary.custom(param)
        }

      },
      selectionChange(selection){
        this.content.checkedList = selection
      },
      setOrder (order) {            //排序
        if(!order.show){
          return
        }
        let asc = ''
        let desc = ''
        if(isNotNull(order.field)){
          asc = order.field
          desc = order.field+" desc"
        }else{
          asc = order.asc
          desc = order.desc
        }
        if (this.content.orderBy === asc) {
          this.content.orderBy = desc
        } else if (this.content.orderBy === desc) {
          this.content.orderBy = ''
        } else {
          this.content.orderBy = asc
        }
        store.commit('queryNo',this)
      },
      query () {                //查询
        var params = new URLSearchParams(getParams(this.querya.list))
        params.append('rows',this.content.page.rows)
        params.append('page',this.content.page.page)
        params.append('orderBy',this.content.orderBy)
        my_post(this.api.query, params,(state,msg,json)=>{
          let  listContent = json.list
          this.content.page.total=json.totalRow
          this.content.listContent=listContent
          this.content.checkedList=[]
          this.$nextTick(function () {
            $("#app").getNiceScroll().hide()
            $("#app").getNiceScroll().show()
            $("#app").getNiceScroll().resize()
          })

        },(state,msg,json)=>{
          let  listContent = json.list
          this.content.page.total=json.totalRow
          this.content.listContent=listContent
          this.content.checkedList=[]
        })


      },
    },
    watch: {                  //监控queryNo值是否变化，如果有变化重新查询
      'content.queryNo': 'query',
      '$route' (to, from) {
        this.query()
      },
    },
    updated () {              //初始化
      this.$refs.singleTable.doLayout()
      this.$nextTick(function () {
        this.$refs.singleTable.columns[this.$refs.singleTable.columns.length-1].realWidth=this.getw()
        this.$refs.singleTable.doLayout()
      })
    },
    mounted () {              //初始化
      this.query()
      this.content.checkedList=[]
    },
    store
  };
</script>
