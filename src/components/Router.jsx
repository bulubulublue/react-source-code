import React, { useEffect, useRef, useState } from "react";
import HistoryContext from "../context/HistoryContext";
import RouterContext from "../context/RouterContext.js";

export default function Router({ history, children }) {
  const [location, setLocation] = useState(history.location);

  // 下面两个变量是防御性代码，防止根组件还没渲染location就变了
  // 如果location变化时，当前根组件还没渲染出来，就先记下他，等当前组件mount了再更新location的值
  const _isMounted = useRef(false);
  const _pendingLocation = useRef(null);

  const computeRootMatch = (pathname) => {
    return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
  };

  // 通过history监听路由变化，变化的时候，改变state上的location
  const unlisten = history.listen((location) => {
    if (_isMounted.current) {
      setLocation({ location });
    } else {
      _pendingLocation.current = location;
    }
  });

  useEffect(() => {
    _isMounted.current = true;

    if (_pendingLocation.current) {
      this.setState({ location: _pendingLocation.current });
    }

    return () => {
      if (unlisten) {
        unlisten();
        _isMounted.current = false;
        _pendingLocation.current = null;
      }
    };
  }, []);

  return (
    <RouterContext.Provider
      value={{
        history,
        location,
        match: computeRootMatch(location.pathname),
      }}
    >
      <HistoryContext.Provider children={children || null} value={history} />
    </RouterContext.Provider>
  );
}
