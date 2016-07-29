/**
 * Angular Light 0.12.29
 * (c) 2016 Oleg Nechaev
 * Released under the MIT License.
 * 2016-07-29, http://angularlight.org/ 
 */(function() {
    "use strict";
    function buildAlight() {
        var alight = {
            filters: {},
            text: {},
            ctrl: {},
            core: {},
            utils: {},
            d: {
                al: {},
                bo: {},
                $global: {}
            },
            hooks: {
                directive: [],
                binding: []
            }
        };
        var f$ = {};
        alight.f$ = f$;
        alight.directives = alight.d;
        alight.controllers = alight.ctrl;

        var removeItem = function(list, item) {
            var i = list.indexOf(item);
            if(i >= 0) list.splice(i, 1)
            else console.warn('trying to remove not exist item')
        };
        /* next postfix.js */

/* library to work with DOM */
(function(){
    f$.before = function(base, elm) {
        var parent = base.parentNode;
        parent.insertBefore(elm, base)
    };

    f$.after = function(base, elm) {
        var parent = base.parentNode;
        var n = base.nextSibling;
        if(n) parent.insertBefore(elm, n)
        else parent.appendChild(elm)
    };

    f$.remove = function(elm) {
        var parent = elm.parentNode;
        if(parent) parent.removeChild(elm)
    };

    // on / off
    f$.on = function(element, event, callback) {
        element.addEventListener(event, callback, false)
    };
    f$.off = function(element, event, callback) {
        element.removeEventListener(event, callback, false)
    };

    f$.isFunction = function(fn) {
        return (fn && Object.prototype.toString.call(fn) === '[object Function]')
    };

    f$.isObject = function(o) {
        return (o && Object.prototype.toString.call(o) === '[object Object]')
    };

    f$.isElement = function(el) {
        return el instanceof HTMLElement
    };

    f$.addClass = function(element, name) {
        if(element.classList) element.classList.add(name)
        else element.className += ' ' + name
    };

    f$.removeClass = function(element, name) {
        if(element.classList) element.classList.remove(name)
        else element.className = element.className.replace(new RegExp('(^| )' + name.split(' ').join('|') + '( |$)', 'gi'), ' ')
    };

    f$.rawAjax = function(args) {
        var request = new XMLHttpRequest();
        request.open(args.type || 'GET', args.url, true, args.username, args.password);
        for(var i in args.headers) request.setRequestHeader(i, args.headers[i]);

        if(args.success) {
            request.onload = function() {
                if (request.status >= 200 && request.status < 400){
                    args.success(request.responseText);
                } else {
                    if(args.error) args.error();
                }
            }
        }
        if(args.error) request.onerror = args.error;

        request.send(args.data || null);
    };

    /*
        ajax
            cache
            type
            url
            success
            error
            username
            password
            data
            headers
    */
    f$.ajaxCache = {};
    f$.ajax = function(args) {
        if(args.username || args.password || args.headers || args.data || !args.cache) return f$.rawAjax(args);

        // cache
        var queryType = args.type || 'GET';
        var cacheKey = queryType + ':' + args.url;
        var d = f$.ajaxCache[cacheKey];
        if(!d) f$.ajaxCache[cacheKey] = d = {callback: []};  // data
        if(d.result) {
            if(args.success) args.success(d.result);
            return
        }
        d.callback.push(args);
        if(d.loading) return;
        d.loading = true;
        f$.rawAjax({
            type: queryType,
            url: args.url,
            success: function(result) {
                d.loading = false
                d.result = result;
                for(var i=0;i<d.callback.length;i++)
                    if(d.callback[i].success) d.callback[i].success(result)
                d.callback.length = 0;
            },
            error: function() {
                d.loading = false
                for(var i=0;i<d.callback.length;i++)
                    if(d.callback[i].error) d.callback[i].error()
                d.callback.length = 0;
            }
        })
    };

    // append classes
    (function(){
        var css = '@charset "UTF-8";[al-cloak],[hidden],.al-hide{display:none !important;}';
        var head = document.querySelectorAll('head')[0];

        var s = document.createElement('style');
        s.setAttribute('type', 'text/css');
        if (s.styleSheet) {  // IE
            s.styleSheet.cssText = css;
        } else {
            s.appendChild(document.createTextNode(css));
        }
        head.appendChild(s);
    })();

})();


(function(){

    // Array.indexOf support
    if (!Array.prototype.indexOf) {
      Array.prototype.indexOf = function (searchElement , fromIndex) {
        var i,
            pivot = (fromIndex) ? fromIndex : 0,
            length;

        if (!this) {
          throw new TypeError();
        }

        length = this.length;

        if (length === 0 || pivot >= length) {
          return -1;
        }

        if (pivot < 0) {
          pivot = length - Math.abs(pivot);
        }

        for (i = pivot; i < length; i++) {
          if (this[i] === searchElement) {
            return i;
          }
        }
        return -1;
      };
    };

    // String.prototype.trim
    if(typeof String.prototype.trim !== 'function') {
        String.prototype.trim = function() {
            return this.replace(/^\s+|\s+$/g, ''); 
        }
    };

    if (!Array.isArray) {
      Array.isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
      }
    };

    if (!Object.keys) {
      Object.keys = function(obj) {
        var keys = [];

        for (var i in obj) {
          if (obj.hasOwnProperty(i)) {
            keys.push(i);
          }
        }

        return keys
      }
    };

    if (!Function.prototype.bind) {
      Function.prototype.bind = function(oThis) {
        if (typeof this !== 'function') {
          // ближайший аналог внутренней функции
          // IsCallable в ECMAScript 5
          throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP    = function() {},
            fBound  = function() {
              return fToBind.apply(this instanceof fNOP && oThis
                     ? this
                     : oThis,
                     aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
      };
    }

    // browser detect
    f$.browser = (function(){
        var N= navigator.appName, ua= navigator.userAgent.toLowerCase(), tem;
        var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
        if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
        M= M? [M[1], M[2]]: [N, navigator.appVersion,'-?'];
        return {
            name: M[0],
            version_string: M[1],
            version: Number(M[1].match(/\d+/))
        };
    })();

    var chrome = false;
    var firefox = false;
    var msie = false;
    var $ = window.$;

    if(f$.__jquery) {  // force jQuery on
        msie = 5;
        $ = f$.__jquery;
    } else {
        if(f$.browser.name === 'chrome' || f$.browser.name === 'safari') chrome = true;
        if(f$.browser.name === 'firefox') firefox = f$.browser.version;
        if(f$.browser.name === 'msie') msie = f$.browser.version;
    }

    if(msie && msie < 9) {
        f$.on = function(element, event, callback) {
            $(element).on(event, callback)
        };
        f$.off = function(element, event, callback) {
            $(element).off(event, callback)
        };
    };

    if(msie && msie < 9) {
        f$.ready = function(callback) {
            $(function() {callback()});
        }
    };

    if(msie && msie < 9) {
        var empty = function(){};
        f$.rawAjax = function(args) {
            $.ajax({
                url: args.url,
                type: args.type || 'GET',
                username: args.username,
                password: args.password,
                headers: args.headers,
                data: args.data
            }).then(args.success || empty, args.error || empty)
        }
    };

    if(msie && msie < 9) {
        f$.isElement = function(el) {
            return (typeof el==="object") && (el.nodeType===1) &&
                    (typeof el.style === "object") && (typeof el.ownerDocument ==="object");
        };
    };

})();
f$.ready = (function() {
    var callbacks = [];
    var ready = false;
    function onReady() {
        ready = true;
        f$.off(document, 'DOMContentLoaded', onReady);
        for(var i=0;i<callbacks.length;i++)
            callbacks[i]();
        callbacks.length = 0;
    };
    f$.on(document, 'DOMContentLoaded', onReady);
    return function(callback) {
        if(ready) callback();
        else callbacks.push(callback)
    }
})();

var ChangeDetector, Root, WA, execWatchObject, getFilter, get_time, makeFilterChain, notEqual, scanCore, watchAny, watchInitValue;

alight.ChangeDetector = function(scope) {
  var cd, root;
  root = new Root();
  cd = new ChangeDetector(root, scope || {});
  root.topCD = cd;
  return cd;
};

Root = function() {
  this.watchers = {
    any: [],
    finishBinding: [],
    finishScan: [],
    finishScanOnce: [],
    onScanOnce: []
  };
  this.status = null;
  this.extraLoop = false;
  this.finishBinding_lock = false;
  this.lateScan = false;
  this.topCD = null;
  return this;
};

Root.prototype.destroy = function() {
  this.watchers.any.length = 0;
  this.watchers.finishBinding.length = 0;
  this.watchers.finishScan.length = 0;
  this.watchers.finishScanOnce.length = 0;
  this.watchers.onScanOnce.length = 0;
  if (this.topCD) {
    return this.topCD.destroy();
  }
};

ChangeDetector = function(root, scope) {
  this.scope = scope;
  this.root = root;
  this.watchList = [];
  this.destroy_callbacks = [];
  this.parent = null;
  this.children = [];
  this.rwatchers = {
    any: [],
    finishScan: []
  };
  return this;
};

ChangeDetector.prototype["new"] = function(scope) {
  var cd, parent;
  parent = this;
  cd = new ChangeDetector(parent.root, scope || parent.scope);
  cd.parent = parent;
  parent.children.push(cd);
  return cd;
};

ChangeDetector.prototype.destroy = function() {
  var cd, child, d, fn, j, k, l, len, len1, len2, len3, len4, m, n, ref, ref1, ref2, ref3, ref4, root, wa;
  cd = this;
  root = cd.root;
  cd.scope = null;
  if (cd.parent) {
    removeItem(cd.parent.children, cd);
  }
  ref = cd.children.slice();
  for (j = 0, len = ref.length; j < len; j++) {
    child = ref[j];
    child.destroy();
  }
  ref1 = cd.destroy_callbacks;
  for (k = 0, len1 = ref1.length; k < len1; k++) {
    fn = ref1[k];
    fn();
  }
  cd.destroy_callbacks.length = 0;
  ref2 = cd.watchList;
  for (l = 0, len2 = ref2.length; l < len2; l++) {
    d = ref2[l];
    if (d.onStop) {
      d.onStop();
    }
  }
  cd.watchList.length = 0;
  ref3 = cd.rwatchers.any;
  for (m = 0, len3 = ref3.length; m < len3; m++) {
    wa = ref3[m];
    removeItem(root.watchers.any, wa);
  }
  cd.rwatchers.any.length = 0;
  ref4 = cd.rwatchers.finishScan;
  for (n = 0, len4 = ref4.length; n < len4; n++) {
    wa = ref4[n];
    removeItem(root.watchers.finishScan, wa);
  }
  cd.rwatchers.finishScan.length = 0;
  if (root.topCD === cd) {
    root.topCD = null;
    root.destroy();
  }
};

getFilter = function(name, cd) {
  var error, filter, scope;
  error = false;
  scope = cd.scope;
  if (scope.$ns && scope.$ns.filters) {
    filter = scope.$ns.filters[name];
    if (!filter && !scope.$ns.inheritGlobal) {
      error = true;
    }
  }
  if (!filter && !error) {
    filter = alight.filters[name];
  }
  if (!filter) {
    throw 'Filter not found: ' + name;
  }
  return filter;
};

makeFilterChain = (function() {
  var getId, index;
  index = 1;
  getId = function() {
    return 'wf' + (index++);
  };
  return function(cd, ce, baseCallback, option) {
    var filter, filterArg, filterExp, filterName, filterObject, i, onStop, prevCallback, rindex, root, w, watchMode, watchOptions;
    root = cd.root;
    if (option.isArray) {
      watchMode = 'array';
    } else if (option.deep) {
      watchMode = 'deep';
    } else {
      watchMode = 'simple';
    }
    prevCallback = baseCallback;
    rindex = ce.filters.length;
    onStop = [];
    while (rindex > 0) {
      filterExp = ce.filters[--rindex].trim();
      i = filterExp.indexOf(':');
      if (i > 0) {
        filterName = filterExp.slice(0, +(i - 1) + 1 || 9e9);
        filterArg = filterExp.slice(i + 1);
      } else {
        filterName = filterExp;
        filterArg = null;
      }
      filterObject = getFilter(filterName, cd);
      if (Array.isArray(filterObject)) {
        cd.scope.$changeDetector = cd;
        filter = filterObject[0](filterArg, cd.scope, {
          setValue: prevCallback,
          changeDetector: cd
        });
        cd.scope.$changeDetector = null;
        if (filter.watchMode) {
          watchMode = filter.watchMode;
        }
        if (filter.onStop) {
          onStop.push(filter.onStop);
        }
        if (filter.onChange) {
          prevCallback = filter.onChange;
        }
      } else if (Object.keys(filterObject.prototype).length) {
        cd.scope.$changeDetector = cd;
        filter = new filterObject(filterArg, cd.scope, {
          setValue: prevCallback,
          changeDetector: cd
        });
        cd.scope.$changeDetector = null;
        filter.setValue = prevCallback;
        if (filter.watchMode) {
          watchMode = filter.watchMode;
        }
        if (filter.onStop) {
          onStop.push(filter.onStop.bind(filter));
        }
        if (filter.onChange) {
          prevCallback = filter.onChange.bind(filter);
        }
      } else {
        prevCallback = (function(filter, prevCallback, filterArg, cd) {
          return function(value) {
            return prevCallback(filter(value, filterArg, cd.scope));
          };
        })(filterObject, prevCallback, filterArg, cd);
      }
    }
    watchOptions = {
      oneTime: option.oneTime,
      onStop: function() {
        var fn, j, len;
        for (j = 0, len = onStop.length; j < len; j++) {
          fn = onStop[j];
          fn();
        }
        return onStop.length = 0;
      }
    };
    if (watchMode === 'array') {
      watchOptions.isArray = true;
    } else if (watchMode === 'deep') {
      watchOptions.deep = true;
    }
    w = cd.watch(ce.expression, prevCallback, watchOptions);
    return w;
  };
})();

WA = function(callback) {
  return this.cb = callback;
};

watchAny = function(cd, key, callback) {
  var root, wa;
  root = cd.root;
  wa = new WA(callback);
  cd.rwatchers[key].push(wa);
  root.watchers[key].push(wa);
  return {
    stop: function() {
      removeItem(cd.rwatchers[key], wa);
      return removeItem(root.watchers[key], wa);
    }
  };
};


/*

    option:
        isArray
        readOnly
        oneTime
        deep
        onStop

        watchText
 */

watchInitValue = function() {};

ChangeDetector.prototype.watch = function(name, callback, option) {
  var cd, ce, d, exp, isFunction, isStatic, key, r, root, scope;
  option = option || {};
  if (option === true) {
    option = {
      isArray: true
    };
  }
  if (option.init) {
    console.warn('watch.init is depticated');
  }
  cd = this;
  root = cd.root;
  scope = cd.scope;
  if (f$.isFunction(name)) {
    exp = name;
    key = alight.utils.getId();
    isFunction = true;
  } else {
    isFunction = false;
    exp = null;
    name = name.trim();
    if (name.slice(0, 2) === '::') {
      name = name.slice(2);
      option.oneTime = true;
    }
    key = name;
    if (key === '$any') {
      return watchAny(cd, 'any', callback);
    }
    if (key === '$finishScan') {
      return watchAny(cd, 'finishScan', callback);
    }
    if (key === '$finishScanOnce') {
      return root.watchers.finishScanOnce.push(callback);
    }
    if (key === '$onScanOnce') {
      return root.watchers.onScanOnce.push(callback);
    }
    if (key === '$destroy') {
      return cd.destroy_callbacks.push(callback);
    }
    if (key === '$finishBinding') {
      return root.watchers.finishBinding.push(callback);
    }
    if (option.deep) {
      key = 'd#' + key;
    } else if (option.isArray) {
      key = 'a#' + key;
    } else {
      key = 'v#' + key;
    }
  }
  if (alight.debug.watch) {
    console.log('$watch', name);
  }
  isStatic = false;
  if (!isFunction) {
    if (option.watchText) {
      exp = option.watchText.fn;
    } else {
      ce = alight.utils.compile.expression(name);
      if (ce.filters) {
        return makeFilterChain(cd, ce, callback, option);
      }
      isStatic = ce.isSimple && ce.simpleVariables.length === 0;
      exp = ce.fn;
    }
  }
  if (option.deep) {
    option.isArray = false;
  }
  d = {
    isStatic: isStatic,
    isArray: Boolean(option.isArray),
    extraLoop: !option.readOnly,
    deep: option.deep === true ? 10 : option.deep,
    value: watchInitValue,
    callback: callback,
    exp: exp,
    src: '' + name,
    onStop: option.onStop || null,
    el: option.element || null,
    ea: option.elementAttr || null
  };
  if (isStatic) {
    cd.watch('$onScanOnce', function() {
      return execWatchObject(scope, d, d.exp(scope));
    });
  } else {
    cd.watchList.push(d);
  }
  r = {
    $: d,
    stop: function() {
      if (d.isStatic) {
        return;
      }
      removeItem(cd.watchList, d);
      if (option.onStop) {
        return option.onStop();
      }
    },
    refresh: function() {
      var value;
      value = d.exp(scope);
      if (value && d.deep) {
        return d.value = alight.utils.clone(value, d.deep);
      } else if (value && d.isArray) {
        return d.value = value.slice();
      } else {
        return d.value = value;
      }
    }
  };
  if (option.oneTime) {
    d.callback = function(value) {
      if (value === void 0) {
        return;
      }
      r.stop();
      return callback(value);
    };
  }
  return r;
};

ChangeDetector.prototype.watchGroup = function(keys, callback) {
  var cd, group, j, key, len, planned;
  cd = this;
  if (!callback && f$.isFunction(keys)) {
    callback = keys;
    keys = null;
  }
  planned = false;
  group = function() {
    if (planned) {
      return;
    }
    planned = true;
    return cd.watch('$onScanOnce', function() {
      planned = false;
      return callback();
    });
  };
  if (keys) {
    for (j = 0, len = keys.length; j < len; j++) {
      key = keys[j];
      cd.watch(key, group);
    }
  }
  return group;
};

get_time = (function() {
  if (window.performance) {
    return function() {
      return Math.floor(performance.now());
    };
  }
  return function() {
    return (new Date()).getTime();
  };
})();

notEqual = function(a, b) {
  var i, j, len, ta, tb, v;
  if (a === null || b === null) {
    return true;
  }
  ta = typeof a;
  tb = typeof b;
  if (ta !== tb) {
    return true;
  }
  if (ta === 'object') {
    if (a.length !== b.length) {
      return true;
    }
    for (i = j = 0, len = a.length; j < len; i = ++j) {
      v = a[i];
      if (v !== b[i]) {
        return true;
      }
    }
  }
  return false;
};

execWatchObject = function(scope, w, value) {
  if (w.el) {
    if (w.ea) {
      w.el.setAttribute(w.ea, value);
    } else {
      w.el.nodeValue = value;
    }
  } else {
    w.callback.call(scope, value);
  }
};

scanCore = function(topCD, result) {
  var a0, a1, cd, changes, extraLoop, index, j, last, len, mutated, queue, ref, root, scope, total, value, w;
  root = topCD.root;
  extraLoop = false;
  changes = 0;
  total = 0;
  if (!topCD) {
    return;
  }
  queue = [];
  index = 0;
  cd = topCD;
  while (cd) {
    scope = result.scope = cd.scope;
    total += cd.watchList.length;
    ref = cd.watchList.slice();
    for (j = 0, len = ref.length; j < len; j++) {
      w = ref[j];
      result.src = w.src;
      result.element = w.el;
      last = w.value;
      value = w.exp(scope);
      if (last !== value) {
        mutated = false;
        if (w.isArray) {
          a0 = Array.isArray(last);
          a1 = Array.isArray(value);
          if (a0 === a1) {
            if (a0) {
              if (notEqual(last, value)) {
                mutated = true;
                w.value = value.slice();
              }
            } else {
              mutated = true;
              w.value = value;
            }
          } else {
            mutated = true;
            if (a1) {
              w.value = value.slice();
            } else {
              w.value = value;
            }
          }
        } else if (w.deep) {
          if (!alight.utils.equal(last, value, w.deep)) {
            mutated = true;
            w.value = alight.utils.clone(value, w.deep);
          }
        } else {
          mutated = true;
          w.value = value;
        }
        if (mutated) {
          mutated = false;
          changes++;
          if (w.el) {
            if (w.ea) {
              w.el.setAttribute(w.ea, value);
            } else {
              w.el.nodeValue = value;
            }
          } else {
            if (last === watchInitValue) {
              last = void 0;
            }
            if (w.callback.call(scope, value, last) !== '$scanNoChanges') {
              if (w.extraLoop) {
                extraLoop = true;
              }
            }
          }
        }
        if (alight.debug.scan > 1) {
          console.log('changed:', w.src);
        }
      }
    }
    queue.push.apply(queue, cd.children);
    cd = queue[index++];
  }
  result.total = total;
  result.changes = changes;
  result.extraLoop = extraLoop;
  result.scope = null;
  result.src = '';
  result.element = null;
};

ChangeDetector.prototype.digest = function() {
  var callback, duration, e, error1, j, len, mainLoop, onScanOnce, result, root, start, totalChanges;
  root = this.root;
  mainLoop = 10;
  totalChanges = 0;
  if (alight.debug.scan) {
    start = get_time();
  }
  try {
    result = {
      total: 0,
      changes: 0,
      extraLoop: false,
      src: '',
      scope: null,
      element: null
    };
    while (mainLoop) {
      mainLoop--;
      root.extraLoop = false;
      if (root.watchers.onScanOnce.length) {
        onScanOnce = root.watchers.onScanOnce.slice();
        root.watchers.onScanOnce.length = 0;
        for (j = 0, len = onScanOnce.length; j < len; j++) {
          callback = onScanOnce[j];
          callback.call(root);
        }
      }
      scanCore(this, result);
      totalChanges += result.changes;
      if (!result.extraLoop && !root.extraLoop) {
        break;
      }
    }
    if (alight.debug.scan) {
      duration = get_time() - start;
      console.log("$scan: loops: (" + (10 - mainLoop) + "), last-loop changes: " + result.changes + ", watches: " + result.total + " / " + duration + "ms");
    }
  } catch (error1) {
    e = error1;
    alight.exceptionHandler(e, '$scan, error in expression: ' + result.src, {
      src: result.src,
      scope: result.scope,
      element: result.element,
      result: result
    });
  }
  result.mainLoop = mainLoop;
  result.totalChanges = totalChanges;
  return result;
};

ChangeDetector.prototype.scan = function(cfg) {
  var callback, cb, finishScanOnce, j, k, l, len, len1, len2, ref, ref1, result, root;
  root = this.root;
  cfg = cfg || {};
  if (f$.isFunction(cfg)) {
    cfg = {
      callback: cfg
    };
  }
  if (cfg.callback) {
    root.watchers.finishScanOnce.push(cfg.callback);
  }
  if (cfg.late) {
    if (root.lateScan) {
      return;
    }
    root.lateScan = true;
    alight.nextTick(function() {
      if (root.lateScan) {
        return root.topCD.scan();
      }
    });
    return;
  }
  if (root.status === 'scaning') {
    root.extraLoop = true;
    return;
  }
  root.lateScan = false;
  root.status = 'scaning';
  if (root.topCD) {
    result = root.topCD.digest();
  } else {
    result = {};
  }
  if (result.totalChanges) {
    ref = root.watchers.any;
    for (j = 0, len = ref.length; j < len; j++) {
      cb = ref[j];
      cb();
    }
  }
  root.status = null;
  ref1 = root.watchers.finishScan;
  for (k = 0, len1 = ref1.length; k < len1; k++) {
    callback = ref1[k];
    callback();
  }
  finishScanOnce = root.watchers.finishScanOnce.slice();
  root.watchers.finishScanOnce.length = 0;
  for (l = 0, len2 = finishScanOnce.length; l < len2; l++) {
    callback = finishScanOnce[l];
    callback.call(root);
  }
  if (result.mainLoop === 0) {
    throw 'Infinity loop detected';
  }
  return result;
};

alight.core.ChangeDetector = ChangeDetector;

ChangeDetector.prototype.compile = function(expression, option) {
  return alight.utils.compile.expression(expression, option).fn;
};

ChangeDetector.prototype.setValue = function(name, value) {
  var cd, e, error1, error2, fn, j, key, len, msg, ref, rx, scope;
  cd = this;
  fn = cd.compile(name + ' = $value', {
    input: ['$value'],
    no_return: true
  });
  try {
    return fn(cd.scope, value);
  } catch (error1) {
    e = error1;
    msg = "can't set variable: " + name;
    if (alight.debug.parser) {
      console.warn(msg);
    }
    if (('' + e).indexOf('TypeError') >= 0) {
      rx = name.match(/^([\w\d\.]+)\.[\w\d]+$/);
      if (rx && rx[1]) {
        scope = cd.scope;
        ref = rx[1].split('.');
        for (j = 0, len = ref.length; j < len; j++) {
          key = ref[j];
          if (scope[key] === void 0) {
            scope[key] = {};
          }
          scope = scope[key];
        }
        try {
          fn(cd.scope, value);
          return;
        } catch (error2) {

        }
      }
    }
    return alight.exceptionHandler(e, msg, {
      name: name,
      value: value
    });
  }
};

ChangeDetector.prototype["eval"] = function(exp) {
  var fn;
  fn = this.compile(exp);
  return fn(this.scope);
};

ChangeDetector.prototype.getValue = function(name) {
  return this["eval"](name);
};

var Scope, getCDFromScope;

alight.hooks.scope = [];

alight.Scope = function(option) {
  var childCD, d, i, len, name, ref, scope, self;
  option = option || {};
  if (option.customScope) {
    scope = option.customScope;
    if (!scope.$scan) {
      for (name in Scope.prototype) {
        scope[name] = Scope.prototype[name];
      }
    }
  } else {
    scope = new Scope;
  }
  if (option.childFromChangeDetector) {
    childCD = option.childFromChangeDetector["new"](scope);
    scope.$rootChangeDetector = childCD;
  } else {
    scope.$rootChangeDetector = alight.ChangeDetector(scope);
  }
  if (option.$parent) {
    scope.$parent = option.$parent;
  }
  scope.$changeDetector = null;
  if (alight.hooks.scope.length) {
    self = {
      scope: scope,
      changeDetector: scope.$rootChangeDetector
    };
    ref = alight.hooks.scope;
    for (i = 0, len = ref.length; i < len; i++) {
      d = ref[i];
      d.fn.call(self);
    }
    scope = self.scope;
  }
  return scope;
};

Scope = function() {};

alight.core.Scope = Scope;

getCDFromScope = function(scope, name, option) {
  var cd;
  if (option && option.changeDetector) {
    return option.changeDetector;
  } else {
    cd = scope.$changeDetector;
  }
  if (!cd && !scope.$rootChangeDetector.children.length) {
    cd = scope.$rootChangeDetector;
  }
  if (cd) {
    return cd;
  }
  alight.exceptionHandler('', 'You can do $watch during binding only: ' + name, {
    name: name,
    option: option,
    scope: scope
  });
};

Scope.prototype.$watch = function(name, callback, option) {
  var cd;
  cd = getCDFromScope(this, name, option);
  if (cd) {
    return cd.watch(name, callback, option);
  }
};

Scope.prototype.$watchGroup = function(keys, callback) {
  var cd;
  cd = getCDFromScope(this, '' + keys);
  if (cd) {
    return cd.watchGroup(keys, callback);
  }
};

Scope.prototype.$scan = function(option) {
  var cd;
  cd = this.$rootChangeDetector;
  return cd.scan(option);
};

Scope.prototype.$setValue = function(name, value) {
  var cd;
  cd = this.$rootChangeDetector;
  cd.setValue(name, value);
};

Scope.prototype.$getValue = function(name) {
  var cd;
  cd = this.$rootChangeDetector;
  return cd.getValue(name);
};

Scope.prototype.$eval = function(exp) {
  var cd;
  cd = this.$rootChangeDetector;
  return cd["eval"](exp);
};

Scope.prototype.$compile = function(exp, option) {
  var cd;
  cd = this.$rootChangeDetector;
  return cd.compile(exp, option);
};

Scope.prototype.$destroy = function() {
  var cd;
  cd = this.$rootChangeDetector;
  cd.destroy();
};

Scope.prototype.$new = function() {
  if (!this.$changeDetector) {
    throw 'No change detector';
  }
  return alight.Scope({
    $parent: this,
    childFromChangeDetector: this.$changeDetector
  });
};

(function() {

  /*
      Scope.$watchText(name, callback, config)
      args:
          config.readOnly
          config.onStatic
      result:
          isStatic: flag
          $: watch-object
          value: current value
          exp: expression
          stop: function to stop watch
  
  
      kind of expressions
          simple: {{model}}
          text-directive: {{#dir model}} {{=staticModel}} {{::oneTimeBinding}}
          with function: {{fn()}}
          with filter: {{value | filter}}
   */
  var optmizeElement, watchText;
  alight.utils.optmizeElement = optmizeElement = function(element) {
    var current, d, data, e, exp, i, j, k, len, len1, lname, mark, n, next, prev, ref, result, text, wrapped;
    if (element.nodeType === 1) {
      e = element.firstChild;
      while (e) {
        next = e.nextSibling;
        optmizeElement(e);
        e = next;
      }
    } else if (element.nodeType === 3) {
      text = element.data;
      mark = alight.utils.pars_start_tag;
      i = text.indexOf(mark);
      if (i < 0) {
        return;
      }
      if (text.slice(i + mark.length).indexOf(mark) < 0) {
        return;
      }
      prev = 't';
      current = {
        value: ''
      };
      result = [current];
      data = alight.utils.parsText(text);
      for (j = 0, len = data.length; j < len; j++) {
        d = data[j];
        if (d.type === 'text') {
          current.value += d.value;
        } else {
          exp = d.list.join('|');
          wrapped = '{{' + exp + '}}';
          lname = exp.match(/^([^\w\d\s\$"'\(\u0410-\u044F\u0401\u0451]+)/);
          if (lname) {
            if (prev === 't' || prev === 'd') {
              current.value += wrapped;
            } else {
              current = {
                value: wrapped
              };
              result.push(current);
            }
            prev = 'd';
          } else if (d.list.length === 1) {
            if (prev === 't' || prev === 'v') {
              current.value += wrapped;
            } else {
              current = {
                value: wrapped
              };
              result.push(current);
            }
            prev = 'v';
          } else {
            if (prev === 't') {
              current.value += wrapped;
            } else {
              current = {
                value: wrapped
              };
              result.push(current);
            }
          }
        }
      }
      if (result.length < 2) {
        return;
      }
      e = element;
      e.data = result[0].value;
      ref = result.slice(1);
      for (k = 0, len1 = ref.length; k < len1; k++) {
        d = ref[k];
        n = document.createTextNode(d.value);
        f$.after(e, n);
        e = n;
      }
    }
  };
  alight.text.$base = function(option) {
    var cd, dir, env, point, scope;
    point = option.point;
    cd = option.cd;
    scope = cd.scope;
    if (scope.$ns && scope.$ns.text) {
      dir = scope.$ns.text[option.name];
    } else {
      dir = alight.text[option.name];
    }
    if (!dir) {
      throw 'No directive alight.text.' + option.name;
    }
    env = {
      changeDetector: cd,
      setter: function(value) {
        if (!option.update) {
          return;
        }
        if (value === null) {
          point.value = '';
        } else {
          point.value = '' + value;
        }
        return option.update();
      },
      setterRaw: function(value) {
        if (!option.updateRaw) {
          return;
        }
        if (value === null) {
          point.value = '';
        } else {
          point.value = '' + value;
        }
        return option.updateRaw();
      },
      "finally": function(value) {
        if (!option["finally"]) {
          return;
        }
        if (value === null) {
          point.value = '';
        } else {
          point.value = '' + value;
        }
        point.type = 'text';
        option["finally"]();
        option.update = null;
        return option["finally"] = null;
      }
    };
    scope.$changeDetector = cd;
    dir(env.setter, option.exp, scope, env);
    return scope.$changeDetector = null;
  };
  watchText = function(expression, callback, config) {
    var canUseSimpleBuilder, cd, ce, d, data, doFinally, doUpdate, doUpdateRaw, exp, fireCallback, fn, i, j, k, l, len, len1, len2, lname, name, noCache, privateValue, resultValue, st, updatePlanned, value, w, watchCount, watchObject;
    config = config || {};
    cd = this;
    if (alight.debug.watchText) {
      console.log('$watchText', expression);
    }
    st = alight.utils.compile.buildSimpleText(expression, null);
    if (st) {
      cd.watch(expression, callback, {
        watchText: st,
        element: config.element,
        elementAttr: config.elementAttr
      });
      return;
    }
    data = alight.utils.parsText(expression);
    watchCount = 0;
    canUseSimpleBuilder = true;
    noCache = false;
    doUpdate = doUpdateRaw = doFinally = function() {};
    for (j = 0, len = data.length; j < len; j++) {
      d = data[j];
      if (d.type === 'expression') {
        exp = d.list.join(' | ');
        lname = exp.match(/^([^\w\d\s\$"'\(\u0410-\u044F\u0401\u0451]+)/);
        if (lname) {
          d.isDir = true;
          name = lname[1];
          if (name === '#') {
            i = exp.indexOf(' ');
            if (i < 0) {
              name = exp.substring(1);
              exp = '';
            } else {
              name = exp.slice(1, i);
              exp = exp.slice(i);
            }
          } else {
            exp = exp.substring(name.length);
          }
          alight.text.$base({
            name: name,
            exp: exp,
            cd: cd,
            point: d,
            update: function() {
              return doUpdate();
            },
            updateRaw: function() {
              return doUpdateRaw();
            },
            "finally": function() {
              doUpdate();
              return doFinally();
            }
          });
          noCache = true;
          if (d.type !== 'text') {
            canUseSimpleBuilder = false;
          }
        } else {
          ce = alight.utils.compile.expression(exp, {
            string: true
          });
          if (!ce.filters) {
            d.fn = ce.fn;
            if (!ce.rawExpression) {
              throw 'Error';
            }
            if (ce.isSimple && ce.simpleVariables.length === 0) {
              d.type = 'text';
              d.value = d.fn();
            } else {
              d.re = ce.rawExpression;
              watchCount++;
            }
          } else {
            watchCount++;
            canUseSimpleBuilder = false;
            d.watched = true;
            (function(d) {
              return cd.watch(exp, function(value) {
                if (value == null) {
                  value = '';
                }
                d.value = value;
                return doUpdate();
              });
            })(d);
          }
        }
      }
    }
    if (canUseSimpleBuilder) {
      if (!watchCount) {
        value = '';
        for (k = 0, len1 = data.length; k < len1; k++) {
          d = data[k];
          value += d.value;
        }
        cd.watch('$onScanOnce', function() {
          return execWatchObject(cd.scope, {
            callback: callback,
            el: config.element,
            ea: config.elementAttr
          }, value);
        });
        return;
      }
      if (noCache) {
        st = alight.utils.compile.buildSimpleText(null, data);
      } else {
        st = alight.utils.compile.buildSimpleText(expression, data);
      }
      cd.watch(expression, callback, {
        watchText: {
          fn: st.fn
        },
        element: config.element,
        elementAttr: config.elementAttr
      });
      return;
    }
    watchObject = {
      callback: callback,
      el: config.element,
      ea: config.elementAttr
    };
    data.scope = cd.scope;
    fn = alight.utils.compile.buildText(expression, data);
    doUpdateRaw = function() {
      return execWatchObject(cd.scope, watchObject, fn());
    };
    if (watchCount) {
      w = null;
      resultValue = '';
      doUpdate = function() {
        resultValue = fn();
      };
      doFinally = function() {
        var l, len2;
        i = true;
        for (l = 0, len2 = data.length; l < len2; l++) {
          d = data[l];
          if (d.type === 'expression') {
            i = false;
            break;
          }
        }
        if (!i) {
          return;
        }
        cd.watch('$finishScanOnce', function() {
          return w.stop();
        });
        if (config.onStatic) {
          config.onStatic();
        }
      };
      privateValue = function() {
        return resultValue;
      };
      for (l = 0, len2 = data.length; l < len2; l++) {
        d = data[l];
        if (d.type === 'expression') {
          if (d.isDir || d.watched) {
            continue;
          }
          d.watched = true;
          (function(d, exp) {
            return cd.watch(exp, function(value) {
              if (value == null) {
                value = '';
              }
              d.value = value;
              return doUpdate();
            });
          })(d, d.list.join(' | '));
        }
      }
      doUpdate();
      w = cd.watch(privateValue, callback, {
        element: config.element,
        elementAttr: config.elementAttr
      });
    } else {
      updatePlanned = false;
      fireCallback = function() {
        updatePlanned = false;
        return doUpdateRaw();
      };
      doUpdate = function() {
        if (updatePlanned) {
          return;
        }
        updatePlanned = true;
        return cd.watch('$onScanOnce', fireCallback);
      };
      doUpdate();
    }
  };
  ChangeDetector.prototype.watchText = watchText;
  return Scope.prototype.$watchText = function(expression, callback, option) {
    var cd;
    cd = this.$changeDetector;
    if (!cd && !this.$rootChangeDetector.children.length) {
      cd = this.$rootChangeDetector;
    }
    if (cd) {
      cd.watchText(expression, callback, option);
    } else {
      alight.exceptionHandler('', 'You can do $watchText during binding only: ' + expression, {
        expression: expression,
        option: option,
        scope: this
      });
    }
  };
})();

var attrBinding, bindComment, bindElement, bindNode, bindText, sortByPriority, testDirective;

alight.version = '0.12.29';

alight.debug = {
  scan: 0,
  directive: false,
  watch: false,
  watchText: false,
  parser: false,
  domOptimization: true
};

(function() {
  var ext;
  alight.hooks.attribute = ext = [];
  ext.push({
    code: 'dataPrefix',
    fn: function() {
      if (this.attrName.slice(0, 5) === 'data-') {
        this.attrName = this.attrName.slice(5);
      }
    }
  });
  ext.push({
    code: 'colonNameSpace',
    fn: function() {
      var name, parts;
      if (this.directive || this.name) {
        return;
      }
      parts = this.attrName.match(/^(\w+)[\-\:](.+)$/);
      if (parts) {
        this.ns = parts[1];
        name = parts[2];
      } else {
        this.ns = '$global';
        name = this.attrName;
      }
      parts = name.match(/^([^\.]+)\.(.*)$/);
      if (parts) {
        name = parts[1];
        this.attrArgument = parts[2];
      }
      this.name = name.replace(/(-\w)/g, function(m) {
        return m.substring(1).toUpperCase();
      });
    }
  });
  ext.push({
    code: 'getScopeDirective',
    fn: function() {
      var $ns, path;
      if (this.directive) {
        return;
      }
      $ns = this.cd.scope.$ns;
      if ($ns && $ns.directives) {
        path = $ns.directives[this.ns];
        if (path) {
          this.directive = path[this.name];
          if (!this.directive) {
            if (!$ns.inheritGlobal) {
              if (this.ns === '$global') {
                this.result = 'noNS';
              } else {
                this.result = 'noDirective';
              }
              this.stop = true;
              return;
            }
          }
        } else {
          if (!$ns.inheritGlobal) {
            this.result = 'noNS';
            this.stop = true;
          }
        }
      }
    }
  });
  ext.push({
    code: 'getGlobalDirective',
    fn: function() {
      var path;
      if (this.directive) {
        return;
      }
      path = alight.d[this.ns];
      if (!path) {
        this.result = 'noNS';
        this.stop = true;
        return;
      }
      this.directive = path[this.name];
      if (!this.directive) {
        if (this.ns === '$global') {
          this.result = 'noNS';
        } else {
          this.result = 'noDirective';
        }
        this.stop = true;
      }
    }
  });
  ext.push({
    code: 'cloneDirective',
    fn: function() {
      var dir, k, r, v;
      r = this.directive;
      dir = {};
      if (f$.isFunction(r)) {
        dir.init = r;
      } else if (f$.isObject(r)) {
        for (k in r) {
          v = r[k];
          dir[k] = v;
        }
      } else {
        throw 'Wrong directive: ' + ns + '.' + name;
      }
      dir.priority = r.priority || 0;
      dir.restrict = r.restrict || 'A';
      if (dir.restrict.indexOf(this.attrType) < 0) {
        throw 'Directive has wrong binding (attribute/element): ' + name;
      }
      this.directive = dir;
    }
  });
  return ext.push({
    code: 'preprocessor',
    fn: function() {
      var attrArgument, directive, name, ns;
      ns = this.ns;
      name = this.name;
      attrArgument = this.attrArgument || null;
      directive = this.directive;
      directive.$init = function(cd, element, value, env) {
        var doProcess, dscope;
        doProcess = function() {
          var dp, i, j, l, len;
          l = dscope.procLine;
          for (i = j = 0, len = l.length; j < len; i = ++j) {
            dp = l[i];
            dp.fn.call(dscope);
            if (dscope.isDeferred) {
              dscope.procLine = l.slice(i + 1);
              break;
            }
          }
          dscope.async = true;
          return null;
        };
        dscope = {
          element: element,
          value: value,
          cd: cd,
          env: env,
          ns: ns,
          name: name,
          doBinding: false,
          directive: directive,
          isDeferred: false,
          procLine: alight.hooks.directive,
          makeDeferred: function() {
            dscope.isDeferred = true;
            dscope.doBinding = true;
            dscope.retStopBinding = true;
            dscope.async = false;
            return function() {
              dscope.isDeferred = false;
              if (dscope.async) {
                return doProcess();
              }
            };
          }
        };
        if (directive.stopBinding) {
          env.stopBinding = true;
        }
        env.attrArgument = attrArgument;
        doProcess();
        if (dscope.retStopBinding) {
          return 'stopBinding';
        }
      };
    }
  });
})();

(function() {
  var ext;
  ext = alight.hooks.directive;
  ext.push({
    code: 'init',
    fn: function() {
      var result;
      if (this.directive.init) {
        if (alight.debug.directive) {
          if (this.directive.scope) {
            console.warn(this.ns + "-" + this.name + " uses scope and init together, probably you need use link instead of init");
          }
        }
        this.env.changeDetector = this.cd;
        this.cd.scope.$changeDetector = this.cd;
        result = this.directive.init(this.cd.scope, this.element, this.value, this.env);
        if (result && result.start) {
          result.start();
        }
        this.cd.scope.$changeDetector = null;
      }
    }
  });
  ext.push({
    code: 'templateUrl',
    fn: function() {
      var callback, ds;
      ds = this;
      if (this.directive.templateUrl) {
        callback = this.makeDeferred();
        f$.ajax({
          cache: true,
          url: this.directive.templateUrl,
          success: function(html) {
            ds.directive.template = html;
            return callback();
          },
          error: callback
        });
      }
    }
  });
  ext.push({
    code: 'template',
    fn: function() {
      var el;
      if (this.directive.template) {
        if (this.element.nodeType === 1) {
          this.element.innerHTML = this.directive.template;
        } else if (this.element.nodeType === 8) {
          el = document.createElement('p');
          el.innerHTML = this.directive.template.trim();
          el = el.firstChild;
          f$.after(this.element, el);
          this.element = el;
          this.doBinding = true;
        }
      }
    }
  });
  ext.push({
    code: 'scope',
    fn: function() {
      var childCD, parentCD, scope;
      if (!this.directive.scope) {
        return;
      }
      parentCD = this.cd;
      switch (this.directive.scope) {
        case true:
          scope = alight.Scope({
            $parent: parentCD.scope,
            childFromChangeDetector: parentCD
          });
          childCD = scope.$rootChangeDetector;
          break;
        case 'root':
          scope = alight.Scope({
            $parent: parentCD.scope
          });
          childCD = scope.$rootChangeDetector;
          parentCD.watch('$destroy', function() {
            return childCD.destroy();
          });
          break;
        default:
          throw 'Wrong scope value: ' + this.directive.scope;
      }
      this.env.parentChangeDetector = parentCD;
      this.cd = childCD;
      this.doBinding = true;
      this.retStopBinding = true;
    }
  });
  ext.push({
    code: 'link',
    fn: function() {
      var result;
      if (this.directive.link) {
        this.env.changeDetector = this.cd;
        this.cd.scope.$changeDetector = this.cd;
        result = this.directive.link(this.cd.scope, this.element, this.value, this.env);
        if (result && result.start) {
          result.start();
        }
        this.cd.scope.$changeDetector = null;
      }
    }
  });
  return ext.push({
    code: 'scopeBinding',
    fn: function() {
      if (this.doBinding && !this.env.stopBinding) {
        alight.bind(this.cd, this.element, {
          skip_attr: this.env.skippedAttr()
        });
      }
    }
  });
})();

testDirective = (function() {
  var addAttr;
  addAttr = function(attrName, args, base) {
    var attr;
    if (args.attr_type === 'A') {
      attr = base || {};
      attr.priority = -5;
      attr.is_attr = true;
      attr.name = attrName;
      attr.attrName = attrName;
      attr.element = args.element;
      args.list.push(attr);
    } else if (args.attr_type === 'M') {
      args.list.push(base);
    }
  };
  return function(attrName, args) {
    var attrHook, attrSelf, j, len, ref;
    if (args.skip_attr.indexOf(attrName) >= 0) {
      return addAttr(attrName, args, {
        skip: true
      });
    }
    attrSelf = {
      attrName: attrName,
      attrType: args.attr_type,
      element: args.element,
      cd: args.cd,
      result: null
    };
    ref = alight.hooks.attribute;
    for (j = 0, len = ref.length; j < len; j++) {
      attrHook = ref[j];
      attrHook.fn.call(attrSelf);
      if (attrSelf.stop) {
        break;
      }
    }
    if (attrSelf.result === 'noNS') {
      addAttr(attrName, args);
      return;
    }
    if (attrSelf.result === 'noDirective') {
      if (args.attr_type === 'E') {
        args.list.push({
          name: attrName,
          priority: 0,
          attrName: attrName,
          noDirective: true
        });
        return;
      }
      addAttr(attrName, args, {
        noDirective: true
      });
      return;
    }
    args.list.push({
      name: attrName,
      directive: attrSelf.directive,
      priority: attrSelf.directive.priority,
      attrName: attrName
    });
  };
})();

sortByPriority = function(a, b) {
  if (a.priority === b.priority) {
    return 0;
  }
  if (a.priority > b.priority) {
    return -1;
  } else {
    return 1;
  }
};

attrBinding = function(cd, element, value, attrName) {
  var text;
  text = value;
  if (text.indexOf(alight.utils.pars_start_tag) < 0) {
    return;
  }
  cd.watchText(text, null, {
    element: element,
    elementAttr: attrName
  });
  return true;
};

bindText = function(cd, element) {
  var text;
  text = element.data;
  if (text.indexOf(alight.utils.pars_start_tag) < 0) {
    return;
  }
  cd.watchText(text, null, {
    element: element
  });
  return true;
};

bindComment = function(cd, element, option) {
  var args, d, dirName, directive, e, env, error, i, list, text, value;
  text = element.nodeValue.trim();
  if (text.slice(0, 10) !== 'directive:') {
    return;
  }
  text = text.slice(10).trim();
  i = text.indexOf(' ');
  if (i >= 0) {
    dirName = text.slice(0, +(i - 1) + 1 || 9e9);
    value = text.slice(i + 1);
  } else {
    dirName = text;
    value = '';
  }
  args = {
    list: list = [],
    element: element,
    attr_type: 'M',
    cd: cd,
    skip_attr: []
  };
  testDirective(dirName, args);
  d = list[0];
  if (d.noDirective) {
    throw "Comment directive not found: " + dirName;
  }
  directive = d.directive;
  env = {
    element: element,
    attrName: dirName,
    attributes: [],
    skippedAttr: function() {
      return [];
    }
  };
  if (alight.debug.directive) {
    console.log('bind', d.attrName, value, d);
  }
  try {
    directive.$init(cd, element, value, env);
  } catch (error) {
    e = error;
    alight.exceptionHandler(e, 'Error in directive: ' + d.name, {
      value: value,
      env: env,
      cd: cd,
      scope: cd.scope,
      element: element
    });
  }
  if (env.skipToElement) {
    return {
      directive: 1,
      skipToElement: env.skipToElement
    };
  }
  return {
    directive: 1,
    skipToElement: null
  };
};

bindElement = (function() {
  var skippedAttr, takeAttr;
  takeAttr = function(name, skip) {
    var attr, j, len, ref, value;
    if (arguments.length === 1) {
      skip = true;
    }
    ref = this.attributes;
    for (j = 0, len = ref.length; j < len; j++) {
      attr = ref[j];
      if (attr.attrName !== name) {
        continue;
      }
      if (skip) {
        attr.skip = true;
      }
      value = this.element.getAttribute(name);
      return value || true;
    }
  };
  skippedAttr = function() {
    var attr, j, len, ref, results;
    ref = this.attributes;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      attr = ref[j];
      if (!attr.skip) {
        continue;
      }
      results.push(attr.attrName);
    }
    return results;
  };
  return function(cd, element, config) {
    var args, attr, attrName, attrValue, bindResult, childElement, childNodes, d, directive, e, env, error, j, len, len1, len2, list, n, o, r, ref, ref1, skipChildren, skipToElement, skip_attr, value;
    bindResult = {
      directive: 0,
      text: 0,
      attr: 0,
      hook: 0,
      skipToElement: null
    };
    config = config || {};
    skipChildren = false;
    skip_attr = config.skip_attr || [];
    if (!(skip_attr instanceof Array)) {
      skip_attr = [skip_attr];
    }
    if (!config.skip_top) {
      args = {
        list: list = [],
        element: element,
        skip_attr: skip_attr,
        attr_type: 'E',
        cd: cd
      };
      attrName = element.nodeName.toLowerCase();
      testDirective(attrName, args);
      if (attrName === 'script' || attrName === 'style') {
        skipChildren = true;
      }
      args.attr_type = 'A';
      ref = element.attributes;
      for (j = 0, len = ref.length; j < len; j++) {
        attr = ref[j];
        testDirective(attr.name, args);
      }
      if (config.attachDirective) {
        ref1 = config.attachDirective;
        for (attrName in ref1) {
          attrValue = ref1[attrName];
          testDirective(attrName, args);
        }
      }
      list = list.sort(sortByPriority);
      for (n = 0, len1 = list.length; n < len1; n++) {
        d = list[n];
        if (d.skip) {
          continue;
        }
        if (d.noDirective) {
          throw "Directive not found: " + d.name;
        }
        d.skip = true;
        if (config.attachDirective && config.attachDirective[d.attrName]) {
          value = config.attachDirective[d.attrName];
        } else {
          value = element.getAttribute(d.attrName);
        }
        if (d.is_attr) {
          if (attrBinding(cd, element, value, d.attrName)) {
            bindResult.attr++;
          }
        } else {
          bindResult.directive++;
          directive = d.directive;
          env = {
            element: element,
            attrName: d.attrName,
            attributes: list,
            takeAttr: takeAttr,
            skippedAttr: skippedAttr,
            stopBinding: false,
            elementCanBeRemoved: config.elementCanBeRemoved
          };
          if (alight.debug.directive) {
            console.log('bind', d.attrName, value, d);
          }
          try {
            if (directive.$init(cd, element, value, env) === 'stopBinding') {
              skipChildren = true;
            }
          } catch (error) {
            e = error;
            alight.exceptionHandler(e, 'Error in directive: ' + d.attrName, {
              value: value,
              env: env,
              cd: cd,
              scope: cd.scope,
              element: element
            });
          }
          if (env.stopBinding) {
            skipChildren = true;
            break;
          }
          if (env.skipToElement) {
            bindResult.skipToElement = env.skipToElement;
          }
        }
      }
    }
    if (!skipChildren) {
      skipToElement = null;
      childNodes = (function() {
        var len2, o, ref2, results;
        ref2 = element.childNodes;
        results = [];
        for (o = 0, len2 = ref2.length; o < len2; o++) {
          childElement = ref2[o];
          results.push(childElement);
        }
        return results;
      })();
      for (o = 0, len2 = childNodes.length; o < len2; o++) {
        childElement = childNodes[o];
        if (!childElement) {
          continue;
        }
        if (skipToElement) {
          if (skipToElement === childElement) {
            skipToElement = null;
          }
          continue;
        }
        r = bindNode(cd, childElement);
        bindResult.directive += r.directive;
        bindResult.text += r.text;
        bindResult.attr += r.attr;
        bindResult.hook += r.hook;
        skipToElement = r.skipToElement;
      }
    }
    return bindResult;
  };
})();

bindNode = function(cd, element, option) {
  var h, j, len, r, ref, result;
  result = {
    directive: 0,
    text: 0,
    attr: 0,
    hook: 0,
    skipToElement: null
  };
  if (alight.hooks.binding.length) {
    ref = alight.hooks.binding;
    for (j = 0, len = ref.length; j < len; j++) {
      h = ref[j];
      result.hook += 1;
      r = h.fn(cd, element, option);
      if (r && r.owner) {
        return result;
      }
    }
  }
  if (element.nodeType === 1) {
    r = bindElement(cd, element, option);
    result.directive += r.directive;
    result.text += r.text;
    result.attr += r.attr;
    result.hook += r.hook;
    result.skipToElement = r.skipToElement;
  } else if (element.nodeType === 3) {
    if (bindText(cd, element, option)) {
      result.text++;
    }
  } else if (element.nodeType === 8) {
    r = bindComment(cd, element, option);
    if (r) {
      result.directive += r.directive;
      result.skipToElement = r.skipToElement;
    }
  }
  return result;
};

alight.nextTick = (function() {
  var exec, list, timer;
  timer = null;
  list = [];
  exec = function() {
    var callback, dlist, e, error, it, j, len, self;
    timer = null;
    dlist = list.slice();
    list.length = 0;
    for (j = 0, len = dlist.length; j < len; j++) {
      it = dlist[j];
      callback = it[0];
      self = it[1];
      try {
        callback.call(self);
      } catch (error) {
        e = error;
        alight.exceptionHandler(e, '$nextTick, error in function', {
          fn: callback,
          self: self
        });
      }
    }
    return null;
  };
  return function(callback) {
    list.push([callback, this]);
    if (timer) {
      return;
    }
    return timer = setTimeout(exec, 0);
  };
})();

alight.bind = alight.applyBindings = function(scope, element, option) {
  var cb, cd, finishBinding, j, len, lst, result, root;
  if (!element) {
    throw 'No element';
  }
  if (!scope) {
    throw 'No Scope';
  }
  option = option || {};
  if (scope instanceof alight.core.ChangeDetector) {
    cd = scope;
  } else {
    cd = option.changeDetector || scope.$changeDetector || scope.$rootChangeDetector;
  }
  root = cd.root;
  finishBinding = !root.finishBinding_lock;
  if (finishBinding) {
    root.finishBinding_lock = true;
    root.bindingResult = {
      directive: 0,
      text: 0,
      attr: 0,
      hook: 0
    };
  }
  result = bindNode(cd, element, option);
  root.bindingResult.directive += result.directive;
  root.bindingResult.text += result.text;
  root.bindingResult.attr += result.attr;
  root.bindingResult.hook += result.hook;
  cd.digest();
  if (finishBinding) {
    root.finishBinding_lock = false;
    lst = root.watchers.finishBinding.slice();
    root.watchers.finishBinding.length = 0;
    for (j = 0, len = lst.length; j < len; j++) {
      cb = lst[j];
      cb();
    }
    result.total = root.bindingResult;
  }
  return result;
};

alight.bootstrap = function(input, data) {
  var ctrlName, element, j, lastScope, len, oneScope, option, scope;
  if (!input) {
    alight.bootstrap('[al-app]');
    alight.bootstrap('[al\\:app]');
    alight.bootstrap('[data-al-app]');
    return;
  } else if (typeof input === 'string') {
    input = document.querySelectorAll(input);
  } else if (f$.isElement(input)) {
    input = [input];
  }
  if (Array.isArray(input) || typeof input.length === 'number') {
    lastScope = null;
    if (data) {
      oneScope = alight.Scope({
        customScope: data
      });
    }
    for (j = 0, len = input.length; j < len; j++) {
      element = input[j];
      if (element.ma_bootstrapped) {
        continue;
      }
      element.ma_bootstrapped = true;
      if (oneScope) {
        scope = oneScope;
      } else {
        scope = alight.Scope();
      }
      option = {
        skip_attr: ['al-app', 'al:app', 'data-al-app']
      };
      ctrlName = element.getAttribute('al-app') || element.getAttribute('al:app') || element.getAttribute('data-al-app');
      if (ctrlName) {
        option.attachDirective = {
          'al-ctrl': ctrlName
        };
      }
      if (alight.debug.domOptimization) {
        alight.utils.optmizeElement(element);
      }
      alight.bind(scope, element, option);
      lastScope = scope;
    }
    return lastScope;
  }
  alight.exceptionHandler('Error in bootstrap', 'Error input arguments', {
    input: input
  });
};

var clone, equal;

alight.utils.getId = (function() {
  var index, prefix;
  prefix = (function() {
    var d, k, n, p, r, symbols;
    symbols = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    n = Math.floor((new Date()).valueOf() / 1000) - 1388512800;
    r = '';
    while (n > 0) {
      d = Math.floor(n / 62);
      p = d * 62;
      k = n - p;
      n = d;
      r = symbols[k] + r;
    }
    return r;
  })();
  index = 1;
  return function() {
    return prefix + '#' + index++;
  };
})();

alight.utils.clone = clone = function(d, lvl) {
  var i, k, r, v;
  if (lvl == null) {
    lvl = 128;
  }
  if (lvl < 1) {
    return null;
  }
  if (!d) {
    return d;
  }
  if (typeof d === 'object') {
    if (d instanceof Array) {
      r = (function() {
        var j, len, results;
        results = [];
        for (j = 0, len = d.length; j < len; j++) {
          i = d[j];
          results.push(clone(i, lvl - 1));
        }
        return results;
      })();
      return r;
    }
    if (d instanceof Date) {
      return new Date(d.valueOf());
    }
    if (d.nodeType && typeof d.cloneNode === "function") {
      return d;
    }
    r = {};
    for (k in d) {
      v = d[k];
      if (k[0] === '$') {
        continue;
      }
      r[k] = clone(v, lvl - 1);
    }
    return r;
  }
  return d;
};

alight.utils.equal = equal = function(a, b, lvl) {
  var i, j, k, len, set, ta, tb, v;
  if (lvl == null) {
    lvl = 128;
  }
  if (lvl < 1) {
    return true;
  }
  if (!a || !b) {
    return a === b;
  }
  ta = typeof a;
  tb = typeof b;
  if (ta !== tb) {
    return false;
  }
  if (ta === 'object') {
    if (a instanceof Array) {
      if (a.length !== b.length) {
        return false;
      }
      for (i = j = 0, len = a.length; j < len; i = ++j) {
        v = a[i];
        if (!equal(v, b[i], lvl - 1)) {
          return false;
        }
      }
      return true;
    }
    if (a instanceof Date) {
      return a.valueOf() === b.valueOf();
    }
    if (a.nodeType && typeof a.cloneNode === "function") {
      return a === b;
    }
    set = {};
    for (k in a) {
      v = a[k];
      if (k[0] === '$') {
        continue;
      }
      set[k] = true;
      if (!equal(v, b[k], lvl - 1)) {
        return false;
      }
    }
    for (k in b) {
      v = b[k];
      if (k[0] === '$') {
        continue;
      }
      if (set[k]) {
        continue;
      }
      if (!equal(v, a[k], lvl - 1)) {
        return false;
      }
    }
    return true;
  }
  return a === b;
};

alight.exceptionHandler = function(e, title, locals) {
  var output;
  output = [];
  if (title) {
    output.push(title);
  }
  if (e && e.message) {
    output.push(e.message);
  }
  if (locals) {
    output.push(locals);
  }
  if (e) {
    output.push(e.stack ? e.stack : e);
  }
  return console.error.apply(console, output);
};

(function() {
  var assignmentOperator, isChar, isDigit, isSign, reserved, toDict;
  toDict = function() {
    var i, k, len, result;
    result = {};
    for (i = 0, len = arguments.length; i < len; i++) {
      k = arguments[i];
      result[k] = true;
    }
    return result;
  };
  reserved = toDict('instanceof', 'typeof', 'in', 'null', 'true', 'false', 'undefined', 'return');
  isChar = (function() {
    var rx;
    rx = /[a-zA-Z\u0410-\u044F\u0401\u0451_\.\$]/;
    return function(x) {
      return x.match(rx);
    };
  })();
  isDigit = function(x) {
    return x.charCodeAt() >= 48 && x.charCodeAt() <= 57;
  };
  isSign = (function() {
    var chars;
    chars = toDict('+', '-', '>', '<', '=', '&', '|', '^', '!', '~');
    return function(x) {
      return chars[x] || false;
    };
  })();
  assignmentOperator = toDict('=', '+=', '-=', '++', '--', '|=', '^=', '&=', '!=', '<<=', '>>=');
  return alight.utils.parsExpression = function(expression, option) {
    var build, convert, data, getFirstPart, inputKeywords, pars, ret, splitVariable, toElvis, uniq;
    option = option || {};
    inputKeywords = toDict.apply(null, option.input || []);
    uniq = 1;
    pars = function(option) {
      var a, an, ap, bracket, child, commitText, digit, filters, freeText, index, leftVariable, level, line, original, result, sign, status, stopKey, stringKey, stringValue, variable, variableChildren;
      line = option.line;
      result = option.result || [];
      index = option.index || 0;
      level = option.level || 0;
      stopKey = option.stopKey || null;
      variable = '';
      leftVariable = null;
      variableChildren = [];
      sign = '';
      digit = '';
      status = false;
      original = '';
      stringKey = '';
      stringValue = '';
      freeText = '';
      bracket = 0;
      filters = null;
      commitText = function() {
        if (freeText) {
          result.push({
            type: 'free',
            value: freeText
          });
        }
        return freeText = '';
      };
      while (index <= line.length) {
        ap = line[index - 1];
        a = line[index++] || '';
        an = line[index];
        if ((status && freeText) || (!a)) {
          commitText();
        }
        if (status === 'string') {
          if (a === stringKey && ap !== '\\') {
            stringValue += a;
            result.push({
              type: 'string',
              value: stringValue
            });
            stringValue = '';
            stringKey = '';
            status = '';
            continue;
          }
          stringValue += a;
          continue;
        } else if (status === 'key') {
          if (isChar(a) || isDigit(a)) {
            variable += a;
            continue;
          }
          if (a === '[') {
            variable += a;
            child = pars({
              line: line,
              index: index,
              level: level + 1,
              stopKey: ']'
            });
            if (!child.stopKeyOk) {
              throw 'Error expression';
            }
            index = child.index;
            variable += '###' + child.uniq + '###]';
            variableChildren.push(child);
            continue;
          } else if (a === '?' && (an === '.' || an === '(' || an === '[')) {
            variable += a;
            continue;
          } else if (a === '(') {
            variable += a;
            child = pars({
              line: line,
              index: index,
              level: level + 1,
              stopKey: ')'
            });
            if (!child.stopKeyOk) {
              throw 'Error expression';
            }
            index = child.index;
            variable += '###' + child.uniq + '###)';
            variableChildren.push(child);
            continue;
          }
          leftVariable = {
            type: 'key',
            value: variable,
            start: index - variable.length - 1,
            finish: index - 1,
            children: variableChildren
          };
          result.push(leftVariable);
          status = '';
          variable = '';
          variableChildren = [];
        } else if (status === 'sign') {
          if (isSign(a)) {
            sign += a;
            continue;
          }
          if (sign === '|' && level === 0 && bracket === 0) {
            filters = line.substring(index - 1);
            index = line.length + 1;
            continue;
          }
          if (assignmentOperator[sign] || (sign[0] === '=' && sign[1] !== '=')) {
            leftVariable.assignment = true;
          }
          result.push({
            type: 'sign',
            value: sign
          });
          status = '';
          sign = '';
        } else if (status === 'digit') {
          if (isDigit(a) || a === '.') {
            digit += a;
            continue;
          }
          result.push({
            type: 'digit',
            value: digit
          });
          digit = '';
        }
        if (isChar(a)) {
          status = 'key';
          variable += a;
          continue;
        }
        if (isSign(a)) {
          status = 'sign';
          sign += a;
          continue;
        }
        if (isDigit(a)) {
          status = 'digit';
          digit += a;
          continue;
        }
        if (a === '"' || a === "'") {
          stringKey = a;
          status = 'string';
          stringValue += a;
          continue;
        }
        if (a === stopKey) {
          commitText();
          return {
            result: result,
            index: index,
            stopKeyOk: true,
            uniq: uniq++
          };
        }
        if (a === '(') {
          bracket++;
        }
        if (a === ')') {
          bracket--;
        }
        if (a === '{') {
          commitText();
          child = pars({
            line: line,
            index: index,
            level: level + 1,
            stopKey: '}'
          });
          result.push({
            type: '{}',
            child: child
          });
          index = child.index;
          continue;
        }
        if (a === ':' && stopKey === '}') {
          leftVariable.type = 'free';
        }
        freeText += a;
      }
      commitText();
      return {
        result: result,
        index: index,
        filters: filters
      };
    };
    data = pars({
      line: expression
    });
    ret = {
      isSimple: !data.filters,
      simpleVariables: []
    };
    if (data.filters) {
      ret.expression = expression.substring(0, expression.length - data.filters.length - 1);
      ret.filters = data.filters.split('|');
    } else {
      ret.expression = expression;
    }
    splitVariable = function(variable) {
      var parts;
      parts = variable.split(/[\.\[\(\?]/);
      return {
        count: parts.length,
        firstPart: parts[0]
      };
    };
    toElvis = function(name, isReserved) {
      if (isReserved) {
        return '($$=' + name + ',$$==null)?undefined:';
      } else {
        return '($$=$$' + name + ',$$==null)?undefined:';
      }
    };
    getFirstPart = function(name) {
      return name.split(/[\.\[\(\?]/)[0];
    };
    convert = function(variable) {
      var firstPart, full, i, isReserved, last, len, p, parts, ref, result;
      if (variable === 'this') {
        return '$$scope';
      }
      firstPart = getFirstPart(variable);
      isReserved = reserved[firstPart] || inputKeywords[firstPart];
      parts = variable.split('?');
      if (parts.length === 1) {
        if (isReserved) {
          return variable;
        }
        return '$$scope.' + variable;
      }
      if (isReserved) {
        result = toElvis(parts[0], true);
        full = parts[0];
      } else {
        result = toElvis('scope.' + parts[0]);
        full = 'scope.' + parts[0];
      }
      ref = parts.slice(1, parts.length - 1);
      for (i = 0, len = ref.length; i < len; i++) {
        p = ref[i];
        if (p[0] === '(') {
          result += toElvis(full + p, isReserved);
        } else {
          result += toElvis(p);
          full += p;
        }
      }
      last = parts[parts.length - 1];
      if (last[0] === '(') {
        if (!isReserved) {
          result += '$$';
        }
        result += full + last;
      } else {
        result += '$$' + last;
      }
      return '(' + result + ')';
    };
    build = function(part) {
      var c, childName, d, i, j, key, len, len1, name, ref, ref1, result, sv;
      result = '';
      ref = part.result;
      for (i = 0, len = ref.length; i < len; i++) {
        d = ref[i];
        if (d.type === 'key') {
          if (d.assignment) {
            sv = splitVariable(d.value);
            if (sv.firstPart === 'this') {
              name = '$$scope' + d.value.substring(4);
            } else if (sv.count < 2) {
              name = '($$scope.$$root || $$scope).' + d.value;
            } else {
              name = '$$scope.' + d.value;
            }
            ret.isSimple = false;
          } else {
            if (reserved[d.value]) {
              name = d.value;
            } else {
              name = convert(d.value);
              ret.simpleVariables.push(name);
            }
          }
          if (d.children.length) {
            ref1 = d.children;
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              c = ref1[j];
              key = "###" + c.uniq + "###";
              childName = build(c);
              name = name.split(key).join(childName);
            }
          }
          result += name;
          continue;
        }
        if (d.type === '{}') {
          result += '{' + build(d.child) + '}';
          continue;
        }
        result += d.value;
      }
      return result;
    };
    ret.result = build(data);
    if (alight.debug.parser) {
      console.log(expression, ret);
    }
    return ret;
  };
})();

(function() {
  var cache, clone, rawParsText;
  alight.utils.pars_start_tag = '{{';
  alight.utils.pars_finish_tag = '}}';
  rawParsText = function(line) {
    var find_exp, finish_tag, get_part, index, pars, prev_index, result, rexp, start_tag;
    start_tag = alight.utils.pars_start_tag;
    finish_tag = alight.utils.pars_finish_tag;
    result = [];
    index = 0;
    prev_index = 0;
    get_part = function(count) {
      var r;
      count = count || 1;
      r = line.substring(prev_index, index - count);
      prev_index = index;
      return r;
    };
    rexp = null;
    pars = function(lvl, stop, force) {
      var a, a2, an, prev;
      if (!lvl) {
        rexp = {
          type: 'expression',
          list: []
        };
        result.push(rexp);
      }
      prev = null;
      a = null;
      while (index < line.length) {
        prev = a;
        a = line[index];
        index += 1;
        a2 = prev + a;
        an = line[index];
        if (a === stop) {
          return;
        }
        if (force) {
          continue;
        }
        if (a2 === finish_tag && lvl === 0) {
          rexp.list.push(get_part(2));
          return true;
        }
        if (a === '(') {
          pars(lvl + 1, ')');
        } else if (a === '{') {
          pars(lvl + 1, '}');
        } else if (a === '"') {
          pars(lvl + 1, '"', true);
        } else if (a === "'") {
          pars(lvl + 1, "'", true);
        } else if (a === '|') {
          if (lvl === 0) {
            if (an === '|') {
              index += 1;
            } else {
              rexp.list.push(get_part());
            }
          }
        }
      }
    };
    find_exp = function() {
      var a, a2, prev, r, text;
      prev = null;
      a = null;
      while (index < line.length) {
        prev = a;
        a = line[index];
        index += 1;
        a2 = prev + a;
        if (a2 === start_tag) {
          text = get_part(2);
          if (text) {
            result.push({
              type: 'text',
              value: text
            });
          }
          if (!pars(0)) {
            throw 'Wrong expression' + line;
          }
          a = null;
        }
      }
      r = get_part(-1);
      if (r) {
        return result.push({
          type: 'text',
          value: r
        });
      }
    };
    find_exp();
    if (alight.debug.parser) {
      console.log('parsText', result);
    }
    return result;
  };
  cache = {};
  clone = function(result) {
    var i, k, resp;
    resp = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = result.length; j < len; j++) {
        i = result[j];
        k = {
          type: i.type,
          value: i.value
        };
        if (i.list) {
          k.list = i.list.slice();
        }
        results.push(k);
      }
      return results;
    })();
    return resp;
  };
  return alight.utils.parsText = function(line) {
    var result;
    result = cache[line];
    if (!result) {
      cache[line] = result = rawParsText(line);
    }
    return clone(result);
  };
})();


/*
    src - expression
    cfg:
        scope
        hash        
        no_return   - method without return (exec)
        string      - method will return result as string
        input       - list of input arguments
        rawExpression

    return {
        fn
        rawExpression
        filters
        isSimple
        simpleVariables
    }
 */
(function() {
  var self;
  alight.utils.compile = self = {};
  self.cache = {};
  self.Function = Function;

  /*
  compile expression
      no_return
      input
      string
  
  return
      fn
      rawExpression
  
      result
      filters
      isSimple
      simpleVariables
      expression
   */
  self.expression = function(src, cfg) {
    var args, e, error, exp, fn, funcCache, hash, no_return, result;
    cfg = cfg || {};
    src = src.trim();
    hash = src + '#';
    hash += cfg.no_return ? '+' : '-';
    hash += cfg.string ? 's' : 'v';
    if (cfg.input) {
      hash += cfg.input.join(',');
    }
    funcCache = self.cache[hash];
    if (funcCache) {
      return funcCache;
    }
    funcCache = alight.utils.parsExpression(src, {
      input: cfg.input
    });
    exp = funcCache.result;
    no_return = cfg.no_return || false;
    if (no_return) {
      result = "var $$;" + exp;
    } else {
      if (cfg.string && !funcCache.filters) {
        result = "var $$, __ = (" + exp + "); return '' + (__ || (__ == null?'':__))";
        funcCache.rawExpression = "(__=" + exp + ") || (__ == null?'':__)";
      } else {
        result = "var $$;return (" + exp + ")";
      }
    }
    try {
      if (cfg.input) {
        args = cfg.input.slice();
        args.unshift('$$scope');
        args.push(result);
        fn = self.Function.apply(null, args);
      } else {
        fn = self.Function('$$scope', result);
      }
    } catch (error) {
      e = error;
      alight.exceptionHandler(e, 'Wrong expression: ' + src, {
        src: src,
        cfg: cfg
      });
      throw 'Wrong expression: ' + exp;
    }
    funcCache.fn = fn;
    return self.cache[hash] = funcCache;
  };
  self.cacheText = {};
  self.buildText = function(text, data) {
    var d, escapedValue, fn, i, index, len, result;
    fn = self.cacheText[text];
    if (fn) {
      return function() {
        return fn.call(data);
      };
    }
    result = [];
    for (index = i = 0, len = data.length; i < len; index = ++i) {
      d = data[index];
      if (d.type === 'expression') {
        if (d.fn) {
          result.push("this[" + index + "].fn(this.scope)");
        } else {
          result.push("((x=this[" + index + "].value) || (x == null?'':x))");
        }
      } else if (d.value) {
        escapedValue = d.value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
        result.push('"' + escapedValue + '"');
      }
    }
    result = result.join(' + ');
    fn = self.Function("var x; return (" + result + ")");
    self.cacheText[text] = fn;
    return function() {
      return fn.call(data);
    };
  };
  self.cacheSimpleText = {};
  return self.buildSimpleText = function(text, data) {
    var d, escapedValue, fn, i, index, item, len, result, simpleVariables;
    item = text ? self.cacheSimpleText[text] : null;
    if (item || !data) {
      return item || null;
    }
    result = [];
    simpleVariables = [];
    for (index = i = 0, len = data.length; i < len; index = ++i) {
      d = data[index];
      if (d.type === 'expression') {
        result.push("(" + d.re + ")");
        if (d.simpleVariables) {
          simpleVariables.push.apply(simpleVariables, d.simpleVariables);
        }
      } else if (d.value) {
        escapedValue = d.value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
        result.push('"' + escapedValue + '"');
      }
    }
    result = result.join(' + ');
    fn = self.Function('$$scope', "var $$, __; return (" + result + ")");
    item = {
      fn: fn,
      simpleVariables: simpleVariables
    };
    if (text) {
      self.cacheSimpleText[text] = item;
    }
    return item;
  };
})();

var compileText, fastBinding, pathToEl;

pathToEl = function(path) {
  var i, j, len, result;
  if (!path.length) {
    return 'el';
  }
  result = 'el';
  for (j = 0, len = path.length; j < len; j++) {
    i = path[j];
    result += ".childNodes[" + i + "]";
  }
  return result;
};

compileText = function(text) {
  var ce, d, data, j, key, len, st;
  data = alight.utils.parsText(text);
  for (j = 0, len = data.length; j < len; j++) {
    d = data[j];
    if (d.type !== 'expression') {
      continue;
    }
    if (d.list.length > 1) {
      return null;
    }
    key = d.list[0];
    if (key[0] === '#') {
      return null;
    }
    if (key[0] === '=') {
      return null;
    }
    if (key.slice(0, 2) === '::') {
      return null;
    }
    ce = alight.utils.compile.expression(key, {
      string: true
    });
    if (!ce.rawExpression) {
      throw 'Error';
    }
    d.re = ce.rawExpression;
  }
  st = alight.utils.compile.buildSimpleText(text, data);
  return st.fn;
};

alight.core.fastBinding = fastBinding = function(element) {
  var path, self, source, walk;
  self = this;
  source = [];
  self.fastWatchFn = [];
  path = [];
  walk = function(element, deep) {
    var attr, childElement, fn, i, j, k, key, len, len1, ref, ref1, rel, rtext, text;
    if (element.nodeType === 1) {
      ref = element.attributes;
      for (j = 0, len = ref.length; j < len; j++) {
        attr = ref[j];
        if (attr.value.indexOf(alight.utils.pars_start_tag) < 0) {
          continue;
        }
        text = attr.value;
        key = attr.nodeName;
        rel = pathToEl(path);
        fn = compileText(text);
        rtext = text.replace(/"/g, '\\"').replace(/\n/g, '\\n');
        if (fn) {
          source.push("s.fw('" + rtext + "', " + self.fastWatchFn.length + ", " + rel + ", '" + key + "');");
          self.fastWatchFn.push(fn);
        } else {
          source.push("s.wt('" + rtext + "', " + rel + ", '" + key + "');");
        }
      }
      ref1 = element.childNodes;
      for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
        childElement = ref1[i];
        path.length = deep + 1;
        path[deep] = i;
        walk(childElement, deep + 1);
      }
    } else if (element.nodeType === 3) {
      if (element.nodeValue.indexOf(alight.utils.pars_start_tag) < 0) {
        return;
      }
      text = element.nodeValue;
      rel = pathToEl(path);
      fn = compileText(text);
      rtext = text.replace(/"/g, '\\"').replace(/\n/g, '\\n');
      if (fn) {
        source.push('s.fw("' + rtext + '", ' + self.fastWatchFn.length + ', ' + rel + ');');
        self.fastWatchFn.push(fn);
      } else {
        source.push('s.wt("' + rtext + '", ' + rel + ');');
      }
    }
    return null;
  };
  walk(element, 0);
  source = source.join('\n');
  self.resultFn = alight.utils.compile.Function('s', 'el', 'f$', source);
  return this;
};

fastBinding.prototype.bind = function(cd, element) {
  var self;
  self = this;
  self.currentCD = cd;
  self.resultFn(self, element, f$);
};

fastBinding.prototype.fw = function(text, fnIndex, element, attr) {
  var cd, fn, self, value, w;
  self = this;
  cd = self.currentCD;
  fn = self.fastWatchFn[fnIndex];
  value = fn(cd.scope);
  w = {
    isStatic: false,
    isArray: false,
    extraLoop: false,
    deep: false,
    value: value,
    callback: null,
    exp: fn,
    src: text,
    onStop: null,
    el: element,
    ea: attr || null
  };
  cd.watchList.push(w);
  execWatchObject(cd.scope, w, value);
};

fastBinding.prototype.wt = function(expression, element, attr) {
  this.currentCD.watchText(expression, null, {
    element: element,
    elementAttr: attr
  });
};

(function() {
  var directiveOption, formatModifier, keyCodes, makeEvent, setKeyModifier;
  alight.hooks.attribute.unshift({
    code: 'events',
    fn: function() {
      var d;
      d = this.attrName.match(/^\@([\w\.\-]+)$/);
      if (!d) {
        return;
      }
      this.ns = 'al';
      this.name = 'on';
      this.attrArgument = d[1];
    }
  });

  /*
  eventModifier
      = 'keydown blur'
      = ['keydown', 'blur']
      =
          event: string or list
          fn: (event, env) ->
   */
  alight.hooks.eventModifier = {};
  setKeyModifier = function(name, key) {
    return alight.hooks.eventModifier[name] = {
      event: ['keydown', 'keypress', 'keyup'],
      fn: function(event, env) {
        if (!event[key]) {
          env.stop = true;
        }
      }
    };
  };
  setKeyModifier('alt', 'altKey');
  setKeyModifier('control', 'ctrlKey');
  setKeyModifier('ctrl', 'ctrlKey');
  setKeyModifier('meta', 'metaKey');
  setKeyModifier('shift', 'shiftKey');
  formatModifier = function(modifier, filterByEvents) {
    var e, i, inuse, len, ref, result;
    result = {};
    if (typeof modifier === 'string') {
      result.event = modifier;
    } else if (typeof modifier === 'object' && modifier.event) {
      result.event = modifier.event;
    }
    if (typeof result.event === 'string') {
      result.event = result.event.split(/\s+/);
    }
    if (filterByEvents) {
      if (result.event) {
        inuse = false;
        ref = result.event;
        for (i = 0, len = ref.length; i < len; i++) {
          e = ref[i];
          if (filterByEvents.indexOf(e) >= 0) {
            inuse = true;
            break;
          }
        }
        if (!inuse) {
          return null;
        }
      }
    }
    if (f$.isFunction(modifier)) {
      result.fn = modifier;
    } else if (modifier.fn) {
      result.fn = modifier.fn;
    }
    if (modifier.init) {
      result.init = modifier.init;
    }
    return result;
  };
  alight.d.al.on = {
    priority: 10,
    init: function(scope, element, expression, env) {
      var event, handler;
      if (!env.attrArgument) {
        return;
      }
      event = env.attrArgument.split('.')[0];
      handler = makeEvent(env.attrArgument, directiveOption[event]);
      return handler(scope, element, expression, env);
    }
  };
  keyCodes = {
    enter: 13,
    tab: 9,
    "delete": 46,
    backspace: 8,
    esc: 27,
    space: 32,
    up: 38,
    down: 40,
    left: 37,
    right: 39
  };
  makeEvent = function(attrArgument, option) {
    var args, debounce, debounceTime, eventList, eventName, filterByKey, i, initFn, k, len, modifier, modifiers, prevent, ref, scan, stop, throttle, throttleId;
    option = option || {};
    args = attrArgument.split('.');
    eventName = args[0];
    eventList = null;
    stop = option.stop || false;
    prevent = option.prevent || false;
    scan = true;
    modifiers = [];
    filterByKey = null;
    throttle = null;
    throttleId = null;
    debounce = null;
    debounceTime = 0;
    initFn = null;
    modifier = alight.hooks.eventModifier[eventName];
    if (modifier) {
      modifier = formatModifier(modifier);
      if (modifier.event) {
        eventList = modifier.event;
        if (modifier.fn) {
          modifiers.push(modifier);
        }
        if (modifier.init) {
          initFn = modifier.init;
        }
      }
    }
    if (!eventList) {
      eventList = [eventName];
    }
    ref = args.slice(1);
    for (i = 0, len = ref.length; i < len; i++) {
      k = ref[i];
      if (k === 'stop') {
        stop = true;
        continue;
      }
      if (k === 'prevent') {
        prevent = true;
        continue;
      }
      if (k === 'nostop') {
        stop = false;
        continue;
      }
      if (k === 'noprevent') {
        prevent = false;
        continue;
      }
      if (k === 'noscan') {
        scan = false;
        continue;
      }
      if (k.substring(0, 9) === 'throttle-') {
        throttle = Number(k.substring(9));
        continue;
      }
      if (k.substring(0, 9) === 'debounce-') {
        debounce = Number(k.substring(9));
        continue;
      }
      modifier = alight.hooks.eventModifier[k];
      if (modifier) {
        modifier = formatModifier(modifier, eventList);
        if (modifier) {
          modifiers.push(modifier);
        }
        continue;
      }
      if (!option.filterByKey) {
        continue;
      }
      if (filterByKey === null) {
        filterByKey = {};
      }
      if (keyCodes[k]) {
        k = keyCodes[k];
      }
      filterByKey[k] = true;
    }
    return function(scope, element, expression, env) {
      var e, execute, fn, getValue, handler, j, len1;
      fn = scope.$compile(expression, {
        no_return: true,
        input: ['$event', '$element', '$value']
      });
      if (element.type === 'checkbox') {
        getValue = function() {
          return element.checked;
        };
      } else if (element.type === 'radio') {
        getValue = function() {
          return element.value || element.checked;
        };
      } else {
        getValue = function() {
          return element.value;
        };
      }
      execute = function(event) {
        var error, error1;
        try {
          fn(scope, event, element, getValue());
        } catch (error1) {
          error = error1;
          alight.exceptionHandler(error, "Error in event: " + attrArgument + " = " + expression, {
            attr: attrArgument,
            exp: expression,
            scope: scope,
            element: element,
            event: event
          });
        }
        if (scan) {
          scope.$scan();
        }
      };
      handler = function(event) {
        var j, len1;
        if (filterByKey) {
          if (!filterByKey[event.keyCode]) {
            return;
          }
        }
        if (modifiers.length) {
          env = {
            stop: false
          };
          for (j = 0, len1 = modifiers.length; j < len1; j++) {
            modifier = modifiers[j];
            modifier.fn(event, env);
            if (env.stop) {
              return;
            }
          }
        }
        if (prevent) {
          event.preventDefault();
        }
        if (stop) {
          event.stopPropagation();
        }
        if (throttle) {
          if (throttleId) {
            clearTimeout(throttleId);
          }
          throttleId = setTimeout(function() {
            throttleId = null;
            return execute(event);
          }, throttle);
        } else if (debounce) {
          if (debounceTime < Date.now()) {
            debounceTime = Date.now() + debounce;
            execute(event);
          }
        } else {
          execute(event);
        }
      };
      for (j = 0, len1 = eventList.length; j < len1; j++) {
        e = eventList[j];
        f$.on(element, e, handler);
      }
      if (initFn) {
        initFn(scope, element, expression, env);
      }
      scope.$watch('$destroy', function() {
        var l, len2, results;
        results = [];
        for (l = 0, len2 = eventList.length; l < len2; l++) {
          e = eventList[l];
          results.push(f$.off(element, e, handler));
        }
        return results;
      });
    };
  };
  return directiveOption = {
    click: {
      stop: true,
      prevent: true
    },
    dblclick: {
      stop: true,
      prevent: true
    },
    submit: {
      stop: true,
      prevent: true
    },
    keyup: {
      filterByKey: true
    },
    keypress: {
      filterByKey: true
    },
    keydown: {
      filterByKey: true
    }
  };
})();

var clickMaker;

clickMaker = function(event) {
  return {
    priority: 10,
    stopPropagation: true,
    link: function(scope, element, name, env) {
      var self;
      return self = {
        stopPropagation: this.stopPropagation,
        callback: scope.$compile(name, {
          no_return: true,
          input: ['$event']
        }),
        start: function() {
          self.onDom();
          self.stop = env.takeAttr('al-click-stop');
        },
        onDom: function() {
          f$.on(element, event, self.doCallback);
          scope.$watch('$destroy', self.offDom);
        },
        offDom: function() {
          f$.off(element, event, self.doCallback);
        },
        doCallback: function(e) {
          var error;
          if (!self.stop) {
            e.preventDefault();
            if (self.stopPropagation) {
              e.stopPropagation();
            }
          }
          if (element.getAttribute('disabled')) {
            return;
          }
          try {
            self.callback(scope, e);
          } catch (error) {
            e = error;
            alight.exceptionHandler(e, 'al-click, error in expression: ' + name, {
              name: name,
              scope: scope,
              element: element
            });
          }
          if (self.stop && scope.$eval(self.stop)) {
            e.preventDefault();
            if (self.stopPropagation) {
              e.stopPropagation();
            }
          }
          scope.$scan();
        }
      };
    }
  };
};

alight.d.al.click = clickMaker('click');

alight.d.al.dblclick = clickMaker('dblclick');

alight.d.al.value = {
  priority: 20,
  link: function(scope, element, variable) {
    var self;
    return self = {
      onDom: function() {
        f$.on(element, 'input', self.updateModel);
        f$.on(element, 'change', self.updateModel);
        scope.$watch('$destroy', self.offDom);
      },
      offDom: function() {
        f$.off(element, 'input', self.updateModel);
        f$.off(element, 'change', self.updateModel);
      },
      updateModel: function() {
        scope.$setValue(variable, element.value);
        self.watch.refresh();
        scope.$scan();
      },
      watchModel: function() {
        self.watch = scope.$watch(variable, self.updateDom);
      },
      updateDom: function(value) {
        if (value == null) {
          value = '';
        }
        element.value = value;
        return '$scanNoChanges';
      },
      start: function() {
        self.onDom();
        self.watchModel();
      }
    };
  }
};

alight.d.al.checked = {
  priority: 20,
  link: function(scope, element, name) {
    var self;
    return self = {
      start: function() {
        self.onDom();
        self.watchModel();
      },
      onDom: function() {
        f$.on(element, 'change', self.updateModel);
        scope.$watch('$destroy', self.offDom);
      },
      offDom: function() {
        f$.off(element, 'change', self.updateModel);
      },
      updateModel: function() {
        var value;
        value = element.checked;
        scope.$setValue(name, value);
        self.watch.refresh();
        scope.$scan();
      },
      watchModel: function() {
        self.watch = scope.$watch(name, self.updateDom);
      },
      updateDom: function(value) {
        element.checked = !!value;
        return '$scanNoChanges';
      }
    };
  }
};

alight.d.al["if"] = {
  priority: 700,
  link: function(scope, element, name, env) {
    var self;
    if (env.elementCanBeRemoved) {
      alight.exceptionHandler(null, env.attrName + " can't control element because of " + env.elementCanBeRemoved, {
        scope: scope,
        element: element,
        value: name,
        env: env
      });
      return {};
    }
    env.stopBinding = true;
    return self = {
      item: null,
      childCD: null,
      base_element: null,
      top_element: null,
      start: function() {
        self.prepare();
        self.watchModel();
      },
      prepare: function() {
        self.base_element = element;
        self.top_element = document.createComment(" " + env.attrName + ": " + name + " ");
        f$.before(element, self.top_element);
        f$.remove(element);
      },
      updateDom: function(value) {
        if (value) {
          self.insertBlock(value);
        } else {
          self.removeBlock();
        }
      },
      removeBlock: function() {
        if (!self.childCD) {
          return;
        }
        self.childCD.destroy();
        self.childCD = null;
        self.removeDom(self.item);
        self.item = null;
      },
      insertBlock: function() {
        if (self.childCD) {
          return;
        }
        self.item = self.base_element.cloneNode(true);
        self.insertDom(self.top_element, self.item);
        self.childCD = env.changeDetector["new"]();
        alight.bind(self.childCD, self.item, {
          skip_attr: env.skippedAttr(),
          elementCanBeRemoved: env.attrName
        });
      },
      watchModel: function() {
        scope.$watch(name, self.updateDom);
      },
      removeDom: function(element) {
        f$.remove(element);
      },
      insertDom: function(base, element) {
        f$.after(base, element);
      }
    };
  }
};

alight.d.al.ifnot = {
  priority: 700,
  link: function(scope, element, name, env) {
    var self;
    self = alight.d.al["if"].link(scope, element, name, env);
    self.updateDom = function(value) {
      if (value) {
        self.removeBlock();
      } else {
        self.insertBlock();
      }
    };
    return self;
  }
};


/*
    al-repeat="item in list"
    "item in list"
    "item in list | filter"
    "item in list | filter track by trackExpression"
    "item in list track by $index"
    "item in list track by $id(item)"
    "item in list track by item.id"

    "(key, value) in object"
    "(key, value) in object orderBy:key:reverse"
    "(key, value) in object | filter orderBy:key,reverse"
 */
alight.directives.al.repeat = {
  priority: 1000,
  restrict: 'AM',
  init: function(parentScope, element, exp, env) {
    var CD, self;
    if (env.elementCanBeRemoved) {
      alight.exceptionHandler(null, env.attrName + " can't control element because of " + env.elementCanBeRemoved, {
        scope: parentScope,
        element: element,
        value: exp,
        env: env
      });
      return {};
    }
    env.stopBinding = true;
    CD = parentScope.$changeDetector;
    return self = {
      start: function() {
        self.parsExpression();
        self.prepareDom();
        self.buildUpdateDom();
        self.watchModel();
        self.makeChildConstructor();
      },
      parsExpression: function() {
        var r, s;
        s = exp.trim();
        if (s[0] === '(') {
          self.objectMode = true;
          r = s.match(/\((\w+),\s*(\w+)\)\s+in\s+(.+)\s+orderBy:(.+)\s*$/);
          if (r) {
            self.objectKey = r[1];
            self.objectValue = r[2];
            self.expression = r[3] + (" | toArray:" + self.objectKey + "," + self.objectValue + " | orderBy:" + r[4]);
            self.nameOfKey = '$item';
            self.trackExpression = '$item.' + self.objectKey;
          } else {
            r = s.match(/\((\w+),\s*(\w+)\)\s+in\s+(.+)\s*$/);
            if (!r) {
              throw 'Wrong repeat: ' + exp;
            }
            self.objectKey = r[1];
            self.objectValue = r[2];
            self.expression = r[3] + (" | toArray:" + self.objectKey + "," + self.objectValue);
            self.nameOfKey = '$item';
            self.trackExpression = '$item.' + self.objectKey;
          }
        } else {
          r = s.match(/(.*) track by ([\w\.\$\(\)]+)/);
          if (r) {
            self.trackExpression = r[2];
            s = r[1];
          }
          r = s.match(/\s*(\w+)\s+in\s+(.+)/);
          if (!r) {
            throw 'Wrong repeat: ' + exp;
          }
          self.nameOfKey = r[1];
          self.expression = r[2];
        }
      },
      watchModel: function() {
        var flags;
        if (self.objectMode) {
          flags = {
            deep: true
          };
        } else {
          flags = {
            isArray: true
          };
        }
        self.watch = CD.watch(self.expression, self.updateDom, flags);
      },
      prepareDom: function() {
        var el, element_list, i, len, t, t2;
        if (element.nodeType === 8) {
          self.top_element = element;
          self.element_list = element_list = [];
          el = element.nextSibling;
          while (el) {
            if (el.nodeType === 8) {
              t = el.nodeValue;
              t2 = t.trim().split(/\s+/);
              if (t2[0] === '/directive:' && t2[1] === 'al-repeat') {
                env.skipToElement = el;
                break;
              }
            }
            element_list.push(el);
            el = el.nextSibling;
          }
          for (i = 0, len = element_list.length; i < len; i++) {
            el = element_list[i];
            f$.remove(el);
          }
          null;
        } else {
          self.base_element = element;
          self.top_element = document.createComment(" " + exp + " ");
          f$.before(element, self.top_element);
          f$.remove(element);
        }
      },
      makeChildConstructor: function() {
        var ChildScope;
        ChildScope = function() {
          this.$$root = CD.scope.$$root || CD.scope;
          return this;
        };
        ChildScope.prototype = CD.scope;
        self.ChildScope = ChildScope;
      },
      makeChild: function(item, index, list) {
        var childCD, scope;
        scope = new self.ChildScope();
        scope.$rootChangeDetector = childCD = CD["new"](scope);
        self.updateChild(childCD, item, index, list);
        return childCD;
      },
      updateChild: function(childCD, item, index, list) {
        var scope;
        scope = childCD.scope;
        if (self.objectMode) {
          scope[self.objectKey] = item[self.objectKey];
          scope[self.objectValue] = item[self.objectValue];
        } else {
          scope[self.nameOfKey] = item;
        }
        scope.$index = index;
        scope.$first = index === 0;
        scope.$last = index === list.length - 1;
      },
      rawUpdateDom: function(removes, inserts) {
        var e, i, it, j, len, len1;
        for (i = 0, len = removes.length; i < len; i++) {
          e = removes[i];
          f$.remove(e);
        }
        for (j = 0, len1 = inserts.length; j < len1; j++) {
          it = inserts[j];
          f$.after(it.after, it.element);
        }
      },
      buildUpdateDom: function() {
        return self.updateDom = (function() {
          var _getId, _id, fastBinding, generator, getResultList, index, node_by_id, node_del, node_get, node_set, nodes;
          nodes = [];
          index = 0;
          fastBinding = false;
          if (self.trackExpression === '$index') {
            node_by_id = {};
            node_get = function(item) {
              var $id;
              $id = index;
              return node_by_id[$id] || null;
            };
            node_del = function(node) {
              var $id;
              $id = node.$id;
              if($id != null) delete node_by_id[$id];
            };
            node_set = function(item, node) {
              var $id;
              $id = index;
              node.$id = $id;
              node_by_id[$id] = node;
            };
          } else {
            if (self.trackExpression) {
              node_by_id = {};
              _getId = (function() {
                var fn;
                fn = CD.compile(self.trackExpression, {
                  input: ['$id', self.nameOfKey]
                });
                return function(a, b) {
                  return fn(CD.scope, a, b);
                };
              })();
              _id = function(item) {
                var id;
                id = item.$alite_id;
                if (id) {
                  return id;
                }
                id = item.$alite_id = alight.utils.getId();
                return id;
              };
              node_get = function(item) {
                var $id;
                $id = _getId(_id, item);
                if($id != null) return node_by_id[$id];
                return null;
              };
              node_del = function(node) {
                var $id;
                $id = node.$id;
                if($id != null) delete node_by_id[$id];
              };
              node_set = function(item, node) {
                var $id;
                $id = _getId(_id, item);
                node.$id = $id;
                node_by_id[$id] = node;
              };
            } else {
              if (window.Map) {
                node_by_id = new Map();
                node_get = function(item) {
                  return node_by_id.get(item);
                };
                node_del = function(node) {
                  node_by_id["delete"](node.item);
                };
                node_set = function(item, node) {
                  node_by_id.set(item, node);
                };
              } else {
                node_by_id = {};
                node_get = function(item) {
                  var $id;
                  if (typeof item === 'object') {
                    $id = item.$alite_id;
                    if ($id) {
                      return node_by_id[$id];
                    }
                  } else {
                    return node_by_id[item] || null;
                  }
                  return null;
                };
                node_del = function(node) {
                  var $id;
                  $id = node.$id;
                  if (node_by_id[$id]) {
                    node.$id = null;
                    delete node_by_id[$id];
                  }
                };
                node_set = function(item, node) {
                  var $id;
                  if (typeof item === 'object') {
                    $id = alight.utils.getId();
                    item.$alite_id = $id;
                    node.$id = $id;
                    node_by_id[$id] = node;
                  } else {
                    node.$id = item;
                    node_by_id[item] = node;
                  }
                };
              }
            }
          }
          generator = [];
          getResultList = function(input) {
            var size, t;
            t = typeof input;
            if (t === 'object') {
              if (input && input.length) {
                return input;
              }
            } else {
              if (t === 'number') {
                size = Math.floor(input);
              } else if (t === 'string') {
                size = Math.floor(input);
                if (isNaN(size)) {
                  return [];
                }
              }
              if (size < generator.length) {
                generator.length = size;
              } else {
                while (generator.length < size) {
                  generator.push(generator.length);
                }
              }
              return generator;
            }
            return [];
          };
          if (self.element_list) {
            return function(input) {
              var applyList, bel, childCD, dom_inserts, dom_removes, el, elLast, element_list, i, it, item, item_value, j, k, l, last_element, len, len1, len2, len3, len4, len5, len6, len7, list, m, n, next2, node, nodes2, o, p, pid, prev_moved, prev_node, ref, ref1, ref2, skippedAttrs;
              list = getResultList(input);
              last_element = self.top_element;
              dom_inserts = [];
              nodes2 = [];
              for (i = 0, len = nodes.length; i < len; i++) {
                node = nodes[i];
                node.active = false;
              }
              for (index = j = 0, len1 = list.length; j < len1; index = ++j) {
                item = list[index];
                node = node_get(item);
                if (node) {
                  node.active = true;
                }
              }
              dom_removes = [];
              for (k = 0, len2 = nodes.length; k < len2; k++) {
                node = nodes[k];
                if (node.active) {
                  continue;
                }
                if (node.prev) {
                  node.prev.next = node.next;
                }
                if (node.next) {
                  node.next.prev = node.prev;
                }
                node_del(node);
                node.CD.destroy();
                ref = node.element_list;
                for (l = 0, len3 = ref.length; l < len3; l++) {
                  el = ref[l];
                  dom_removes.push(el);
                }
                node.next = null;
                node.prev = null;
                node.element_list = null;
              }
              applyList = [];
              pid = null;
              prev_node = null;
              prev_moved = false;
              elLast = self.element_list.length - 1;
              for (index = m = 0, len4 = list.length; m < len4; index = ++m) {
                item = list[index];
                item_value = item;
                node = node_get(item);
                if (node) {
                  self.updateChild(node.CD, item, index, list);
                  if (node.prev === prev_node) {
                    if (prev_moved) {
                      ref1 = node.element_list;
                      for (n = 0, len5 = ref1.length; n < len5; n++) {
                        el = ref1[n];
                        dom_inserts.push({
                          element: el,
                          after: last_element
                        });
                        last_element = el;
                      }
                    }
                    prev_node = node;
                    last_element = node.element_list[elLast];
                    node.active = true;
                    nodes2.push(node);
                    continue;
                  }
                  node.prev = prev_node;
                  if (prev_node) {
                    prev_node.next = node;
                  }
                  ref2 = node.element_list;
                  for (o = 0, len6 = ref2.length; o < len6; o++) {
                    el = ref2[o];
                    dom_inserts.push({
                      element: el,
                      after: last_element
                    });
                    last_element = el;
                  }
                  prev_moved = true;
                  prev_node = node;
                  node.active = true;
                  nodes2.push(node);
                  continue;
                }
                childCD = self.makeChild(item_value, index, list);
                element_list = (function() {
                  var len7, p, ref3, results;
                  ref3 = self.element_list;
                  results = [];
                  for (p = 0, len7 = ref3.length; p < len7; p++) {
                    bel = ref3[p];
                    el = bel.cloneNode(true);
                    applyList.push({
                      cd: childCD,
                      el: el
                    });
                    dom_inserts.push({
                      element: el,
                      after: last_element
                    });
                    results.push(last_element = el);
                  }
                  return results;
                })();
                node = {
                  CD: childCD,
                  element_list: element_list,
                  prev: prev_node,
                  next: null,
                  active: true,
                  item: item
                };
                node_set(item, node);
                if (prev_node) {
                  next2 = prev_node.next;
                  prev_node.next = node;
                  node.next = next2;
                  if (next2) {
                    next2.prev = node;
                  }
                } else if (index === 0 && nodes[0]) {
                  next2 = nodes[0];
                  node.next = next2;
                  next2.prev = node;
                }
                prev_node = node;
                nodes2.push(node);
              }
              nodes = nodes2;
              self.rawUpdateDom(dom_removes, dom_inserts);
              dom_removes.length = 0;
              dom_inserts.length = 0;
              skippedAttrs = env.skippedAttr();
              for (p = 0, len7 = applyList.length; p < len7; p++) {
                it = applyList[p];
                alight.bind(it.cd, it.el, {
                  skip_attr: skippedAttrs,
                  elementCanBeRemoved: env.attrName
                });
              }
            };
          } else {
            return function(input) {
              var applyList, childCD, dom_inserts, dom_removes, i, it, item, item_value, j, k, l, last_element, len, len1, len2, len3, len4, list, m, next2, node, nodes2, pid, prev_moved, prev_node, r, skippedAttrs;
              list = getResultList(input);
              last_element = self.top_element;
              dom_inserts = [];
              nodes2 = [];
              for (i = 0, len = nodes.length; i < len; i++) {
                node = nodes[i];
                node.active = false;
              }
              for (index = j = 0, len1 = list.length; j < len1; index = ++j) {
                item = list[index];
                node = node_get(item);
                if (node) {
                  node.active = true;
                }
              }
              dom_removes = [];
              for (k = 0, len2 = nodes.length; k < len2; k++) {
                node = nodes[k];
                if (node.active) {
                  continue;
                }
                if (node.prev) {
                  node.prev.next = node.next;
                }
                if (node.next) {
                  node.next.prev = node.prev;
                }
                node_del(node);
                node.CD.destroy();
                dom_removes.push(node.element);
                node.next = null;
                node.prev = null;
                node.element = null;
              }
              applyList = [];
              pid = null;
              prev_node = null;
              prev_moved = false;
              for (index = l = 0, len3 = list.length; l < len3; index = ++l) {
                item = list[index];
                item_value = item;
                node = node_get(item);
                if (node) {
                  self.updateChild(node.CD, item, index, list);
                  if (node.prev === prev_node) {
                    if (prev_moved) {
                      dom_inserts.push({
                        element: node.element,
                        after: prev_node.element
                      });
                    }
                    prev_node = node;
                    last_element = node.element;
                    node.active = true;
                    nodes2.push(node);
                    continue;
                  }
                  node.prev = prev_node;
                  if (prev_node) {
                    prev_node.next = node;
                  }
                  dom_inserts.push({
                    element: node.element,
                    after: last_element
                  });
                  prev_moved = true;
                  last_element = node.element;
                  prev_node = node;
                  node.active = true;
                  nodes2.push(node);
                  continue;
                }
                childCD = self.makeChild(item_value, index, list);
                element = self.base_element.cloneNode(true);
                applyList.push({
                  cd: childCD,
                  el: element
                });
                dom_inserts.push({
                  element: element,
                  after: last_element
                });
                node = {
                  CD: childCD,
                  element: element,
                  prev: prev_node,
                  next: null,
                  active: true,
                  item: item
                };
                last_element = element;
                node_set(item, node);
                if (prev_node) {
                  next2 = prev_node.next;
                  prev_node.next = node;
                  node.next = next2;
                  if (next2) {
                    next2.prev = node;
                  }
                } else if (index === 0 && nodes[0]) {
                  next2 = nodes[0];
                  node.next = next2;
                  next2.prev = node;
                }
                prev_node = node;
                nodes2.push(node);
              }
              nodes = nodes2;
              self.rawUpdateDom(dom_removes, dom_inserts);
              dom_removes.length = 0;
              dom_inserts.length = 0;
              skippedAttrs = env.skippedAttr();
              for (m = 0, len4 = applyList.length; m < len4; m++) {
                it = applyList[m];
                if (fastBinding) {
                  fastBinding.bind(it.cd, it.el);
                } else {
                  r = alight.bind(it.cd, it.el, {
                    skip_attr: skippedAttrs,
                    elementCanBeRemoved: env.attrName
                  });
                  if (r.directive === 0 && r.hook === 0) {
                    fastBinding = new alight.core.fastBinding(self.base_element);
                  }
                }
              }
            };
          }
        })();
      }
    };
  }
};

alight.d.al.init = function(scope, element, exp) {
  var e, error, fn;
  try {
    fn = scope.$compile(exp, {
      no_return: true,
      input: ['$element']
    });
    fn(scope, element);
  } catch (error) {
    e = error;
    alight.exceptionHandler(e, 'al-init, error in expression: ' + exp, {
      exp: exp,
      scope: scope,
      element: element
    });
  }
};

alight.d.al["class"] = alight.d.al.css = {
  priority: 30,
  link: function(scope, element, exp) {
    var self;
    return self = {
      start: function() {
        self.parsLine();
        self.prepare();
      },
      parsLine: function() {
        var e, i, j, len, list, ref;
        self.list = list = [];
        ref = exp.split(',');
        for (j = 0, len = ref.length; j < len; j++) {
          e = ref[j];
          i = e.indexOf(':');
          if (i < 0) {
            alight.exceptionHandler(e, 'al-css, error in expression: ' + exp, {
              exp: exp,
              e: e,
              scope: scope,
              element: element
            });
          } else {
            list.push({
              css: e.slice(0, +(i - 1) + 1 || 9e9).trim().split(' '),
              exp: e.slice(i + 1).trim()
            });
          }
        }
      },
      prepare: function() {
        var color, item, j, len, ref;
        ref = self.list;
        for (j = 0, len = ref.length; j < len; j++) {
          item = ref[j];
          color = (function(item) {
            return function(value) {
              self.draw(item, value);
              return '$scanNoChanges';
            };
          })(item);
          scope.$watch(item.exp, color);
        }
      },
      draw: function(item, value) {
        var c, j, k, len, len1, ref, ref1;
        if (value) {
          ref = item.css;
          for (j = 0, len = ref.length; j < len; j++) {
            c = ref[j];
            f$.addClass(element, c);
          }
        } else {
          ref1 = item.css;
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            c = ref1[k];
            f$.removeClass(element, c);
          }
        }
      }
    };
  }
};

alight.d.al.src = function(scope, element, name) {
  var setter;
  setter = function(value) {
    if (!value) {
      value = '';
    }
    element.setAttribute('src', value);
    return '$scanNoChanges';
  };
  scope.$watchText(name, setter);
};

alight.d.al.text = function(scope, element, name) {
  var self;
  return self = {
    start: function() {
      self.watchModel();
    },
    updateDom: function(value) {
      if (value == null) {
        value = '';
      }
      if (element.textContent !== void 0) {
        element.textContent = value;
      } else {
        element.innerText = value;
      }
      return '$scanNoChanges';
    },
    watchModel: function() {
      scope.$watch(name, self.updateDom);
    }
  };
};

alight.d.al.app = {
  priority: 2000,
  stopBinding: true
};

alight.d.bo["switch"] = {
  priority: 500,
  ChangeDetector: true,
  link: function(scope, element, name, env) {
    env.changeDetector.$switch = {
      value: scope.$eval(name),
      on: false
    };
  }
};

alight.d.bo.switchWhen = {
  priority: 500,
  link: function(scope, element, name, env) {
    var cd;
    cd = env.changeDetector;
    if (cd.$switch.value !== name) {
      f$.remove(element);
      env.stopBinding = true;
    } else {
      cd.$switch.on = true;
    }
  }
};

alight.d.bo.switchDefault = {
  priority: 500,
  link: function(scope, element, name, env) {
    if (env.changeDetector.$switch.on) {
      f$.remove(element);
      env.stopBinding = true;
    }
  }
};

(function() {
  var makeBindOnceIf;
  makeBindOnceIf = function(direct) {
    var self;
    return self = {
      priority: 700,
      link: function(scope, element, exp, env) {
        var value;
        value = scope.$eval(exp);
        if (!value === direct) {
          f$.remove(element);
          env.stopBinding = true;
        }
      }
    };
  };
  alight.d.bo["if"] = makeBindOnceIf(true);
  return alight.d.bo.ifnot = makeBindOnceIf(false);
})();

alight.d.al.stop = {
  priority: -10,
  restrict: 'AE',
  stopBinding: true
};

alight.d.al.include = {
  priority: 100,
  link: function(scope, element, name, env) {
    var activeElement, baseElement, child, self, topElement;
    if (env.elementCanBeRemoved) {
      alight.exceptionHandler(null, env.attrName + " can't control element because of " + env.elementCanBeRemoved, {
        scope: scope,
        element: element,
        value: name,
        env: env
      });
      return {};
    }
    env.stopBinding = true;
    child = null;
    baseElement = null;
    topElement = null;
    activeElement = null;
    self = {
      start: function() {
        self.prepare();
        self.watchModel();
      },
      prepare: function() {
        baseElement = element;
        topElement = document.createComment(" " + env.attrName + ": " + name + " ");
        f$.before(element, topElement);
        f$.remove(element);
      },
      loadHtml: function(cfg) {
        f$.ajax(cfg);
      },
      removeBlock: function() {
        if (child) {
          child.destroy();
          child = null;
        }
        if (activeElement) {
          self.removeDom(activeElement);
          activeElement = null;
        }
      },
      insertBlock: function(html) {
        activeElement = baseElement.cloneNode(true);
        activeElement.innerHTML = html;
        self.insertDom(topElement, activeElement);
        child = env.changeDetector["new"]();
        alight.bind(child, activeElement, {
          skip_attr: env.skippedAttr(),
          elementCanBeRemoved: env.attrName
        });
      },
      updateDom: function(url) {
        if (!url) {
          self.removeBlock();
          return;
        }
        self.loadHtml({
          cache: true,
          url: url,
          success: function(html) {
            self.removeBlock();
            return self.insertBlock(html);
          },
          error: self.removeBlock
        });
      },
      removeDom: function(element) {
        f$.remove(element);
      },
      insertDom: function(base, element) {
        f$.after(base, element);
      },
      watchModel: function() {
        scope.$watch(name, self.updateDom);
      }
    };
    return self;
  }
};

alight.d.al.cloak = function(scope, element, name, env) {
  element.removeAttribute(env.attrName);
  if (name) {
    f$.removeClass(element, name);
  }
};

alight.d.al.enable = function(scope, element, exp) {
  var setter;
  setter = function(value) {
    if (value) {
      element.removeAttribute('disabled');
    } else {
      element.setAttribute('disabled', 'disabled');
    }
  };
  scope.$watch(exp, setter);
};

alight.d.al.disable = function(scope, element, exp) {
  var setter;
  setter = function(value) {
    if (value) {
      element.setAttribute('disabled', 'disabled');
    } else {
      element.removeAttribute('disabled');
    }
  };
  scope.$watch(exp, setter);
};

alight.d.al.focused = {
  priority: 20,
  link: function(scope, element, name) {
    var safe;
    return safe = {
      updateModel: function(value) {
        if (scope.$getValue(name) === value) {
          return;
        }
        scope.$setValue(name, value);
        self.watch.refresh();
        scope.$scan();
      },
      onDom: function() {
        var voff, von;
        von = function() {
          return safe.updateModel(true);
        };
        voff = function() {
          return safe.updateModel(false);
        };
        f$.on(element, 'focus', von);
        f$.on(element, 'blur', voff);
        scope.$watch('$destroy', function() {
          f$.off(element, 'focus', von);
          return f$.off(element, 'blur', voff);
        });
      },
      updateDom: function(value) {
        if (value) {
          element.focus();
        } else {
          element.blur();
        }
        return '$scanNoChanges';
      },
      watchModel: function() {
        self.watch = scope.$watch(name, safe.updateDom);
      },
      start: function() {
        safe.onDom();
        safe.watchModel();
      }
    };
  }
};

alight.d.al.readonly = function(scope, element, exp) {
  var setter;
  setter = function(value) {
    element.readOnly = !!value;
  };
  scope.$watch(exp, setter, {
    readOnly: true
  });
};

alight.d.al.submit = function(scope, element, name) {
  var self;
  return self = {
    callback: scope.$compile(name, {
      no_return: true,
      input: ['$event']
    }),
    start: function() {
      self.onDom();
    },
    onDom: function() {
      f$.on(element, 'submit', self.doCallback);
      scope.$watch('$destroy', self.offDom);
    },
    offDom: function() {
      f$.off(element, 'submit', self.doCallback);
    },
    doCallback: function(e) {
      var error;
      e.preventDefault();
      e.stopPropagation();
      try {
        self.callback(scope, e);
      } catch (error) {
        e = error;
        alight.exceptionHandler(e, 'al-submit, error in expression: ' + name, {
          name: name,
          scope: scope,
          element: element
        });
      }
      scope.$scan();
    }
  };
};

var fn, i, key, len, ref;

ref = ['keydown', 'keypress', 'keyup', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseup', 'focus', 'blur', 'change'];
fn = function(key) {
  return alight.d.al[key] = function(scope, element, exp) {
    var self;
    return self = {
      start: function() {
        self.makeCaller();
        self.onDom();
      },
      makeCaller: function() {
        self.caller = scope.$compile(exp, {
          no_return: true,
          input: ['$event']
        });
      },
      onDom: function() {
        f$.on(element, key, self.callback);
        scope.$watch('$destroy', self.offDom);
      },
      offDom: function() {
        f$.off(element, key, self.callback);
      },
      callback: function(e) {
        var error;
        try {
          self.caller(scope, e);
        } catch (error) {
          e = error;
          alight.exceptionHandler(e, key + ', error in expression: ' + exp, {
            exp: exp,
            scope: scope,
            element: element
          });
        }
        scope.$scan();
      }
    };
  };
};
for (i = 0, len = ref.length; i < len; i++) {
  key = ref[i];
  fn(key);
}


/*
    al-html="model"
    al-html:id=" 'templateId' "
    al-html:id.literal="templateId" // template id without 'quotes'
    al-html:url="model"
    al-html:url.tpl="/templates/{{templateId}}"
 */
alight.d.al.html = {
  restrict: 'AM',
  priority: 100,
  modifier: {},
  link: function(scope, element, inputName, env) {
    var self;
    if (env.elementCanBeRemoved && element.nodeType !== 8) {
      alight.exceptionHandler(null, env.attrName + " can't control element because of " + env.elementCanBeRemoved, {
        scope: scope,
        element: element,
        value: inputName,
        env: env
      });
      return {};
    }
    env.stopBinding = true;
    return self = {
      baseElement: null,
      topElement: null,
      activeElement: null,
      childCD: null,
      name: inputName,
      watchMode: null,
      start: function() {
        self.parsing();
        self.prepare();
        self.watchModel();
      },
      parsing: function() {
        var i, len, modifierName, ref;
        if (env.attrArgument) {
          ref = env.attrArgument.split('.');
          for (i = 0, len = ref.length; i < len; i++) {
            modifierName = ref[i];
            if (modifierName === 'literal') {
              self.watchMode = 'literal';
              continue;
            }
            if (modifierName === 'tpl') {
              self.watchMode = 'tpl';
              continue;
            }
            if (!alight.d.al.html.modifier[modifierName]) {
              continue;
            }
            alight.d.al.html.modifier[modifierName](self, {
              scope: scope,
              element: element,
              inputName: inputName,
              env: env
            });
          }
        }
      },
      prepare: function() {
        if (element.nodeType === 8) {
          self.baseElement = null;
          self.topElement = element;
        } else {
          self.baseElement = element;
          self.topElement = document.createComment(" " + env.attrName + ": " + inputName + " ");
          f$.before(element, self.topElement);
          f$.remove(element);
        }
      },
      removeBlock: function() {
        var el, i, len, ref;
        if (self.childCD) {
          self.childCD.destroy();
          self.childCD = null;
        }
        if (self.activeElement) {
          if (Array.isArray(self.activeElement)) {
            ref = self.activeElement;
            for (i = 0, len = ref.length; i < len; i++) {
              el = ref[i];
              self.removeDom(el);
            }
          } else {
            self.removeDom(self.activeElement);
          }
          self.activeElement = null;
        }
      },
      insertBlock: function(html) {
        var current, el, t;
        if (self.baseElement) {
          self.activeElement = self.baseElement.cloneNode(false);
          self.activeElement.innerHTML = html;
          if (self.domOptimization) {
            alight.utils.optmizeElement(self.activeElement);
          }
          self.insertDom(self.topElement, self.activeElement);
          self.childCD = env.changeDetector["new"]();
          alight.bind(self.childCD, self.activeElement, {
            skip_attr: env.skippedAttr(),
            elementCanBeRemoved: env.attrName
          });
        } else {
          t = document.createElement('body');
          t.innerHTML = html;
          if (self.domOptimization) {
            alight.utils.optmizeElement(t);
          }
          current = self.topElement;
          self.activeElement = [];
          self.childCD = env.changeDetector["new"]();
          while (el = t.firstChild) {
            self.insertDom(current, el);
            current = el;
            self.activeElement.push(el);
            alight.bind(self.childCD, current, {
              skip_attr: env.skippedAttr(),
              elementCanBeRemoved: env.attrName
            });
          }
        }
      },
      updateDom: function(html) {
        self.removeBlock();
        if (html) {
          self.insertBlock(html);
        }
      },
      removeDom: function(element) {
        f$.remove(element);
      },
      insertDom: function(base, element) {
        f$.after(base, element);
      },
      watchModel: function() {
        if (self.watchMode === 'literal') {
          self.updateDom(self.name);
        } else if (self.watchMode === 'tpl') {
          scope.$watchText(self.name, self.updateDom);
        } else {
          scope.$watch(self.name, self.updateDom);
        }
      }
    };
  }
};

alight.d.al.html.modifier.id = function(self) {
  return self.updateDom = function(id) {
    var html, tpl;
    self.removeBlock();
    tpl = document.getElementById(id);
    if (tpl) {
      html = tpl.innerHTML;
      if (html) {
        self.insertBlock(html);
      }
    }
  };
};

alight.d.al.html.modifier.url = function(self) {
  self.domOptimization = alight.debug.domOptimization;
  self.loadHtml = function(cfg) {
    f$.ajax(cfg);
  };
  return self.updateDom = function(url) {
    if (!url) {
      self.removeBlock();
      return;
    }
    self.loadHtml({
      cache: true,
      url: url,
      success: function(html) {
        self.removeBlock();
        self.insertBlock(html);
      },
      error: self.removeBlock
    });
  };
};

alight.d.al.html.modifier.scope = function(self, option) {
  var d, innerName, oneTime, outerName;
  d = self.name.split(':');
  if (d.length === 2) {
    self.name = d[0];
    outerName = d[1];
  } else {
    d = self.name.match(/(.+)\:\s*\:\:([\d\w]+)$/);
    if (d) {
      oneTime = true;
    } else {
      oneTime = false;
      d = self.name.match(/(.+)\:\s*([\.\w]+)$/);
      if (!d) {
        throw 'Wrong expression ' + self.name;
      }
    }
    self.name = d[1];
    outerName = d[2];
  }
  innerName = 'outer';
  return self.insertBlock = function(html) {
    var ChildScope, parentCD, parentScope, scope, w;
    self.activeElement = self.baseElement.cloneNode(false);
    self.activeElement.innerHTML = html;
    self.insertDom(self.topElement, self.activeElement);
    parentScope = option.scope;
    ChildScope = function() {};
    ChildScope.prototype = parentScope;
    parentCD = option.env.changeDetector;
    scope = new ChildScope;
    scope.$$root = parentScope.$$root || parentScope;
    scope.$rootChangeDetector = self.childCD = parentCD["new"](scope);
    scope.$changeDetector = null;
    scope.$parent = parentScope;
    w = parentCD.watch(outerName, function(outerValue) {
      return scope[innerName] = outerValue;
    }, {
      oneTime: oneTime
    });
    self.childCD.watch('$destroy', function() {
      return w.stop();
    });
    alight.bind(self.childCD, self.activeElement, {
      skip_attr: option.env.skippedAttr()
    });
  };
};

alight.d.al.html.modifier.inline = function(self, option) {
  var originalPrepare;
  originalPrepare = self.prepare;
  return self.prepare = function() {
    originalPrepare();
    return option.scope.$setValue(self.name, self.baseElement.innerHTML);
  };
};

alight.d.al.radio = {
  priority: 20,
  link: function(scope, element, name, env) {
    var self;
    return self = {
      start: function() {
        self.makeValue();
        self.onDom();
        self.watchModel();
      },
      makeValue: function() {
        var key, value;
        key = env.takeAttr('al-value');
        if (key) {
          value = scope.$eval(key);
        } else {
          value = env.takeAttr('value');
        }
        self.value = value;
      },
      onDom: function() {
        f$.on(element, 'change', self.updateModel);
        scope.$watch('$destroy', self.offDom);
      },
      offDom: function() {
        f$.off(element, 'change', self.updateModel);
      },
      updateModel: function() {
        scope.$setValue(name, self.value);
        self.watch.refresh();
        scope.$scan();
      },
      watchModel: function() {
        self.watch = scope.$watch(name, self.updateDom);
      },
      updateDom: function(value) {
        element.checked = value === self.value;
        return '$scanNoChanges';
      }
    };
  }
};

alight.d.al.show = function(scope, element, exp) {
  var self;
  return self = {
    showDom: function() {
      f$.removeClass(element, 'al-hide');
    },
    hideDom: function() {
      f$.addClass(element, 'al-hide');
    },
    updateDom: function(value) {
      if (value) {
        self.showDom();
      } else {
        self.hideDom();
      }
      return '$scanNoChanges';
    },
    watchModel: function() {
      scope.$watch(exp, self.updateDom);
    },
    start: function() {
      self.watchModel();
    }
  };
};

alight.d.al.hide = function(scope, element, exp, env) {
  var self;
  self = alight.d.al.show(scope, element, exp, env);
  self.updateDom = function(value) {
    if (value) {
      self.hideDom();
    } else {
      self.showDom();
    }
    return '$scanNoChanges';
  };
  return self;
};

alight.d.al.style = function(scope, element, name) {
  var prev, setter;
  prev = {};
  setter = function(style) {
    var k, key, ref, v;
    for (key in prev) {
      v = prev[key];
      element.style[key] = '';
    }
    prev = {};
    ref = style || {};
    for (k in ref) {
      v = ref[k];
      key = k.replace(/(-\w)/g, function(m) {
        return m.substring(1).toUpperCase();
      });
      prev[key] = v;
      element.style[key] = v || '';
    }
  };
  scope.$watch(name, setter, {
    deep: true
  });
};


/*
    <select al-select="selected">
      <option al-repeat="item in list" al-option="item">{{item.name}}</option>
      <optgroup label="Linux">
          <option al-repeat="linux in list2" al-option="linux">Linux {{linux.codeName}}</option>
      </optgroup>
    </select>
 */
(function() {
  var Mapper;
  if (window.Map) {
    Mapper = function() {
      this.idByItem = new Map;
      this.itemById = {};
      this.index = 1;
      return this;
    };
    Mapper.prototype.acquire = function(item) {
      var id;
      id = "i" + (this.index++);
      this.idByItem.set(item, id);
      this.itemById[id] = item;
      return id;
    };
    Mapper.prototype.release = function(id) {
      var item;
      item = this.itemById[id];
      delete this.itemById[id];
      this.idByItem["delete"](item);
    };
    Mapper.prototype.replace = function(id, item) {
      var old;
      old = this.itemById[id];
      this.idByItem["delete"](old);
      this.idByItem.set(item, id);
      this.itemById[id] = item;
    };
    Mapper.prototype.getId = function(item) {
      return this.idByItem.get(item);
    };
    Mapper.prototype.getItem = function(id) {
      return this.itemById[id] || null;
    };
  } else {
    Mapper = function() {
      this.itemById = {
        'i#null': null
      };
      return this;
    };
    Mapper.prototype.acquire = function(item) {
      var id;
      if (item === null) {
        return 'i#null';
      }
      if (typeof item === 'object') {
        id = item.$alite_id;
        if (!id) {
          item.$alite_id = id = alight.utils.getId();
        }
      } else {
        id = '' + item;
      }
      this.itemById[id] = item;
      return id;
    };
    Mapper.prototype.release = function(id) {
      delete this.itemById[id];
    };
    Mapper.prototype.replace = function(id, item) {
      this.itemById[id] = item;
    };
    Mapper.prototype.getId = function(item) {
      if (item === null) {
        return 'i#null';
      }
      if (typeof item === 'object') {
        return item.$alite_id;
      } else {
        return '' + item;
      }
    };
    Mapper.prototype.getItem = function(id) {
      return this.itemById[id] || null;
    };
  }
  alight.d.al.select = {
    priority: 20,
    link: function(scope, element, key, env) {
      var cd, lastValue, mapper, onChangeDOM, setValueOfElement, watch;
      cd = env.changeDetector["new"]();
      env.stopBinding = true;
      cd.$select = {
        mapper: mapper = new Mapper
      };
      lastValue = null;
      cd.$select.change = function() {
        return alight.nextTick(function() {
          return setValueOfElement(lastValue);
        });
      };
      setValueOfElement = function(value) {
        var id;
        id = mapper.getId(value);
        if (id) {
          return element.value = id;
        } else {
          return element.selectedIndex = -1;
        }
      };
      watch = cd.watch(key, function(value) {
        lastValue = value;
        return setValueOfElement(value);
      });
      onChangeDOM = function(event) {
        lastValue = mapper.getItem(event.target.value);
        cd.setValue(key, lastValue);
        watch.refresh();
        return cd.scan();
      };
      f$.on(element, 'input', onChangeDOM);
      f$.on(element, 'change', onChangeDOM);
      cd.watch('$destroy', function() {
        f$.off(element, 'input', onChangeDOM);
        return f$.off(element, 'change', onChangeDOM);
      });
      return alight.bind(cd, element, {
        skip_attr: env.skippedAttr()
      });
    }
  };
  return alight.d.al.option = function(scope, element, key, env) {
    var cd, i, id, j, mapper, select, step;
    cd = step = env.changeDetector;
    for (i = j = 0; j <= 4; i = ++j) {
      select = step.$select;
      if (select) {
        break;
      }
      step = step.parent || {};
    }
    if (!select) {
      alight.exceptionHandler('', 'Error in al-option - al-select is not found', {
        cd: cd,
        scope: cd.scope,
        element: element,
        value: key
      });
      return;
    }
    mapper = select.mapper;
    id = null;
    cd.watch(key, function(item) {
      if (id) {
        if (mapper.getId(item) !== id) {
          mapper.release(id);
          id = mapper.acquire(item);
          element.value = id;
          select.change();
        } else {
          mapper.replace(id, item);
        }
      } else {
        id = mapper.acquire(item);
        element.value = id;
        select.change();
      }
    });
    cd.watch('$destroy', function() {
      mapper.release(id);
      return select.change();
    });
  };
})();

alight.d.al.ctrl = {
  global: false,
  stopBinding: true,
  priority: 500,
  link: function(scope, element, name, env) {
    var error, self;
    error = function(e, title) {
      alight.exceptionHandler(e, title, {
        name: name,
        env: env,
        scope: scope,
        element: element
      });
    };
    return self = {
      getController: function(name) {
        var $ns, fn;
        $ns = scope.$ns;
        if ($ns && $ns.ctrl) {
          fn = $ns.ctrl[name];
          if (!fn && !$ns.inheritGlobal) {
            error('', 'Controller not found in $ns: ' + name);
            return;
          }
        }
        if (!fn) {
          fn = alight.ctrl[name];
          if (!fn && alight.d.al.ctrl.global) {
            fn = window[name];
          }
        }
        if (!fn) {
          error('', 'Controller not found: ' + name);
        }
        return fn;
      },
      start: function() {
        var Controller, childScope, e, error1, fn, k, ref, ref1, v;
        if (name) {
          fn = self.getController(name);
          if (!fn) {
            return;
          }
        } else {
          fn = null;
        }
        if (fn && Object.keys(fn.prototype).length) {
          Controller = function() {};
          ref = Scope.prototype;
          for (k in ref) {
            v = ref[k];
            Controller.prototype[k] = v;
          }
          ref1 = fn.prototype;
          for (k in ref1) {
            v = ref1[k];
            Controller.prototype[k] = v;
          }
          childScope = alight.Scope({
            $parent: scope,
            customScope: new Controller,
            childFromChangeDetector: env.changeDetector
          });
        } else {
          childScope = alight.Scope({
            $parent: scope,
            childFromChangeDetector: env.changeDetector
          });
        }
        try {
          if (fn) {
            childScope.$changeDetector = childScope.$rootChangeDetector;
            fn.call(childScope, childScope, element, name, env);
            childScope.$changeDetector = null;
          }
        } catch (error1) {
          e = error1;
          error(e, 'Error in controller: ' + name);
        }
        alight.bind(childScope, element, {
          skip_attr: env.skippedAttr()
        });
      }
    };
  }
};

(function() {
  var props;
  alight.hooks.attribute.unshift({
    code: 'attribute',
    fn: function() {
      var d, value;
      d = this.attrName.match(/^\:([\w\.\-]+)$/);
      if (!d) {
        return;
      }
      value = d[1];
      if (value.split('.')[0] === 'html') {
        this.name = 'html';
        value = value.substring(5);
      } else {
        this.name = 'attr';
      }
      this.ns = 'al';
      this.attrArgument = value;
    }
  });
  props = {
    checked: 'checked',
    readonly: 'readOnly',
    value: 'value',
    selected: 'selected',
    muted: 'muted',
    disabled: 'disabled',
    hidden: 'hidden'
  };
  return alight.d.al.attr = function(scope, element, key, env) {
    var attrName, d, isTemplate, prop, setter, styleName;
    if (!env.attrArgument) {
      return;
    }
    d = env.attrArgument.split('.');
    attrName = d[0];
    prop = props[attrName];
    isTemplate = d.indexOf('tpl') > 0;
    if (attrName === 'style') {
      if (!d[1]) {
        throw 'Need to define a style attribute';
      }
      styleName = d[1].replace(/(-\w)/g, function(m) {
        return m.substring(1).toUpperCase();
      });
      setter = function(value) {
        if (value == null) {
          value = '';
        }
        return element.style[styleName] = value;
      };
    } else if (attrName === 'focus') {
      setter = function(value) {
        if (value) {
          return element.focus();
        } else {
          return element.blur();
        }
      };
    } else {
      setter = function(value) {
        if (prop) {
          if (value === void 0) {
            value = null;
          }
          if (element[prop] !== value) {
            return element[prop] = value;
          }
        } else {
          if (value != null) {
            return element.setAttribute(attrName, value);
          } else {
            return element.removeAttribute(attrName);
          }
        }
      };
    }
    if (isTemplate) {
      return scope.$watchText(key, setter, {
        readOnly: true
      });
    } else {
      return scope.$watch(key, setter, {
        readOnly: true
      });
    }
  };
})();

alight.d.al.model = {
  priority: 20,
  link: function(scope, element, value, env) {
    var name;
    name = element.nodeName.toLowerCase();
    if (name === 'select') {
      return alight.d.al.select.link(scope, element, value, env);
    }
    if (name === 'input') {
      if (element.type === 'checkbox') {
        return alight.d.al.checked.link(scope, element, value, env);
      }
      if (element.type === 'radio') {
        return alight.d.al.radio.link(scope, element, value, env);
      }
    }
    return alight.d.al.value.link(scope, element, value, env);
  }
};

alight.filters.slice = function(exp, scope, env) {
  var a, b, d, kind, setter, value;
  value = null;
  a = null;
  b = null;
  kind = null;
  setter = function() {
    if (!value) {
      return;
    }
    if (!kind) {
      return;
    }
    if (kind === 2) {
      return env.setValue(value.slice(a, b));
    } else {
      return env.setValue(value.slice(a));
    }
  };
  d = exp.split(',');
  if (d.length === 1) {
    scope.$watch(exp, function(pos) {
      kind = 1;
      a = pos;
      return setter();
    });
  } else {
    scope.$watch(d[0] + " + '_' + " + d[1], function(filter) {
      var f;
      kind = 2;
      f = filter.split('_');
      a = Number(f[0]);
      b = Number(f[1]);
      return setter();
    });
  }
  this.onChange = function(input) {
    value = input;
    return setter();
  };
  return this;
};

alight.filters.slice.prototype.ext = true;

(function() {
  var d2, makeDate;
  d2 = function(x) {
    if (x < 10) {
      return '0' + x;
    }
    return '' + x;
  };
  makeDate = function(exp, value) {
    var d, i, len, r, x;
    if (!value) {
      return '';
    }
    value = new Date(value);
    x = [[/yyyy/g, value.getFullYear()], [/mm/g, d2(value.getMonth() + 1)], [/dd/g, d2(value.getDate())], [/HH/g, d2(value.getHours())], [/MM/g, d2(value.getMinutes())], [/SS/g, d2(value.getSeconds())]];
    r = exp;
    for (i = 0, len = x.length; i < len; i++) {
      d = x[i];
      r = r.replace(d[0], d[1]);
    }
    return r;
  };
  return alight.filters.date = function(value, exp) {
    return makeDate(exp, value);
  };
})();

var J;

alight.filters.json = J = (function() {
  function J() {}

  J.prototype.watchMode = 'deep';

  J.prototype.onChange = function(value) {
    return this.setValue(JSON.stringify(alight.utils.clone(value), null, 4));
  };

  return J;

})();

var F;

alight.filters.filter = F = (function() {
  function F(exp, scope, env) {
    var filterObject, that;
    that = this;
    filterObject = null;
    this.value = [];
    this.doFiltering = function() {
      var a, e, f, k, r, result, v;
      e = filterObject;
      if (!e) {
        env.setValue(that.value);
        return null;
      }
      if (typeof e === 'string') {
        e = {
          __all: e
        };
      } else if (typeof e !== 'object') {
        env.setValue(that.value);
        return null;
      }
      result = (function() {
        var i, len, ref, results;
        ref = that.value;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          r = ref[i];
          if (typeof r === 'object') {
            f = true;
            if (e.__all) {
              f = false;
              a = e.__all.toLowerCase();
              for (k in r) {
                v = r[k];
                if (k === '$alite_id') {
                  continue;
                }
                if (('' + v).toLowerCase().indexOf(a) >= 0) {
                  f = true;
                  break;
                }
              }
              if (!f) {
                continue;
              }
            }
            for (k in e) {
              v = e[k];
              if (k === '__all') {
                continue;
              }
              a = r[k];
              if (!a) {
                f = false;
                break;
              }
              if (('' + a).toLowerCase().indexOf(('' + v).toLowerCase()) < 0) {
                f = false;
                break;
              }
            }
            if (!f) {
              continue;
            }
            results.push(r);
          } else {
            if (!e.__all) {
              continue;
            }
            a = e.__all.toLowerCase();
            if (('' + r).toLowerCase().indexOf(a) < 0) {
              continue;
            }
            results.push(r);
          }
        }
        return results;
      })();
      env.setValue(result);
      return null;
    };
    scope.$watch(exp, function(input) {
      filterObject = input;
      return that.doFiltering();
    }, {
      deep: true
    });
  }

  F.prototype.onChange = function(input) {
    this.value = input;
    return this.doFiltering();
  };

  return F;

})();

var O;

alight.filters.orderBy = O = (function() {
  function O(exp, scope) {
    var d;
    this.list = null;
    this.key = 'key';
    this.direction = 1;
    d = exp.split(',');
    if (d[0]) {
      scope.$watch(d[0].trim(), (function(_this) {
        return function(value) {
          _this.key = value;
          return _this.doSort();
        };
      })(this));
    }
    if (d[1]) {
      scope.$watch(d[1].trim(), (function(_this) {
        return function(value) {
          _this.direction = value ? 1 : -1;
          return _this.doSort();
        };
      })(this));
    }
  }

  O.prototype.doSort = function() {
    if (this.list instanceof Array) {
      this.list.sort(this.sortFn.bind(this));
      return this.setValue(this.list);
    }
  };

  O.prototype.sortFn = function(a, b) {
    var va, vb;
    va = a[this.key] || null;
    vb = b[this.key] || null;
    if (va < vb) {
      return -this.direction;
    }
    if (va > vb) {
      return this.direction;
    }
    return 0;
  };

  O.prototype.onChange = function(input) {
    if (input instanceof Array) {
      this.list = input.slice();
    } else {
      this.list = null;
    }
    return this.doSort();
  };

  return O;

})();

var T;

alight.filters.throttle = T = (function() {
  T.prototype.ext = true;

  function T(delay, scope, env) {
    var to;
    delay = Number(delay);
    to = null;
    this.onChange = function(value) {
      if (to) {
        clearTimeout(to);
      }
      return to = setTimeout(function() {
        to = null;
        env.setValue(value);
        return scope.$scan();
      }, delay);
    };
  }

  return T;

})();

var A;

alight.filters.toArray = A = (function() {
  A.prototype.watchMode = 'deep';

  function A(exp, scope, env) {
    var d, keyName, result, valueName;
    if (exp) {
      d = exp.split(',');
      if (d.length === 2) {
        keyName = d[0].trim();
        valueName = d[1].trim();
      } else {
        throw 'Wrong filter arguments for toArray';
      }
    } else {
      keyName = 'key';
      valueName = 'value';
    }
    result = [];
    this.onChange = function(obj) {
      var key, value;
      result.length = 0;
      for (key in obj) {
        value = obj[key];
        d = {};
        d[keyName] = key;
        d[valueName] = value;
        result.push(d);
      }
      return env.setValue(result);
    };
  }

  return A;

})();

alight.filters.storeTo = function(value, key, scope) {
  scope.$setValue(key, value);
  return value;
};

alight.text['='] = function(callback, expression, scope, env) {
  var ce;
  ce = alight.utils.compile.expression(expression);
  if (ce.filters) {
    throw 'Conflict: bindonce and filters, use one-time binding';
  }
  env["finally"](ce.fn(scope));
};

alight.text['::'] = function(callback, expression, scope, env) {
  scope.$watch(expression, function(value) {
    return env["finally"](value);
  }, {
    oneTime: true
  });
};

alight.text['&'] = function(callback, expression, scope, env) {
  var d, fn;
  d = expression.split(':');
  fn = scope.$compile(d[1], {
    input: ['$value']
  });
  return scope.$watch(d[0], function(value) {
    var result;
    result = fn(scope, value);
    if (window.Promise) {
      if (result instanceof Promise) {
        return result.then(function(value) {
          callback(value);
          return scope.$scan();
        });
      } else {
        return callback(result);
      }
    } else {
      return callback(result);
    }
  });
};

	/* prev prefix.js */
		return alight;
	}; // finish of buildAlight

	var alight = buildAlight();
	alight.makeInstance = buildAlight;

	if(typeof(alightInitCallback) === 'function') {
		alightInitCallback(alight)
	} else if(typeof(define) === 'function') {  // requrejs/commonjs
		define(function() {
			return alight;
		});
	} else if(typeof(module) === 'object' && typeof(module.exports) === 'object') {
		module.exports = alight
	} else {
		alight.d.al.ctrl.global = true;  // global controllers
		window.alight = alight;
		alight.f$.ready(alight.bootstrap);
	};
})();
