<template>
  <div id="app" v-bind:class="{ 'left-side-collapsed':clientWidth>768&&menuType==1,'left-side-show':clientWidth<=768&&menuType==0 }">
    <div id="app_logon">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import jQuery from 'jquery'
  import niceScroll from 'jquery.nicescroll';
  import store from './store/store'
  import {getCookie} from './util/cookie'
  import {setMenu} from './util/menu'
  export default {
    name: 'app',
    data(){
      return {
        clientWidth: 1000,
      }
    },
    mounted: function () {
     this.menu()
      $("#app").niceScroll({styler:"fb",cursorcolor:"#65cea7", cursorwidth: '6', cursorborderradius: '0px', background: '#424f63', spacebarenabled:false,railoffset:true, cursorborder: '0',  zindex: '1000'});

      this.clientWidth = `${document.documentElement.clientWidth}`;
      // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
      const that = this;
      window.onresize = function temp() {
        that.clientWidth = `${document.documentElement.clientWidth}`;
      };
     },
    computed:{
      menuList(){                        //数据
        return this.$store.state.menu.menuList;
      },
      menuType(){                        //数据
        return this.$store.state.menu.type;
      },
      user(){                        //数据
        return this.$store.state.user ;
      },
      socket(){                        //数据
        return this.$store.state.user.socket ;
      },
    },
    methods: {
      menu () {                //查询
        setMenu()
      },
      initSocket(){
        if(this.socket){

          setTimeout(()=>{
          //  this.socket.emit('OnMSG', {msg:'有人登录了','from':this.user.loginuserid})
          }, 1000);
        }
      }
    },
    watch: {                  //监控queryNo值是否变化，如果有变化重新查询
      'user.socket': 'initSocket',
    },
  }
</script>

<!--<style lang="scss" scoped="">-->
<style  scoped  rel="stylesheet/scss">
  #app_logon{
    width: 100%;
    height: 100%;
  }

</style>

