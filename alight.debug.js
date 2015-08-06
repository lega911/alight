(function() {
    function buildAlight(alightConfig) {
        alightConfig = alightConfig || {};
        var enableGlobalControllers = alightConfig.globalControllers;
        var alight = {
            core: {},
            controllers: {},
            filters: {},
            text: {},
            apps: {},
            utils: {},
            directives: {
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
        alight.utilits = alight.utils;


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


/*

root = alight.Scope()

Scope::$new
Scope::$watch
Scope::$destroy

 * can be bindable
Scope::$compile
    Scope::$eval
    Scope::$getValue
    Scope::$setValue

 * only for root
Scope::$scan
    Scope::$scanAsync

 * other
Scope::$rebuildObserve

makeWatch = (scope, $system) ->
    (name, callback, options) ->
        baseWatch name, callback, options, scope, $system

 * new API
scope = {}
root = alight.core.root(conf)
node = root.node(scope)
root.scan(option)

node.watch(src, callback, option)
node.compile(src, option)
node.destroy()
root.destroy()
 */

(function() {
  var Node, Root, WA, get_time, notEqual, scan_core2, self, watchAny;

  self = alight.core;

  self.root = function(conf) {
    conf = conf || {};
    return new Root(conf);
  };

  Root = function(conf) {
    conf = conf || {};
    this.nodeHead = null;
    this.nodeTail = null;
    this["private"] = {};
    this.watchers = {
      any: [],
      finishBinding: [],
      finishScan: [],
      finishScanOnce: []
    };
    this.status = null;
    this.extraLoop = false;
    this.finishBinding_lock = false;
    this.lateScan = false;
    if (conf.useObserver) {
      this.obList = [];
      this.observer = alight.observer.create();
      this.privateOb = this.observer.observe(this["private"]);
    }
    return this;
  };

  Root.prototype.destroy = function() {
    if (this.observer) {
      this.privateOb.destroy();
      this.observer.destroy();
    }
    this.watchers.any.length = 0;
    this.watchers.finishBinding.length = 0;
    this.watchers.finishScan.length = 0;
    return this.watchers.finishScanOnce.length = 0;
  };

  Root.prototype.node = function(scope, option) {
    return new Node(this, scope, option);
  };

  Node = function(root, scope, option) {
    this.scope = scope;
    this.root = root;
    this.watchers = {};
    this.watchList = [];
    this.destroy_callbacks = [];
    this.lineActive = false;
    this.prevSibling = null;
    this.nextSibling = null;
    this.rwatchers = {
      any: [],
      finishScan: []
    };
    if (root.observer) {
      this.obFire = {};
      this.ob = root.observer.observe(scope, option);
    }
    return this;
  };

  Node.prototype.destroy = function() {
    var d, fn, j, k, l, len, len1, len2, m, n, node, p, ref, ref1, ref2, ref3, root, wa;
    node = this;
    root = node.root;
    ref = node.destroy_callbacks;
    for (j = 0, len = ref.length; j < len; j++) {
      fn = ref[j];
      fn();
    }
    if (node.ob) {
      ref1 = node.watchers;
      for (k in ref1) {
        d = ref1[k];
        if (d.privateOb) {
          root.privateOb.unwatch(d.privateName, d.privateOb);
        }
      }
      node.ob.destroy();
      node.ob = null;
    }
    node.obFire = null;
    node.destroy_callbacks.length = 0;
    node.watchList.length = 0;
    node.watchers.length = 0;
    node.watchers = {};
    ref2 = node.rwatchers.any;
    for (l = 0, len1 = ref2.length; l < len1; l++) {
      wa = ref2[l];
      removeItem(root.watchers.any, wa);
    }
    node.rwatchers.any.length = 0;
    ref3 = node.rwatchers.finishScan;
    for (m = 0, len2 = ref3.length; m < len2; m++) {
      wa = ref3[m];
      removeItem(root.watchers.finishScan, wa);
    }
    node.rwatchers.finishScan.length = 0;
    if (node.lineActive) {
      node.lineActive = false;
      p = node.prevSibling;
      n = node.nextSibling;
      if (p) {
        p.nextSibling = n;
      } else {
        root.nodeHead = n;
      }
      if (n) {
        return n.prevSibling = p;
      } else {
        return root.nodeTail = p;
      }
    }
  };

  WA = function(callback) {
    return this.cb = callback;
  };

  watchAny = function(node, key, callback) {
    var root, wa;
    root = node.root;
    wa = new WA(callback);
    node.rwatchers[key].push(wa);
    root.watchers[key].push(wa);
    return {
      stop: function() {
        removeItem(node.rwatchers[key], wa);
        return removeItem(root.watchers[key], wa);
      }
    };
  };

  Node.prototype.watch = function(name, callback, option) {
    var ce, d, exp, isFunction, isObserved, j, key, len, node, privateName, r, realCallback, ref, returnValue, root, scope, t, value, variable;
    node = this;
    root = node.root;
    scope = node.scope;
    if (option.is_array) {
      option.isArray = true;
    }
    if (f$.isFunction(name)) {
      exp = name;
      key = alight.utilits.getId();
      isFunction = true;
    } else {
      isFunction = false;
      exp = null;
      name = name.trim();
      if (name.slice(0, 2) === '::') {
        name = name.slice(2);
        option.oneTime = true;
      }
      if (option["private"]) {
        if (option.oneTime || option.isArray || option.deep) {
          throw 'Conflict $watch option private';
        }
        privateName = name;
        name = '$system.root.private.' + name;
      }
      key = name;
      if (key === '$any') {
        return watchAny(node, 'any', callback);
      }
      if (key === '$finishScan') {
        return watchAny(node, 'finishScan', callback);
      }
      if (key === '$finishScanOnce') {
        return root.watchers.finishScanOnce.push(callback);
      }
      if (key === '$destroy') {
        return node.destroy_callbacks.push(callback);
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
    d = node.watchers[key];
    if (d) {
      if (!option.readOnly) {
        d.extraLoop = true;
      }
      returnValue = d.value;
    } else {
      if (!isFunction) {
        if (option.watchText) {
          exp = option.watchText.fn;
          ce = {
            isSimple: option.watchText.simpleVariables ? 2 : 0,
            simpleVariables: option.watchText.simpleVariables
          };
        } else {
          ce = node.compile(name, {
            noBind: true,
            full: true
          });
          exp = ce.fn;
        }
      }
      returnValue = value = exp(scope);
      if (option.deep) {
        value = alight.utilits.clone(value);
        option.isArray = false;
      }
      node.watchers[key] = d = {
        isArray: Boolean(option.isArray),
        extraLoop: !option.readOnly,
        deep: option.deep,
        value: value,
        callbacks: [],
        exp: exp,
        src: '' + name
      };
      isObserved = false;
      if (root.observer) {
        if (!isFunction && !option.oneTime && !option.deep) {
          if (ce.isSimple && ce.simpleVariables.length) {
            isObserved = true;
            if (d.isArray) {
              d.value = null;
            } else {
              if (ce.isSimple < 2) {
                isObserved = false;
              }
            }
            if (isObserved) {
              d.isObserved = true;
              if (option["private"]) {
                d.privateName = privateName;
                d.privateOb = root.privateOb.watch(privateName, function() {
                  if (node.obFire[key]) {
                    return;
                  }
                  node.obFire[key] = true;
                  return root.obList.push([node, d]);
                });
              } else {
                d.obList = [];
                ref = ce.simpleVariables;
                for (j = 0, len = ref.length; j < len; j++) {
                  variable = ref[j];
                  d.obList.push({
                    name: variable,
                    callback: node.ob.watch(variable, function() {
                      if (node.obFire[key]) {
                        return;
                      }
                      node.obFire[key] = true;
                      return root.obList.push([node, d]);
                    })
                  });
                }
              }
            }
          }
        }
      }
      if (option.isArray && !isObserved) {
        if (f$.isArray(value)) {
          d.value = value.slice();
        } else {
          d.value = null;
        }
        returnValue = d.value;
      }
      if (!isObserved) {
        node.watchList.push(d);
        if (!node.lineActive) {
          node.lineActive = true;
          t = root.nodeTail;
          if (t) {
            root.nodeTail = t.nextSibling = node;
            node.prevSibling = t;
          } else {
            root.nodeHead = root.nodeTail = node;
          }
        }
      }
    }
    r = {
      $: d,
      value: returnValue
    };
    if (option.oneTime) {
      realCallback = callback;
      callback = function(value) {
        if (value === void 0) {
          return;
        }
        r.stop();
        return realCallback(value);
      };
    }
    d.callbacks.push(callback);
    r.stop = function() {
      var l, len1, ref1;
      removeItem(d.callbacks, callback);
      if (d.callbacks.length !== 0) {
        return;
      }
      delete node.watchers[key];
      if (d.isObserved) {
        if (d.privateOb) {
          root.privateOb.unwatch(d.privateName, d.privateOb);
          d.privateOb = null;
        }
        if (d.obList) {
          ref1 = d.obList;
          for (l = 0, len1 = ref1.length; l < len1; l++) {
            t = ref1[l];
            node.ob.unwatch(t.name, t.callback);
          }
          return d.obList = null;
        }
      } else {
        return removeItem(node.watchList, d);
      }
    };
    if (option.init) {
      callback(r.value);
    }
    return r;
  };

  Node.prototype.compile = function(src_exp, cfg) {
    var cr, f1, filters, func, hash, resp, scope;
    scope = this.scope;
    cfg = cfg || {};
    resp = {};
    src_exp = src_exp.trim();
    if (src_exp.slice(0, 2) === '::') {
      src_exp = src_exp.slice(2);
      resp.oneTime = true;
    }
    if (cfg.stringOrOneTime) {
      cfg.string = !resp.oneTime;
    }
    hash = src_exp + '#';
    hash += cfg.no_return ? '+' : '-';
    hash += cfg.string ? 's' : 'v';
    if (cfg.input) {
      hash += cfg.input.join(',');
    }
    cr = alight.utilits.compile.expression(src_exp, {
      scope: scope,
      hash: hash,
      no_return: cfg.no_return,
      string: cfg.string,
      input: cfg.input,
      rawExpression: cfg.rawExpression
    });
    func = cr.fn;
    filters = cr.filters;
    resp.rawExpression = cr.rawExpression;
    resp.isSimple = cr.isSimple;
    resp.simpleVariables = cr.simpleVariables;
    if (filters && filters.length) {
      func = alight.utilits.filterBuilder(scope, func, filters);
      if (cfg.string) {
        f1 = func;
        func = function() {
          var __;
          __ = f1.apply(this, arguments);
          return "" + (__ || (__ != null ? __ : ''));
        };
      }
    }
    if (cfg.noBind) {
      resp.fn = func;
    } else {
      if ((cfg.input || []).length < 4) {
        resp.fn = function() {
          var e;
          try {
            return func(scope, arguments[0], arguments[1], arguments[2]);
          } catch (_error) {
            e = _error;
            return alight.exceptionHandler(e, 'Wrong in expression: ' + src_exp, {
              src: src_exp,
              cfg: cfg
            });
          }
        };
      } else {
        resp.fn = function() {
          var a, e, i, j, len;
          try {
            a = [scope];
            for (j = 0, len = arguments.length; j < len; j++) {
              i = arguments[j];
              a.push(i);
            }
            return func.apply(null, a);
          } catch (_error) {
            e = _error;
            return alight.exceptionHandler(e, 'Wrong in expression: ' + src_exp, {
              src: src_exp,
              cfg: cfg
            });
          }
        };
      }
    }
    if (cfg.full) {
      return resp;
    }
    return resp.fn;
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

  scan_core2 = function(root, result) {
    var a0, a1, callback, changes, extraLoop, extraLoopFlag, j, l, last, len, len1, len2, len3, m, mutated, node, o, obList, obTotal, ref, ref1, ref2, scope, total, value, w, x;
    extraLoop = false;
    extraLoopFlag = false;
    changes = 0;
    total = 0;
    obTotal = 0;
    if (root.observer) {
      root.observer.deliver();
      obList = root.obList;
      root.obList = [];
      for (j = 0, len = obList.length; j < len; j++) {
        x = obList[j];
        node = x[0];
        w = x[1];
        scope = node.scope;
        node.obFire = {};
        result.src = w.src;
        last = w.value;
        value = w.exp(scope);
        if (last !== value) {
          if (!w.isArray) {
            w.value = value;
          }
          changes++;
          ref = w.callbacks.slice();
          for (l = 0, len1 = ref.length; l < len1; l++) {
            callback = ref[l];
            if (callback.call(scope, value) !== '$scanNoChanges') {
              extraLoopFlag = true;
            }
          }
          if (extraLoopFlag && w.extraLoop) {
            extraLoop = true;
          }
        }
      }
      obTotal += obList.length;
    }
    node = root.nodeHead;
    while (node) {
      scope = node.scope;
      total += node.watchList.length;
      ref1 = node.watchList.slice();
      for (m = 0, len2 = ref1.length; m < len2; m++) {
        w = ref1[m];
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
                if (notEqual(last, value)) {
                  w.value = value.slice();
                  mutated = true;
                }
              }
            } else {
              mutated = true;
              if (a1) {
                w.value = value.slice();
              } else {
                w.value = null;
              }
            }
          } else if (w.deep) {
            if (!alight.utilits.equal(last, value)) {
              mutated = true;
              w.value = alight.utilits.clone(value);
            }
          } else {
            mutated = true;
            w.value = value;
          }
          if (mutated) {
            mutated = false;
            changes++;
            ref2 = w.callbacks.slice();
            for (o = 0, len3 = ref2.length; o < len3; o++) {
              callback = ref2[o];
              if (callback.call(scope, value) !== '$scanNoChanges') {
                extraLoopFlag = true;
              }
            }
            if (extraLoopFlag && w.extraLoop) {
              extraLoop = true;
            }
          }
          if (alight.debug.scan > 1) {
            console.log('changed:', w.src);
          }
        }
      }
      node = node.nextSibling;
    }
    result.total = total;
    result.obTotal = obTotal;
    result.changes = changes;
    return result.extraLoop = extraLoop;
  };

  Root.prototype.scan = function(cfg) {
    var callback, cb, duration, e, finishScanOnce, j, l, len, len1, len2, m, mainLoop, ref, ref1, result, root, start;
    root = this;
    cfg = cfg || {};
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
    finishScanOnce = root.watchers.finishScanOnce.slice();
    root.watchers.finishScanOnce.length = 0;
    if (alight.debug.scan) {
      start = get_time();
    }
    mainLoop = 10;
    try {
      result = {
        total: 0,
        obTotal: 0,
        changes: 0,
        extraLoop: false,
        src: ''
      };
      while (mainLoop) {
        mainLoop--;
        root.extraLoop = false;
        scan_core2(root, result);
        if (result.changes) {
          ref = root.watchers.any;
          for (j = 0, len = ref.length; j < len; j++) {
            cb = ref[j];
            cb();
          }
        }
        if (!result.extraLoop && !root.extraLoop) {
          break;
        }
      }
      if (alight.debug.scan) {
        duration = get_time() - start;
        console.log("$scan: (" + (10 - mainLoop) + ") " + result.total + " + " + result.obTotal + " / " + duration + "ms");
      }
    } catch (_error) {
      e = _error;
      alight.exceptionHandler(e, '$scan, error in expression: ' + result.src, {
        src: result.src,
        result: result
      });
    } finally {
      root.status = null;
      ref1 = root.watchers.finishScan;
      for (l = 0, len1 = ref1.length; l < len1; l++) {
        callback = ref1[l];
        callback();
      }
      for (m = 0, len2 = finishScanOnce.length; m < len2; m++) {
        callback = finishScanOnce[m];
        callback.call(root);
      }
    }
    if (mainLoop === 0) {
      throw 'Infinity loop detected';
    }
  };

}).call(this);


/*
    Scope
        prototype
        parent
        attachParent
        root
        useObserver
 */

(function() {
  var Scope;

  Scope = function(conf) {
    var isRoot, k, objectProto, parent, proto, ref, root, scope, v;
    if (this instanceof Scope) {
      return this;
    }
    conf = conf || {};
    if (conf.prototype) {
      scope = conf.prototype;
      if (!scope.$new) {
        if (Object.setPrototypeOf) {
          proto = scope;
          objectProto = {}.__proto__;
          while (proto.__proto__ !== objectProto) {
            proto = proto.__proto__;
          }
          Object.setPrototypeOf(proto, Scope.prototype);
        } else {
          ref = Scope.prototype;
          for (k in ref) {
            v = ref[k];
            scope[k] = v;
          }
        }
      }
    } else {
      scope = new Scope();
    }
    if (conf.parent) {
      if (conf.root) {
        throw 'Conflict new Scope, root and parent together';
      }
      parent = conf.parent;
      if (!parent.$system.exChildConstructor) {
        parent.$system.exChildConstructor = function() {};
        parent.$system.exChildConstructor.prototype = parent;
      }
      scope = new parent.$system.exChildConstructor;
      root = parent.$system.root;
      isRoot = false;
    }
    if (conf.root) {
      root = conf.root;
      isRoot = false;
    }
    if (!root) {
      root = alight.core.root({
        useObserver: (alight.debug.useObserver || conf.useObserver) && alight.observer.support()
      });
      isRoot = true;
    }
    scope.$system = root.node(scope, {
      keywords: ['$system', '$parent', '$ns']
    });
    scope.$system.exIsRoot = isRoot;
    scope.$system.exChildren = [];
    if (conf.attachParent) {
      scope.$parent = conf.attachParent;
      conf.attachParent.$system.exChildren.push(scope);
    }
    if (scope.$system.ob) {
      scope.$system.ob.rootEvent = function(key, value) {
        var child, i, len, ref1;
        ref1 = scope.$system.exChildren;
        for (i = 0, len = ref1.length; i < len; i++) {
          child = ref1[i];
          child.$$rebuildObserve(key, value);
        }
        return null;
      };
    }
    return scope;
  };

  alight.Scope = Scope;

  Scope.prototype.$$rebuildObserve = function(key, value) {
    var child, i, len, ref, scope;
    scope = this;
    scope.$system.ob.reobserve(key);
    ref = scope.$system.exChildren;
    for (i = 0, len = ref.length; i < len; i++) {
      child = ref[i];
      child.$$rebuildObserve(key, value);
    }
    return scope.$system.ob.fire(key, value);
  };

  Scope.prototype.$new = function(isolate) {
    var parent, scope;
    parent = this;
    if (isolate) {
      scope = alight.Scope({
        root: parent.$system.root,
        attachParent: parent
      });
    } else {
      scope = alight.Scope({
        parent: parent,
        attachParent: parent
      });
    }
    return scope;
  };


  /*
  $watch
      name:
          expression or function
          $any
          $destroy
          $finishBinding
          $finishScan
          $finishScanOnce
      callback:
          function
      option:
          isArray (is_array)
          readOnly
          init
          deep
   */

  Scope.prototype.$watch = function(name, callback, option) {
    option = option || {};
    if (option === true) {
      option = {
        isArray: true
      };
    }
    return this.$system.watch(name, callback, option);
  };


  /*
      cfg:
          no_return   - method without return (exec)
          string      - method will return result as string
          stringOrOneTime
          input   - list of input arguments
          full    - full response
          noBind  - get function without bind to scope
          rawExpression
   */

  Scope.prototype.$compile = function(src, option) {
    return this.$system.compile(src, option);
  };

  Scope.prototype.$eval = function(exp) {
    return this.$compile(exp, {
      noBind: true
    })(this);
  };

  Scope.prototype.$getValue = function(name) {
    return this.$eval(name);
  };

  Scope.prototype.$setValue = function(name, value) {
    var fn;
    fn = this.$compile(name + ' = $value', {
      input: ['$value'],
      no_return: true,
      noBind: true
    });
    return fn(this, value);
  };

  Scope.prototype.$destroy = function() {
    var child, i, len, node, ref, root, scope;
    scope = this;
    node = scope.$system;
    root = node.root;
    if (!scope.$system.exIsRoot) {
      removeItem(scope.$parent.$system.exChildren, scope);
    }
    ref = node.exChildren.slice();
    for (i = 0, len = ref.length; i < len; i++) {
      child = ref[i];
      child.$destroy();
    }
    node.destroy();
    if (scope.$system.exIsRoot) {
      return root.destroy();
    }

    /*
    
     * fire callbacks
    for cb in node.destroy_callbacks
        cb scope
    node.destroy_callbacks.length = 0
    
     * remove from parent
    if scope.$parent
        removeItem scope.$parent.$system.children, scope
    
     * remove watch
    scope.$parent = null
    node.watchers = {}
    node.watchList = []
     */
  };

  Scope.prototype.$scanAsync = function(callback) {
    return this.$scan({
      late: true,
      callback: callback
    });
  };

  Scope.prototype.$scan = function(option) {
    if (f$.isFunction(option)) {
      option = {
        callback: option
      };
    } else {
      option = option || {};
    }
    return this.$system.root.scan(option);
  };

}).call(this);

(function() {
  var attrBinding, bindComment, bindElement, bindNode, bindText, directivePreprocessor, nodeTypeBind, sortByPriority, testDirective;

  alight.version = '0.8.39';

  alight.debug = {
    useObserver: false,
    observer: 0,
    scan: 0,
    directive: false,
    watch: false,
    watchText: false,
    parser: false
  };

  alight.directivePreprocessor = directivePreprocessor = function(attrName, args) {
    var dir, j, k, name, ns, path, raw, v;
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
    if (args.scope.$ns && args.scope.$ns.directives) {
      path = args.scope.$ns.directives[ns];
    } else {
      path = alight.directives[ns];
    }
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
    dir.$init = function(element, expression, scope, env) {
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
        expression: expression,
        scope: scope,
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
          dscope.result.owner = true;
          dscope.doBinding = true;
          return function() {
            dscope.isDeferred = false;
            return doProcess();
          };
        }
      };
      doProcess();
      return dscope.result;
    };
    return dir;
  };

  (function() {
    var ext;
    directivePreprocessor.ext = ext = alight.hooks.directive;
    ext.push({
      code: 'init',
      fn: function() {
        if (this.directive.init) {
          this.result = this.directive.init(this.element, this.expression, this.scope, this.env) || {};
        }
        if (!f$.isObject(this.result)) {
          return this.result = {};
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
            if (!this.directive.scope) {
              return this.directive.scope = true;
            }
          }
        }
      }
    });
    ext.push({
      code: 'scope',
      fn: function() {
        var parentScope;
        if (this.directive.scope) {
          parentScope = this.scope;
          this.scope = parentScope.$new(this.directive.scope === 'isolate');
          this.result.owner = true;
          return this.doBinding = true;
        }
      }
    });
    ext.push({
      code: 'link',
      fn: function() {
        if (this.directive.link) {
          return this.directive.link(this.element, this.expression, this.scope, this.env);
        }
      }
    });
    return ext.push({
      code: 'scopeBinding',
      fn: function() {
        if (this.doBinding) {
          return alight.applyBindings(this.scope, this.element, {
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

  attrBinding = function(element, value, scope, attrName) {
    var setter, text, w;
    text = value;
    if (text.indexOf(alight.utilits.pars_start_tag) < 0) {
      return;
    }
    setter = function(result) {
      f$.attr(element, attrName, result);
      return '$scanNoChanges';
    };
    w = scope.$watchText(text, setter);
    return setter(w.value);
  };

  bindText = function(scope, node) {
    var setter, text, w;
    text = node.data;
    if (text.indexOf(alight.utilits.pars_start_tag) < 0) {
      return;
    }
    setter = function(result) {
      node.nodeValue = result;
      return '$scanNoChanges';
    };
    w = scope.$watchText(text, setter);
    return setter(w.value);
  };

  bindComment = function(scope, element) {
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
      scope: scope,
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
      result = directive.$init(element, value, scope, env);
      if (result && result.start) {
        return result.start();
      }
    } catch (_error) {
      e = _error;
      return alight.exceptionHandler(e, 'Error in directive: ' + d.name, {
        value: value,
        env: env,
        scope: scope,
        element: element
      });
    }
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
    return function(scope, element, config) {
      var args, attrName, attr_value, attrs, d, directive, e, env, len, len1, list, n, node, o, ref, result, skip_attr, skip_children, value;
      config = config || {};
      skip_children = false;
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
          scope: scope
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
            attrBinding(element, value, scope, d.attrName);
          } else {
            directive = d.directive;
            env = {
              element: element,
              attrName: d.attrName,
              attributes: list,
              takeAttr: takeAttr,
              skippedAttr: skippedAttr
            };
            if (alight.debug.directive) {
              console.log('bind', d.attrName, value, d);
            }
            try {
              result = directive.$init(element, value, scope, env);
              if (result && result.start) {
                result.start();
              }
            } catch (_error) {
              e = _error;
              alight.exceptionHandler(e, 'Error in directive: ' + d.attrName, {
                value: value,
                env: env,
                scope: scope,
                element: element
              });
            }
            if (result && result.owner) {
              skip_children = true;
              break;
            }
          }
        }
      }
      if (!skip_children) {
        ref = f$.childNodes(element);
        for (o = 0, len1 = ref.length; o < len1; o++) {
          node = ref[o];
          if (!node) {
            continue;
          }
          bindNode(scope, node);
        }
      }
      return null;
    };
  })();

  nodeTypeBind = {
    1: bindElement,
    3: bindText,
    8: bindComment
  };

  bindNode = function(scope, node, option) {
    var fn, h, len, n, r, ref;
    if (alight.utils.getData(node, 'skipBinding')) {
      return;
    }
    if (alight.hooks.binding.length) {
      ref = alight.hooks.binding;
      for (n = 0, len = ref.length; n < len; n++) {
        h = ref[n];
        r = h.fn(scope, node, option);
        if (r && r.owner) {
          return;
        }
      }
    }
    fn = nodeTypeBind[node.nodeType];
    if (fn) {
      return fn(scope, node, option);
    }
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
            fn: callback
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

  alight.getController = function(name, scope) {
    var ctrl;
    if (scope.$ns && scope.$ns.controllers) {
      ctrl = scope.$ns.controllers[name];
    } else {
      ctrl = alight.controllers[name] || (enableGlobalControllers && window[name]);
    }
    if (!ctrl) {
      throw 'Controller isn\'t found: ' + name;
    }
    if (!(ctrl instanceof Function)) {
      throw 'Wrong controller: ' + name;
    }
    return ctrl;
  };

  alight.getFilter = function(name, scope, param) {
    var filter;
    if (scope.$ns && scope.$ns.filters) {
      filter = scope.$ns.filters[name];
    } else {
      filter = alight.filters[name];
    }
    if (!filter) {
      throw 'Filter not found: ' + name;
    }
    return filter;
  };

  alight.applyBindings = function(scope, element, config) {
    var cb, finishBinding, len, lst, n, root;
    if (!element) {
      throw 'No element';
    }
    if (!scope) {
      scope = alight.Scope();
    }
    root = scope.$system.root;
    finishBinding = !root.finishBinding_lock;
    if (finishBinding) {
      root.finishBinding_lock = true;
    }
    config = config || {};
    bindNode(scope, element, config);
    if (finishBinding) {
      root.finishBinding_lock = false;
      lst = root.watchers.finishBinding.slice();
      root.watchers.finishBinding.length = 0;
      for (n = 0, len = lst.length; n < len; n++) {
        cb = lst[n];
        cb();
      }
    }
    return null;
  };

  alight.bootstrap = function(input) {
    var attr, ctrl, ctrlName, el, element, len, len1, n, o, ref, scope, t, tag;
    if (!input) {
      input = f$.find(document, '[al-app]');
    }
    if (f$.isElement(input)) {
      input = [input];
    }
    if (f$.isArray(input) || typeof input.length === 'number') {
      for (n = 0, len = input.length; n < len; n++) {
        element = input[n];
        if (element.ma_bootstrapped) {
          continue;
        }
        element.ma_bootstrapped = true;
        attr = f$.attr(element, 'al-app');
        if (attr) {
          if (attr[0] === '#') {
            t = attr.split(' ');
            tag = t[0].substring(1);
            ctrlName = t[1];
            scope = alight.apps[tag];
            if (scope) {
              if (ctrlName) {
                console.error("New controller on exists scope: al-app=\"" + attr + "\"");
              }
            } else {
              alight.apps[tag] = scope = alight.Scope();
              if (ctrlName) {
                ctrl = alight.getController(ctrlName, scope);
                ctrl(scope);
              }
            }
          } else {
            scope = alight.Scope();
            ctrl = alight.getController(attr, scope);
            ctrl(scope);
          }
        } else {
          scope = alight.Scope();
        }
        alight.applyBindings(scope, element, {
          skip_attr: 'al-app'
        });
      }
    } else {
      if (f$.isObject(input) && input.$el) {
        scope = alight.Scope({
          prototype: input
        });
        if (f$.isElement(input.$el)) {
          alight.applyBindings(scope, input.$el);
        } else {
          ref = f$.find(document.body, input.$el);
          for (o = 0, len1 = ref.length; o < len1; o++) {
            el = ref[o];
            alight.applyBindings(scope, el);
          }
        }
        return scope;
      } else {
        alight.exceptionHandler('Error in bootstrap', 'Error in bootstrap', {
          input: input
        });
      }
    }
    return null;
  };

}).call(this);

(function() {
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
    
    
        expressin points
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
      var dir, dirName, env, exp, i, point, scope;
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
      scope = conf.scope;
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
      return dir(env.setter, exp, scope, env);
    };
    return alight.Scope.prototype.$watchText = function(expression, callback, config) {
      var canUseObserver, canUseSimpleBuilder, ce, d, data, doFinally, doUpdate, exp, fn, hasDirectives, j, k, key, len, len1, noCache, scope, st, value, w, watchCount;
      config = config || {};
      scope = this;
      if (alight.debug.watchText) {
        console.log('$watchText', expression);
      }
      st = alight.utilits.compile.buildSimpleText(expression, null);
      if (st) {
        return scope.$watch(expression, callback, {
          watchText: st
        });
      }
      data = alight.utilits.parsText(expression);
      watchCount = 0;
      canUseObserver = true;
      canUseSimpleBuilder = true;
      hasDirectives = false;
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
              scope: scope,
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
              hasDirectives = true;
              canUseObserver = false;
              canUseSimpleBuilder = false;
            }
          } else {
            ce = scope.$compile(exp, {
              string: true,
              full: true,
              rawExpression: true,
              noBind: true
            });
            d.fn = ce.fn;
            if (ce.rawExpression) {
              d.re = ce.rawExpression;
              if (ce.isSimple > 1) {
                d.simpleVariables = ce.simpleVariables;
              } else {
                canUseObserver = false;
              }
            } else {
              canUseObserver = false;
              canUseSimpleBuilder = false;
            }
            watchCount++;
          }
        }
      }
      if (!watchCount) {
        value = '';
        for (k = 0, len1 = data.length; k < len1; k++) {
          d = data[k];
          value += d.value;
        }
        return {
          isStatic: true,
          value: value
        };
      }
      if (canUseObserver) {
        if (noCache) {
          st = alight.utilits.compile.buildSimpleText(null, data);
        } else {
          st = alight.utilits.compile.buildSimpleText(expression, data);
        }
        return scope.$watch(expression, callback, {
          watchText: st
        });
      }
      if (canUseSimpleBuilder) {
        if (noCache) {
          st = alight.utilits.compile.buildSimpleText(null, data);
        } else {
          st = alight.utilits.compile.buildSimpleText(expression, data);
        }
        return scope.$watch(expression, callback, {
          watchText: {
            fn: st.fn
          }
        });
      }
      if (!hasDirectives) {
        data.scope = scope;
        fn = alight.utilits.compile.buildText(expression, data);
        return scope.$watch(expression, callback, {
          watchText: {
            fn: fn
          }
        });
      }
      w = null;
      key = getId();
      data.scope = scope;
      fn = alight.utilits.compile.buildText(expression, data);
      doUpdate = function() {
        return scope.$system.root["private"][key] = fn();
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
        scope.$watch('$finishScanOnce', function() {
          return w.stop();
        });
        if (config.onStatic) {
          return config.onStatic();
        }
      };
      doUpdate();
      return w = scope.$watch(key, callback, {
        "private": true
      });
    };
  })();

}).call(this);

