/**
 * Angular Light 0.11.8
 * (c) 2015 Oleg Nechaev
 * Released under the MIT License.
 * 2015-11-28, http://angularlight.org/ 
 */(function() {
    function buildAlight() {
        var alight = {
            filters: {},
            text: {},
            core: {},
            utils: {},
            d: {
                al: {},
                bo: {},
                ctrl: {}
            },
            hooks: {
                directive: [],
                binding: []
            }
        };
        var f$ = {};
        alight.f$ = f$;
        alight.directives = alight.d;
        alight.ctrl = alight.d.ctrl;

        var removeItem = function(list, item) {
            var i = list.indexOf(item);
            if(i >= 0) list.splice(i, 1)
            else console.warn('trying to remove not exist item')
        };
        /* next postfix.js */
/* library to work with DOM */
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
    if(typeof String.prototype.trimLeft !== 'function') {
        String.prototype.trimLeft = function() {
            return this.replace(/^\s+/,"");
        }
    };

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


    if(msie && msie < 8) {
        f$.text = function(elm, text) {
            $(elm).text(text)
        }
    } else {
        f$.text = function(element, text) {
            if(arguments.length === 2) {
                if(element.textContent !== undefined) element.textContent = text;
                else element.innerText = text                
            } else {
                return element.textContent || element.innerText;
            }
        };
    };

    if(msie && msie < 6) {
        f$.html = function(elm, html) {
            if(arguments.length === 2) $(elm).html(html)
            else return $(elm).html()
        }
    } else {
        f$.html = function(elm, html) {
            if(arguments.length === 2) elm.innerHTML = html;
            else return elm.innerHTML
        }
    };

    f$.createComment = function(text) {
        return document.createComment(text)
    };

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
    if(msie && msie < 9) {
        f$.on = function(element, event, callback) {
            $(element).on(event, callback)
        };
        f$.off = function(element, event, callback) {
            $(element).off(event, callback)
        };
    } else {
        f$.on = function(element, event, callback) {
            element.addEventListener(event, callback, false)
        };
        f$.off = function(element, event, callback) {
            element.removeEventListener(event, callback, false)
        };        
    }

    f$.clone = function(elm) {
        return elm.cloneNode(true);
    };

    if(msie && msie < 8) {
        f$.find = function(element, selector) {
            return $(element).find(selector)
        };
    } else {
        f$.find = function(element, selector) {
            return element.querySelectorAll(selector)
        };
    };

    // attr
    if(msie && msie < 8) {
        f$.attr = function(element, name, value) {
            return $(element).attr(name, value)
        };

        f$.removeAttr = function(element, name) {
            $(element).removeAttr(name)
        };
    } else {
        f$.attr = function(element, name, value) {
            if(arguments.length===2)
                return element.getAttribute(name)
            else
                element.setAttribute(name, value)
        };

        f$.removeAttr = function(element, name) {
            element.removeAttribute(name)
        };        
    };
    

    //    # $.isFunction
    f$.isFunction = function(fn) {
        var gt = {};
        return (fn && gt.toString.call(fn) === '[object Function]')
    };

    f$.isObject = function(fn) {
        var gt = {};
        return (fn && gt.toString.call(fn) === '[object Object]')
    };

    f$.isArray = function(obj) {
        return obj instanceof Array;
    };

    if(msie && msie < 6) {
        f$.val = function(element, value) {
            if(arguments.length===1) return $(element).val();
            else $(element).val(value)
        }
    } else {
        f$.val = function(element, value) {
            if(arguments.length===1) return element.value
            else element.value = value
        }
    }

    if(msie && msie < 6) {
        f$.prop = function(element, name, value) {
            if(arguments.length===2) return $(element).prop(name);
            else $(element).prop(name, value)
        };
    } else {
        f$.prop = function(element, name, value) {
            if(arguments.length===2) return element[name]
            else element[name] = value
        };
    }

    if(msie && msie < 8) {
        f$.addClass = function(element, name) {
            $(element).addClass(name)
        };

        f$.removeClass = function(element, name) {
            $(element).removeClass(name)
        };
    } else {
        f$.addClass = function(element, name) {
            if(element.classList) element.classList.add(name)
            else element.className += ' ' + name
        };

        f$.removeClass = function(element, name) {
            if(element.classList) element.classList.remove(name)
            else element.className = element.className.replace(new RegExp('(^| )' + name.split(' ').join('|') + '( |$)', 'gi'), ' ')
        };
    }

    if(msie && msie < 8) {
        f$.show = function(element) {
            $(element).show()
        };

        f$.hide = function(element) {
            $(element).hide()
        };
    } else {
        f$.show = function(element) {
            f$.removeClass(element, 'al-hide')
        };

        f$.hide = function(element) {
            f$.addClass(element, 'al-hide')
        };
    }

    // children
    if( (msie && msie < 9) || (firefox && firefox < 4)){
        f$.children = function(element) {
            return $(element).children()
        };
    } else {
        f$.children = function(element) {
            return element.children
        }        
    };

    f$.childNodes = function(element) {
        var r = [], lst = element.childNodes;
        for(var i=0;i<lst.length;i++)
            r.push(lst[i])
        return r
    };

    // getAttributes
    if(msie && msie < 8) {
        f$.getAttributes = function (element) {
            var attr = {};
            var elem = $(element);
            if(elem.length) $.each(elem.get(0).attributes, function(v,n) {
                var n = n.nodeName||n.name;
                v = elem.attr(n);
                if(v != undefined && v !== false) attr[n] = v
            });

            return attr
        }
    } else {
        f$.getAttributes = function (element) {
            var attr, r = {}, attrs = element.attributes;
            for (var i=0, l=attrs.length; i<l; i++) {
                attr = attrs.item(i)
                r[attr.nodeName] = attr.value;
            }
            return r
        };
    }

    // ready
    if(msie && msie < 9) {
        f$.ready = function(callback) {
            $(function() {callback()});
        }
    } else {
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
    }

    if(msie && msie < 9) {
        var empty = function(){};
        var rawAjax = function(args) {
            $.ajax({
                url: args.url,
                type: args.type || 'GET',
                username: args.username,
                password: args.password,
                headers: args.headers,
                data: args.data
            }).then(args.success || empty, args.error || empty)
        }
    } else {
        var rawAjax = function(args) {
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
    };

    f$.ajaxCache = {};
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
    f$.ajax = function(args) {
        if(args.username || args.password || args.headers || args.data || !args.cache) return rawAjax(args);

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
        rawAjax({
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

    if(msie && msie < 8) {
        f$.focus = function(element) {
            $(element).focus()
        }

        f$.blur = function(element) {
            $(element).blur()
        }
    } else {
        f$.focus = function(element) {
            element.focus()
        }

        f$.blur = function(element) {
            element.blur()
        }
    };

    if(msie && msie < 9) {
        f$.isElement = function(el) {
            return (typeof el==="object") && (el.nodeType===1) &&
                    (typeof el.style === "object") && (typeof el.ownerDocument ==="object");
        };
    } else {
        f$.isElement = function(el) {
            return el instanceof HTMLElement
        };
    };

    // append classes
    (function(){
        var css = '@charset "UTF-8";[al-cloak],.al-hide{display:none !important;}';
        var head = f$.find(document, 'head')[0];

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

var ChangeDetector, Root, WA, getFilter, get_time, isFrozen, makeFilterChain, makeSkipWatchObject, notEqual, scanCore, watchAny, watchInitValue;

alight.ChangeDetector = function(scope) {
  var cd, root;
  root = new Root();
  cd = new ChangeDetector(root, scope || {});
  root.topCD = cd;
  return cd;
};

makeSkipWatchObject = function() {
  var list, map;
  if (f$.isFunction(window.Map)) {
    map = new Map;
    return {
      set: function(w) {
        return map.set(w, true);
      },
      get: function(w) {
        if (!map.size) {
          return false;
        }
        return map.get(w);
      },
      clear: function() {
        return map.clear();
      }
    };
  } else {
    list = [];
    return {
      set: function(w) {
        return list.push(w);
      },
      get: function(w) {
        if (!list.length) {
          return false;
        }
        return list.indexOf(w) >= 0;
      },
      clear: function() {
        return list.length = 0;
      }
    };
  }
};

Root = function() {
  this.cdLine = [];
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
  this.skippedWatches = makeSkipWatchObject();
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
  root.cdLine.push(this);
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
  removeItem(root.cdLine, cd);
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
    return root.destroy();
  }
};

getFilter = function(name, cd, param) {
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
  return function(cd, pe, baseCallback, option) {
    var filter, filterArg, filterBuilder, filterExp, filterName, i, onStop, prevCallback, rindex, root, w, watchMode, watchOptions;
    root = cd.root;
    if (option.isArray) {
      watchMode = 'array';
    } else if (option.deep) {
      watchMode = 'deep';
    } else {
      watchMode = 'simple';
    }
    prevCallback = baseCallback;
    rindex = pe.result.length - 1;
    onStop = [];
    while (rindex > 0) {
      filterExp = pe.result[rindex--].trim();
      i = filterExp.indexOf(':');
      if (i > 0) {
        filterName = filterExp.slice(0, +(i - 1) + 1 || 9e9);
        filterArg = filterExp.slice(i + 1);
      } else {
        filterName = filterExp;
        filterArg = null;
      }
      filterBuilder = getFilter(filterName, cd, filterArg);
      filter = filterBuilder(filterArg, cd, {
        setValue: prevCallback
      });
      if (f$.isFunction(filter)) {
        prevCallback = (function(filter, prevCallback) {
          return function(value) {
            return prevCallback(filter(value));
          };
        })(filter, prevCallback);
      } else {
        if (filter.watchMode) {
          watchMode = filter.watchMode;
        }
        prevCallback = filter.onChange;
        if (filter.onStop) {
          onStop.push(filter.onStop);
        }
        if (!f$.isFunction(prevCallback)) {
          alight.exceptionHandler('', 'wrong filter: ' + filterName, {
            name: filterName,
            args: filterArg
          });
          return;
        }
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
    w = cd.watch(pe.expression, prevCallback, watchOptions);
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
  var cd, ce, d, exp, isFunction, isStatic, key, pe, r, root, scope;
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
      pe = alight.utils.parsExpression(name);
      if (pe.result.length > 1) {
        return makeFilterChain(cd, pe, callback, option);
      }
      ce = alight.utils.compile.expression(name);
      isStatic = ce.isSimple && ce.simpleVariables.length === 0 && !option.isArray;
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
    deep: option.deep,
    value: watchInitValue,
    callback: callback,
    exp: exp,
    src: '' + name,
    onStop: option.onStop || null
  };
  if (isStatic) {
    cd.watch('$onScanOnce', function() {
      return callback(d.exp(scope));
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

isFrozen = Object.isFrozen || function() {
  return false;
};

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

scanCore = function(root, result) {
  var a0, a1, cd, changes, extraLoop, j, k, last, len, len1, mutated, ref, ref1, scope, total, value, w;
  extraLoop = false;
  changes = 0;
  total = 0;
  ref = root.cdLine.slice();
  for (j = 0, len = ref.length; j < len; j++) {
    cd = ref[j];
    scope = cd.scope;
    total += cd.watchList.length;
    ref1 = cd.watchList.slice();
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      w = ref1[k];
      result.src = w.src;
      last = w.value;
      value = w.exp(scope);
      if (last !== value) {
        mutated = false;
        if (w.isArray) {
          a0 = f$.isArray(last);
          a1 = f$.isArray(value);
          if (a0 === a1) {
            if (a0) {
              if (isFrozen(last)) {
                mutated = true;
              } else {
                if (notEqual(last, value)) {
                  mutated = true;
                }
              }
              if (mutated) {
                if (isFrozen(value)) {
                  w.value = value;
                } else {
                  w.value = value.slice();
                }
              }
            }
          } else {
            mutated = true;
            if (!a1) {
              w.value = null;
            }
          }
          if (mutated && a1) {
            if (isFrozen(value)) {
              w.value = value;
            } else {
              w.value = value.slice();
            }
          }
        } else if (w.deep) {
          if (!alight.utils.equal(last, value)) {
            mutated = true;
            w.value = alight.utils.clone(value);
          }
        } else {
          mutated = true;
          w.value = value;
        }
        if (mutated) {
          mutated = false;
          changes++;
          if (!root.skippedWatches.get(w)) {
            if (w.callback.call(scope, value) !== '$scanNoChanges') {
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
  }
  result.total = total;
  result.changes = changes;
  return result.extraLoop = extraLoop;
};

Root.prototype.scan = function(cfg) {
  var callback, cb, duration, e, finishScanOnce, j, k, l, len, len1, len2, len3, m, mainLoop, onScanOnce, ref, ref1, result, root, start;
  root = this;
  cfg = cfg || {};
  if (f$.isFunction(cfg)) {
    cfg = {
      callback: cfg
    };
  }
  if (cfg.callback) {
    root.watchers.finishScanOnce.push(cfg.callback);
  }
  if (cfg.skipWatch) {
    root.skippedWatches.set(cfg.skipWatch.$);
  }
  if (cfg.late) {
    if (root.lateScan) {
      return;
    }
    root.lateScan = true;
    alight.nextTick(function() {
      if (root.lateScan) {
        return root.scan();
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
  if (alight.debug.scan) {
    start = get_time();
  }
  mainLoop = 10;
  try {
    result = {
      total: 0,
      changes: 0,
      extraLoop: false,
      src: ''
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
      scanCore(root, result);
      if (result.changes) {
        ref = root.watchers.any;
        for (k = 0, len1 = ref.length; k < len1; k++) {
          cb = ref[k];
          cb();
        }
      }
      if (!result.extraLoop && !root.extraLoop) {
        break;
      }
    }
    if (alight.debug.scan) {
      duration = get_time() - start;
      console.log("$scan: loops: (" + (10 - mainLoop) + "), last-loop changes: " + result.changes + ", watches: " + result.total + " / " + duration + "ms");
    }
  } catch (_error) {
    e = _error;
    alight.exceptionHandler(e, '$scan, error in expression: ' + result.src, {
      src: result.src,
      result: result
    });
  } finally {
    root.status = null;
    root.skippedWatches.clear();
    ref1 = root.watchers.finishScan;
    for (l = 0, len2 = ref1.length; l < len2; l++) {
      callback = ref1[l];
      callback();
    }
    finishScanOnce = root.watchers.finishScanOnce.slice();
    root.watchers.finishScanOnce.length = 0;
    for (m = 0, len3 = finishScanOnce.length; m < len3; m++) {
      callback = finishScanOnce[m];
      callback.call(root);
    }
  }
  if (mainLoop === 0) {
    throw 'Infinity loop detected';
  }
  return result;
};

alight.core.ChangeDetector = ChangeDetector;

ChangeDetector.prototype.compile = function(expression, option) {
  return alight.utils.compile.expression(expression, option).fn;
};

ChangeDetector.prototype.scan = function(option) {
  return this.root.scan(option);
};

ChangeDetector.prototype.setValue = function(name, value) {
  var cd, fn;
  cd = this;
  fn = cd.compile(name + ' = $value', {
    input: ['$value'],
    no_return: true
  });
  return fn(cd.scope, value);
};

ChangeDetector.prototype["eval"] = function(exp) {
  var fn;
  fn = this.compile(exp);
  return fn(this.scope);
};

ChangeDetector.prototype.getValue = function(name) {
  return this["eval"](name);
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
  var getId;
  getId = (function() {
    var i;
    i = 0;
    return function() {
      i++;
      return 'wt' + i;
    };
  })();
  alight.text.$base = function(conf) {
    var cd, dir, dirName, env, exp, i, point, scope;
    point = conf.point;
    exp = conf.exp;
    i = exp.indexOf(' ');
    if (i < 0) {
      dirName = exp.slice(1);
      exp = '';
    } else {
      dirName = exp.slice(1, i);
      exp = exp.slice(i);
    }
    cd = conf.cd;
    scope = cd.scope;
    if (scope.$ns && scope.$ns.text) {
      dir = scope.$ns.text[dirName];
    } else {
      dir = alight.text[dirName];
    }
    if (!dir) {
      throw 'No directive alight.text.' + dirName;
    }
    env = {
      setter: function(value) {
        if (value === null) {
          point.value = '';
        } else {
          point.value = '' + value;
        }
        return conf.update();
      },
      "finally": function(value) {
        if (value === null) {
          point.value = '';
        } else {
          point.value = '' + value;
        }
        point.type = 'text';
        return conf["finally"]();
      }
    };
    return dir(env.setter, exp, cd, env);
  };
  return alight.core.ChangeDetector.prototype.watchText = function(expression, callback, config) {
    var canUseSimpleBuilder, cd, ce, d, data, doFinally, doUpdate, exp, fn, j, k, len, len1, noCache, pe, privateValue, resultValue, st, value, w, watchCount;
    config = config || {};
    cd = this;
    if (alight.debug.watchText) {
      console.log('$watchText', expression);
    }
    st = alight.utils.compile.buildSimpleText(expression, null);
    if (st) {
      cd.watch(expression, callback, {
        watchText: st
      });
      return;
    }
    data = alight.utils.parsText(expression);
    watchCount = 0;
    canUseSimpleBuilder = true;
    noCache = false;
    doUpdate = doFinally = function() {};
    for (j = 0, len = data.length; j < len; j++) {
      d = data[j];
      if (d.type === 'expression') {
        exp = d.list.join(' | ');
        if (exp[0] === '=') {
          exp = '#bindonce ' + exp.slice(1);
        } else if (exp.slice(0, 2) === '::') {
          exp = '#oneTimeBinding ' + exp.slice(2);
        }
        if (exp[0] === '#') {
          alight.text.$base({
            exp: exp,
            cd: cd,
            point: d,
            update: function() {
              return doUpdate();
            },
            "finally": function() {
              doUpdate();
              return doFinally();
            }
          });
          noCache = true;
          if (d.type !== 'text') {
            watchCount++;
            canUseSimpleBuilder = false;
          }
        } else {
          pe = alight.utils.parsExpression(exp);
          if (!pe.hasFilters) {
            ce = alight.utils.compile.expression(pe.expression, {
              string: true,
              full: true,
              rawExpression: true
            });
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
            (function(d) {
              return cd.watch(exp, function(value) {
                if(value == null) value = '';
                d.value = value;
                return doUpdate();
              });
            })(d);
          }
        }
      }
    }
    if (!watchCount) {
      value = '';
      for (k = 0, len1 = data.length; k < len1; k++) {
        d = data[k];
        value += d.value;
      }
      cd.watch('$onScanOnce', function() {
        return callback(value);
      });
      return;
    }
    if (canUseSimpleBuilder) {
      if (noCache) {
        st = alight.utils.compile.buildSimpleText(null, data);
      } else {
        st = alight.utils.compile.buildSimpleText(expression, data);
      }
      cd.watch(expression, callback, {
        watchText: {
          fn: st.fn
        }
      });
      return;
    }
    w = null;
    resultValue = '';
    data.scope = cd.scope;
    fn = alight.utils.compile.buildText(expression, data);
    doUpdate = function() {
      return resultValue = fn();
    };
    doFinally = function() {
      var i, l, len2;
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
        return config.onStatic();
      }
    };
    privateValue = function() {
      return resultValue;
    };
    doUpdate();
    w = cd.watch(privateValue, callback);
    return null;
  };
})();

alight.text.bindonce = function(callback, expression, cd, env) {
  var pe;
  pe = alight.utils.parsExpression(expression);
  if (pe.hasFilters) {
    throw 'Conflict: bindonce and filters, use one-time binding';
  } else {
    return env["finally"](cd["eval"](expression));
  }
};

alight.text.oneTimeBinding = function(callback, expression, cd, env) {
  return cd.watch(expression, function(value) {
    return env["finally"](value);
  }, {
    oneTime: true
  });
};

var attrBinding, bindComment, bindElement, bindNode, bindText, sortByPriority, testDirective;

alight.version = '0.11.8';

alight.debug = {
  scan: 0,
  directive: false,
  watch: false,
  watchText: false,
  parser: false
};

alight.directivePreprocessor = function(attrName, args) {
  var $ns, dir, j, k, name, ns, path, raw, v;
  if (attrName.slice(0, 5) === 'data-') {
    name = attrName.slice(5);
  } else {
    name = attrName;
  }
  j = name.indexOf('-');
  if (j < 0) {
    return {
      noNs: true
    };
  }
  ns = name.substring(0, j);
  name = name.substring(j + 1).replace(/(-\w)/g, function(m) {
    return m.substring(1).toUpperCase();
  });
  raw = null;
  $ns = args.cd.scope.$ns;
  if ($ns && $ns.directives) {
    path = $ns.directives[ns];
    if (path) {
      raw = path[name];
      if (!raw) {
        if (!$ns.inheritGlobal) {
          return {
            noDirective: true
          };
        }
      }
    } else {
      if (!$ns.inheritGlobal) {
        return {
          noNs: true
        };
      }
    }
  }
  if (!raw) {
    path = alight.d[ns];
    if (!path) {
      return {
        noNs: true
      };
    }
    raw = path[name];
    if (!raw) {
      return {
        noDirective: true
      };
    }
  }
  dir = {};
  if (f$.isFunction(raw)) {
    dir.init = raw;
  } else if (f$.isObject(raw)) {
    for (k in raw) {
      v = raw[k];
      dir[k] = v;
    }
  } else {
    throw 'Wrong directive: ' + ns + '.' + name;
  }
  dir.priority = raw.priority || 0;
  dir.restrict = raw.restrict || 'A';
  if (dir.restrict.indexOf(args.attr_type) < 0) {
    throw 'Directive has wrong binding (attribute/element): ' + name;
  }
  dir.$init = function(cd, element, value, env) {
    var doProcess, dscope;
    doProcess = function() {
      var dp, i, l, len, n;
      l = dscope.procLine;
      for (i = n = 0, len = l.length; n < len; i = ++n) {
        dp = l[i];
        dp.fn.call(dscope);
        if (dscope.isDeferred) {
          dscope.procLine = l.slice(i + 1);
          break;
        }
      }
      return null;
    };
    dscope = {
      element: element,
      value: value,
      cd: cd,
      env: env,
      ns: ns,
      name: name,
      args: args,
      directive: dir,
      result: {},
      isDeferred: false,
      procLine: alight.hooks.directive,
      makeDeferred: function() {
        dscope.isDeferred = true;
        dscope.env.stopBinding = true;
        dscope.doBinding = true;
        return function() {
          dscope.isDeferred = false;
          return doProcess();
        };
      }
    };
    if (dir.stopBinding) {
      dscope.env.stopBinding = true;
    }
    doProcess();
    return dscope.result;
  };
  return dir;
};

(function() {
  var ext;
  ext = alight.hooks.directive;
  ext.push({
    code: 'init',
    fn: function() {
      var result;
      if (this.directive.init) {
        if (alight.debug.directive) {
          if (this.directive.scope || this.directive.ChangeDetector) {
            console.warn(this.ns + "-" + this.name + " uses scope and init together, probably you need use link instead of init");
          }
        }
        result = this.directive.init(this.cd.scope, this.cd, this.element, this.value, this.env);
        if (f$.isObject(result)) {
          this.result = result;
          if (result.owner) {
            return this.env.stopBinding = true;
          }
        }
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
        return f$.ajax({
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
          return f$.html(this.element, this.directive.template);
        } else if (this.element.nodeType === 8) {
          el = document.createElement('p');
          el.innerHTML = this.directive.template.trimLeft();
          el = el.firstChild;
          f$.after(this.element, el);
          this.element = el;
          return this.doBinding = true;
        }
      }
    }
  });
  ext.push({
    code: 'scope',
    fn: function() {
      var childCD, parentCD, scope;
      if (!(this.directive.scope || this.directive.ChangeDetector)) {
        return;
      }
      parentCD = this.cd;
      if (this.directive.scope) {
        scope = {
          $parent: parentCD.scope
        };
      } else {
        scope = parentCD.scope;
      }
      if (this.directive.ChangeDetector === 'root') {
        this.cd = childCD = alight.ChangeDetector(scope);
        parentCD.watch('$destroy', function() {
          return childCD.destroy();
        });
      } else {
        this.cd = parentCD["new"](scope);
      }
      this.env.parentChangeDetector = parentCD;
      this.env.stopBinding = true;
      return this.doBinding = true;
    }
  });
  ext.push({
    code: 'link',
    fn: function() {
      var result;
      if (this.directive.link) {
        result = this.directive.link(this.cd.scope, this.cd, this.element, this.value, this.env);
        if (f$.isObject(result)) {
          if (result.owner) {
            this.env.stopBinding = true;
          }
          return this.result = result;
        }
      }
    }
  });
  return ext.push({
    code: 'scopeBinding',
    fn: function() {
      if (this.doBinding) {
        return alight.bind(this.cd, this.element, {
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
      return args.list.push(attr);
    }
  };
  return function(attrName, args) {
    var directive;
    if (args.skip_attr.indexOf(attrName) >= 0) {
      return addAttr(attrName, args, {
        skip: true
      });
    }
    directive = alight.directivePreprocessor(attrName, args);
    if (directive.noNs) {
      return addAttr(attrName, args);
    }
    if (directive.noDirective) {
      return addAttr(attrName, args, {
        noDirective: true
      });
    }
    return args.list.push({
      name: attrName,
      directive: directive,
      priority: directive.priority,
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
  var setter, text;
  text = value;
  if (text.indexOf(alight.utils.pars_start_tag) < 0) {
    return;
  }
  setter = function(result) {
    f$.attr(element, attrName, result);
    return '$scanNoChanges';
  };
  cd.watchText(text, setter);
  return true;
};

bindText = function(cd, element) {
  var setter, text;
  text = element.data;
  if (text.indexOf(alight.utils.pars_start_tag) < 0) {
    return;
  }
  setter = function(result) {
    element.nodeValue = result;
    return '$scanNoChanges';
  };
  cd.watchText(text, setter);
  return true;
};

bindComment = function(cd, element, option) {
  var args, d, dirName, directive, e, env, i, list, result, text, value;
  text = element.nodeValue.trimLeft();
  if (text.slice(0, 10) !== 'directive:') {
    return;
  }
  text = text.slice(10).trimLeft();
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
    throw "Directive not found: " + d.name;
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
    result = directive.$init(cd, element, value, env);
    if (result && result.start) {
      result.start();
    }
  } catch (_error) {
    e = _error;
    alight.exceptionHandler(e, 'Error in directive: ' + d.name, {
      value: value,
      env: env,
      cd: cd,
      scope: cd.scope,
      element: element
    });
  }
  return true;
};

bindElement = (function() {
  var skippedAttr, takeAttr;
  takeAttr = function(name, skip) {
    var attr, len, n, ref, value;
    if (arguments.length === 1) {
      skip = true;
    }
    ref = this.attributes;
    for (n = 0, len = ref.length; n < len; n++) {
      attr = ref[n];
      if (attr.attrName !== name) {
        continue;
      }
      if (skip) {
        attr.skip = true;
      }
      value = f$.attr(this.element, name);
      return value || true;
    }
  };
  skippedAttr = function() {
    var attr, len, n, ref, results;
    ref = this.attributes;
    results = [];
    for (n = 0, len = ref.length; n < len; n++) {
      attr = ref[n];
      if (!attr.skip) {
        continue;
      }
      results.push(attr.attrName);
    }
    return results;
  };
  return function(cd, element, config) {
    var args, attrName, attr_value, attrs, bindResult, childElement, d, directive, e, env, len, len1, list, n, o, r, ref, result, skipChildren, skip_attr, value;
    bindResult = {
      directive: 0,
      text: 0,
      attr: 0,
      hook: 0
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
      args.attr_type = 'A';
      attrs = f$.getAttributes(element);
      for (attrName in attrs) {
        attr_value = attrs[attrName];
        testDirective(attrName, args);
      }
      list = list.sort(sortByPriority);
      for (n = 0, len = list.length; n < len; n++) {
        d = list[n];
        if (d.skip) {
          continue;
        }
        if (d.noDirective) {
          throw "Directive not found: " + d.name;
        }
        d.skip = true;
        value = f$.attr(element, d.attrName);
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
            stopBinding: false
          };
          if (alight.debug.directive) {
            console.log('bind', d.attrName, value, d);
          }
          try {
            result = directive.$init(cd, element, value, env);
            if (result && result.start) {
              result.start();
            }
          } catch (_error) {
            e = _error;
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
        }
      }
    }
    if (!skipChildren) {
      ref = f$.childNodes(element);
      for (o = 0, len1 = ref.length; o < len1; o++) {
        childElement = ref[o];
        if (!childElement) {
          continue;
        }
        r = bindNode(cd, childElement);
        bindResult.directive += r.directive;
        bindResult.text += r.text;
        bindResult.attr += r.attr;
        bindResult.hook += r.hook;
      }
    }
    return bindResult;
  };
})();

bindNode = function(cd, element, option) {
  var h, len, n, r, ref, result;
  result = {
    directive: 0,
    text: 0,
    attr: 0,
    hook: 0
  };
  if (alight.utils.getData(element, 'skipBinding')) {
    return result;
  }
  if (alight.hooks.binding.length) {
    ref = alight.hooks.binding;
    for (n = 0, len = ref.length; n < len; n++) {
      h = ref[n];
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
  } else if (element.nodeType === 3) {
    if (bindText(cd, element, option)) {
      result.text++;
    }
  } else if (element.nodeType === 8) {
    if (bindComment(cd, element, option)) {
      result.directive++;
    }
  }
  return result;
};

alight.nextTick = (function() {
  var exec, list, timer;
  timer = null;
  list = [];
  exec = function() {
    var callback, dlist, e, it, len, n, self;
    timer = null;
    dlist = list.slice();
    list.length = 0;
    for (n = 0, len = dlist.length; n < len; n++) {
      it = dlist[n];
      callback = it[0];
      self = it[1];
      try {
        callback.call(self);
      } catch (_error) {
        e = _error;
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

alight.bind = alight.applyBindings = function(cd, element, option) {
  var cb, finishBinding, len, lst, n, result, root;
  if (!element) {
    throw 'No element';
  }
  if (!cd) {
    throw 'No CD';
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
  option = option || {};
  result = bindNode(cd, element, option);
  root.bindingResult.directive += result.directive;
  root.bindingResult.text += result.text;
  root.bindingResult.attr += result.attr;
  root.bindingResult.hook += result.hook;
  if (finishBinding) {
    cd.scan();
    root.finishBinding_lock = false;
    lst = root.watchers.finishBinding.slice();
    root.watchers.finishBinding.length = 0;
    for (n = 0, len = lst.length; n < len; n++) {
      cb = lst[n];
      cb();
    }
    result.total = root.bindingResult;
  }
  return result;
};

alight.bootstrap = function(input, scope) {
  var attr, cd, element, lastCD, len, n, oneCD;
  if (!input) {
    input = f$.find(document, '[al-app]');
  }
  if (typeof input === 'string') {
    input = f$.find(document.body, input);
  }
  if (f$.isElement(input)) {
    input = [input];
  }
  if (f$.isArray(input) || typeof input.length === 'number') {
    lastCD = null;
    if (scope) {
      oneCD = alight.ChangeDetector(scope);
    } else {
      oneCD = null;
    }
    for (n = 0, len = input.length; n < len; n++) {
      element = input[n];
      if (element.ma_bootstrapped) {
        continue;
      }
      element.ma_bootstrapped = true;
      attr = f$.attr(element, 'al-app');
      if (oneCD) {
        cd = oneCD;
      } else {
        cd = alight.ChangeDetector();
      }
      alight.bind(cd, element, {
        skip_attr: 'al-app'
      });
      lastCD = cd;
    }
    return cd;
  }
  alight.exceptionHandler('Error in bootstrap', 'Error input arguments', {
    input: input
  });
  return null;
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

alight.utils.clone = clone = function(d) {
  var i, k, r, v;
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
          results.push(clone(i));
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
      r[k] = clone(v);
    }
    return r;
  }
  return d;
};

alight.utils.equal = equal = function(a, b) {
  var i, j, k, len, set, ta, tb, v;
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
        if (!equal(v, b[i])) {
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
      if (!equal(v, b[k])) {
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
      if (!equal(v, a[k])) {
        return false;
      }
    }
    return true;
  }
  return a === b;
};

alight.exceptionHandler = function(e, title, locals) {
  var err;
  console.warn(title, (e.message || '') + '\n', locals);
  err = typeof e === 'string' ? e : e.stack;
  return console.error(err);
};

(function() {
  var map;
  if (typeof WeakMap === 'function') {
    map = new WeakMap();
    alight.utils.setData = function(el, key, value) {
      var d;
      d = map.get(el);
      if (!d) {
        d = {};
        map.set(el, d);
      }
      return d[key] = value;
    };
    return alight.utils.getData = function(el, key) {
      return (map.get(el) || {})[key];
    };
  } else {
    alight.utils.setData = function(el, key, value) {
      var d;
      d = el.al;
      if (!d) {
        d = {};
        el.al = d;
      }
      return d[key] = value;
    };
    return alight.utils.getData = function(el, key) {
      return (el.al || {})[key];
    };
  }
})();

var reserved;

reserved = {
  'instanceof': true,
  'typeof': true,
  'in': true,
  'null': true,
  'true': true,
  'false': true,
  'undefined': true,
  'function': true,
  'return': true
};

alight.utils.parsExpression = function(line, cfg) {
  var assignment, conv, d, exp, expression, hasFilters, i, index, input, isSimple, is_function, j, k, l, len, len1, m, n, newName, pars, prev, ref, ref1, result, simpleVariables, variable, variable_assignment, variable_fn, variable_names, variables;
  cfg = cfg || {};
  input = cfg.input || [];
  index = 0;
  result = [];
  prev = 0;
  variables = [];
  variable_names = [];
  variable_assignment = [];
  variable_fn = [];
  simpleVariables = [];
  isSimple = !input.length;
  pars = function(lvl, stop, convert, is_string) {
    var a, an, ap, check_variabe, var_before, variable, variable_index;
    variable = '';
    variable_index = -1;
    var_before = false;
    check_variabe = function() {
      var var_main;
      if (!variable) {
        return;
      }
      if (reserved[variable]) {
        return;
      }
      var_main = variable.split('.')[0];
      if (input.indexOf(var_main) >= 0) {
        return;
      }
      if (variable[0].match(/[\d\.]/)) {
        return;
      }
      variables.push(variable_index);
      variable_names.push(variable);
      variable_assignment.push(false);
      variable_fn.push(false);
      return true;
    };
    while (index < line.length) {
      ap = line[index - 1];
      a = line[index];
      index += 1;
      an = line[index];
      if (convert) {
        if (a.match(/[\d\w\u0410-\u044F\u0401\u0451_\.\$]/)) {
          if (!variable) {
            variable_index = index - 1;
          }
          variable += a;
        } else {
          if (stop === '}') {
            if (line.substring(index - 1).trim()[0] === ':') {
              variable = '';
            }
          }
          if (check_variabe()) {
            var_before = index;
          }
          variable = '';
        }
      }
      if (a === stop) {
        return;
      }
      if (var_before) {
        if (a !== ' ' && var_before !== index) {
          var_before = false;
        }
      }
      if (a === '=') {
        if (ap !== '=' && an !== '=') {
          variable_assignment[variable_assignment.length - 1] = true;
        }
      }
      if (a === '+') {
        if (an === '+' || an === '=') {
          variable_assignment[variable_assignment.length - 1] = true;
        }
      }
      if (a === '-') {
        if (an === '-' || an === '=') {
          variable_assignment[variable_assignment.length - 1] = true;
        }
      }
      if (a === '(' && !is_string) {
        if (var_before) {
          variable_fn[variable_fn.length - 1] = true;
        }
        pars(lvl + 1, ')', convert);
      } else if (a === '[' && !is_string) {
        pars(lvl + 1, ']', convert);
      } else if (a === '{' && !is_string) {
        pars(lvl + 1, '}', true);
      } else if (a === '"') {
        pars(lvl + 1, '"', false, true);
      } else if (a === "'") {
        pars(lvl + 1, "'", false, true);
      } else if (a === '|') {
        if (lvl === 0) {
          if (an === '|') {
            index += 1;
          } else {
            convert = false;
            result.push(line.substring(prev, index - 1));
            prev = index;
          }
        }
      }
    }
    if (lvl === 0) {
      result.push(line.substring(prev));
    }
    return check_variabe();
  };
  pars(0, null, true);
  expression = result[0];
  if (variables.length) {
    exp = result[0];
    for (i = j = variables.length - 1; j >= 0; i = j += -1) {
      n = variables[i];
      variable = variable_names[i];
      assignment = variable_assignment[i];
      is_function = variable_fn[i];
      if (!is_function && !assignment) {
        simpleVariables.push(variable);
      }
      if (is_function || assignment) {
        isSimple = false;
      }
      d = variable.split('.');
      conv = false;
      if (d.length > 1 && !assignment) {
        if (is_function) {
          conv = d.length > 2;
        } else {
          conv = true;
        }
      }
      if (conv) {
        newName = null;
        if (d[0] === 'this') {
          d[0] = '$$scope';
          if (d.length === 2) {
            newName = '$$scope.' + d[1];
          }
        }
        if (!newName) {
          l = [];
          l.push("($$=$$scope." + d[0] + ",$$==null)?undefined:");
          if (is_function) {
            ref = d.slice(1, +(d.length - 3) + 1 || 9e9);
            for (k = 0, len = ref.length; k < len; k++) {
              i = ref[k];
              l.push("($$=$$." + i + ",$$==null)?undefined:");
            }
            l.push("$$." + d[d.length - 2]);
            newName = '(' + l.join('') + ').' + d[d.length - 1];
          } else {
            ref1 = d.slice(1, +(d.length - 2) + 1 || 9e9);
            for (m = 0, len1 = ref1.length; m < len1; m++) {
              i = ref1[m];
              l.push("($$=$$." + i + ",$$==null)?undefined:");
            }
            l.push("$$." + d[d.length - 1]);
            newName = '(' + l.join('') + ')';
          }
        }
      } else {
        if (variable === 'this') {
          newName = '$$scope';
        } else if (d[0] === 'this') {
          newName = '$$scope.' + d.slice(1).join('.');
        } else {
          if (assignment && d.length === 1) {
            newName = '($$scope.$root || $$scope).' + variable;
          } else {
            newName = '$$scope.' + variable;
          }
        }
      }
      exp = exp.slice(0, n) + newName + exp.slice(n + variable.length);
    }
    result[0] = exp;
  }
  if (alight.debug.parser) {
    console.log('parser', result);
  }
  hasFilters = result.length > 1;
  if (hasFilters) {
    isSimple = false;
  }
  return {
    result: result,
    expression: expression,
    simpleVariables: simpleVariables,
    isSimple: isSimple,
    hasFilters: hasFilters
  };
};

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
      rawExpression
   */
  self.expression = function(src, cfg) {
    var args, e, exp, ff, ffResult, filters, fn, funcCache, hash, no_return, result;
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
    funcCache = {
      fn: null
    };
    exp = src;
    no_return = cfg.no_return || false;
    ffResult = alight.utils.parsExpression(exp, {
      input: cfg.input
    });
    ff = ffResult.result;
    funcCache.isSimple = ffResult.isSimple;
    funcCache.simpleVariables = ffResult.simpleVariables;
    exp = ff[0];
    filters = ff.slice(1);
    if (no_return) {
      result = "var $$;" + exp;
    } else {
      if (cfg.string && !filters.length) {
        result = "var $$, __ = (" + exp + "); return '' + (__ || (__ == null?'':__))";
        if (cfg.rawExpression) {
          funcCache.rawExpression = "(__=" + exp + ") || (__ == null?'':__)";
        }
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
    } catch (_error) {
      e = _error;
      alight.exceptionHandler(e, 'Wrong expression: ' + src, {
        src: src,
        cfg: cfg
      });
      throw 'Wrong expression: ' + exp;
    }
    funcCache.fn = fn;
    if (filters.length) {
      funcCache.filters = filters;
    } else {
      funcCache.filters = null;
    }
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
      string: true,
      full: true,
      rawExpression: true
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
  path = [0];
  walk = function(element, deep) {
    var attr, childElement, fn, i, j, k, key, len, len1, rCallback, ref, ref1, rel, rtext, text;
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
        rCallback = 'function(value) {f$.attr(' + rel + ', "' + key + '", value); return "$scanNoChanges"}';
        if (fn) {
          source.push('s.fw("' + rtext + '", ' + self.fastWatchFn.length + ', ' + rCallback + ');');
          self.fastWatchFn.push(fn);
        } else {
          source.push('s.wt("' + rtext + '", ' + rCallback + ');');
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
      rCallback = 'function(value) {' + rel + '.nodeValue=value; return "$scanNoChanges"}';
      if (fn) {
        source.push('s.fw("' + rtext + '", ' + self.fastWatchFn.length + ', ' + rCallback + ');');
        self.fastWatchFn.push(fn);
      } else {
        source.push('s.wt("' + rtext + '", ' + rCallback + ');');
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
  return null;
};

fastBinding.prototype.fw = function(text, fnIndex, callback) {
  var cd, fn, self, value;
  self = this;
  cd = self.currentCD;
  fn = self.fastWatchFn[fnIndex];
  value = fn(cd.scope);
  callback(value);
  cd.watchList.push({
    isStatic: false,
    isArray: false,
    extraLoop: false,
    deep: false,
    value: value,
    callback: callback,
    exp: fn,
    src: text,
    onStop: null
  });
  return null;
};

fastBinding.prototype.wt = function(expression, callback) {
  this.currentCD.watchText(expression, callback);
  this.currentCD.scan();
  return null;
};

var clickMaker;

clickMaker = function(event) {
  return {
    priority: 10,
    stopPropagation: true,
    link: function(scope, cd, element, name, env) {
      var self;
      return self = {
        stopPropagation: this.stopPropagation,
        callback: cd.compile(name, {
          no_return: true,
          input: ['$event']
        }),
        start: function() {
          self.onDom();
          return self.stop = env.takeAttr('al-click-stop');
        },
        onDom: function() {
          f$.on(element, event, self.doCallback);
          return cd.watch('$destroy', self.offDom);
        },
        offDom: function() {
          return f$.off(element, event, self.doCallback);
        },
        doCallback: function(e) {
          if (!self.stop) {
            e.preventDefault();
            if (self.stopPropagation) {
              e.stopPropagation();
            }
          }
          if (f$.attr(element, 'disabled')) {
            return;
          }
          try {
            self.callback(scope, e);
          } catch (_error) {
            e = _error;
            alight.exceptionHandler(e, 'al-click, error in expression: ' + name, {
              name: name,
              cd: cd,
              scope: scope,
              element: element
            });
          }
          if (self.stop && cd["eval"](self.stop)) {
            e.preventDefault();
            if (self.stopPropagation) {
              e.stopPropagation();
            }
          }
          return cd.scan();
        }
      };
    }
  };
};

alight.d.al.click = clickMaker('click');

alight.d.al.dblclick = clickMaker('dblclick');

alight.d.al.value = function(scope, cd, element, variable) {
  var self;
  return self = {
    onDom: function() {
      f$.on(element, 'input', self.updateModel);
      f$.on(element, 'change', self.updateModel);
      return cd.watch('$destroy', self.offDom);
    },
    offDom: function() {
      f$.off(element, 'input', self.updateModel);
      return f$.off(element, 'change', self.updateModel);
    },
    updateModel: function() {
      return alight.nextTick(function() {
        var value;
        value = f$.val(element);
        cd.setValue(variable, value);
        return cd.scan({
          skipWatch: self.watch
        });
      });
    },
    watchModel: function() {
      return self.watch = cd.watch(variable, self.updateDom);
    },
    updateDom: function(value) {
      if (value == null) {
        value = '';
      }
      f$.val(element, value);
      return '$scanNoChanges';
    },
    start: function() {
      self.onDom();
      return self.watchModel();
    }
  };
};

alight.d.al.checked = {
  priority: 100,
  link: function(scope, cd, element, name) {
    var self;
    return self = {
      start: function() {
        self.onDom();
        return self.watchModel();
      },
      onDom: function() {
        f$.on(element, 'change', self.updateModel);
        return cd.watch('$destroy', self.offDom);
      },
      offDom: function() {
        return f$.off(element, 'change', self.updateModel);
      },
      updateModel: function() {
        var value;
        value = f$.prop(element, 'checked');
        cd.setValue(name, value);
        return cd.scan({
          skipWatch: self.watch
        });
      },
      watchModel: function() {
        return self.watch = cd.watch(name, self.updateDom);
      },
      updateDom: function(value) {
        f$.prop(element, 'checked', !!value);
        return '$scanNoChanges';
      }
    };
  }
};

alight.d.al["if"] = {
  priority: 700,
  stopBinding: true,
  link: function(scope, cd, element, name, env) {
    var self;
    return self = {
      item: null,
      child: null,
      base_element: null,
      top_element: null,
      start: function() {
        self.prepare();
        return self.watchModel();
      },
      prepare: function() {
        self.base_element = element;
        self.top_element = f$.createComment(" " + env.attrName + ": " + name + " ");
        f$.before(element, self.top_element);
        return f$.remove(element);
      },
      updateDom: function(value) {
        if (value) {
          self.insertBlock(value);
        } else {
          self.removeBlock();
        }
        return '$scanNoChanges';
      },
      removeBlock: function() {
        if (!self.child) {
          return;
        }
        self.child.destroy();
        self.removeDom(self.item);
        self.child = null;
        return self.item = null;
      },
      insertBlock: function() {
        if (self.child) {
          return;
        }
        self.item = f$.clone(self.base_element);
        self.insertDom(self.top_element, self.item);
        self.child = cd["new"]();
        return alight.bind(self.child, self.item, {
          skip_attr: env.skippedAttr()
        });
      },
      watchModel: function() {
        return cd.watch(name, self.updateDom);
      },
      removeDom: function(element) {
        return f$.remove(element);
      },
      insertDom: function(base, element) {
        return f$.after(base, element);
      }
    };
  }
};

alight.d.al.ifnot = {
  priority: 700,
  stopBinding: true,
  link: function(scope, cd, element, name, env) {
    var self;
    self = alight.d.al["if"].link(scope, cd, element, name, env);
    self.updateDom = function(value) {
      if (value) {
        self.removeBlock();
      } else {
        self.insertBlock();
      }
      return '$scanNoChanges';
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
    "item in list | filter store to filteredList"
    "item in list | filter track by trackExpression store to filteredList"

    "(key, value) in object"
    "(key, value) in object orderBy:key:reverse store to filteredList"
    "(key, value) in object | filter orderBy:key,reverse store to filteredList"
 */
alight.directives.al.repeat = {
  priority: 1000,
  restrict: 'AM',
  stopBinding: true,
  init: function(parentScope, CD, element, exp, env) {
    var self;
    return self = {
      start: function() {
        self.parsExpression();
        self.prepareDom();
        self.buildUpdateDom();
        self.watchModel();
        return self.makeChildConstructor();
      },
      parsExpression: function() {
        var r, s;
        s = exp.trim();
        r = s.match(/(.*) store to ([\w\.]+)$/);
        if (r) {
          self.storeTo = r[2];
          s = r[1];
        }
        if (s[0] === '(') {
          self.objectMode = true;
          r = s.match(/\((\w+),\s*(\w+)\)\s+in\s+(.+)\s+orderBy:(.+)\s*$/);
          if (r) {
            self.objectKey = r[1];
            self.objectValue = r[2];
            self.expression = r[3] + (" | toArray:" + self.objectKey + "," + self.objectValue + " | orderBy:" + r[4]);
            self.nameOfKey = '$item';
            return self.trackExpression = '$item.' + self.objectKey;
          } else {
            r = s.match(/\((\w+),\s*(\w+)\)\s+in\s+(.+)\s*$/);
            if (!r) {
              throw 'Wrong repeat: ' + exp;
            }
            self.objectKey = r[1];
            self.objectValue = r[2];
            self.expression = r[3] + (" | toArray:" + self.objectKey + "," + self.objectValue);
            self.nameOfKey = '$item';
            return self.trackExpression = '$item.' + self.objectKey;
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
          return self.expression = r[2];
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
        return self.watch = CD.watch(self.expression, self.updateDom, flags);
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
                alight.utils.setData(el, 'skipBinding', true);
                break;
              }
            }
            element_list.push(el);
            el = el.nextSibling;
          }
          for (i = 0, len = element_list.length; i < len; i++) {
            el = element_list[i];
            f$.remove(el);
            alight.utils.setData(el, 'skipBinding', true);
          }
          return null;
        } else {
          self.base_element = element;
          self.top_element = f$.createComment(" " + exp + " ");
          f$.before(element, self.top_element);
          return f$.remove(element);
        }
      },
      makeChildConstructor: function() {
        var ChildScope;
        ChildScope = function() {
          this.$root = CD.scope.$root || CD.scope;
          return this;
        };
        ChildScope.prototype = CD.scope;
        return self.ChildScope = ChildScope;
      },
      makeChild: function(item, index, list) {
        var childCD, scope;
        scope = new self.ChildScope();
        childCD = CD["new"](scope);
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
        return scope.$last = index === list.length - 1;
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
        return null;
      },
      buildUpdateDom: function() {
        return self.updateDom = (function() {
          var _getId, _id, fastBinding, index, node_by_id, node_del, node_get, node_set, nodes;
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
              return null;
            };
            node_set = function(item, node) {
              var $id;
              $id = index;
              node.$id = $id;
              node_by_id[$id] = node;
              return null;
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
                return null;
              };
              node_set = function(item, node) {
                var $id;
                $id = _getId(_id, item);
                node.$id = $id;
                node_by_id[$id] = node;
                return null;
              };
            } else {
              if (window.Map) {
                node_by_id = new Map();
                node_get = function(item) {
                  return node_by_id.get(item);
                };
                node_del = function(node) {
                  node_by_id["delete"](node.item);
                  return null;
                };
                node_set = function(item, node) {
                  node_by_id.set(item, node);
                  return null;
                };
              } else {
                node_by_id = {};
                node_get = function(item) {
                  var $id;
                  $id = item.$alite_id;
                  if ($id) {
                    return node_by_id[$id];
                  }
                  return null;
                };
                node_del = function(node) {
                  var $id;
                  $id = node.$id;
                  if ($id) {
                    delete node_by_id[$id];
                  }
                  return null;
                };
                node_set = function(item, node) {
                  var $id;
                  $id = alight.utils.getId();
                  item.$alite_id = $id;
                  node.$id = $id;
                  node_by_id[$id] = node;
                  return null;
                };
              }
            }
          }
          if (self.element_list) {
            return function(list) {
              var applyList, bel, childCD, dom_inserts, dom_removes, el, elLast, element_list, i, it, item, item_value, j, k, l, last_element, len, len1, len2, len3, len4, len5, len6, len7, m, n, next2, node, nodes2, o, p, pid, prev_moved, prev_node, ref, ref1, ref2, skippedAttrs;
              if (!list || !list.length) {
                list = [];
              }
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
              }
              applyList = [];
              pid = null;
              prev_node = null;
              prev_moved = false;
              elLast = self.element_list.length - 1;
              for (index = m = 0, len4 = list.length; m < len4; index = ++m) {
                item = list[index];
                item_value = item;
                item = item || {};
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
                    el = f$.clone(bel);
                    applyList.push([childCD, el]);
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
              skippedAttrs = env.skippedAttr();
              for (p = 0, len7 = applyList.length; p < len7; p++) {
                it = applyList[p];
                alight.bind(it[0], it[1], {
                  skip_attr: skippedAttrs
                });
              }
              if (self.storeTo) {
                CD.setValue(self.storeTo, list);
                return;
              }
              return null;
            };
          } else {
            return function(list) {
              var applyList, childCD, dom_inserts, dom_removes, i, it, item, item_value, j, k, l, last_element, len, len1, len2, len3, next2, node, nodes2, pid, prev_moved, prev_node, r, skippedAttrs;
              if (!list || !list.length) {
                list = [];
              }
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
              dom_removes = (function() {
                var k, len2, results;
                results = [];
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
                  results.push(node.element);
                }
                return results;
              })();
              applyList = [];
              pid = null;
              prev_node = null;
              prev_moved = false;
              for (index = k = 0, len2 = list.length; k < len2; index = ++k) {
                item = list[index];
                item_value = item;
                item = item || {};
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
                element = f$.clone(self.base_element);
                applyList.push([childCD, element]);
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
              skippedAttrs = env.skippedAttr();
              for (l = 0, len3 = applyList.length; l < len3; l++) {
                it = applyList[l];
                if (fastBinding) {
                  fastBinding.bind(it[0], it[1]);
                } else {
                  r = alight.bind(it[0], it[1], {
                    skip_attr: skippedAttrs
                  });
                  if (r.directive === 0 && r.hook === 0) {
                    fastBinding = new alight.core.fastBinding(self.base_element);
                  }
                }
              }
              if (self.storeTo) {
                CD.setValue(self.storeTo, list);
              }
              return null;
            };
          }
        })();
      }
    };
  }
};

alight.directives.bo.repeat = {
  priority: 1000,
  restrict: 'AM',
  stopBinding: true,
  init: function(scope, CD, element, exp, env) {
    var originalStart, self;
    self = alight.directives.al.repeat.init(scope, CD, element, exp, env);
    originalStart = self.start;
    self.start = function() {
      originalStart();
      return CD.watch('$finishScanOnce', function() {
        return self.watch.stop();
      });
    };
    return self;
  }
};

alight.d.al.init = function(scope, cd, element, exp) {
  var e, fn;
  try {
    fn = cd.compile(exp, {
      no_return: true
    });
    return fn(scope);
  } catch (_error) {
    e = _error;
    return alight.exceptionHandler(e, 'al-init, error in expression: ' + exp, {
      exp: exp,
      cd: cd,
      scope: scope,
      element: element
    });
  }
};

alight.d.al["class"] = alight.d.al.css = {
  priority: 30,
  link: function(scope, cd, element, exp) {
    var self;
    return self = {
      start: function() {
        self.parsLine();
        return self.prepare();
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
              cd: cd,
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
        return null;
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
          cd.watch(item.exp, color);
        }
        return null;
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
        return null;
      }
    };
  }
};

alight.d.al.src = function(scope, cd, element, name) {
  var setter;
  setter = function(value) {
    if (!value) {
      value = '';
    }
    f$.attr(element, 'src', value);
    return '$scanNoChanges';
  };
  return cd.watchText(name, setter);
};

alight.d.al.text = function(scope, cd, element, name) {
  var self;
  return self = {
    start: function() {
      return self.watchModel();
    },
    updateDom: function(value) {
      if(value == null) value = '';
      f$.text(element, value);
      return '$scanNoChanges';
    },
    watchModel: function() {
      return cd.watch(name, self.updateDom);
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
  link: function(scope, cd, element, name, env) {
    cd.$switch = {
      value: cd["eval"](name),
      on: false
    };
    return null;
  }
};

alight.d.bo.switchWhen = {
  priority: 500,
  link: function(scope, cd, element, name, env) {
    if (cd.$switch.value !== name) {
      f$.remove(element);
      return env.stopBinding = true;
    } else {
      return cd.$switch.on = true;
    }
  }
};

alight.d.bo.switchDefault = {
  priority: 500,
  link: function(scope, cd, element, name, env) {
    if (cd.$switch.on) {
      f$.remove(element);
      return env.stopBinding = true;
    }
  }
};

(function() {
  var makeBindOnceIf;
  makeBindOnceIf = function(direct) {
    var self;
    return self = {
      priority: 700,
      link: function(scope, cd, element, exp, env) {
        var value;
        value = cd["eval"](exp);
        if (!value === direct) {
          f$.remove(element);
          return env.stopBinding = true;
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
  stopBinding: true,
  link: function(scope, cd, element, name, env) {
    var activeElement, baseElement, child, self, topElement;
    child = null;
    baseElement = null;
    topElement = null;
    activeElement = null;
    self = {
      start: function() {
        self.prepare();
        return self.watchModel();
      },
      prepare: function() {
        baseElement = element;
        topElement = f$.createComment(" " + env.attrName + ": " + name + " ");
        f$.before(element, topElement);
        return f$.remove(element);
      },
      loadHtml: function(cfg) {
        return f$.ajax(cfg);
      },
      removeBlock: function() {
        if (child) {
          child.destroy();
          child = null;
        }
        if (activeElement) {
          self.removeDom(activeElement);
          return activeElement = null;
        }
      },
      insertBlock: function(html) {
        activeElement = f$.clone(baseElement);
        f$.html(activeElement, html);
        self.insertDom(topElement, activeElement);
        child = cd["new"]();
        return alight.bind(child, activeElement, {
          skip_attr: env.skippedAttr()
        });
      },
      updateDom: function(url) {
        if (!url) {
          self.removeBlock();
          return '$scanNoChanges';
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
        return '$scanNoChanges';
      },
      removeDom: function(element) {
        return f$.remove(element);
      },
      insertDom: function(base, element) {
        return f$.after(base, element);
      },
      watchModel: function() {
        return cd.watch(name, self.updateDom);
      }
    };
    return self;
  }
};

alight.d.al.cloak = function(scope, cd, element, name, env) {
  f$.removeAttr(element, env.attrName);
  if (name) {
    return f$.removeClass(element, name);
  }
};

alight.d.al.enable = function(scope, cd, element, exp) {
  var setter;
  setter = function(value) {
    if (value) {
      return f$.removeAttr(element, 'disabled');
    } else {
      return f$.attr(element, 'disabled', 'disabled');
    }
  };
  return cd.watch(exp, setter);
};

alight.d.al.disable = function(scope, cd, element, exp) {
  var setter;
  setter = function(value) {
    if (value) {
      return f$.attr(element, 'disabled', 'disabled');
    } else {
      return f$.removeAttr(element, 'disabled');
    }
  };
  return cd.watch(exp, setter);
};

alight.d.al.focused = function(scope, cd, element, name) {
  var safe;
  return safe = {
    updateModel: function(value) {
      if (cd.getValue(name) === value) {
        return;
      }
      cd.setValue(name, value);
      return cd.scan({
        skipWatch: self.watch
      });
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
      return cd.watch('$destroy', function() {
        f$.off(element, 'focus', von);
        return f$.off(element, 'blur', voff);
      });
    },
    updateDom: function(value) {
      if (value) {
        f$.focus(element);
      } else {
        f$.blur(element);
      }
      return '$scanNoChanges';
    },
    watchModel: function() {
      return self.watch = cd.watch(name, safe.updateDom);
    },
    start: function() {
      safe.onDom();
      return safe.watchModel();
    }
  };
};

alight.d.al.readonly = function(scope, cd, element, exp) {
  var setter;
  setter = function(value) {
    return f$.prop(element, 'readOnly', !!value);
  };
  return cd.watch(exp, setter, {
    readOnly: true
  });
};

alight.d.al.submit = function(scope, cd, element, name) {
  var self;
  return self = {
    callback: cd.compile(name, {
      no_return: true,
      input: ['$event']
    }),
    start: function() {
      return self.onDom();
    },
    onDom: function() {
      f$.on(element, 'submit', self.doCallback);
      return cd.watch('$destroy', self.offDom);
    },
    offDom: function() {
      return f$.off(element, 'submit', self.doCallback);
    },
    doCallback: function(e) {
      e.preventDefault();
      e.stopPropagation();
      try {
        self.callback(scope, e);
      } catch (_error) {
        e = _error;
        alight.exceptionHandler(e, 'al-submit, error in expression: ' + name, {
          name: name,
          cd: cd,
          scope: scope,
          element: element
        });
      }
      return cd.scan();
    }
  };
};

var fn, i, key, len, ref;

ref = ['keydown', 'keypress', 'keyup', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseup', 'focus', 'blur', 'change'];
fn = function(key) {
  return alight.d.al[key] = function(scope, cd, element, exp) {
    var self;
    return self = {
      start: function() {
        self.makeCaller();
        return self.onDom();
      },
      makeCaller: function() {
        return self.caller = cd.compile(exp, {
          no_return: true,
          input: ['$event']
        });
      },
      onDom: function() {
        f$.on(element, key, self.callback);
        return cd.watch('$destroy', self.offDom);
      },
      offDom: function() {
        return f$.off(element, key, self.callback);
      },
      callback: function(e) {
        try {
          self.caller(scope, e);
        } catch (_error) {
          e = _error;
          alight.exceptionHandler(e, key + ', error in expression: ' + exp, {
            exp: exp,
            cd: cd,
            scope: scope,
            element: element
          });
        }
        return cd.scan();
      }
    };
  };
};
for (i = 0, len = ref.length; i < len; i++) {
  key = ref[i];
  fn(key);
}

alight.d.al.html = {
  priority: 100,
  stopBinding: true,
  link: function(scope, cd, element, name, env) {
    var child, setter;
    child = null;
    setter = function(html) {
      if (child) {
        child.$destroy();
        child = null;
      }
      if (!html) {
        f$.html(element, '');
        return;
      }
      f$.html(element, html);
      child = cd["new"]();
      return alight.bind(child, element, {
        skip_attr: env.skippedAttr()
      });
    };
    cd.watch(name, setter, {
      readOnly: true
    });
    return null;
  }
};

alight.d.al.radio = {
  priority: 10,
  link: function(scope, cd, element, name, env) {
    var self;
    return self = {
      start: function() {
        self.makeValue();
        self.onDom();
        return self.watchModel();
      },
      makeValue: function() {
        var key, value;
        key = env.takeAttr('al-value');
        if (key) {
          value = cd["eval"](key);
        } else {
          value = env.takeAttr('value');
        }
        return self.value = value;
      },
      onDom: function() {
        f$.on(element, 'change', self.updateModel);
        return cd.watch('$destroy', self.offDom);
      },
      offDom: function() {
        return f$.off(element, 'change', self.updateModel);
      },
      updateModel: function() {
        cd.setValue(name, self.value);
        return cd.scan({
          skipWatch: self.watch
        });
      },
      watchModel: function() {
        return self.watch = cd.watch(name, self.updateDom);
      },
      updateDom: function(value) {
        f$.prop(element, 'checked', value === self.value);
        return '$scanNoChanges';
      }
    };
  }
};

alight.d.al.show = function(scope, cd, element, exp) {
  var self;
  return self = {
    showDom: function() {
      return f$.show(element);
    },
    hideDom: function() {
      return f$.hide(element);
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
      return cd.watch(exp, self.updateDom);
    },
    start: function() {
      return self.watchModel();
    }
  };
};

alight.d.al.hide = function(scope, cd, element, exp, env) {
  var self;
  self = alight.d.al.show(scope, cd, element, exp, env);
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

alight.d.al.style = function(scope, cd, element, name) {
  var prev, setter;
  prev = {};
  setter = function(style) {
    var k, key, ref, results, v;
    for (key in prev) {
      v = prev[key];
      element.style[key] = '';
    }
    prev = {};
    ref = style || {};
    results = [];
    for (k in ref) {
      v = ref[k];
      key = k.replace(/(-\w)/g, function(m) {
        return m.substring(1).toUpperCase();
      });
      prev[key] = v;
      results.push(element.style[key] = v || '');
    }
    return results;
  };
  return cd.watch(name, setter, {
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
      return null;
    };
    Mapper.prototype.replace = function(id, item) {
      var old;
      old = this.itemById[id];
      this.idByItem["delete"](old);
      this.idByItem.set(item, id);
      return this.itemById[id] = item;
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
      return delete this.itemById[id];
    };
    Mapper.prototype.replace = function(id, item) {
      return this.itemById[id] = item;
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
    ChangeDetector: true,
    link: function(scope, cd, element, key, env) {
      var mapper, onChangeDOM, watch;
      cd.$select = mapper = new Mapper;
      watch = null;
      cd.watch('$finishBinding', function() {
        watch = cd.watch(key, function(value) {
          return element.value = mapper.getId(value);
        });
        return cd.scan();
      });
      onChangeDOM = function(event) {
        var item;
        item = mapper.getItem(event.target.value);
        cd.setValue(key, item);
        return cd.scan({
          skipWatch: watch
        });
      };
      f$.on(element, 'input', onChangeDOM);
      return cd.watch('$destroy', function() {
        return f$.off(element, 'input', onChangeDOM);
      });
    }
  };
  return alight.d.al.option = function(scope, cd, element, key) {
    var i, id, j, mapper, step;
    step = cd;
    for (i = j = 0; j <= 4; i = ++j) {
      mapper = step.$select;
      if (mapper) {
        break;
      }
      step = step.parent || {};
    }
    if (!mapper) {
      alight.exceptionHandler('', 'Error in al-option - al-select is not found', {
        cd: cd,
        scope: cd.scope,
        element: element,
        value: key
      });
      return;
    }
    id = null;
    cd.watch(key, function(item) {
      if (id) {
        if (mapper.getId(item) !== id) {
          mapper.release(id);
          id = mapper.acquire(item);
          return element.value = id;
        } else {
          return mapper.replace(id, item);
        }
      } else {
        id = mapper.acquire(item);
        return element.value = id;
      }
    });
    return cd.watch('$destroy', function() {
      return mapper.release(id);
    });
  };
})();

alight.filters.slice = function(exp, cd, env) {
  var a, b, d, kind, setter, value;
  a = null;
  b = null;
  value = null;
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
    cd.watch(exp, function(pos) {
      kind = 1;
      a = pos;
      return setter();
    });
  } else {
    cd.watch(d[0] + " + '_' + " + d[1], function(filter) {
      var f;
      kind = 2;
      f = filter.split('_');
      a = Number(f[0]);
      b = Number(f[1]);
      return setter();
    });
  }
  return {
    onChange: function(input) {
      value = input;
      return setter();
    }
  };
};

alight.filters.date = (function() {
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
    x = [[/yyyy/g, value.getFullYear()], [/mm/g, d2(value.getMonth() + 1)], [/dd/g, d2(value.getDate())], [/HH/g, d2(value.getHours())], [/MM/g, d2(value.getMinutes())], [/SS/g, d2(value.getSeconds())]];
    r = exp;
    for (i = 0, len = x.length; i < len; i++) {
      d = x[i];
      r = r.replace(d[0], d[1]);
    }
    return r;
  };
  return function(exp, cd) {
    return function(value) {
      return makeDate(exp, value);
    };
  };
})();

alight.filters.json = (function() {
  var makeJson;
  makeJson = function(value) {
    return JSON.stringify(alight.utils.clone(value), null, 4);
  };
  return function(exp, cd, env) {
    return {
      watchMode: 'deep',
      onChange: function(value) {
        return env.setValue(makeJson(value));
      }
    };
  };
})();

alight.filters.filter = function(exp, cd, env) {
  var doFiltering, filterObject, value;
  filterObject = null;
  value = [];
  doFiltering = function() {
    var a, e, f, k, r, result, v;
    e = filterObject;
    if (!e) {
      env.setValue(value);
      return null;
    }
    if (typeof e === 'string') {
      e = {
        __all: e
      };
    } else if (typeof e !== 'object') {
      env.setValue(value);
      return null;
    }
    result = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = value.length; i < len; i++) {
        r = value[i];
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
  cd.watch(exp, function(input) {
    filterObject = input;
    return doFiltering();
  }, {
    deep: true
  });
  return {
    onChange: function(input) {
      value = input;
      return doFiltering();
    }
  };
};

alight.filters.generator = function(exp, cd, env) {
  var list;
  list = [];
  return {
    watchMode: 'simple',
    onChange: function(size) {
      if (list.length >= size) {
        list.length = size;
      } else {
        while (list.length < size) {
          list.push({});
        }
      }
      return env.setValue(list);
    }
  };
};

alight.filters.orderBy = function(exp, cd, env) {
  var d, direction, doSort, key, list, sortFn;
  d = exp.split(',');
  list = null;
  key = 'key';
  direction = 1;
  sortFn = function(a, b) {
    var va, vb;
    va = a[key] || null;
    vb = b[key] || null;
    if (va < vb) {
      return -direction;
    }
    if (va > vb) {
      return direction;
    }
    return 0;
  };
  doSort = function() {
    if (list instanceof Array) {
      list.sort(sortFn);
      return env.setValue(list);
    }
  };
  if (d[0]) {
    cd.watch(d[0].trim(), function(v) {
      key = v;
      return doSort();
    });
  }
  if (d[1]) {
    cd.watch(d[1].trim(), function(v) {
      direction = v ? 1 : -1;
      return doSort();
    });
  }
  return {
    onChange: function(input) {
      if (input instanceof Array) {
        list = input.slice();
      } else {
        list = null;
      }
      return doSort();
    }
  };
};

alight.filters.throttle = function(delay, cd, env) {
  var to;
  delay = Number(delay);
  to = null;
  return {
    onChange: function(value) {
      if (to) {
        clearTimeout(to);
      }
      return to = setTimeout(function() {
        to = null;
        env.setValue(value);
        return cd.scan();
      }, delay);
    }
  };
};

alight.filters.toArray = function(exp, cd, env) {
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
  return {
    watchMode: 'deep',
    onChange: function(obj) {
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
    }
  };
};

	/* prev prefix.js */
		return alight;
	}; // finish of buildAlight

	var alight = buildAlight();
	alight.makeInstance = buildAlight;
	// requrejs/commonjs
	if(typeof(define) === 'function') {
		define(function() {
			return alight;
		});
	} else if(typeof(module) === 'object' && typeof(module.exports) === 'object') {
		module.exports = alight
	} else if(typeof(alightInitCallback) === 'function') {
		alightInitCallback(alight)
	} else {
		window.alight = alight;
		alight.f$.ready(alight.bootstrap);
	};
})();
