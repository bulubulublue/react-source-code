# master

实现路由跳转

1. Route 组件:
   接收参数:

   1. path: 组件对应的路由
   2. exact: 是否精确匹配（要求路由完全一致）
   3. component: 需要渲染的组件
      通过判断浏览器 url 和组件对应的路由是否一致，判断是渲染 null 或者传递进来的 component
      监听 navigate 事件，当点击链接跳转时，事件被触发，重新获取 window.location.pathname, 并引起页面重新渲染
      监听 popstate 事件，当点击浏览器上的前进/后退按钮时，事件被触发,并引起页面重新渲染

2. Link 组件
   接收参数: 1. to: 跳转路由 2. replace: 跳转时是否使用 replace 模式
   使用 a 标签, 禁用 a 标签的默认跳转功能
   当点击 a 标签时，调用 window.history.pushState 或者 window.history.replaceState 方法，更新浏览器的路由
   触发 navigate 事件