(function() {
  var clone, equal;

  alight.utilits.getId = (function() {
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

  alight.utilits.filterBuilder = function(scope, func, line) {
    var d, f, fbase, filter, fname, j, len, param;
    if (!line || !line.length) {
      return func;
    }
    for (j = 0, len = line.length; j < len; j++) {
      f = line[j];
      d = f.match(/\s*([\w\d_]+?)\s*:\s*(.*?)\s*$/);
      if (d) {
        fname = d[1];
        param = d[2];
      } else {
        fname = f.trim();
        param = null;
      }
      fbase = alight.getFilter(fname, scope, param);
      filter = fbase.call(scope, param, scope);
      if (func) {
        func = (function(fl, fn) {
          return function(value) {
            return fl(fn(value));
          };
        })(filter, func);
      } else {
        func = filter;
      }
    }
    return func;
  };

  alight.utilits.clone = clone = function(d) {
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

  alight.utilits.equal = equal = function(a, b) {
    var i, j, k, len, set, ta, tb, v;
    if (!a) {
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
        if (k === '$alite_id') {
          continue;
        }
        if (k === '$$observer') {
          continue;
        }
        set[k] = true;
        if (!equal(v, b[k])) {
          return false;
        }
      }
      for (k in b) {
        v = b[k];
        if (k === '$alite_id') {
          continue;
        }
        if (k === '$$observer') {
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
    console.warn(title, locals);
    err = typeof e === 'string' ? e : e.stack;
    return console.error(err);
  };

  alight.utilits.dataByElement = function(el, key) {
    var al;
    al = el.al;
    if (!al) {
      el.al = al = {};
    }
    if (key) {
      if (!al[key]) {
        al[key] = {};
      }
      return al[key];
    }
    return al;
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

}).call(this);

(function() {
  var rawParsText, reserved;

  reserved = ['instanceof', 'typeof', 'in', 'null', 'true', 'false', 'undefined', 'function', 'return'];

  alight.utilits.parsExpression = function(line, cfg) {
    var assignment, conv, d, exp, i, index, input, isSimple, is_function, j, l, len, len1, m, n, newName, o, pars, prev, ref, ref1, result, simpleVariables, variable, variable_assignment, variable_fn, variable_names, variables;
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
        if (reserved.indexOf(variable) >= 0) {
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
              for (m = 0, len = ref.length; m < len; m++) {
                i = ref[m];
                l.push("($$=$$." + i + ",$$==null)?undefined:");
              }
              l.push("$$." + d[d.length - 2]);
              newName = '(' + l.join('') + ').' + d[d.length - 1];
            } else {
              ref1 = d.slice(1, +(d.length - 2) + 1 || 9e9);
              for (o = 0, len1 = ref1.length; o < len1; o++) {
                i = ref1[o];
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
            newName = '$$scope.' + variable;
          }
        }
        exp = exp.slice(0, n) + newName + exp.slice(n + variable.length);
      }
      result[0] = exp;
    }
    if (alight.debug.parser) {
      console.log('parser', result);
    }
    if (result.length > 1) {
      isSimple = false;
    }
    if (cfg.fullResponse) {
      return {
        result: result,
        simpleVariables: simpleVariables,
        isSimple: isSimple
      };
    } else {
      return result;
    }
  };

  alight.utilits.pars_start_tag = '{{';

  alight.utilits.pars_finish_tag = '}}';

  rawParsText = function(line) {
    var find_exp, finish_tag, get_part, index, pars, prev_index, result, rexp, start_tag;
    start_tag = alight.utilits.pars_start_tag;
    finish_tag = alight.utilits.pars_finish_tag;
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

  (function() {
    var cache, clone;
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
    return alight.utilits.parsText = function(line) {
      var result;
      result = cache[line];
      if (!result) {
        cache[line] = result = rawParsText(line);
      }
      return clone(result);
    };
  })();

}).call(this);


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

  alight.utilits.compile = self = {};

  self.cache = {};

  self.Function = Function;

  self.expression = function(src, cfg) {
    var args, e, exp, ff, ffResult, filters, fn, funcCache, hash, i, j, len, no_return, ref, result;
    hash = cfg.hash;
    funcCache = self.cache[hash];
    if (funcCache) {
      return funcCache;
    }
    funcCache = {
      fn: null,
      isSimple: 0,
      simpleVariables: null
    };
    exp = src;
    no_return = cfg.no_return || false;
    ffResult = alight.utilits.parsExpression(exp, {
      input: cfg.input,
      fullResponse: true
    });
    ff = ffResult.result;
    if (ffResult.isSimple) {
      funcCache.isSimple = 2;
      funcCache.simpleVariables = ffResult.simpleVariables;
      ref = ffResult.simpleVariables;
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        if (i.indexOf('.') < 0) {
          funcCache.isSimple = 1;
          break;
        }
      }
    }
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
    var d, escapedValue, fn, index, j, len, result;
    fn = self.cacheText[text];
    if (fn) {
      return function() {
        return fn.call(data);
      };
    }
    result = [];
    for (index = j = 0, len = data.length; j < len; index = ++j) {
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

  self.buildSimpleText = function(text, data) {
    var d, escapedValue, fn, index, item, j, len, result, simpleVariables;
    item = text ? self.cacheSimpleText[text] : null;
    if (item || !data) {
      return item || null;
    }
    result = [];
    simpleVariables = [];
    for (index = j = 0, len = data.length; j < len; index = ++j) {
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

}).call(this);

(function() {
  var click_maker, dirs, fn1, j, key, len, make_boif, ref;

  alight.text.bindonce = function(callback, expression, scope, env) {
    return env["finally"](scope.$eval(expression));
  };

  alight.text.oneTimeBinding = function(callback, expression, scope, env) {
    var w;
    return w = scope.$watch(expression, function(value) {
      if (value === void 0) {
        return;
      }
      w.stop();
      return env["finally"](value);
    }, {
      init: true
    });
  };

  dirs = alight.directives.al;

  dirs.debug = {
    priority: 5000,
    init: function(element, name, scope) {
      if (name) {
        return alight.debug = scope.$eval(name);
      } else {
        return alight.debug = -1;
      }
    }
  };

  dirs.text = function(element, name, scope) {
    var init_value, self;
    init_value = '';
    return self = {
      start: function() {
        self.watchModel();
        return self.initDom();
      },
      updateDom: function(value) {
        if ((value === void 0) || (value === null)) {
          value = '';
        }
        return f$.text(element, value);
      },
      watchModel: function() {
        var exp;
        exp = scope.$watch(name, self.updateDom, {
          readOnly: true
        });
        return init_value = exp.value;
      },
      initDom: function() {
        return self.updateDom(init_value);
      }
    };
  };

  dirs.value = function(element, variable, scope) {
    var init_value, self;
    init_value = null;
    return self = {
      changing: false,
      onDom: function() {
        f$.on(element, 'input', self.updateModel);
        f$.on(element, 'change', self.updateModel);
        return scope.$watch('$destroy', self.offDom);
      },
      offDom: function() {
        f$.off(element, 'input', self.updateModel);
        return f$.off(element, 'change', self.updateModel);
      },
      updateModel: function() {
        return alight.nextTick(function() {
          var value;
          value = f$.val(element);
          self.changing = true;
          scope.$setValue(variable, value);
          return scope.$scan(function() {
            return self.changing = false;
          });
        });
      },
      watchModel: function() {
        var exp;
        exp = scope.$watch(variable, self.updateDom, {
          readOnly: true
        });
        return init_value = exp.value;
      },
      updateDom: function(value) {
        if (self.changing) {
          return;
        }
        if (value == null) {
          value = '';
        }
        return f$.val(element, value);
      },
      initDom: function() {
        return self.updateDom(init_value);
      },
      start: function() {
        self.onDom();
        self.watchModel();
        return self.initDom();
      }
    };
  };

  click_maker = function(event) {
    return {
      priority: 10,
      init: function(element, name, scope, env) {
        var self;
        return self = {
          callback: scope.$compile(name, {
            no_return: true,
            noBind: true
          }),
          start: function() {
            self.onDom();
            return self.stop = env.takeAttr('al-click-stop');
          },
          onDom: function() {
            f$.on(element, event, self.doCallback);
            return scope.$watch('$destroy', self.offDom);
          },
          offDom: function() {
            return f$.off(element, event, self.doCallback);
          },
          doCallback: function(e) {
            if (!self.stop) {
              e.preventDefault();
              e.stopPropagation();
            }
            if (f$.attr(element, 'disabled')) {
              return;
            }
            try {
              self.callback(scope);
            } catch (_error) {
              e = _error;
              alight.exceptionHandler(e, 'al-click, error in expression: ' + name, {
                name: name,
                scope: scope,
                element: element
              });
            }
            if (self.stop && scope.$eval(self.stop)) {
              e.preventDefault();
              e.stopPropagation();
            }
            return scope.$scan();
          }
        };
      }
    };
  };

  dirs.click = click_maker('click');

  dirs.dblclick = click_maker('dblclick');

  dirs.submit = function(element, name, scope) {
    var self;
    return self = {
      callback: scope.$compile(name, {
        no_return: true,
        noBind: true
      }),
      start: function() {
        return self.onDom();
      },
      onDom: function() {
        f$.on(element, 'submit', self.doCallback);
        return scope.$watch('$destroy', self.offDom);
      },
      offDom: function() {
        return f$.off(element, 'submit', self.doCallback);
      },
      doCallback: function(e) {
        e.preventDefault();
        e.stopPropagation();
        try {
          self.callback(scope);
        } catch (_error) {
          e = _error;
          alight.exceptionHandler(e, 'al-submit, error in expression: ' + name, {
            name: name,
            scope: scope,
            element: element
          });
        }
        return scope.$scan();
      }
    };
  };

  dirs.controller = {
    priority: 500,
    restrict: 'AE',
    init: function(element, name, scope, env) {
      var self;
      self = {
        owner: true,
        start: function() {
          var newScope;
          newScope = scope.$new();
          self.callController(newScope);
          return alight.applyBindings(newScope, element, {
            skip_attr: env.skippedAttr()
          });
        },
        callController: function(newScope) {
          var ctrl, d;
          if (name) {
            d = name.split(' as ');
            ctrl = alight.getController(d[0], newScope);
            if (d[1]) {
              return newScope[d[1]] = new ctrl(newScope);
            } else {
              return ctrl(newScope);
            }
          }
        }
      };
      return self;
    }
  };

  dirs.checked = {
    priority: 100,
    init: function(element, name, scope) {
      var init_value, self;
      init_value = false;
      return self = {
        changing: false,
        start: function() {
          self.onDom();
          self.watchModel();
          return self.initDom();
        },
        onDom: function() {
          f$.on(element, 'change', self.updateModel);
          return scope.$watch('$destroy', self.offDom);
        },
        offDom: function() {
          return f$.off(element, 'change', self.updateModel);
        },
        updateModel: function() {
          var value;
          value = f$.prop(element, 'checked');
          self.changing = true;
          scope.$setValue(name, value);
          return scope.$scan(function() {
            return self.changing = false;
          });
        },
        watchModel: function() {
          var w;
          w = scope.$watch(name, self.updateDom, {
            readOnly: true
          });
          return init_value = !!w.value;
        },
        updateDom: function(value) {
          if (self.changing) {
            return;
          }
          return f$.prop(element, 'checked', !!value);
        },
        initDom: function() {
          return self.updateDom(init_value);
        }
      };
    }
  };

  dirs.radio = {
    priority: 10,
    init: function(element, name, scope, env) {
      var init_value, self;
      init_value = false;
      return self = {
        changing: false,
        start: function() {
          self.makeValue();
          self.onDom();
          self.watchModel();
          return self.initDom();
        },
        makeValue: function() {
          var key, value;
          key = env.takeAttr('al-value');
          if (key) {
            value = scope.$eval(key);
          } else {
            value = env.takeAttr('value');
          }
          return self.value = value;
        },
        onDom: function() {
          f$.on(element, 'change', self.updateModel);
          return scope.$watch('$destroy', self.offDom);
        },
        offDom: function() {
          return f$.off(element, 'change', self.updateModel);
        },
        updateModel: function() {
          self.changing = true;
          scope.$setValue(name, self.value);
          return scope.$scan(function() {
            return self.changing = false;
          });
        },
        watchModel: function() {
          var w;
          w = scope.$watch(name, self.updateDom, {
            readOnly: true
          });
          return init_value = w.value;
        },
        updateDom: function(value) {
          if (self.changing) {
            return;
          }
          return f$.prop(element, 'checked', value === self.value);
        },
        initDom: function() {
          return self.updateDom(init_value);
        }
      };
    }
  };

  dirs["class"] = dirs.css = {
    priority: 30,
    init: function(element, exp, scope) {
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
          var color, item, j, len, ref, result;
          ref = self.list;
          for (j = 0, len = ref.length; j < len; j++) {
            item = ref[j];
            color = (function(item) {
              return function(value) {
                return self.draw(item, value);
              };
            })(item);
            result = scope.$watch(item.exp, color, {
              readOnly: true,
              init: true
            });
          }
          return null;
        },
        draw: function(item, value) {
          var c, j, l, len, len1, ref, ref1, results, results1;
          if (value) {
            ref = item.css;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              c = ref[j];
              results.push(f$.addClass(element, c));
            }
            return results;
          } else {
            ref1 = item.css;
            results1 = [];
            for (l = 0, len1 = ref1.length; l < len1; l++) {
              c = ref1[l];
              results1.push(f$.removeClass(element, c));
            }
            return results1;
          }
        }
      };
    }
  };

  make_boif = function(direct) {
    var self;
    return self = {
      priority: 700,
      init: function(element, exp, scope) {
        var value;
        value = scope.$eval(exp);
        if (!value === direct) {
          f$.remove(element);
          return {
            owner: true
          };
        }
      }
    };
  };

  alight.directives.bo["if"] = make_boif(true);

  alight.directives.bo.ifnot = make_boif(false);

  dirs["if"] = {
    priority: 700,
    init: function(element, name, scope, env) {
      var self;
      return self = {
        owner: true,
        item: null,
        child: null,
        base_element: null,
        top_element: null,
        init_value: false,
        start: function() {
          self.prepare();
          self.watchModel();
          return self.initUpdate();
        },
        prepare: function() {
          self.base_element = element;
          self.top_element = f$.createComment(" " + env.attrName + ": " + name + " ");
          f$.before(element, self.top_element);
          return f$.remove(element);
        },
        updateDom: function(value) {
          if (value) {
            return self.insertBlock(value);
          } else {
            return self.removeBlock();
          }
        },
        removeBlock: function() {
          if (!self.child) {
            return;
          }
          self.child.$destroy();
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
          self.child = scope.$new();
          return alight.applyBindings(self.child, self.item, {
            skip_attr: env.skippedAttr()
          });
        },
        watchModel: function() {
          var w;
          w = scope.$watch(name, self.updateDom, {
            readOnly: true
          });
          return self.init_value = w.value;
        },
        initUpdate: function() {
          return self.updateDom(self.init_value);
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

  dirs.ifnot = {
    priority: 700,
    init: function(element, name, scope, env) {
      var self;
      self = alight.directives.al["if"].init.apply(this, arguments);
      self.updateDom = function(value) {
        if (value) {
          return self.removeBlock();
        } else {
          return self.insertBlock();
        }
      };
      return self;
    }
  };

  dirs.show = function(element, exp, scope) {
    var init_value, self;
    init_value = false;
    return self = {
      showDom: function() {
        return f$.show(element);
      },
      hideDom: function() {
        return f$.hide(element);
      },
      updateDom: function(value) {
        if (value) {
          return self.showDom();
        } else {
          return self.hideDom();
        }
      },
      watchModel: function() {
        var w;
        w = scope.$watch(exp, self.updateDom, {
          readOnly: true
        });
        return init_value = w.value;
      },
      initDom: function() {
        return self.updateDom(init_value);
      },
      start: function() {
        self.watchModel();
        return self.initDom();
      }
    };
  };

  dirs.hide = function(element, exp, scope, env) {
    var self;
    self = alight.directives.al.show(element, exp, scope, env);
    self.updateDom = function(value) {
      if (value) {
        return self.hideDom();
      } else {
        return self.showDom();
      }
    };
    return self;
  };

  dirs.app = {
    priority: 2000,
    init: function() {
      return {
        owner: true
      };
    }
  };

  dirs.stop = {
    priority: -10,
    restrict: 'AE',
    init: function() {
      return {
        owner: true
      };
    }
  };

  dirs.init = function(element, exp, scope) {
    var e, fn;
    try {
      fn = scope.$compile(exp, {
        no_return: true,
        noBind: true
      });
      fn(scope);
    } catch (_error) {
      e = _error;
      alight.exceptionHandler(e, 'al-init, error in expression: ' + exp, {
        exp: exp,
        scope: scope,
        element: element
      });
    }
    return scope.$scan({
      late: true
    });
  };

  dirs.include = {
    priority: 100,
    init: function(element, name, scope, env) {
      var activeElement, baseElement, child, initValue, self, topElement;
      child = null;
      baseElement = null;
      topElement = null;
      activeElement = null;
      initValue = null;
      self = {
        owner: true,
        start: function() {
          self.prepare();
          self.watchModel();
          return self.initUpdate();
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
            child.$destroy();
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
          child = scope.$new();
          return alight.applyBindings(child, activeElement, {
            skip_attr: env.skippedAttr()
          });
        },
        updateDom: function(url) {
          if (!url) {
            return self.removeBlock();
          }
          return self.loadHtml({
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
          return f$.remove(element);
        },
        insertDom: function(base, element) {
          return f$.after(base, element);
        },
        watchModel: function() {
          var w;
          w = scope.$watch(name, self.updateDom, {
            readOnly: true
          });
          return initValue = w.value;
        },
        initUpdate: function() {
          return self.updateDom(initValue);
        }
      };
      return self;
    }
  };

  dirs.html = {
    priority: 100,
    init: function(element, name, scope, env) {
      var child, r, setter;
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
        child = scope.$new();
        return alight.applyBindings(child, element, {
          skip_attr: env.skippedAttr()
        });
      };
      r = scope.$watch(name, setter, {
        readOnly: true
      });
      setter(r.value);
      return {
        owner: true
      };
    }
  };

  alight.directives.bo["switch"] = {
    priority: 500,
    init: function(element, name, scope, env) {
      var child;
      child = scope.$new();
      child.$switch = {
        value: scope.$eval(name),
        on: false
      };
      alight.applyBindings(child, element, {
        skip_attr: env.skippedAttr()
      });
      return {
        owner: true
      };
    }
  };

  alight.directives.bo.switchWhen = {
    priority: 500,
    init: function(element, name, scope) {
      if (scope.$switch.value !== name) {
        f$.remove(element);
        return {
          owner: true
        };
      }
      return scope.$switch.on = true;
    }
  };

  alight.directives.bo.switchDefault = {
    priority: 500,
    init: function(element, name, scope) {
      if (scope.$switch.on) {
        f$.remove(element);
        return {
          owner: true
        };
      }
      return null;
    }
  };

  dirs.src = function(element, name, scope) {
    var r, setter;
    setter = function(value) {
      if (!value) {
        value = '';
      }
      f$.attr(element, 'src', value);
      return '$scanNoChanges';
    };
    r = scope.$watchText(name, setter);
    return setter(r.value);
  };

  dirs.enable = function(element, exp, scope) {
    var setter, w;
    setter = function(value) {
      if (value) {
        return f$.removeAttr(element, 'disabled');
      } else {
        return f$.attr(element, 'disabled', 'disabled');
      }
    };
    w = scope.$watch(exp, setter, {
      readOnly: true
    });
    return setter(w.value);
  };

  dirs.disable = function(element, exp, scope) {
    var setter, w;
    setter = function(value) {
      if (value) {
        return f$.attr(element, 'disabled', 'disabled');
      } else {
        return f$.removeAttr(element, 'disabled');
      }
    };
    w = scope.$watch(exp, setter, {
      readOnly: true
    });
    return setter(w.value);
  };

  dirs.readonly = function(element, exp, scope) {
    var setter, w;
    setter = function(value) {
      return f$.prop(element, 'readOnly', !!value);
    };
    w = scope.$watch(exp, setter, {
      readOnly: true
    });
    return setter(w.value);
  };

  ref = ['keydown', 'keypress', 'keyup', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseup', 'focus', 'blur', 'change'];
  fn1 = function(key) {
    return dirs[key] = function(element, exp, scope) {
      var self;
      return self = {
        start: function() {
          self.makeCaller();
          return self.onDom();
        },
        makeCaller: function() {
          return self.caller = scope.$compile(exp, {
            no_return: true,
            noBind: true,
            input: ['$event']
          });
        },
        onDom: function() {
          f$.on(element, key, self.callback);
          return scope.$watch('$destroy', self.offDom);
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
              scope: scope,
              element: element
            });
          }
          return scope.$scan();
        }
      };
    };
  };
  for (j = 0, len = ref.length; j < len; j++) {
    key = ref[j];
    fn1(key);
  }

  dirs.cloak = function(element, name, scope, env) {
    f$.removeAttr(element, env.attrName);
    if (name) {
      return f$.removeClass(element, name);
    }
  };

  dirs.focused = function(element, name, scope) {
    var init_value, safe;
    init_value = false;
    return safe = {
      changing: false,
      updateModel: function(value) {
        if (safe.changing) {
          return;
        }
        safe.changing = true;
        scope.$setValue(name, value);
        return scope.$scan(function() {
          return safe.changing = false;
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
        return scope.$watch('$destroy', function() {
          f$.off(element, 'focus', von);
          return f$.off(element, 'blur', voff);
        });
      },
      updateDom: function(value) {
        if (safe.changing) {
          return;
        }
        safe.changing = true;
        if (value) {
          f$.focus(element);
        } else {
          f$.blur(element);
        }
        return safe.changing = false;
      },
      watchModel: function() {
        var w;
        w = scope.$watch(name, safe.updateDom, {
          readOnly: true
        });
        return init_value = w.value;
      },
      initDom: function() {
        return safe.updateDom(init_value);
      },
      start: function() {
        safe.onDom();
        safe.watchModel();
        return safe.initDom();
      }
    };
  };

  dirs.style = function(element, name, scope) {
    var prev, setter;
    prev = {};
    setter = function(style) {
      var k, ref1, results, v;
      for (key in prev) {
        v = prev[key];
        element.style[key] = '';
      }
      prev = {};
      ref1 = style || {};
      results = [];
      for (k in ref1) {
        v = ref1[k];
        key = k.replace(/(-\w)/g, function(m) {
          return m.substring(1).toUpperCase();
        });
        prev[key] = v;
        results.push(element.style[key] = v || '');
      }
      return results;
    };
    return scope.$watch(name, setter, {
      deep: true,
      init: true
    });
  };

}).call(this);


/*
    al-repeat="item in list" al-controller="itemController"
    "item in list"
    "item in list | filter"
    "item in list | filter track by trackExpression"
    "item in list track by $index"
    "item in list track by $id(item)"
    "item in list track by item.id"
    "item in list | filter store to filteredList"
    "item in list | filter track by trackExpression store to filteredList"
 */

(function() {
  alight.directives.al.repeat = {
    priority: 1000,
    restrict: 'AM',
    init: function(element, exp, scope, env) {
      var self;
      return self = {
        owner: true,
        start: function() {
          self.prepare();
          self.parsExpression();
          self.prepareDom();
          self.buildUpdateDom();
          self.watchModel();
          return self.initUpdateDom();
        },
        prepare: function() {
          var alController, controllerName;
          self.childController = null;
          if (element.nodeType === 8) {
            return;
          }
          controllerName = env.takeAttr('al-controller');
          if (controllerName) {
            alController = alight.directives.al.controller.init(null, controllerName, null);
            return self.childController = alController.callController;
          }
        },
        parsExpression: function() {
          var r, s;
          s = exp;
          r = s.match(/(.*) store to ([\w\.]+)/);
          if (r) {
            self.storeTo = r[2];
            s = r[1];
          }
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
        },
        watchModel: function() {
          return self.watch = scope.$watch(self.expression, self.updateDom, {
            isArray: true
          });
        },
        initUpdateDom: function() {
          return self.updateDom(self.watch.value);
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
        makeChild: function(item, index, list) {
          var child_scope;
          child_scope = scope.$new();
          self.updateChild(child_scope, item, index, list);
          if (self.childController) {
            self.childController(child_scope);
          }
          return child_scope;
        },
        updateChild: function(child_scope, item, index, list) {
          child_scope[self.nameOfKey] = item;
          child_scope.$index = index;
          child_scope.$first = index === 0;
          return child_scope.$last = index === list.length - 1;
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
            var _getId, _id, index, node_by_id, node_del, node_get, node_set, nodes;
            nodes = [];
            index = 0;
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
                if ($id) {
                  delete node_by_id[$id];
                }
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
                _getId = scope.$compile(self.trackExpression, {
                  input: ['$id', self.nameOfKey]
                });
                _id = function(item) {
                  var id;
                  id = item.$alite_id;
                  if (id) {
                    return id;
                  }
                  id = item.$alite_id = alight.utilits.getId();
                  return id;
                };
                node_get = function(item) {
                  var $id;
                  $id = _getId(_id, item);
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
                    $id = alight.utilits.getId();
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
                var applyList, bel, child_scope, dom_inserts, dom_removes, el, elLast, element_list, i, it, item, item_value, j, k, l, last_element, len, len1, len2, len3, len4, len5, len6, len7, m, n, next2, node, nodes2, o, p, pid, prev_moved, prev_node, ref, ref1, ref2, skippedAttrs;
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
                  node.scope.$destroy();
                  ref = node.element_list;
                  for (l = 0, len3 = ref.length; l < len3; l++) {
                    el = ref[l];
                    dom_removes.push(el);
                  }
                }
                applyList = [];
                pid = null;
                child_scope;
                prev_node = null;
                prev_moved = false;
                elLast = self.element_list.length - 1;
                for (index = m = 0, len4 = list.length; m < len4; index = ++m) {
                  item = list[index];
                  item_value = item;
                  item = item || {};
                  node = node_get(item);
                  if (node) {
                    self.updateChild(node.scope, item, index, list);
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
                  child_scope = self.makeChild(item_value, index, list);
                  element_list = (function() {
                    var len7, p, ref3, results;
                    ref3 = self.element_list;
                    results = [];
                    for (p = 0, len7 = ref3.length; p < len7; p++) {
                      bel = ref3[p];
                      el = f$.clone(bel);
                      applyList.push([child_scope, el]);
                      dom_inserts.push({
                        element: el,
                        after: last_element
                      });
                      results.push(last_element = el);
                    }
                    return results;
                  })();
                  node = {
                    scope: child_scope,
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
                  alight.applyBindings(it[0], it[1], {
                    skip_attr: skippedAttrs
                  });
                }
                if (self.storeTo) {
                  scope.$setValue(self.storeTo, list);
                  return;
                }
                if (scope.$system.ob) {
                  return;
                }
                return '$scanNoChanges';
              };
            } else {
              return function(list) {
                var applyList, child_scope, dom_inserts, dom_removes, i, it, item, item_value, j, k, l, last_element, len, len1, len2, len3, next2, node, nodes2, pid, prev_moved, prev_node, skippedAttrs;
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
                    node.scope.$destroy();
                    results.push(node.element);
                  }
                  return results;
                })();
                applyList = [];
                pid = null;
                child_scope;
                prev_node = null;
                prev_moved = false;
                for (index = k = 0, len2 = list.length; k < len2; index = ++k) {
                  item = list[index];
                  item_value = item;
                  item = item || {};
                  node = node_get(item);
                  if (node) {
                    self.updateChild(node.scope, item, index, list);
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
                  child_scope = self.makeChild(item_value, index, list);
                  element = f$.clone(self.base_element);
                  applyList.push([child_scope, element]);
                  dom_inserts.push({
                    element: element,
                    after: last_element
                  });
                  node = {
                    scope: child_scope,
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
                  alight.applyBindings(it[0], it[1], {
                    skip_attr: skippedAttrs
                  });
                }
                if (self.storeTo) {
                  scope.$setValue(self.storeTo, list);
                  return;
                }
                if (scope.$system.ob) {
                  return;
                }
                return '$scanNoChanges';
              };
            }
          })();
        }
      };
    }
  };

  alight.directives.bo.repeat = {
    priority: 1000,
    init: function(element, exp, scope, env) {
      var self;
      self = alight.directives.al.repeat.init(element, exp, scope, env);
      self.start = function() {
        self.prepare();
        self.parsExpression();
        self.prepareDom();
        self.buildUpdateDom();
        self.watch = {
          value: scope.$eval(self.expression)
        };
        return self.initUpdateDom();
      };
      return self;
    }
  };

}).call(this);

(function() {
  var d2, makeDate, makeJson;

  alight.filters.filter = function(exp, scope) {
    var ce;
    ce = scope.$compile(exp);
    return function(value) {
      var a, e, f, k, r, result, v;
      e = ce();
      if (!e) {
        return value;
      }
      if (typeof e === 'string') {
        e = {
          $: e
        };
      } else if (typeof e !== 'object') {
        return value;
      }
      result = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = value.length; i < len; i++) {
          r = value[i];
          if (typeof r === 'object') {
            f = true;
            if (e.$) {
              f = false;
              a = e.$.toLowerCase();
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
            f = true;
            for (k in e) {
              v = e[k];
              a = r[k];
              if (!a) {
                continue;
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
            if (!e.$) {
              continue;
            }
            a = e.$.toLowerCase();
            if (('' + r).toLowerCase().indexOf(a) < 0) {
              continue;
            }
            results.push(r);
          }
        }
        return results;
      })();
      return result;
    };
  };

  alight.filters.slice = function(exp, scope) {
    var argv;
    argv = scope.$compile("[" + exp + "]");
    return function(value) {
      return [].slice.apply(value, argv());
    };
  };

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

  alight.filters.date = function(exp, scope) {
    return function(value) {
      return makeDate(exp, value);
    };
  };

  alight.filters.generator = function(exp, scope) {
    var list;
    list = [];
    return function(size) {
      if (list.length >= size) {
        list.length = size;
      } else {
        while (list.length < size) {
          list.push({});
        }
      }
      return list;
    };
  };

  makeJson = function(value) {
    return JSON.stringify(alight.utilits.clone(value), null, 4);
  };

  alight.filters.json = function() {
    return makeJson;
  };

}).call(this);


/*
    observer = alight.observer.create()
    ob = observer.observe scope
    observer.deliver()
    observer.destroy()
    
    ob = observer.observe scope
    ob.watch key, callback
    ob.unwatch key, callback
    ob.rootEvent = fn
    ob.fire key
    ob.reobserve key
    ob.destroy()
 */

(function() {
  (function() {
    var $cbs, $isArray, $node, $path, $scope, Node, Observer, __ensureTree, cleanTree, ensureObserve, ensureTree, getId, isObjectOrArray, self;
    alight.observer = self = {};
    self._objectObserve = Object.observe;
    self._objectUnobserve = Object.unobserve;
    self._arrayObserve = Array.observe;
    self._arrayUnobserve = Array.unobserve;
    self.support = function() {
      if (typeof WeakMap !== 'function') {
        return false;
      }
      if (typeof Object.observe !== 'function') {
        return false;
      }
      if (typeof Symbol !== 'function') {
        return false;
      }
      return true;
    };
    if (!self.support()) {
      return;
    }
    isObjectOrArray = function(d) {
      if (f$.isObject(d)) {
        return true;
      }
      return f$.isArray(d);
    };
    getId = (function() {
      var i;
      i = 0;
      return function() {
        i++;
        return 'n' + i;
      };
    })();
    $cbs = Symbol('callbacks');
    $scope = Symbol('scope');
    $path = Symbol('path');
    $node = Symbol('node');
    $isArray = Symbol('isArray');
    ensureTree = function(node, key, flag) {
      var j, k, len1, ref, wtree;
      wtree = node.wtree;
      ref = key.split('.');
      for (j = 0, len1 = ref.length; j < len1; j++) {
        k = ref[j];
        wtree = wtree[k];
        if (!wtree) {
          break;
        }
      }
      if (wtree) {
        return __ensureTree(node, wtree, key, flag);
      }
    };
    __ensureTree = function(node, wtree, path, flag) {
      var k, r;
      r = false;
      for (k in wtree) {
        if (node.keywords[k]) {
          continue;
        }
        if (__ensureTree(node, wtree[k], path + "." + k, flag)) {
          r = true;
        }
      }
      if (!r && wtree[$cbs].length) {
        ensureObserve(node, path, flag);
        return true;
      }
      return false;
    };
    cleanTree = function(node, tree, checkingScope) {
      var k, scope, scopeTree, v;
      if (checkingScope && checkingScope !== tree[$scope]) {
        console.error('Observe: fake scope');
      }
      scope = tree[$scope];
      if (f$.isArray(scope)) {
        tree[$isArray] = null;
        self._arrayUnobserve(scope, node.observer.handler);
      } else {
        self._objectUnobserve(scope, node.observer.handler);
      }
      scopeTree = node.observer.treeByScope.get(scope);
      delete scopeTree[node.id];
      tree[$node] = null;
      tree[$scope] = null;
      tree[$path] = null;
      for (k in tree) {
        v = tree[k];
        if (node.keywords[k]) {
          continue;
        }
        if (!f$.isObject(v)) {
          continue;
        }
        cleanTree(node, tree[k]);
      }
      return null;
    };
    ensureObserve = function(node, key, flag) {
      var i, k, kList, len, path, scope, scopeTree, tree, treeByScope;
      scope = node.scope;
      tree = node.tree;
      treeByScope = node.observer.treeByScope;
      kList = key.split('.');
      path = '';
      i = 0;
      len = kList.length;
      while (i < len) {
        k = kList[i++];
        if (len === i) {
          if (!f$.isArray(scope[k])) {
            break;
          }
        } else {
          if (!isObjectOrArray(scope[k])) {
            break;
          }
        }
        if (!tree[k]) {
          tree[k] = {};
        }
        tree = tree[k];
        if (path) {
          path += '.' + k;
        } else {
          path = k;
        }
        scope = scope[k];
        scopeTree = treeByScope.get(scope);
        if (!scopeTree) {
          scopeTree = {};
          treeByScope.set(scope, scopeTree);
        }
        if (scopeTree[node.id]) {
          continue;
        }
        if (tree[$scope]) {
          if (flag === 'add') {
            continue;
          }
          throw 'ERROR: tree has already got scope, why?';
        }
        tree[$node] = node;
        tree[$path] = path;
        tree[$scope] = scope;
        scopeTree[node.id] = tree;
        if (f$.isArray(scope)) {
          tree[$isArray] = true;
          self._arrayObserve(scope, node.observer.handler);
        } else {
          self._objectObserve(scope, node.observer.handler);
        }
      }
      return null;
    };
    Node = function(observer, scope, keywords) {
      var j, k, len1, node, scopeTree, tree;
      if (!f$.isObject(scope)) {
        throw 'Only objects can be observed';
      }
      this.id = getId();
      this.active = true;
      this.observer = observer;
      this.rootEvent = null;
      this.keywords = {};
      if (keywords) {
        for (j = 0, len1 = keywords.length; j < len1; j++) {
          k = keywords[j];
          this.keywords[k] = true;
        }
      }
      this.scope = scope;
      this.wtree = {};
      this.tree = tree = {};
      observer.nodes.push(this);
      node = this;
      scopeTree = observer.treeByScope.get(scope);
      if (!scopeTree) {
        scopeTree = {};
        observer.treeByScope.set(scope, scopeTree);
      }
      if (scopeTree[node.id]) {
        throw 'ERROR: scope has already observed';
      }
      if (tree[$scope]) {
        throw 'ERROR: tree has already got scope, why?';
      }
      tree[$node] = node;
      tree[$path] = '';
      tree[$scope] = scope;
      scopeTree[node.id] = tree;
      self._objectObserve(scope, node.observer.handler);
      return this;
    };
    Node.prototype.watch = function(key, callback) {
      var j, k, len1, ref, t;
      if (!this.active) {
        throw 'Inactive observer';
      }
      t = this.wtree;
      ref = key.split('.');
      for (j = 0, len1 = ref.length; j < len1; j++) {
        k = ref[j];
        if (this.keywords[k]) {
          return;
        }
        if (!t[k]) {
          t[k] = {};
          t[k][$cbs] = [];
        }
        t = t[k];
        t[$cbs].push(callback);
      }
      ensureTree(this, key, 'watch');
      return callback;
    };
    Node.prototype.unwatch = function(key, callback) {
      var c, j, k, len1, ref, t;
      t = this.wtree;
      ref = key.split('.');
      for (j = 0, len1 = ref.length; j < len1; j++) {
        k = ref[j];
        c = t[k];
        if (!c) {
          continue;
        }
        removeItem(c[$cbs], callback);
        t = c;
      }
      return null;
    };
    Node.prototype.reobserve = function(key) {
      if (this.tree[key]) {
        cleanTree(this, this.tree[key]);
      }
      if (isObjectOrArray(this.scope[key])) {
        return ensureTree(this, key);
      }
    };
    Node.prototype.fire = function(key, value) {
      var cb, j, k, l, len1, len2, ref, ref1, t;
      t = this.wtree;
      ref = key.split('.');
      for (j = 0, len1 = ref.length; j < len1; j++) {
        k = ref[j];
        t = t[k] || {};
      }
      if (t[$cbs]) {
        ref1 = t[$cbs];
        for (l = 0, len2 = ref1.length; l < len2; l++) {
          cb = ref1[l];
          cb(value);
        }
      }
      return null;
    };
    Node.prototype.destroy = function() {
      if (!this.active) {
        throw 'Inactive observer';
      }
      this.active = false;
      cleanTree(this, this.tree);
      return removeItem(this.observer.nodes, this);
    };
    Observer = function() {
      var observer;
      observer = this;
      this.nodes = [];
      this.treeByScope = new WeakMap();
      this.handler = function(changes) {
        var _, ch, j, key, keyPath, len1, node, scope, scopeTree, tree, value;
        for (j = 0, len1 = changes.length; j < len1; j++) {
          ch = changes[j];
          scope = ch.object;
          scopeTree = observer.treeByScope.get(scope);
          if (!scopeTree) {
            console.warn('Why we are here?');
            continue;
          }
          for (_ in scopeTree) {
            tree = scopeTree[_];
            node = tree[$node];
            if (tree[$isArray]) {
              node.fire(tree[$path], null);
            } else {
              key = ch.name;
              if (node.keywords[key]) {
                continue;
              }
              value = scope[key];
              if (tree[$path]) {
                keyPath = tree[$path] + "." + key;
              } else {
                keyPath = key;
              }
              if (ch.type === 'add') {
                if (isObjectOrArray(value)) {
                  ensureTree(node, keyPath, 'add');
                }
                node.fire(keyPath, value);
              } else if (ch.type === 'update') {
                if (tree[key] && isObjectOrArray(ch.oldValue)) {
                  cleanTree(node, tree[key], ch.oldValue);
                }
                if (isObjectOrArray(value)) {
                  ensureTree(node, keyPath);
                }
                node.fire(keyPath, value);
              } else if (ch.type === 'delete') {
                if (isObjectOrArray(ch.oldValue)) {
                  cleanTree(node, tree[key], ch.oldValue);
                }
                node.fire(keyPath, null);
              }
              if (tree === node.tree && node.rootEvent) {
                node.rootEvent(keyPath, value);
              }
            }
          }
        }
        return null;
      };
      return this;
    };
    Observer.prototype.observe = function(root, options) {
      var n;
      options = options || {};
      n = new Node(this, root, options.keywords);
      return n;
    };
    Observer.prototype.deliver = function() {
      return Object.deliverChangeRecords(this.handler);
    };
    Observer.prototype.destroy = function() {
      var j, len1, n, ref;
      ref = this.nodes.slice();
      for (j = 0, len1 = ref.length; j < len1; j++) {
        n = ref[j];
        n.destroy();
      }
      return null;
    };
    return self.create = function() {
      return new Observer();
    };
  })();

}).call(this);

	/* prev prefix.js */
		return alight;
	}; // finish of buildAlight

	// requrejs/commonjs
	if(typeof(define) === 'function') {
		define(function() {
			var alight = buildAlight();
			alight.makeInstance = buildAlight;
			return alight;
		});
	} else if(typeof(module) === 'object' && typeof(module.exports) === 'object') {
		var alight = buildAlight();
		alight.makeInstance = buildAlight;
		module.exports = alight;
	} else if(typeof(alightInitCallback) === 'function') {
		alightInitCallback(buildAlight)
	} else {
		var alight = buildAlight({
			globalControllers: true
		})

		window.alight = alight;
		window.f$ = alight.f$;
		f$.ready(alight.bootstrap);
	};
})();
