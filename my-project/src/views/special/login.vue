<template>
  <div class="login-body">
    <div class="container">

      <form class="form-signin" action="manage">
        <div class="form-signin-heading text-center">
          <h1 class="sign-title">登录</h1>
          <img src="../../assets/bootstrap/images/login-logo.png" alt=""/>
        </div>
        <div class="login-wrap">
          <input type="text" class="form-control" placeholder="帐号" autofocus v-model="usercode">
          <input type="password" class="form-control" placeholder="密码" @keyup.enter ="login"v-model="password">

          <button class="btn btn-lg btn-login btn-block" type="button"  v-on:click="login">
            <i class="fa fa-check"></i>
          </button>

         <!-- <div class="registration">
            没有帐号？
            <a class="" href="home">
              注册
            </a>
          </div>-->
          <label class="checkbox">
            <input type="checkbox" value="remember-me" v-model="isCookie"> 自动登录
            <span class="pull-right">
              <el-popover
                ref="popover2"
                placement="bottom"
                title="请联系后台管理人员"
                width="200"
                trigger="click"
                content="联系电话：15212345678">
              </el-popover>
              <!--<el-button type="text" style="color: #fff;padding: 0" v-popover:popover2>忘记密码</el-button>-->
             </span>
          </label>

        </div>


      </form>
    </div>
  </div>
</template>
<script>
  import {getCookie} from '../../util/cookie'
  import {setCookie} from '../../util/cookie'
  import {delCookie} from '../../util/cookie'
  import {setMenu} from '../../util/menu'
  import {setUser} from '../../util/user'
  import {loginUser} from '../../util/user'
  import {getloginUser} from '../../util/user'
  import {ajaxState} from '../../util/util'
  import {my_post} from '../../util/util'
  import {myMessage} from '../../util/message';
  import io from 'socket.io-client'
  import store from '../../store/store'
  import {mapGetters} from 'vuex'
  export default{
    data () {
      return {
        usercode: '',
        password:'',
        isCookie:false
      }
    },
    methods: {
      login: function () {
        let params = new URLSearchParams()
        params.append('ui_code',this.usercode)
        params.append('ui_password',this.password)
        params.append('isCookie',this.isCookie)

        my_post('/user/login', params,(state,msg,json)=>{
          loginUser(json,this.isCookie)
          myMessage({message: '登录成功',type: 'success'})
          setMenu()
          this.$router.push('/home')
        },(state,msg,json)=>{})
      }
    },
    computed: {
      ...mapGetters([
        'getSocket'
      ])
    },
   mounted () { //初始化
      const auto_login = getloginUser().auto_login; //获取Cookie
      if(auto_login){
        this.$router.push('/home')
      }
    },

  }
</script>
