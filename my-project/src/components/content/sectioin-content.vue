<!--主题内容table-->
<template>
  <transition name="el-zoom-in-top">
    <div class="row" v-if="content.header.delete">
      <div class="col-sm-12">
        <section class="panel">
          <!--头部开始-->
          <header-section :querya="querya" :dialog="dialog" :edit="edit" :model="content.header " :content="content" :jurisdiction="jurisdiction" ></header-section>
          <!--头部结束-->
          <table-section :api="api" :dialog="dialog" :content="content":edit="edit":querya="querya" :jurisdiction="jurisdiction" ></table-section>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
  import PageSection from '../page/section-page.vue'
  import TableSection from '../table/section-table.vue'
  import VueImages from 'vue-images'
  import HeaderSection from '../header/section-header.vue'
  export default {
    components: {
      PageSection,             // 底部组件
      TableSection,             // 底部组件
      HeaderSection,              // 头部组件
      VueImages,
    },
    props: {
      content:Object,
      querya:Object,
      edit:Object,
      jurisdiction:Object,
      dialog:Object,
      api:Object,
    },
    updated () {
    }


  };
</script>
