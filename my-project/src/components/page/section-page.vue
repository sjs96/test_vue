<!--主题内容table的页脚-->
<template>
  <div class="block">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"  :current-page="page.page" :page-sizes="[10, 20, 50, 100]" :page-size="page.rows" background layout="total, sizes, prev, pager, next, jumper" :total="page.total">
    </el-pagination>
  </div>
</template>
<style scoped="">
  .block{
    padding-top: 10px;
  }
</style>

<script>
  import store from '../../store/store'
  import {mapState} from 'vuex';
  export default {
    props: {
      page:Object,
    },
    methods: {

      handleSizeChange(val) {         //更新查询的行数
        this.page.rows=val
        store.commit('queryNo', this)
      },
      handleCurrentChange(val) {            //更新查询的页数
        this.page.page=val
        store.commit('queryNo', this)
      }
    },
    store
  };
</script>
