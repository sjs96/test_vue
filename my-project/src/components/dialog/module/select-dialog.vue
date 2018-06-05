<!--主题内容table的删除提示页面-->
<template>
  <el-dialog :title="data.title" :width="data.width"  :show-close=false :visible.sync="data.show">
    <span>{{data.msg}}</span>
    <span slot="footer" class="dialog-footer">
      <el-button :type="item.type" :key="item.text" @click="myClick(item)" v-for="item in data.btn">{{item.text}}</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import store from '../../../store/store'
  import {mapState} from 'vuex';
  export default {
    props: {
      data:Object,
      api:Object,
    },
    methods: {
      myClick (item) {         //删除
        item.click(this)
      }
    }
  };
</script>
