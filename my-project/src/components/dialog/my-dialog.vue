<!--主题内容table的删除提示页面-->
<template>
  <div>
    <dialog-select :api="api" :data="item.data" :key="item.name"v-if="item.type=='select'" v-for="item in dialog.list"></dialog-select>
    <dialog-echarts :data="item.data":key="item.name" v-if="item.type=='echarts'" v-for="item in dialog.list"></dialog-echarts>
    <dialog-real-time :data="item.data":key="item.name" v-if="item.type=='realTime'" v-for="item in dialog.list"></dialog-real-time>
    <dialog-table :data="item.data":key="item.name" v-if="item.type=='table'" v-for="item in dialog.list"></dialog-table>
    <dialog-print :querya="querya" :data="item.data":key="item.name" v-if="item.type=='print'" :api="api"  v-for="item in dialog.list"></dialog-print>
    <dialog-edit :content="content" :edit="item.data" :primaryKey="content.primaryKey" :api="api" :key="item.name" v-if="item.type=='from'" v-for="item in dialog.list"></dialog-edit>
  </div>
</template>
<script>
  import DialogSelect from './module/select-dialog.vue'
  import DialogRealTime from './module/realTime-dialog'
  import DialogTable from './module/table-dialog'
  import DialogEdit from './module/edit-dialog.vue'
  import DialogPrint from './module/print-dialog.vue'
  export default {
    components: {
      DialogSelect,
      DialogRealTime,
      DialogEdit,
      DialogPrint,
      DialogTable
    },
    props: {
      dialog:Object,
      content:Object,
      api:Object,
      querya:Object,
    },
    mounted () {              //初始化
    },
    methods: {
    },
    updated () {
    }
  };
</script>
