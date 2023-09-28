import React, { useContext } from "react";
import RouterContext from "../context/RouterContext";

// LinkAnchor只是渲染了一个没有默认行为的a标签
// 跳转行为由传进来的navigate实现
function LinkAnchor({ navigate, ...rest }) {
  const handleClick = (e) => {
    e.preventDefault();
    navigate();
  }

  return <a {...rest} onClick={handleClick} />;
}

function Link({
  component = LinkAnchor, // component默认是LinkAnchor
  to,
  replace,
  ...rest
}) {
  const routerContext = useContext(RouterContext);
  const history = routerContext.history;
  const navigate = () => {
    if (replace) {
      history.replace(to);
    } else {
      history.push(to);
    }
  };

  const props = {
    href: to,
    navigate,
    ...rest,
  };

  return React.createElement(component, props);
}

export default Link;
