import {initModules} from '../components/module/base/util/initModule'
import sys_meter from './modules/system/meter';
import sys_user from './modules/system/user';
import sys_price from './modules/system/price';
import order_order from './modules/order/order';
import special_user from './modules/system/special_user';
import sys_role from './modules/system/role';
import sys_menu from './modules/system/menu';
import sys_jurisdiction from './modules/system/jurisdiction';
import other_problem from './modules/other/problem';
import other_notice from './modules/other/notice';
import test_test from './modules/test/test';
import home from './modules/home/home';
import menu from './menu';
import jurisdiction from './jurisdiction';
import user from './user';
const state = {
  count:1,
  modules:initModules({
    sys_meter,sys_user,sys_price,order_order,special_user,other_problem,sys_role,sys_menu,sys_jurisdiction,home,other_notice,test_test
  }),
  menu:menu,
  loadingInstance:{},
  user,
  jurisdiction:jurisdiction,
}

export default state

