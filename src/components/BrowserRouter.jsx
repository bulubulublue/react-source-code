import { createBrowserHistory as createHistory } from "history";
import Router from "./Router";

export default function BrowserRouter(props) {
  /*
    createHistory方法返回一个对象，对象属性
    location: 返回当前路由的信息
        let location  = history.location
        console.log(location) // {pathname: '/home', search: '', hash: '', state: null, key: 'default'}
    listen和unlisten
      // history.listen方法调用时就会开启路由变化的监听，该方法返回一个函数，调用该函数可以取消监听（该监听只有当调用push等api变更路由时才会触发)
        action: PUSH 
        location.pathname: /home
        location.state: { some: "state" }
        const changeRoute = () => {
            history.push("/home", { some: "state" });
        };
        let unlisten = history.listen(({ location, action }) => {
            console.log(action, location.pathname, location.state);
        });
        unlisten();
    路由跳转
        -push: history.push("/home", { some: "state" });
        -replace: history.replace("/logged-in");
        -back: history.back();
    push方法的实现:
    window.history.pushState({ key, state }, null, href);
    setState({ action, location });
    注意:
    window可以监听popstate事件，但是执行pushState或者replaceState是不会触发该事件的，
    只有点击浏览器的前进后退按钮时才会触发，因此调用pushState方法只是改变了地址栏的url，其他的没有任何变化
    */
  const history = createHistory(props);

  return (
    <>
      <Router history={history} children={props.children} />
    </>
  );
}
