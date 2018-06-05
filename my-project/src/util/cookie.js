//获取cookie、
export function getCookie(key) {
  return localStorage.getItem(key);
}

//设置cookie,增加到vue实例方便全局调用
export function setCookie (key, value) {
  localStorage.setItem(key, value);
};

//删除cookie
export function delCookie (key) {
  localStorage.removeItem(key);
};
