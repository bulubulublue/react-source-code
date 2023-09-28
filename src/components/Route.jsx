import React, { useContext } from "react";
import RouterContext from "../context/RouterContext";
import matchPath from "../utils/matchPath";

export default function Route({
  component,
  path,
  exact = false,
  strict = false,
  sensitive = false,
}) {
  // history: createHistory生成的对象
  // location: 当前浏览器url信息
  const routerContext = useContext(RouterContext);

  const location = routerContext.location;
  const match = matchPath(location.pathname, {
    path,
    exact,
    strict,
    sensitive,
  }); // 调用matchPath检测当前路由是否匹配

  const newProps = { ...routerContext, location, match };

  // render对应的component之前先用最新的参数match更新下RouterContext
  // 这样下层嵌套的Route可以拿到对的值
  return (
    <RouterContext.Provider value={newProps}>
      {newProps.match ? React.createElement(component, newProps) : null}
    </RouterContext.Provider>
  );
}
