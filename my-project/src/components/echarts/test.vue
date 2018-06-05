<!--查询table-->
<template>
  <transition name="el-zoom-in-top">
    <div class="row">
      <div class="col-md-6">
        <!--statistics start-->
        <div class="row state-overview">
          <div class="col-md-6 col-xs-12 col-sm-6">
            <div class="panel purple">
              <div class="symbol">
                <i class="fa fa-gavel"></i>
              </div>
              <div class="state-value">
                <div class="value">{{num1}}</div>
                <div class="title">用户数量</div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-xs-12 col-sm-6">
            <div class="panel red">
              <div class="symbol">
                <i class="fa fa-tags"></i>
              </div>
              <div class="state-value">
                <div class="value">{{num2}}</div>
                <div class="title">电表数量</div>
              </div>
            </div>
          </div>
        </div>
        <div class="row state-overview">
          <div class="col-md-6 col-xs-12 col-sm-6">
            <div class="panel blue">
              <div class="symbol">
                <i class="fa fa-money"></i>
              </div>
              <div class="state-value">
                <div class="value">{{num3}}</div>
                <div class="title"> 预售额</div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-xs-12 col-sm-6">
            <div class="panel green">
              <div class="symbol">
                <i class="fa fa-eye"></i>
              </div>
              <div class="state-value">
                <div class="value">{{num4}}</div>
                <div class="title"> 今日新增用户</div>
              </div>
            </div>
          </div>
        </div>
        <!--statistics end-->
      </div>
      <div class="col-md-6">
        <!--more statistics box start-->
        <div class="panel deep-purple-box">
          <div class="panel-body">
            <div class="row">
              <div id="myChart" :style="{width: '100%', height: '220px'}"></div>
            </div>
          </div>
        </div>
        <!--more statistics box end-->
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
    mounted(){
      this.drawLine();
    },
    data () {
      return {
        num1:0,
        num2:0,
        num3:0,
        num4:0,
        option: {
          title: {
            text: '每月新增电表数',
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
              name:'每月新增电表数',
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
        },
      }
    },
    methods: {
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption(this.option);
        window.addEventListener("resize", function () {
          setTimeout(function () {
            myChart.resize();
          }, 500)
        });

        my_post("/home/queryByHome", "",(state,msg,json)=>{
          let data =[]
          let series_data =[]
          for(let i=0;i<json.queryByMonth.length;i++){
            data.push(json.queryByMonth[i].month)
            series_data.push({name:json.queryByMonth[i].month,value:json.queryByMonth[i].num})
          }
            myChart.setOption({
              legend: {data:data},
              series:{data:series_data}
            })

          this.num1=json.queryBy1.num
          this.num2=json.queryBy2.num
          this.num3=json.queryBy3.num
          this.num4=json.queryBy4.num
        },(state,msg,json)=>{})
      }
    }
  };
</script>
