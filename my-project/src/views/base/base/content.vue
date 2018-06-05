<template>

  <!--详情开始 -->
  <div class="wrapper">
    <!--查询-->
    <query-section  @complete="complete" :edit="model.edit":content="model.content":jurisdiction="model.jurisdiction"  :query='model.query' ></query-section>
    <!--列表-->
    <content-section :api="model.api" :dialog="model.dialog" :content="model.content":edit="model.edit":querya="model.query" :jurisdiction="model.jurisdiction"></content-section>

    <my-dialog :querya="model.query" :api="model.api" :dialog="model.dialog" :content="model.content"></my-dialog>
    <!--<my-chat ></my-chat>-->
    <!--模板结束-->
  </div>
  <!--详情结束-->

</template>
<script>
  import ContentSection from '../../../components/content/sectioin-content.vue'
  import QuerySection from '../../../components/query/section-query.vue'
  import {getModuleName} from '../../../util/util';
  import store from '../../../store/store'
  import MyDialog from '../../../components/dialog/my-dialog.vue'
  export default {
    data () {
      return {
        modulesName: getModuleName(this.$route.path),
      }
    },
    components: {
      QuerySection,
      ContentSection,
      MyDialog
    },
    computed:{
      model(){                        // 数据
        return this.$store.state.modules[this.modulesName];
      },

    },
    methods: {
      complete() {
        store.commit('queryNo',this)
      },
    },
    watch: {                  //监控queryNo值是否变化，如果有变化重新查询
      '$route' (to, from) {
        console.log("-----------------")
        console.log(this.model)
        console.log("-----------------")
        this.modulesName = getModuleName(this.$route.path)
      }
    },
  };
</script>

