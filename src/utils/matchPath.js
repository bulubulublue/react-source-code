import {pathToRegexp} from "path-to-regexp";
const cache = {};
const cacheLimit = 10000;
let cacheCount = 0;


/**
 * 
 * @param {*} path: 定义Route组件时对应的路由
 * @param {*} options :定义Route组件时对应的参数 {end:exact; strict, sensitive }
 * @returns 
 * {
 *  regexp: Route组件对应的路由生成的正则
 *  keys: 路由中参数的key对应的数组
 * }
 */
function compilePath(path, options) {
  const cacheKey = `${options.end}${options.strict}${options.sensitive}`;
  const pathCache = cache[cacheKey] || (cache[cacheKey] = {}); // 将判断为的路由存储在缓存对象里，如果有缓存结果，则直接使用

  if (pathCache[path]) return pathCache[path];

  const keys = [];
  const regexp = pathToRegexp(path, keys, options);
  const result = { regexp, keys };

  if (cacheCount < cacheLimit) {
    pathCache[path] = result;
    cacheCount++;
  }

  return result;
}

/**
 * pathname: 浏览器的url地址
 * options：定义Route组件时传入的参数
 */
function matchPath(pathname, options = {}) {
  // console.log(pathname,options)
  if (typeof options === "string" || Array.isArray(options)) {
    options = { path: options };
  }

  const { path, exact = false, strict = false, sensitive = false } = options;

  const paths = [].concat(path);

  return paths.reduce((matched, path) => {
    if (!path && path !== "") return null;
    if (matched) return matched;

    // regexp: Route组件对应的路由生成的正则
    //  keys: 路由中参数的key对应的数组
    const { regexp, keys } = compilePath(path, {
      end: exact,
      strict,
      sensitive,
    });
    const match = regexp.exec(pathname);

    if (!match) return null;

    const url = match?.[0] //浏览器url符合路由正则的值
    const values = match.slice(1) // 路由中参数对应的值的数组
    const isExact = pathname === url;

    if (exact && !isExact) return null;

    return {
      path, // the path used to match，即Route对应的路由
      url: path === "/" && url === "" ? "/" : url, // the matched portion of the URL
      isExact, // whether or not we matched exactly
      params: keys.reduce((memo, key, index) => {
        memo[key.name] = values[index];
        return memo;
      }, {}), // 路由中的参数生成的对象
    };
  }, null);
}

export default matchPath;
