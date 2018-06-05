<template>

  <!--详情开始 -->
  <div class="wrapper">
    <!--查询-->
    <my-test ></my-test>
    <my-test1 ></my-test1>
    <my-test2 ></my-test2>
    <!--<my-chat ></my-chat>-->
    <!--模板结束-->
  </div>
  <!--详情结束-->

</template>
<script>
  import MyTest from '../../../components/echarts/test.vue'
  import MyTest1 from '../../../components/echarts/test1.vue'
  import MyTest2 from '../../../components/echarts/test2.vue'
  export default {
    components: {
      MyTest,
      MyTest1,
      MyTest2,
    },

  };
</script>

