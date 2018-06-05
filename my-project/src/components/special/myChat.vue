<template>

  <el-dialog title="聊天" :visible.sync="user.open" width="600px" height="600px" :modal-append-to-body="false" :before-close="handleClose">
    <div class="wrapper " >
      <div class="row">
        <div class="col-md-12">
          <div class="panel">
            <div class="panel-body">
              <ul class="chats cool-chat myChat" style="max-height: 300px;overflow:scroll;">
                <li :class="[record.sender==user.loginuserid?'out':'in']" v-for="record in user.chatRecord">
                  <img :src="record.img" alt="" class="avatar">
                  <div class="message">
                    <span class="arrow"></span>
                    <a class="name" href="#">{{record.sender_name}}</a>
                    <span class="datetime">{{record.time}}</span>
                    <span class="body">{{record.msg}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <div class="chat-form " style="background-color:transparent">
          <div class="form-group">
            <el-input v-model="user.sendMsg" placeholder="请输入内容"></el-input>
          </div>
         <el-button  type="primary" :class="'my_btn'" @click="send()" >发送</el-button>
      </div>
    </span>
  </el-dialog>
</template>
<style  scoped  rel="stylesheet/scss">
  .my_btn {
    background-color: #424F63;
    border-color: #374152;
    color: #FFFFFF;
    padding: 12px 16px;
  }
  .my_btn:hover, .btn-primary:focus, .btn-primary:active, .btn-primary.active, .open .dropdown-toggle.btn-primary {
    background-color: #374152;
    border-color: #2e3644;
    color: #FFFFFF;
    padding: 12px 16px;
  }
</style>

<script>
  import niceScroll from 'jquery.nicescroll';
  import $ from 'jquery'
  import {handleClose} from '../../util/util';
  export default {
    computed:{
      socket(){                        //数据
        return this.$store.state.user.socket ;
      },
      user(){
        return this.$store.state.user;
      }
    },
    methods: {
      handleClose(done) {
        handleClose(done,this)
      },
      send(){

        /*this.socket.emit('OnMSG', {msg:this.sendMsg,'from':this.user.loginuserid})*/
        let msg = {
          img:'https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=374501421,1594665386&fm=85&s=5EB28645EE316E0D14A03CD50100D0E2',
          sender:this.user.loginuserid,
          sender_name:this.user.loginuserid,
          recipient:'',
          recipient_name:'',
          msg:this.user.sendMsg
        }
        this.socket.emit('chat', msg)

        this.user.sendMsg=''
      }
    },
    watch: {
      'user.open': function(){
        $(".myChat").niceScroll({styler:"fb",cursorcolor:"#65cea7", cursorwidth: '3', cursorborderradius: '0px', background: '#424f63', spacebarenabled:false, cursorborder: '0'});
      },
    },
  };
</script>

