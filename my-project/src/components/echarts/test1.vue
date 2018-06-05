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
              <div id="myChart1" :style="{width: '100%', height: '300px'}"></div> </div>
          </transition>
        </section>
      </div>
      <div class="col-lg-4">
        <section class="panel">
          <!--头部开始-->

          <!--头部结束-->
          <transition name="el-zoom-in-top">
            <div class="panel-body" >
              <div id="myChart2" :style="{width: '100%', height: '300px'}"></div> </div>
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
              text: '每月新增用户数',
              left: 'center'
            },
            tooltip: {},
            xAxis: {
              data: []
            },
            yAxis: {},
            series: [{
              name: '每月新增用户数',
              type: 'bar',
              barMaxWidth:30,
              data: []
            }]
          },
          option2:{
            title: {
              text: '每年新增用户数',
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
                name:'每月新增用户数',
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
                data:[]
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
          let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
          // 绘制图表
          myChart1.setOption(this.option1);
          // 基于准备好的dom，初始化echarts实例
          let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
          // 绘制图表
          myChart2.setOption(this.option2);
          my_post("/home/queryByHome2", "",(state,msg,json)=>{
            let xAxis_data =[]
            let series_data =[]
            for(let i=0;i<json.queryUserByMonth.length;i++){
              xAxis_data.push(json.queryUserByMonth[i].month)
              series_data.push({name:json.queryUserByMonth[i].month,value:json.queryUserByMonth[i].num})
            }
            myChart1.setOption({
              xAxis: {data:xAxis_data},
              series:{data:series_data}
            })
            let data2 =[]

            let series_data2 =[]
            for(let i=0;i<json.queryUserByYear.length;i++){

              data2.push(json.queryUserByYear[i].month)
              series_data2.push({name:json.queryUserByYear[i].month,value:json.queryUserByYear[i].num})
            }
            myChart2.setOption({
              legend: {data:data2},
              series:{data:series_data2}
            })
          },(state,msg,json)=>{})

          window.addEventListener("resize", function () {
            setTimeout(function () {
              myChart1.resize();
              myChart2.resize();
            }, 500)
          });
        }
      }
  };
</script>
