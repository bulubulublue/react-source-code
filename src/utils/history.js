// 创建和管理listeners的方法
function createEvents() {
  let handlers = [];

  return {
    push(fn) {
      handlers.push(fn);
      return function () {
        handlers = handlers.filter((handler) => handler !== fn);
      };
    },
    call(arg) {
      handlers.forEach((fn) => fn && fn(arg));
    },
  };
}

function createBrowserHistory() {
  const listeners = createEvents();
  let location = {
    pathname: "/",
  };

  // 使用push跳转路由
  // ，第一个参数​​state​​​是往新路由传递的信息，可以为空，官方​​React-Router​​​会往里面加一个随机的​​key​​​和其他信息，我们这里直接为空吧，第二个参数​​title​​​目前大多数浏览器都不支持，可以直接给个空字符串，第三个参数​​url​​是可选的，是我们这里的关键，这个参数是要跳往的目标地址。
  const push = function (url) {
    const history = window.history;
    // 这里pushState并不会触发popstate
    // 但是我们仍然要这样做，是为了保持state栈的一致性
    history.pushState(null, "", url);

    // 由于push并不触发popstate，我们需要手动调用回调函数
    location = { pathname: url };
    listeners.call(location);
  };

  const replace = function (url) {
    const history = window.history;
    history.replaceState(null, "", url);

    location = { pathname: url };
    listeners.call(location);
  };

  // 前进/后退时回调(只有当路由是通过pushState或者replaceState跳转时，再点击前进后退才有效)
  const handlePop = function () {
    const currentLocation = {
      pathname: window.location.pathname,
    };
    listeners.call(currentLocation); // 路由变化时执行回调
  };

  // 监听popstate事件
  // 注意pushState和replaceState并不会触发popstate
  // 但是浏览器的前进后退会触发popstate
  // 我们这里监听这个事件是为了处理浏览器的前进后退
  window.addEventListener("popstate", handlePop);

  // 返回的history上有个listen方法
  const history = {
    listen(listener) {
      return listeners.push(listener);
    },
    location,
    push,
    replace,
  };

  return history;
}

export { createBrowserHistory };
