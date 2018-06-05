<!--主体内容的头部：个人信息，消息等等-->
<template>

  <div class="header-section">

    <!--toggle button start-->
    <a class="toggle-btn" @click="setType" v-bind:class="{ 'menu-collapsed':menuType==1 }"><i class="fa fa-bars"></i></a>
    <!--toggle button end-->

    <!--search start-->
  <!--  <form class="searchform" action="/home" method="post">
      <input type="text" class="form-control" name="keyword" placeholder="Search here..." />
    </form>-->
    <div style="float: left;margin: 13px 0 0 10px;font-size: 20px">
     <b> {{activeMenu.name}}</b>
    </div>
    <!--search end-->

    <!--notification menu.js start -->
    <div class="menu-right">
      <ul class="notification-menu">
       <!-- <li>
          <a href="#" class="btn btn-default dropdown-toggle info-number" data-toggle="dropdown">
            <i class="fa fa-bell-o"></i>
            <span class="badge">4</span>
          </a>
          <div class="dropdown-menu dropdown-menu-head pull-right">
            <h5 class="title">最新消息</h5>
            <ul class="dropdown-list normal-list">
              <li class="new">
                <a href="">
                  <span class="label label-danger"><i class="fa fa-bolt"></i></span>
                  <span class="name">新增用户 </span>
                  <em class="small">2018-02-03 08:20:21</em>
                </a>
              </li>
              <li class="new">
                <a href="">
                  <span class="label label-danger"><i class="fa fa-bolt"></i></span>
                  <span class="name">新增用户 </span>
                  <em class="small">2018-02-03 08:20:21</em>
                </a>
              </li>
              <li class="new">
                <a href="">
                  <span class="label label-danger"><i class="fa fa-bolt"></i></span>
                  <span class="name">新增用户 </span>
                  <em class="small">2018-02-03 08:20:21</em>
                </a>
              </li>
              <li class="new">
                <a href="">
                  <span class="label label-danger"><i class="fa fa-bolt"></i></span>
                  <span class="name">新增用户 </span>
                  <em class="small">2018-02-03 08:20:21</em>
                </a>
              </li>
              <li class="new"><a href="">查看全部</a></li>
            </ul>
          </div>
        </li>-->
        <li>
          <a href="#" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
            <img :src="photo" alt="" />
            {{username}}
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu dropdown-menu-usermenu pull-right">
            <li><a href='javascript:;' @click='manager()'><i class="fa fa-user"></i>  用户信息</a></li>
            <!--<li><a href='javascript:;' @click='chat()'><i class="fa fa-user"></i>  聊天</a></li>
            --><li><a href='javascript:;' @click='goFirst()'><i class="fa fa-user"></i>  退出</a></li>
          </ul>
        </li>

      </ul>

      <my-chat ></my-chat>
      <my-user ></my-user>
    </div>
    <!--notification menu.js end -->

  </div>
</template>
<script>
  import store from '../store/store'
  import {goTo} from '../util/util'
  import {isNotNull} from '../util/isNotNull'
  import {getImg} from '../util/util'
  import {getloginUser} from '../util/user'
  import MyChat from './special/myChat.vue'
  import MyUser from './special/myUser.vue'
  export default{
    components: {
      MyChat,
      MyUser
    },
      computed:{
        activeMenu(){                        //数据
          return this.$store.state.menu.activeMenu;
        },
      menuType(){                        //数据
        return this.$store.state.menu.type;
      },
      open(){                        //数据
        return this.$store.state.user.open;
      },
        photo(){                        //数据
            let newList = getImg(this.$store.state.user.photo)
            if(isNotNull(newList)){
              return newList[0].url;
            }
      },
        username(){                        //数据
        return this.$store.state.user.ui_name;
      },
    },
    methods: {
      setType: function () {
        if(this.menuType==0){
          store.commit('editMenu',{list: [{name: 'type',value: 1}]})
        }else{
          store.commit('editMenu',{list: [{name: 'type',value: 0}]})
        }
      },
      goFirst: function (){
        location.reload();
        store.commit('editMenu',{list: [{name: 'menuList',value: []}]})
        store.commit('editJurisdiction',{list: [{name: 'jurisdictionList',value: []}]})
        goTo({menu_linkurl:'signOut'},this)
      },
      chat: function (){
          store.commit('editUser',{list: [{name: 'open',value: true}]})
      },
      manager: function (){
        let user = getloginUser()
        let vm = store.state.modules.special_user;
        console.log('vm-------')
        console.log(vm)
        for( let i = 0;i< vm.dialog.list.length;i++){
          if(vm.dialog.list[i].name == 'edit'){
            console.log(vm.dialog.list[i])

            vm.dialog.list[i].data.id=user.loginuserid
            vm.dialog.list[i].data.show = true
          }
        }
      },
    },
    mounted: function () {
    }
  }
</script>
