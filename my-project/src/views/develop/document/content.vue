2<template>

  <!--详情开始 -->
  <div class="wrapper">
    <!--查询-->
    <tree-section :data="data4"></tree-section>
    <button @click="aaa"> cc</button>
    <query-section></query-section>
    <!--列表-->
    <table-section></table-section>
    <!--<my-chat ></my-chat>-->
    <!--模板结束-->
  </div>
  <!--详情结束-->

</template>
<script>
  import TableSection from '../../../components/table/section-table.vue'
  import QuerySection from '../../../components/query/section-query.vue'
  import TreeSection from '../../../components/tree/section-tree.vue'
  import MyChat from '../../../components/special/myChat.vue'
  export default {
    data() {
      return {

        data4: [ {
          id: 2,
          label: '一级 2',
          checked:false,
          children: [{
            id: 5,
            label: '二级 2-1',
            checked:false,
          }, {
            id: 6,
            label: '二级 2-2',
            checked:false,
          }]
        }, {
          id: 3,
          label: '一级 3',
          checked:false,
          children: [{
            id: 7,
            label: '二级 3-1',
            checked:false,
          }, {
            id: 8,
            label: '二级 3-2',
            checked:false,
          }]
        }],
      }
    },
    methods: {
      aaa() {
        console.log(this.data4)
      }
    },
    components: {
      TableSection,
      QuerySection,
      TreeSection,
      MyChat,
    },
  };
</script>

