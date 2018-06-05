<!--查询table-->
<template>
  <transition name="el-zoom-in-top">
    <div class="row" >
      <div class="col-lg-8">
        <section class="panel">
          <!--头部开始-->

          <!--头部结束-->
          <transition name="el-zoom-in-top">
            <div class="panel-body" >
              <div id="myChart2_1" :style="{width: '100%', height: '300px'}"></div> </div>
          </transition>
        </section>
      </div>
      <div class="col-lg-4">
        <section class="panel">
          <!--头部开始-->

          <!--头部结束-->
          <transition name="el-zoom-in-top">
            <div class="panel-body" >
              <div id="myChart2_2" :style="{width: '100%', height: '300px'}"></div> </div>
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
        option1: {
          title: {
            text: '每月新增订单数',
            left: 'center'
          },
          tooltip: {},
          xAxis: {
            data: []
          },
          yAxis: {},
          series: [{
            name: '每月新增订单数',
            type: 'bar',
            barMaxWidth:30,
            data: []
          }]
        },
        option2:{
          title: {
            text: '每年新增订单数',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c}个 ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data:[]
          },
          series: [
            {
              name:'每月新增订单数',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[              ]
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
        myChart2_1.setOption(this.option1);
        // 基于准备好的dom，初始化echarts实例
        let myChart2_2 = this.$echarts.init(document.getElementById('myChart2_2'))
        // 绘制图表
        myChart2_2.setOption(this.option2);
        my_post("/home/queryByHome3", "",(state,msg,json)=>{
          let xAxis_data =[]
          let series_data =[]
          for(let i=0;i<json.queryOrderByMonth.length;i++){
            xAxis_data.push(json.queryOrderByMonth[i].month)
            series_data.push({name:json.queryOrderByMonth[i].month,value:json.queryUserByMonth[i].num})
          }
          myChart2_1.setOption({
            xAxis: {data:xAxis_data},
            series:{data:series_data}
          })
          let data2 =[]

          let series_data2 =[]
          for(let i=0;i<json.queryOrderByYear.length;i++){

            data2.push(json.queryOrderByYear[i].month)
            series_data2.push({name:json.queryOrderByYear[i].month,value:json.queryOrderByYear[i].num})
          }
          myChart2_2.setOption({
            legend: {data:data2},
            series:{data:series_data2}
          })
        },(state,msg,json)=>{})

        window.addEventListener("resize", function () {
          setTimeout(function () {
            myChart2_1.resize();
            myChart2_2.resize();
          }, 500)
        });
      }
    }
  };
</script>
