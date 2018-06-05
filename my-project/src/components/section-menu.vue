<!--菜单栏目,个人信息等等-->
<template>
      <!-- 菜单栏目开始-->
      <div class="left-side sticky-left-side">
      <!--  <my-chat ></my-chat>-->
        <!-- 菜单栏目logo开始,有两个样式的logo -->
        <div class="logo" >
          <a  href='javascript:;' @click='goFirst({menu_linkurl:"home"})'><img src="../../src/assets/bootstrap/images/logo.png" alt=""></a>
        </div>
        <div class="logo-icon text-center">
          <a href='javascript:;' @click='goFirst({menu_linkurl:"home"})'><img src="../../src/assets/bootstrap/images/logo_icon.png" alt=""></a>
        </div>
        <!-- 菜单栏目logo结束 -->


        <div class="left-side-inner">

          <!-- 显示用户信息开始， 小屏幕时显示在section-menu.js，大屏幕时显示在section-header -->
          <div class="visible-xs hidden-sm hidden-md hidden-lg">
            <div class="media logged-user">
              <img alt="" src="../../src/assets/bootstrap/images/photos/user-avatar.png" class="media-object">
              <div class="media-body">
                <h4><a href="#">管理员</a></h4>
              </div>
            </div>
            <ul class="nav nav-pills nav-stacked custom-nav">
              <li><a href="#"><i class="fa fa-user"></i> <span>用户信息</span></a></li>
            </ul>
          </div>
          <!-- 显示用户信息结束， 小屏幕时显示在section-menu.js，大屏幕时显示在section-header -->
          <!-- 遍历栏目开始 v-if="menu.js.show" v-if="info.show" -->
          <ul class="nav nav-pills nav-stacked custom-nav">
            <li v-bind:class="{ 'menu-list': menu.children,'nav-active':menu.menu_ifturn==1&&menu.children,'nav-hover':menuType==1&&menu.menu_ifturn==1&&menu.children}"  v-for="menu in menuList" v-if="menu.menu_valid==1" >
              <a href='javascript:;' @click='goFirst(menu)'><i class="fa" :class="menu.menu_imgurl"></i> <span>{{ menu.menu_name }}</span></a>
              <ul class="sub-menu-list" v-if="menu.children">
                <li v-for="info in menu.children" v-if="info.menu_valid==1" v-bind:class="info.menu_linkurl==activeMenu.value ? 'active' : ''" ><a href='javascript:;' @click='goFirst2(info)'> {{info.menu_name}}</a></li>
              </ul>
            </li>
          </ul>
          <!-- 遍历栏目结束 -->
        </div>

      </div>
      <!-- 菜单栏目结束-->


</template>

<script>
  import store from '../store/store'
  import {getModuleName} from '../util/util';
  import {goTo} from '../util/util';
  import MyChat from './special/myChat.vue'
  export default{

    components: {
      MyChat
    },
    computed:{
      menuList(){                        //数据
        return this.$store.state.menu.menuList;
      },
      activeMenu(){                        //数据
        return this.$store.state.menu.activeMenu;
      },
      menuType(){                        //数据
        return this.$store.state.menu.type;
      },
    },
    watch: {                  //监控queryNo值是否变化，如果有变化重新查询
      menuType: 'setType',
    },
    methods: {
      goFirst: function (menu){
        goTo(menu,this)
      },
      goFirst2: function (menu){
        this.activeMenu.value=menu.menu_linkurl
        this.activeMenu.name=menu.menu_name
        goTo(menu,this)
      },
      setType: function(){
        if(this.menuType==0){
          $(".left-side").getNiceScroll().show()
        }else{
          $(".left-side").getNiceScroll().hide()
        }
      },
    },
    mounted: function () {
      //初始化niceScroll
      $(".left-side").niceScroll({styler:"fb",cursorcolor:"#65cea7", cursorwidth: '3', cursorborderradius: '0px', background: '#424f63', spacebarenabled:false, cursorborder: '0'});

    },
    watch: {                  //监控queryNo值是否变化，如果有变化重新查询
      'menuList' (to, from) {
        let name  = getModuleName(this.$route.path)
        for(let i=0;i< to.length;i++){
          for(let l=0;l< to[i].children.length;l++){
            if(to[i].children[l].menu_linkurl.substring(1)==name){
              this.activeMenu.value=to[i].children[l].menu_linkurl
              this.activeMenu.name=to[i].children[l].menu_name
            }
          }
        }
      }
    },
  }
</script>





