(function() {
	function buildAlight(alightConfig) {
		alightConfig = alightConfig || {};
		var enableGlobalControllers = alightConfig.globalControllers;
		var alight = {};
		var f$ = {};
		alight.f$ = f$;
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
            $(callback);
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
                type: args.type || 'GET'
            }).then(args.success || empty, args.error || empty)
        }
    } else {
        var rawAjax = function(args) {
            var request = new XMLHttpRequest();
            request.open(args.type || 'GET', args.url, true);
            request.send();

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
        };
    };

    f$.ajaxCache = {};
    f$.ajax = function(args) {
        if(!args.cache) return rawAjax(args);

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
                d.result = result;
                for(var i=0;i<d.callback.length;i++)
                    if(d.callback[i].success) d.callback[i].success(result)
                d.callback.length = 0;
            },
            error: function() {
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
    }


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
// Generated by CoffeeScript 1.7.1
(function() {
  var Scope, attrBinding, bindComment, directivePreprocessor, get_time, nodeTypeBind, notEqual, process, scan_core, scan_core2, sortByPriority, testDirective, textBinding;

  alight.version = '0.8.4';

  alight.debug = {
    useObserver: false,
    observer: 0,
    scan: 0,
    directive: false,
    watch: false,
    watchText: false,
    parser: false
  };

  alight.scopes = [];

  alight.controllers = {};

  alight.filters = {};

  alight.utilits = {};

  alight.directives = {
    al: {},
    bo: {},
    ctrl: {}
  };

  alight.text = {};

  alight.apps = {};

  alight.directivePreprocessor = directivePreprocessor = function(ns, name, args) {
    var dir, k, raw, v;
    name = name.replace(/(-\w)/g, function(m) {
      return m.substring(1).toUpperCase();
    });
    if (args.scope.$ns) {
      raw = args.scope.$ns.directives[ns][name];
    } else {
      raw = alight.directives[ns][name];
    }
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
        var dp, i, l, _i, _len;
        l = dscope.procLine;
        for (i = _i = 0, _len = l.length; _i < _len; i = ++_i) {
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
        procLine: directivePreprocessor.ext,
        makeDeferred: function() {
          dscope.isDeferred = true;
          dscope.result.owner = true;
          dscope.directive.scope = true;
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
    directivePreprocessor.ext = ext = [];
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
      fn: function(element, expression, scope, env) {
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
      var directive, j, name, ns, path, scope;
      if (args.skip_attr.indexOf(attrName) >= 0) {
        return addAttr(attrName, args, {
          skip: true
        });
      }
      j = attrName.indexOf('-');
      if (j < 0) {
        return addAttr(attrName, args);
      }
      ns = attrName.substring(0, j);
      name = attrName.substring(j + 1);
      scope = args.scope;
      if (scope.$ns) {
        path = (scope.$ns.directives || {})[ns];
      } else {
        path = alight.directives[ns];
      }
      if (!path) {
        return addAttr(attrName, args);
      }
      directive = alight.directivePreprocessor(ns, name, args);
      if (directive.noDirective) {
        return addAttr(attrName, args, {
          noDirective: true
        });
      }
      return args.list.push({
        name: name,
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
      return f$.attr(element, attrName, result);
    };
    w = scope.$watchText(text, setter, {
      readOnly: true
    });
    return setter(w.value);
  };

  textBinding = function(scope, node) {
    var setter, text, w;
    text = node.data;
    if (text.indexOf(alight.utilits.pars_start_tag) < 0) {
      return;
    }
    setter = function(result) {
      return node.nodeValue = result;
    };
    w = scope.$watchText(text, setter, {
      readOnly: true
    });
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

  process = (function() {
    var skippedAttr, takeAttr;
    takeAttr = function(name, skip) {
      var attr, value, _i, _len, _ref;
      if (arguments.length === 1) {
        skip = true;
      }
      _ref = this.attributes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        attr = _ref[_i];
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
      var attr, _i, _len, _ref, _results;
      _ref = this.attributes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        attr = _ref[_i];
        if (!attr.skip) {
          continue;
        }
        _results.push(attr.attrName);
      }
      return _results;
    };
    return function(scope, element, config) {
      var args, attrName, attr_value, attrs, d, directive, e, env, fn, list, node, result, skip_attr, skip_children, value, _i, _j, _len, _len1, _ref;
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
        for (_i = 0, _len = list.length; _i < _len; _i++) {
          d = list[_i];
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
        _ref = f$.childNodes(element);
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          node = _ref[_j];
          if (!node) {
            continue;
          }
          fn = nodeTypeBind[node.nodeType];
          if (fn) {
            fn(scope, node);
          }
        }
      }
      return null;
    };
  })();

  nodeTypeBind = {
    1: process,
    3: textBinding,
    8: bindComment
  };

  Scope = function(conf) {
    
    if(this instanceof Scope) return this;

    conf = conf || {};
    var scope;
    if(conf.prototype) {
        var Parent = function() {};
        Parent.prototype = conf.prototype;
        var parent = new Parent();
        var proto = Scope.prototype;
        for(var k in proto)
            if(proto.hasOwnProperty(k)) parent[k] = proto[k];

        var NScope = function() {};
        NScope.prototype = parent;
        scope = new NScope();
    } else scope = new Scope();
    ;
    scope.$system = {
      watches: {},
      watchList: [],
      watch_any: [],
      root: scope,
      children: [],
      scan_callbacks: [],
      destroy_callbacks: [],
      finishBinding_callbacks: [],
      finishBinding_lock: false
    };
    if (typeof conf.useObserver === 'boolean') {
      scope.$system.useObserver = conf.useObserver;
    } else {
      scope.$system.useObserver = alight.debug.useObserver;
    }
    if (scope.$system.useObserver) {
      scope.$system.useObserver = !!Object.observe;
    }
    if (scope.$system.useObserver) {
      scope.$system.obList = [];
      scope.$system.obFire = [];
      scope.$system.ob = alight.observer.observe(scope, {
        rootEvent: function(key, value) {
          var child, _i, _len, _ref;
          if (alight.debug.observer) {
            console.warn('Reobserve', key);
          }
          _ref = scope.$system.children;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            child = _ref[_i];
            child.$$rebuildObserve(key, value);
          }
          return null;
        }
      });
    }
    return scope;
  };

  alight.Scope = Scope;

  Scope.prototype.$$rebuildObserve = function(key, value) {
    var child, scope, _i, _len, _ref;
    scope = this;
    alight.observer.reobserve(scope.$system.ob, key);
    _ref = scope.$system.children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      child.$$rebuildObserve(key, value);
    }
    return alight.observer.fire(scope.$system.ob, key, value);
  };

  Scope.prototype.$new = function(isolate) {
    var child, scope;
    scope = this;
    if (isolate) {
      child = alight.Scope();
    } else {
      if (!scope.$system.ChildScope) {
        scope.$system.ChildScope = function() {
          var cscope;
          this.$system = {
            watches: {},
            watchList: [],
            watch_any: [],
            root: scope.$system.root,
            children: [],
            destroy_callbacks: []
          };
          this.$parent = null;
          if (scope.$system.root.$system.useObserver) {
            cscope = this;
            this.$system.obList = [];
            this.$system.obFire = [];
            this.$system.ob = alight.observer.observe(this, {
              rootEvent: function(key, value) {
                var i, _i, _len, _ref;
                if (alight.debug.observer) {
                  console.warn('Reobserve', key);
                }
                _ref = cscope.$system.children;
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  i = _ref[_i];
                  i.$$rebuildObserve(key, value);
                }
                return null;
              }
            });
          }
          return this;
        };
        scope.$system.ChildScope.prototype = scope;
      }
      child = new scope.$system.ChildScope();
    }
    child.$parent = scope;
    scope.$system.children.push(child);
    return child;
  };


  /*
  $watch
      name:
          expression or function
          $any
          $destroy
          $finishBinding
      callback:
          function
      option:
          isArray (is_array)
          readOnly
          init
          deep
   */

  Scope.prototype.$watch = function(name, callback, option) {
    var ce, d, exp, isFunction, isObserved, key, ob, r, realCallback, returnValue, scope, value, variable, _i, _len, _ref;
    scope = this;
    if (option === true) {
      option = {
        isArray: true
      };
    } else if (!option) {
      option = {};
    }
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
      key = name;
      if (key === '$any') {
        return scope.$system.watch_any.push(callback);
      }
      if (key === '$destroy') {
        return scope.$system.destroy_callbacks.push(callback);
      }
      if (key === '$finishBinding') {
        return scope.$system.root.$system.finishBinding_callbacks.push(callback);
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
    d = scope.$system.watches[key];
    if (d) {
      if (!option.readOnly) {
        d.extraLoop = true;
      }
      returnValue = d.value;
    } else {
      if (!isFunction) {
        ce = scope.$compile(name, {
          noBind: true,
          full: true
        });
        exp = ce.fn;
      }
      returnValue = value = exp(scope);
      if (option.deep) {
        value = alight.utilits.clone(value);
        option.isArray = false;
      }
      scope.$system.watches[key] = d = {
        isArray: Boolean(option.isArray),
        extraLoop: !option.readOnly,
        deep: option.deep,
        value: value,
        callbacks: [],
        exp: exp,
        src: '' + name
      };
      isObserved = false;
      if (scope.$system.root.$system.useObserver) {
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
              _ref = ce.simpleVariables;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                variable = _ref[_i];
                ob = alight.observer.watch(this.$system.ob, variable, function() {
                  if (scope.$system.obFire[key]) {
                    return;
                  }
                  scope.$system.obFire[key] = true;
                  return scope.$system.obList.push(d);
                });
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
        scope.$system.watchList.push(d);
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
      var i;
      i = d.callbacks.indexOf(callback);
      if (i >= 0) {
        d.callbacks.splice(i, 1);
        if (d.callbacks.length !== 0) {
          return;
        }
        delete scope.$system.watches[key];
        i = scope.$system.watchList.indexOf(d);
        if (i >= 0) {
          return scope.$system.watchList.splice(i, 1);
        }
      }
    };
    if (option.init) {
      callback(r.value);
    }
    return r;
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

  (function() {
    return Scope.prototype.$compile = function(src_exp, cfg) {
      var cr, f1, filters, func, hash, resp, scope;
      cfg = cfg || {};
      scope = this;
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
          func = function() { var __ = f1.apply(this, arguments); return '' + (__ || (__ == null?'':__)) };
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
            var a, e, i, _i, _len;
            try {
              a = [scope];
              for (_i = 0, _len = arguments.length; _i < _len; _i++) {
                i = arguments[_i];
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
  })();

  Scope.prototype.$eval = function(exp) {
    return this.$compile(exp, {
      noBind: true
    })(this);
  };

  Scope.prototype.$getValue = function(name) {
    var dict, key, _i, _len, _ref;
    dict = this;
    _ref = name.split('.');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      dict = (dict || {})[key];
    }
    return dict;
  };

  Scope.prototype.$setValue = function(name, value) {
    var child, d, dict, i, key, _i, _ref;
    dict = this;
    d = name.split('.');
    for (i = _i = 0, _ref = d.length - 2; _i <= _ref; i = _i += 1) {
      key = d[i];
      child = dict[key];
      if (child === void 0) {
        dict[key] = child = {};
      }
      dict = child;
    }
    key = d[d.length - 1];
    return dict[key] = value;
  };

  Scope.prototype.$destroy = function() {
    var cb, i, it, scope, _i, _j, _len, _len1, _ref, _ref1;
    scope = this;
    _ref = scope.$system.destroy_callbacks;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      cb = _ref[_i];
      cb(scope);
    }
    scope.$system.destroy_callbacks = [];
    if (scope.$system.root.$system.useObserver) {
      alight.observer.unobserve(scope.$system.ob);
    }
    _ref1 = scope.$system.children.slice();
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      it = _ref1[_j];
      it.$destroy();
    }
    if (scope.$parent) {
      i = scope.$parent.$system.children.indexOf(scope);
      scope.$parent.$system.children.splice(i, 1);
    }
    scope.$parent = null;
    scope.$system.watches = {};
    scope.$system.watchList = [];
    return scope.$system.watch_any.length = 0;
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
    var i, ta, tb, v, _i, _len;
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
      for (i = _i = 0, _len = a.length; _i < _len; i = ++_i) {
        v = a[i];
        if (v !== b[i]) {
          return true;
        }
      }
    }
    return false;
  };

  scan_core = function(top, result) {
    var a0, a1, anyList, callback, changes, extraLoop, index, last, line, mutated, queue, scope, sys, total, value, w, _i, _j, _len, _len1, _ref, _ref1;
    extraLoop = false;
    changes = 0;
    total = 0;
    anyList = [];
    line = [];
    queue = [top];
    while (queue) {
      scope = queue[0];
      index = 1;
      while (scope) {
        sys = scope.$system;
        total += sys.watchList.length;
        _ref = sys.watchList;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          w = _ref[_i];
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
              if (w.extraLoop) {
                extraLoop = true;
              }
              _ref1 = w.callbacks.slice();
              for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                callback = _ref1[_j];
                callback.call(scope, value);
              }
            }
            if (alight.debug.scan > 1) {
              console.log('changed:', w.src);
            }
          }
        }
        if (sys.children.length) {
          line.push(sys.children);
        }
        if (sys.watch_any.length) {
          anyList.push.apply(anyList, sys.watch_any);
        }
        scope = queue[index++];
      }
      queue = line.shift();
    }
    result.total = total;
    result.obTotal = 0;
    result.changes = changes;
    result.extraLoop = extraLoop;
    return result.anyList = anyList;
  };

  scan_core2 = function(top, result) {
    var a0, a1, anyList, callback, changes, extraLoop, index, last, line, mutated, obTotal, queue, scope, sys, total, value, w, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3;
    extraLoop = false;
    changes = 0;
    total = 0;
    obTotal = 0;
    anyList = [];
    line = [];
    queue = [top];
    while (queue) {
      scope = queue[0];
      index = 1;
      while (scope) {
        sys = scope.$system;
        alight.observer.deliver(sys.ob);
        _ref = sys.obList;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          w = _ref[_i];
          result.src = w.src;
          last = w.value;
          value = w.exp(scope);
          if (last !== value) {
            if (!w.isArray) {
              w.value = value;
            }
            changes++;
            if (w.extraLoop) {
              extraLoop = true;
            }
            _ref1 = w.callbacks.slice();
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              callback = _ref1[_j];
              callback.call(scope, value);
            }
          }
        }
        obTotal += sys.obList.length;
        sys.obList.length = 0;
        sys.obFire = {};
        total += sys.watchList.length;
        _ref2 = sys.watchList;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          w = _ref2[_k];
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
              if (w.extraLoop) {
                extraLoop = true;
              }
              _ref3 = w.callbacks.slice();
              for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
                callback = _ref3[_l];
                callback.call(scope, value);
              }
            }
            if (alight.debug.scan > 1) {
              console.log('changed:', w.src);
            }
          }
        }
        if (sys.children.length) {
          line.push(sys.children);
        }
        if (sys.watch_any.length) {
          anyList.push.apply(anyList, sys.watch_any);
        }
        scope = queue[index++];
      }
      queue = line.shift();
    }
    result.total = total;
    result.obTotal = obTotal;
    result.changes = changes;
    result.extraLoop = extraLoop;
    return result.anyList = anyList;
  };

  Scope.prototype.$scanAsync = function(callback) {
    return this.$scan({
      late: true,
      callback: callback
    });
  };

  Scope.prototype.$scan = function(cfg) {
    var callback, cb, duration, e, mainLoop, result, root, scan_callbacks, start, top, _i, _j, _len, _len1, _ref;
    cfg = cfg || {};
    if (f$.isFunction(cfg)) {
      cfg = {
        callback: cfg
      };
    }
    root = this.$system.root;
    top = cfg.top || root;
    if (cfg.callback) {
      root.$system.scan_callbacks.push(cfg.callback);
    }
    if (cfg.late) {
      if (top !== root) {
        throw 'conflict: late and top';
      }
      if (root.$system.lateScan) {
        return;
      }
      root.$system.lateScan = true;
      alight.nextTick(function() {
        if (root.$system.lateScan) {
          return root.$scan();
        }
      });
      return;
    }
    if (root.$system.status === 'scaning') {
      root.$system.extraLoop = true;
      return;
    }
    root.$system.lateScan = false;
    root.$system.status = 'scaning';
    scan_callbacks = root.$system.scan_callbacks.slice();
    root.$system.scan_callbacks.length = 0;
    if (alight.debug.scan) {
      start = get_time();
    }
    mainLoop = 10;
    try {
      while (mainLoop) {
        mainLoop--;
        root.$system.extraLoop = false;
        result = {};
        if (root.$system.useObserver) {
          scan_core2(top, result);
        } else {
          scan_core(top, result);
        }
        if (result.changes) {
          _ref = result.anyList;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            cb = _ref[_i];
            cb();
          }
        }
        if (!result.extraLoop && !root.$system.extraLoop) {
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
      root.$system.status = null;
      for (_j = 0, _len1 = scan_callbacks.length; _j < _len1; _j++) {
        callback = scan_callbacks[_j];
        callback.call(root);
      }
    }
    if (mainLoop === 0) {
      throw 'Infinity loop detected';
    }
  };


  /*
      $compileText = (text, cfg)
      cfg:
          result_on_static
          onStatic
          fullResponse
   */

  (function() {
    var isStatic;
    isStatic = function(data) {
      var i, _i, _len;
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        i = data[_i];
        if (i.type === 'expression' && !i["static"]) {
          return false;
        }
      }
      return true;
    };
    return Scope.prototype.$compileText = function(text, cfg) {
      var ce, d, data, exp, fn, response, scope, simple, sitem, watch_count, _i, _len;
      scope = this;
      cfg = cfg || {};
      sitem = alight.utilits.compile.buildSimpleText(text, null);
      if (sitem) {
        if (cfg.fullResponse) {
          response = {
            type: 'fn',
            fn: sitem.fn,
            isSimple: sitem.isSimple,
            simpleVariables: sitem.simpleVariables
          };
        } else {
          response = sitem.fn;
        }
        return response;
      }
      if (text.indexOf(alight.utilits.pars_start_tag) < 0) {
        if (cfg.result_on_static) {
          if (cfg.fullResponse) {
            response = {
              type: 'text',
              text: text
            };
          } else {
            response = text;
          }
        } else {
          if (cfg.fullResponse) {
            response = {
              type: 'fn',
              isStatic: true,
              fn: function() {
                return text;
              }
            };
          } else {
            response = function() {
              return text;
            };
          }
        }
        return response;
      }
      data = alight.utilits.parsText(text);
      data.scope = scope;
      watch_count = 0;
      simple = true;
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        d = data[_i];
        if (d.type === 'expression') {
          if (d.list[0][0] === '=') {
            d.list[0] = '#bindonce ' + d.list[0].slice(1);
          }
          exp = d.list.join(' | ');
          if (exp[0] === '#') {
            simple = false;
            (function(d) {
              var async, env;
              async = false;
              env = {
                data: d,
                setter: function(value) {
                  return d.value = value;
                },
                "finally": function(value) {
                  if (arguments.length === 1) {
                    env.setter(value);
                  }
                  d["static"] = true;
                  if (async && cfg.onStatic && isStatic(data)) {
                    return cfg.onStatic();
                  }
                }
              };
              alight.text.$base(scope, d, env);
              return async = true;
            })(d);
            if (!d["static"]) {
              watch_count++;
            }
          } else {
            ce = scope.$compile(exp, {
              stringOrOneTime: true,
              full: true,
              rawExpression: true,
              noBind: true
            });
            if (ce.oneTime) {
              simple = false;
              (function(d, ce) {
                return d.fn = function() {
                  var v;
                  v = ce.fn(scope);
                  if (v === void 0) {
                    return '';
                  }
                  if (v === null) {
                    v = '';
                  }
                  d.fn = function() {
                    return v;
                  };
                  d["static"] = true;
                  if (cfg.onStatic && isStatic(data)) {
                    cfg.onStatic();
                  }
                  return v;
                };
              })(d, ce);
            } else {
              d.fn = ce.fn;
              if (ce.rawExpression) {
                d.re = ce.rawExpression;
                if (ce.isSimple) {
                  d.isSimple = true;
                  d.simpleVariables = ce.simpleVariables;
                }
              } else {
                simple = false;
              }
            }
            watch_count++;
          }
        }
      }
      if (watch_count) {
        if (simple) {
          sitem = alight.utilits.compile.buildSimpleText(text, data);
          if (cfg.fullResponse) {
            response = {
              type: 'fn',
              fn: sitem.fn,
              isSimple: sitem.isSimple,
              simpleVariables: sitem.simpleVariables
            };
          } else {
            response = sitem.fn;
          }
        } else {
          response = alight.utilits.compile.buildText(text, data);
          if (cfg.fullResponse) {
            response = {
              type: 'fn',
              fn: response
            };
          }
        }
        return response;
      } else {
        fn = alight.utilits.compile.buildText(text, data);
        text = fn();
        if (cfg.result_on_static) {
          if (cfg.fullResponse) {
            response = {
              type: 'text',
              text: text
            };
          } else {
            response = text;
          }
        } else {
          response = function() {
            return text;
          };
          if (cfg.fullResponse) {
            response = {
              type: 'fn',
              isStatic: true,
              fn: response
            };
          }
        }
        return response;
      }
    };
  })();

  Scope.prototype.$evalText = function(exp) {
    return this.$compileText(exp)(this);
  };


  /*
      Scope.$watchText(name, callback, config)
      config.readOnly
      config.onStatic
   */

  Scope.prototype.$watchText = function(name, callback, config) {
    var ct, d, ob, r, scope, variable, w, _i, _len, _ref;
    scope = this;
    config = config || {};
    if (alight.debug.watchText) {
      console.log('$watchText', name);
    }
    w = scope.$system.watches;
    d = w[name];
    if (d) {
      if (!config.readOnly) {
        d.extraLoop = true;
      }
    } else {
      d = {
        extraLoop: !config.readOnly,
        isArray: false,
        callbacks: [],
        onStatic: [],
        src: name
      };
      ct = scope.$compileText(name, {
        fullResponse: true,
        result_on_static: true,
        onStatic: function() {
          var cb, value, _i, _len, _ref;
          value = ct.fn.call(scope);
          d.exp = function() {
            return value;
          };
          scope.$scanAsync(function() {
            var i;
            d.callbacks.length = 0;
            delete w[name];
            i = scope.$system.watchList.indexOf(d);
            if (i >= 0) {
              return scope.$system.watchList.splice(i, 1);
            }
          });
          _ref = d.onStatic;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            cb = _ref[_i];
            cb(value);
          }
          return null;
        }
      });
      if (ct.type === 'text') {
        return {
          value: ct.text
        };
      }
      d.exp = ct.fn;
      d.value = ct.fn(scope);
      w[name] = d;
      if (ct.isSimple && scope.$system.root.$system.useObserver) {
        d.isObserved = true;
        _ref = ct.simpleVariables;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          variable = _ref[_i];
          ob = alight.observer.watch(scope.$system.ob, variable, function() {
            if (scope.$system.obFire[name]) {
              return;
            }
            scope.$system.obFire[name] = true;
            return scope.$system.obList.push(d);
          });
        }
      } else {
        scope.$system.watchList.push(d);
      }
    }
    if (config.onStatic) {
      d.onStatic.push(config.onStatic);
    }
    d.callbacks.push(callback);
    r = {
      $: d,
      value: d.value,
      exp: d.exp,
      stop: function() {
        var i;
        i = d.callbacks.indexOf(callback);
        if (i >= 0) {
          d.callbacks.splice(i, 1);
          if (d.callbacks.length !== 0) {
            return;
          }
          delete w[name];
          i = scope.$system.watchList.indexOf(d);
          if (i >= 0) {
            return scope.$system.watchList.splice(i, 1);
          }
        }
      }
    };
    return r;
  };

  alight.nextTick = (function() {
    var exec, list, timer;
    timer = null;
    list = [];
    exec = function() {
      var callback, dlist, e, it, self, _i, _len;
      timer = null;
      dlist = list.slice();
      list.length = 0;
      for (_i = 0, _len = dlist.length; _i < _len; _i++) {
        it = dlist[_i];
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
    if (scope.$ns) {
      ctrl = (scope.$ns.controllers || {})[name];
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
    if (scope.$ns) {
      filter = (scope.$ns.filters || {})[name];
    } else {
      filter = alight.filters[name];
    }
    if (!filter) {
      throw 'Filter not found: ' + name;
    }
    return filter;
  };

  alight.text.$base = function(scope, data, env) {
    var dir, dir_name, exp, filter, i;
    exp = data.list[0];
    i = exp.indexOf(' ');
    if (i < 0) {
      dir_name = exp.slice(1);
      exp = '';
    } else {
      dir_name = exp.slice(1, i);
      exp = exp.slice(i);
    }
    dir = alight.text[dir_name];
    if (!dir) {
      throw 'No directive alight.text.' + dir_name;
    }
    if (data.list.length > 1) {
      filter = alight.utilits.filterBuilder(scope, null, data.list.slice(1));
      env.setter = function(result) {
        return data.value = filter(result);
      };
    }
    return dir(env.setter, exp, scope, env);
  };

  alight.applyBindings = function(scope, element, config) {
    var cb, finishBinding, lst, _i, _len;
    if (!element) {
      throw 'No element';
    }
    if (!scope) {
      scope = new alight.Scope();
    }
    finishBinding = !scope.$system.root.$system.finishBinding_lock;
    if (finishBinding) {
      scope.$system.root.$system.finishBinding_lock = true;
    }
    config = config || {};
    process(scope, element, config);
    if (finishBinding) {
      scope.$system.root.$system.finishBinding_lock = false;
      lst = scope.$system.root.$system.finishBinding_callbacks.slice();
      scope.$system.root.$system.finishBinding_callbacks.length = 0;
      for (_i = 0, _len = lst.length; _i < _len; _i++) {
        cb = lst[_i];
        cb();
      }
    }
    return null;
  };

  alight.bootstrap = function(input) {
    var attr, ctrl, ctrlName, el, element, scope, t, tag, _i, _j, _len, _len1, _ref;
    if (!input) {
      input = f$.find(document, '[al-app]');
    }
    if (input instanceof HTMLElement) {
      input = [input];
    }
    if (f$.isArray(input) || typeof input.length === 'number') {
      for (_i = 0, _len = input.length; _i < _len; _i++) {
        element = input[_i];
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
        _ref = f$.find(document.body, input.$el);
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          el = _ref[_j];
          alight.applyBindings(scope, el);
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
// Generated by CoffeeScript 1.7.1
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
    var d, f, fbase, filter, fname, param, _i, _len;
    if (!line || !line.length) {
      return func;
    }
    for (_i = 0, _len = line.length; _i < _len; _i++) {
      f = line[_i];
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
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = d.length; _i < _len; _i++) {
            i = d[_i];
            _results.push(clone(i));
          }
          return _results;
        })();
        return r;
      }
      if (d instanceof Date) {
        return new Date(d);
      }
      if (d.nodeType && typeof d.cloneNode === "function") {
        return d;
      }
      r = {};
      for (k in d) {
        v = d[k];
        if (k === '$alite_id') {
          continue;
        }
        if (k === '$$observer') {
          continue;
        }
        r[k] = clone(v);
      }
      return r;
    }
    return d;
  };

  alight.utilits.equal = equal = function(a, b) {
    var i, k, set, ta, tb, v, _i, _len;
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
        for (i = _i = 0, _len = a.length; _i < _len; i = ++_i) {
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

  alight.exceptionHandler = function(e, title, locals) {
    var err;
    console.warn(title, locals);
    err = typeof e === 'string' ? e : e.stack;
    return console.error(err);
  };

}).call(this);
// Generated by CoffeeScript 1.7.1
(function() {
  var rawParsText, reserved;

  reserved = ['instanceof', 'typeof', 'in', 'null', 'true', 'false', 'undefined', 'function', 'return'];

  alight.utilits.parsExpression = function(line, cfg) {
    var assignment, conv, d, exp, i, index, input, isSimple, is_function, l, n, newName, pars, prev, result, simpleVariables, variable, variable_assignment, variable_fn, variable_names, variables, _i, _j, _k, _len, _len1, _ref, _ref1;
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
          if (a.match(/[\d\w_\.\$]/)) {
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
      for (i = _i = variables.length - 1; _i >= 0; i = _i += -1) {
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
              _ref = d.slice(1, +(d.length - 3) + 1 || 9e9);
              for (_j = 0, _len = _ref.length; _j < _len; _j++) {
                i = _ref[_j];
                l.push("($$=$$." + i + ",$$==null)?undefined:");
              }
              l.push("$$." + d[d.length - 2]);
              newName = '(' + l.join('') + ').' + d[d.length - 1];
            } else {
              _ref1 = d.slice(1, +(d.length - 2) + 1 || 9e9);
              for (_k = 0, _len1 = _ref1.length; _k < _len1; _k++) {
                i = _ref1[_k];
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
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = result.length; _i < _len; _i++) {
          i = result[_i];
          k = {
            type: i.type,
            value: i.value
          };
          if (i.list) {
            k.list = i.list.slice();
          }
          _results.push(k);
        }
        return _results;
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
// Generated by CoffeeScript 1.7.1

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
    var args, e, exp, ff, ffResult, filters, fn, funcCache, hash, i, no_return, result, _i, _len, _ref;
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
      _ref = ffResult.simpleVariables;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
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
    var d, fn, index, result, _i, _len;
    fn = self.cacheText[text];
    if (fn) {
      return function() {
        return fn.call(data);
      };
    }
    result = [];
    for (index = _i = 0, _len = data.length; _i < _len; index = ++_i) {
      d = data[index];
      if (d.type === 'expression') {
        if (d.fn) {
          result.push("this[" + index + "].fn(this.scope)");
        } else {
          result.push("((x=this[" + index + "].value) || (x == null?'':x))");
        }
      } else if (d.value) {
        result.push('"' + d.value.replace(/\\/g,'\\\\').replace(/"/g,'\\"').replace(/\n/g,'\\n') + '"');
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
    var d, fn, index, isSimple, item, result, simpleVariables, _i, _len;
    item = self.cacheSimpleText[text];
    if (item || !data) {
      return item || null;
    }
    result = [];
    isSimple = true;
    simpleVariables = [];
    for (index = _i = 0, _len = data.length; _i < _len; index = ++_i) {
      d = data[index];
      if (d.type === 'expression') {
        result.push("(" + d.re + ")");
        if (d.isSimple) {
          simpleVariables.push.apply(simpleVariables, d.simpleVariables);
        } else {
          isSimple = false;
        }
      } else if (d.value) {
        result.push('"' + d.value.replace(/\\/g,'\\\\').replace(/"/g,'\\"').replace(/\n/g,'\\n') + '"');
      }
    }
    result = result.join(' + ');
    fn = self.Function('$$scope', "var $$, __; return (" + result + ")");
    item = {
      fn: fn
    };
    if (isSimple) {
      item.isSimple = true;
      item.simpleVariables = simpleVariables;
    }
    self.cacheSimpleText[text] = item;
    return item;
  };

}).call(this);
// Generated by CoffeeScript 1.7.1
(function() {
  var click_maker, dirs, key, make_boif, _fn, _i, _len, _ref;

  alight.text.bindonce = function(callback, expression, scope, env) {
    return env["finally"](scope.$eval(expression));
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
        return f$.on(element, 'change', self.updateModel);
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
        if (!(value === void 0 || value === null)) {
          return f$.val(element, value);
        }
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
            return f$.on(element, event, self.doCallback);
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
        return f$.on(element, 'submit', self.doCallback);
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
      var ctrl, new_scope;
      new_scope = scope.$new();
      if (name) {
        ctrl = alight.getController(name, new_scope);
        ctrl(new_scope);
      }
      alight.applyBindings(new_scope, element, {
        skip_attr: env.skippedAttr()
      });
      return {
        owner: true
      };
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
          return f$.on(element, 'change', self.updateModel);
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
          return f$.on(element, 'change', self.updateModel);
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

  dirs.css = {
    priority: 30,
    init: function(element, exp, scope) {
      var self;
      return self = {
        start: function() {
          self.parsLine();
          return self.prepare();
        },
        parsLine: function() {
          var e, i, list, _i, _len, _ref;
          self.list = list = [];
          _ref = exp.split(',');
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            e = _ref[_i];
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
          var color, item, result, _i, _len, _ref;
          _ref = self.list;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            item = _ref[_i];
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
          var c, _i, _j, _len, _len1, _ref, _ref1, _results, _results1;
          if (value) {
            _ref = item.css;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              c = _ref[_i];
              _results.push(f$.addClass(element, c));
            }
            return _results;
          } else {
            _ref1 = item.css;
            _results1 = [];
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              c = _ref1[_j];
              _results1.push(f$.removeClass(element, c));
            }
            return _results1;
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
      var base_element, child, init_value, item, self, top_element;
      item = null;
      child = null;
      base_element = null;
      top_element = null;
      init_value = false;
      return self = {
        direction: true,
        owner: true,
        start: function() {
          self.prepare();
          self.watchModel();
          return self.initUpdate();
        },
        prepare: function() {
          base_element = element;
          top_element = f$.createComment(" " + env.attrName + ": " + name + " ");
          f$.before(element, top_element);
          return f$.remove(element);
        },
        updateDom: function(value) {
          if (!value === self.direction) {
            if (!child) {
              return;
            }
            child.$destroy();
            self.removeDom(item);
            child = null;
            return item = null;
          } else {
            if (child) {
              return;
            }
            item = f$.clone(base_element);
            self.insertDom(top_element, item);
            child = scope.$new();
            return alight.applyBindings(child, item, {
              skip_attr: env.skippedAttr()
            });
          }
        },
        watchModel: function() {
          var w;
          w = scope.$watch(name, self.updateDom, {
            readOnly: true
          });
          return init_value = !!w.value;
        },
        initUpdate: function() {
          return self.updateDom(init_value);
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
      dirs = alight.directives.al["if"].init.apply(this, arguments);
      dirs.direction = false;
      return dirs;
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
        topElement: null,
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
      return f$.attr(element, 'src', value);
    };
    r = scope.$watchText(name, setter, {
      readOnly: true
    });
    return setter(r.value);
  };

  alight.directives.bo.src = function(element, name, scope) {
    var value;
    value = scope.$evalText(name);
    if (value) {
      return f$.attr(element, 'src', value);
    }
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

  _ref = ['keydown', 'keypress', 'keyup', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseup', 'focus', 'blur', 'change'];
  _fn = function(key) {
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
          return f$.on(element, key, self.callback);
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
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    key = _ref[_i];
    _fn(key);
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
        f$.on(element, 'focus', function() {
          return safe.updateModel(true);
        });
        return f$.on(element, 'blur', function() {
          return safe.updateModel(false);
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

}).call(this);
// Generated by CoffeeScript 1.7.1

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
    init: function(element, exp, scope, env) {
      var self;
      return self = {
        owner: true,
        start: function() {
          self.prepare();
          self.parsExpression();
          self.prepareDom();
          self.watchModel();
          return self.initUpdateDom();
        },
        prepare: function() {
          var controllerName;
          controllerName = env.takeAttr('al-controller');
          if (controllerName) {
            return self.childController = alight.getController(controllerName, scope);
          } else {
            return self.childController = null;
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
            isArray: true,
            readOnly: !self.storeTo
          });
        },
        initUpdateDom: function() {
          return self.updateDom(self.watch.value);
        },
        prepareDom: function() {
          self.base_element = element;
          self.top_element = f$.createComment(" " + exp + " ");
          f$.before(element, self.top_element);
          return f$.remove(element);
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
          var e, it, _i, _j, _len, _len1;
          for (_i = 0, _len = removes.length; _i < _len; _i++) {
            e = removes[_i];
            f$.remove(e);
          }
          for (_j = 0, _len1 = inserts.length; _j < _len1; _j++) {
            it = inserts[_j];
            f$.after(it.after, it.element);
          }
          return null;
        },
        updateDom: (function() {
          var index, node_by_id, node_del, node_get, node_set, nodes;
          nodes = [];
          node_by_id = null;
          node_set = null;
          node_get = null;
          node_del = null;
          index = 0;
          return function(list) {
            var applyList, child_scope, dom_inserts, dom_removes, it, item, item_value, last_element, next2, node, nodes2, pid, prev_node, skippedAttrs, _getId, _i, _id, _j, _k, _l, _len, _len1, _len2, _len3;
            if (!node_get) {
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
            }
            if (!list || !list.length) {
              list = [];
            }
            if (self.storeTo) {
              scope.$setValue(self.storeTo, list);
              scope.$scan({
                late: true
              });
            }
            last_element = self.top_element;
            dom_inserts = [];
            nodes2 = [];
            for (_i = 0, _len = nodes.length; _i < _len; _i++) {
              node = nodes[_i];
              node.active = false;
            }
            for (index = _j = 0, _len1 = list.length; _j < _len1; index = ++_j) {
              item = list[index];
              node = node_get(item);
              if (node) {
                node.active = true;
              }
            }
            dom_removes = (function() {
              var _k, _len2, _results;
              _results = [];
              for (_k = 0, _len2 = nodes.length; _k < _len2; _k++) {
                node = nodes[_k];
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
                _results.push(node.element);
              }
              return _results;
            })();
            applyList = [];
            pid = null;
            child_scope;
            prev_node = null;
            for (index = _k = 0, _len2 = list.length; _k < _len2; index = ++_k) {
              item = list[index];
              item_value = item;
              item = item || {};
              node = node_get(item);
              if (node) {
                self.updateChild(node.scope, item, index, list);
                if (node.prev === prev_node) {
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
                  after: prev_node ? prev_node.element : self.top_element
                });
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
              last_element = element;
              nodes2.push(node);
            }
            nodes = nodes2;
            self.rawUpdateDom(dom_removes, dom_inserts);
            skippedAttrs = env.skippedAttr();
            for (_l = 0, _len3 = applyList.length; _l < _len3; _l++) {
              it = applyList[_l];
              alight.applyBindings(it[0], it[1], {
                skip_attr: skippedAttrs
              });
            }
            return null;
          };
        })()
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
        self.watch = {
          value: scope.$eval(self.expression)
        };
        return self.initUpdateDom();
      };
      return self;
    }
  };

}).call(this);
// Generated by CoffeeScript 1.7.1
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
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = value.length; _i < _len; _i++) {
          r = value[_i];
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
            _results.push(r);
          } else {
            if (!e.$) {
              continue;
            }
            a = e.$.toLowerCase();
            if (('' + r).toLowerCase().indexOf(a) < 0) {
              continue;
            }
            _results.push(r);
          }
        }
        return _results;
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
    var d, r, x, _i, _len;
    if (!value) {
      return '';
    }
    x = [[/yyyy/g, value.getFullYear()], [/mm/g, d2(value.getMonth() + 1)], [/dd/g, d2(value.getDate())], [/HH/g, d2(value.getHours())], [/MM/g, d2(value.getMinutes())], [/SS/g, d2(value.getSeconds())]];
    r = exp;
    for (_i = 0, _len = x.length; _i < _len; _i++) {
      d = x[_i];
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
// Generated by CoffeeScript 1.7.1

/*

watch ob, 'foo.bar', cb

ob.wtree =
	foo:
		$$cbs
		bar:
			$$cbs

tree =
	$$scope
	$$path

ensureObserve ob, key
scope.$$observer
	k1: tree
	k2: tree
 */

(function() {
  var cleanTree, ensureObserve, ensureTree, ensureTree2, fire, isObjectOrArray, self, specWords;

  alight.observer = self = {};

  specWords = {
    '$system': true,
    '$parent': true,
    '$ns': true,
    '$$scope': true,
    '$$path': true,
    '$$isArray': true,
    '$$observer': true,
    '$$cbs': true
  };

  isObjectOrArray = function(d) {
    if (f$.isObject(d)) {
      return true;
    }
    return f$.isArray(d);
  };

  self.watch = function(ob, key, callback) {
    var k, t, _i, _len, _ref;
    t = ob.wtree;
    _ref = key.split('.');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      k = _ref[_i];
      if (!t[k]) {
        t[k] = {
          $$cbs: []
        };
      }
      t = t[k];
      t.$$cbs.push(callback);
    }
    ensureObserve(ob, key);
    return callback;
  };

  ensureObserve = function(ob, key) {
    var i, k, kList, len, path, scope, tree;
    scope = ob.scope;
    tree = ob.tree;
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
      if (!scope.$$observer) {
        scope.$$observer = {};
      }
      if (tree.$$scope) {
        continue;
      }
      tree.$$scope = scope;
      tree.$$path = path;
      scope.$$observer[ob.key] = tree;
      if (f$.isArray(scope)) {
        tree.$$isArray = true;
        Array.observe(scope, ob.handler);
      } else {
        Object.observe(scope, ob.handler);
      }
    }
    return null;
  };

  ensureTree = function(ob, key) {
    var k, wtree, _i, _len, _ref;
    wtree = ob.wtree;
    _ref = key.split('.');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      k = _ref[_i];
      wtree = wtree[k];
      if (!wtree) {
        break;
      }
    }
    if (wtree) {
      return ensureTree2(ob, wtree, key);
    }
  };

  ensureTree2 = function(ob, wtree, path) {
    var k, r;
    r = false;
    for (k in wtree) {
      if (specWords[k]) {
        continue;
      }
      if (ensureTree2(ob, wtree[k], "" + path + "." + k)) {
        r = true;
      }
    }
    if (!r && wtree.$$cbs.length) {
      ensureObserve(ob, path);
      return true;
    }
    return false;
  };

  self.unwatch = function(ob, key, callback) {
    var c, i, k, t, _i, _len, _ref;
    t = ob.wtree;
    _ref = key.split('.');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      k = _ref[_i];
      c = t[k];
      if (!c) {
        continue;
      }
      i = c.$$cbs.indexOf(callback);
      if (i >= 0) {
        c.$$cbs.splice(i, 1);
      }
      t = c;
    }
    return null;
  };

  fire = function(wtree, key, value) {
    var cb, k, t, _i, _j, _len, _len1, _ref, _ref1;
    t = wtree;
    _ref = key.split('.');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      k = _ref[_i];
      t = t[k] || {};
    }
    if (t.$$cbs) {
      _ref1 = t.$$cbs;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        cb = _ref1[_j];
        cb(value);
      }
    }
    return null;
  };

  cleanTree = function(ob, tree, checkingScope) {
    var k, scope, v;
    if (checkingScope && checkingScope !== tree.$$scope) {
      console.error('Observe: fake scope');
    }
    scope = tree.$$scope;
    if (f$.isArray(tree.$$scope)) {
      tree.$$isArray = null;
      Array.unobserve(tree.$$scope, ob.handler);
    } else {
      Object.unobserve(tree.$$scope, ob.handler);
    }
    tree.$$scope.$$observer[ob.key] = null;
    tree.$$scope = null;
    tree.$$path = null;
    for (k in tree) {
      v = tree[k];
      if (specWords[k]) {
        continue;
      }
      if (!f$.isObject(v)) {
        continue;
      }
      cleanTree(ob, tree[k]);
    }
    return null;
  };

  self.observe = function(rootScope, conf) {
    var ob;
    conf = conf || {};
    ob = {
      key: alight.utilits.getId(),
      scope: rootScope,
      tree: {},
      wtree: {},
      path: '',
      rootEvent: conf.rootEvent,
      active: !conf.noActive,
      handler: function(changes) {
        var ch, key, keyPath, scope, tree, value, _i, _len;
        for (_i = 0, _len = changes.length; _i < _len; _i++) {
          ch = changes[_i];
          scope = ch.object;
          if (!scope.$$observer) {
            continue;
          }
          tree = scope.$$observer[ob.key];
          if (tree.$$isArray) {
            fire(ob.wtree, tree.$$path, null);
          } else {
            key = ch.name;
            if (specWords[key]) {
              continue;
            }
            value = scope[key];
            if (tree.$$path) {
              keyPath = "" + tree.$$path + "." + key;
            } else {
              keyPath = key;
            }
            if (ch.type === 'add') {
              if (isObjectOrArray(value)) {
                ensureTree(ob, keyPath);
              }
              fire(ob.wtree, keyPath, value);
            } else if (ch.type === 'update') {
              if (tree[key] && isObjectOrArray(ch.oldValue)) {
                cleanTree(ob, tree[key], ch.oldValue);
              }
              if (isObjectOrArray(value)) {
                ensureTree(ob, keyPath);
              }
              fire(ob.wtree, keyPath, null);
            } else if (ch.type === 'delete') {
              if (isObjectOrArray(ch.oldValue)) {
                cleanTree(ob, tree[key], ch.oldValue);
              }
              fire(ob.wtree, keyPath, null);
            }
            if (tree === ob.tree) {
              ob.rootEvent(keyPath, value);
            }
          }
        }
        return null;
      }
    };
    (function(scope, tree) {
      if (!scope.$$observer) {
        scope.$$observer = {};
      }
      tree = ob.tree;
      if (!tree.$$scope) {
        tree.$$scope = scope;
        tree.$$path = '';
        scope.$$observer[ob.key] = tree;
        return Object.observe(scope, ob.handler);
      }
    })(ob.scope, ob.tree);
    return ob;
  };

  self.unobserve = function(ob) {
    cleanTree(ob, ob.tree, ob.scope);
    ob.scope = null;
    ob.tree = null;
    ob.wtree = null;
    ob.rootEvent = null;
    return null;
  };

  self.reobserve = function(ob, key) {
    if (ob.tree[key]) {
      cleanTree(ob, ob.tree[key]);
    }
    if (isObjectOrArray(ob.scope[key])) {
      return ensureTree(ob, key);
    }
  };

  self.fire = function(ob, name) {
    return fire(ob.wtree, name, null);
  };

  self.deliver = function(ob) {
    return Object.deliverChangeRecords(ob.handler);
  };

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
