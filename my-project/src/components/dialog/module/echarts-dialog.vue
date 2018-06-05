<!--主题内容table的删除提示页面-->
<template>
  <el-dialog title="提示" width="30%"  :show-close=false :visible.sync="data.show">
    <power ></power>
  </el-dialog>
</template>
<script>
  import store from '../../../store/store'
  import {mapState} from 'vuex';
  import Power from '../../../components/echarts/power.vue'
  export default {
    props: {
      data:Object,
    },
    components: {
      Power,
    },
  };
</script>
