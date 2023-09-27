import React from "react";

interface ILinkProp {
  to: string;
  replace: boolean; // 当路由跳转时，是否覆盖前一个路由记录
  children: any;
}

export default function Link({ to, replace, children }: ILinkProp) {
  const historyPush = (path) => {
    window.history.pushState({}, "", path);
    const navigationEvent = new PopStateEvent("navigate");
    window.dispatchEvent(navigationEvent);
  };

  const historyReplace = (path) => {
    window.history.replaceState({}, "", path);
    const navigationEvent = new PopStateEvent("navigate");
    window.dispatchEvent(navigationEvent);
  };

  const handleClick = (e) => {
    e.preventDefault();
    replace ? historyReplace(to) : historyPush(to);
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}
