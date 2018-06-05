<!--查询table-->
<template>
  <transition name="el-zoom-in-top">
    <div class="row" v-if="query.header.delete&&jurisdiction.query.show">
      <div class="col-lg-12">
        <section class="panel">
          <!--头部开始-->
          <header-section :edit="edit" :model="query.header"  :content="content" :jurisdiction="jurisdiction" ></header-section>
          <!--头部结束-->
          <transition name="el-zoom-in-top">
            <div class="panel-body" v-show="query.header.show">
              <from-section @complete="complete" :model="item" :modelList="query.list" :key="item.name" v-for="(item, index) in query.list" :ref="'myref'"></from-section>
            </div>
          </transition>
        </section>
      </div>
    </div>
  </transition>
</template>
<script>
  import {mapState} from 'vuex';
  import HeaderSection from '../header/section-header.vue'
  import FromSection from '../from/section-from.vue'
  import {validate} from '../../util/util';
  export default {

    components: {
      HeaderSection,              // 头部组件
      FromSection                      //内容
    },
    updated () {              //初始化
          if (typeof(this.$refs['myref'].length) == 'undefined'){
            this.$refs['myref'].init()
          }else{
            for(let i=0;i<this.$refs['myref'].length;i++){
              this.$refs['myref'][i].init()
            }
          }
    },
    methods: {
      complete() {
        return validate(this,this.$refs['myref'],() => {
          this.$emit('complete',{});
        })
      },
    },
    props: {
      query:Object,
      jurisdiction:Object,
      content:Object,
      edit:Object
    }
  };
</script>
