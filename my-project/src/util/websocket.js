import io from 'socket.io-client'
import store from '../store/store'
import {getloginUser} from './user'
import {myMessage} from './message';
import {isNotNull} from './isNotNull';
import { Notification } from 'element-ui';
import {signOutUser} from './user'
import Print from 'print-js'
// 跳转页面
export function  connect(){
  let loginuserid = getloginUser().loginuserid
  let token = getloginUser().token
  // 已经连接
  if(store.state.user.socket){
    return
  }

  // 未登录
  if(!isNotNull(loginuserid)){
    return
  }
  let socket = io.connect('localhost:8888?ui_id='+loginuserid+"&token="+token)
  socket.on('message', (obj) => {
    myMessage({message:obj})
  })
  socket.on('notify', (obj) => {
      Notification({
        duration: 0,
        dangerouslyUseHTMLString: true,
        onClick:() =>{
          Print({
            printable: 'print_'+decodeURIComponent(obj.data.o_id),
            type: 'html',
            // 继承原来的所有样式
            targetStyles: ['*']
          })
        },
        title: '点击缴费单即可打印',
        message:
        '<table class="mytable" id="print_'+decodeURIComponent(obj.data.o_id)+'" style=" margin-top: 30px; width: 280px;">' +
        '      <tr style="border: 1px solid #cad9ea;color: #666;text-align: center;">' +
        '        <td colspan="2"  style="border: 1px solid #cad9ea;color: #666;text-align: center;">缴费单</td>' +
        '      </tr>' +
        '      <tr style="border: 1px solid #cad9ea;color: #666;text-align: center;">' +
        '        <td style="border: 1px solid #cad9ea;color: #666;text-align: center;width: 100px">表号</td>' +
        '        <td style="border: 1px solid #cad9ea;color: #666;text-align: center;">'+decodeURIComponent(obj.data.m_no)+'</td>' +
        '      </tr>' +
        '      <tr style="border: 1px solid #cad9ea;color: #666;text-align: center;">' +
        '        <td style="border: 1px solid #cad9ea;color: #666;text-align: center;">用户名</td>' +
        '        <td style="border: 1px solid #cad9ea;color: #666;text-align: center;">'+decodeURIComponent(obj.data.ui_name)+'</td>' +
        '      </tr>' +
        '      <tr style="border: 1px solid #cad9ea;color: #666;text-align: center;">' +
        '        <td style="border: 1px solid #cad9ea;color: #666;text-align: center;">单价</td>' +
        '        <td style="border: 1px solid #cad9ea;color: #666;text-align: center;">'+decodeURIComponent(obj.data.p_price)+'</td>' +
        '      </tr>' +
        '      <tr style="border: 1px solid #cad9ea;color: #666;text-align: center;">' +
        '        <td style="border: 1px solid #cad9ea;color: #666;text-align: center;">电量</td>' +
        '        <td style="border: 1px solid #cad9ea;color: #666;text-align: center;">'+decodeURIComponent(obj.data.p_electric)+'</td>' +
        '      </tr>' +
        '      <tr style="border: 1px solid #cad9ea;color: #666;text-align: center;">' +
        '        <td style="border: 1px solid #cad9ea;color: #666;text-align: center;">金额</td>' +
        '        <td style="border: 1px solid #cad9ea;color: #666;text-align: center;">'+decodeURIComponent(obj.data.p_money)+'</td>' +
        '      </tr>' +
        '      <tr style="border: 1px solid #cad9ea;color: #666;text-align: center;">' +
        '        <td style="border: 1px solid #cad9ea;color: #666;text-align: center;">余量</td>' +
        '        <td style="border: 1px solid #cad9ea;color: #666;text-align: center;">'+decodeURIComponent(obj.data.m_electricity)+'</td>' +
        '      </tr>' +
        '      <tr style="border: 1px solid #cad9ea;color: #666;text-align: center;">' +
        '        <td style="border: 1px solid #cad9ea;color: #666;text-align: center;">token</td>' +
        '        <td style="border: 1px solid #cad9ea;color: #666;text-align: center;">'+decodeURIComponent(obj.data.o_token)+'</td>' +
        '      </tr>' +
        '      <tr style="border: 1px solid #cad9ea;color: #666;text-align: center;">' +
        '        <td style="border: 1px solid #cad9ea;color: #666;text-align: center;">日期</td>' +
        '        <td style="border: 1px solid #cad9ea;color: #666;text-align: center;">'+decodeURIComponent(obj.data.create_time) +'</td>' +
        '      </tr>' +
        '      <tr style="border: 1px solid #cad9ea;color: #666;text-align: center;">' +
        '        <td style="border: 1px solid #cad9ea;color: #666;text-align: center;">信息</td>' +
        '        <td style="border: 1px solid #cad9ea;color: #666;text-align: center;">'+decodeURIComponent(obj.data.o_remarks)+'</td>' +
        '      </tr>' +
        '    </table>',
      });
   /* Notification({
      title: decodeURIComponent(obj.title),
      message: decodeURIComponent(obj.message),
      duration: 0,
      type: 'success'
    });*/
  })
  socket.on('signOut', (obj) => {
    myMessage({message:obj.message})
    signOutUser()
    store.state.user.socket.disconnect();
    location.reload();
  })
  socket.on('chat', (obj) => {
    store.commit('editChat',obj)
  })
  socket.on('disconnect', (obj) => {
    myMessage({message:'退出登录'})
  })
  store.commit('editUser',{list: [{name: 'socket',value:socket }]})
}
