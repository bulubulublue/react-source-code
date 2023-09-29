import React, { useContext } from "react";

import RouterContext from "../context/RouterContext";
import matchPath from "../utils/matchPath";

/*
    switch组件会遍历每个Route子元素，如果路由相同，则渲染该子元素，
    如果找到了第一个匹配的子元素，则不再进行后续匹配
*/
export default function Switch({ children }) {
  // location: 包含当前浏览器url地址信息
  const { location } = useContext(RouterContext);
  let element, match;
  // 使用React.Children.forEach来遍历子元素，而不能使用React.Children.toArray().find()
  // 因为toArray会给每个子元素添加一个key，这会导致两个有同样component，但是不同URL的<Route>重复渲染
  React.Children.forEach(children, (child) => {
    // 先检测下match是否已经匹配到了
    // 如果已经匹配过了，直接跳过
    if (!match && React.isValidElement(child)) {
      element = child;
      const path = child.props.path; // Route组件对应路由
      match = matchPath(location.pathname, { ...child.props, path });
    }
  });

  // 最终<Switch>组件的返回值只是匹配子元素的一个拷贝，其他子元素被忽略了
  // match属性会被塞给拷贝元素的computedMatch
  // 如果一个都没匹配上，返回null

  return match
    ? React.cloneElement(element, { location, computedMatch: match })
    : null;
}
