<!--查询table-->
<template>
  <transition name="el-zoom-in-top">
    <div class="row" >
      <div class="col-lg-12">
        <section class="panel">
          <!--头部开始-->

          <!--头部结束-->
          <transition name="el-zoom-in-top">
            <div class="panel-body" >
              <div id="myChart2_1" :style="{width: '100%', height: '300px'}"></div> </div>
          </transition>
        </section>
      </div>
    </div>
  </transition>
</template>
<script>
  import HeaderSection from '../header/section-header.vue'
  import {my_post} from '../../util/util'
  export default {
    components: {
      HeaderSection,              // 头部组件
    },
    data () {
      return {
        option : {
          grid:{
            left:0,
            right:0
          },
          series: [
            {
              name: '功率',
              type: 'gauge',
              detail: {formatter:'{value}千瓦时'},
              data: [{value: 50, name: '功率'}]
            }
          ]
        }

    }
    },
    mounted(){
      this.drawLine();
    },
    methods: {
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart2_1 = this.$echarts.init(document.getElementById('myChart2_1'))
        // 绘制图表
        myChart2_1.setOption(this.option);


        window.addEventListener("resize", function () {
          setTimeout(function () {
            myChart2_1.resize();
          }, 500)
        });
      }
    }
  };
</script>
