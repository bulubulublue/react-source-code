import React, { useEffect, useState } from "react";

interface IRouteProp {
  path: string;
  exact: boolean;
  component: any;
}

export default function Route({ path, exact, component }: IRouteProp) {
  const [currentPath, setCurrentPath] = useState("");

  //todo 目前使用useState来触发页面的更新
  const handleRouteChange = (e) => {
    console.log("route", e);
    // setCurrentPath(e)
  };

  // todo 是否需要添加该监听?listen if the url is changed throught back/forward
  useEffect(() => {
    window.addEventListener("popstate", handleRouteChange);

    return window.removeEventListener("popstate", handleRouteChange);
  }, []);

  /*
    pathname: 当前地址栏的地址
    path: 定义路由时给每个页面定义的地址

    如果定义Route的时候没有传入path参数，则默认渲染
    如果传入exact，表示精确匹配，如 路由定义为 /home, 实际地址栏url为/home/123, 非精确模式下，依旧可以匹配
  */
  const matchPath = (pathname, options) => {
    const { exact = false, path } = options;

    // 如果一个Route没有path属性的话，默认就会渲染（类似layout的作用）
    if (!path) {
      return {
        path: null,
        url: pathname,
        isExact: true,
      };
    }

    // 如果匹配到的话，match的值类似['/', index: 0, input: '/', groups: undefined]，否则为null
    const match = new RegExp(`^${path}`).exec(pathname); //验证地址栏的地址是否以页面的地址开头
    const url = match?.[0];

    if (!url) {
      return null;
    }

    const isExact = pathname === url; // 精确匹配
    if (exact && !isExact) {
      return null;
    }

    return {
      path,
      url,
      isExact,
    };
  };

  const match = matchPath(window.location.pathname, { path, exact });

  // 如果没有matched route
  if (!match) {
    return null;
  }

  if (component) {
    return React.createElement(component, { match });
  }
}
