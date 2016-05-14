(function () {
    /*
    
    alight.createComponent('rating', (scope, element, env) => {
      return {
        template,
        templateId,
        templateUrl,
        props,
        onStart,
        onDestroy
      };
    })
    
    <rating :rating="rating" :max="max" @change="rating=$event.value"></rating>
    
    */
    var f$ = alight.f$;
    function makeWatch(_a) {
        var listener = _a.listener, scope = _a.scope, name = _a.name, parentName = _a.parentName, parentCD = _a.parentCD;
        var fn;
        var watchOption = {};
        if (listener) {
            if (f$.isFunction(listener)) {
                fn = listener;
            }
            else {
                if (listener.watchMode === 'array')
                    watchOption.isArray = true;
                if (listener.watchMode === 'deep')
                    watchOption.deep = true;
                fn = listener.onChange;
            }
        }
        if (!fn) {
            fn = function (value) {
                scope[name] = value;
                scope.$scan();
            };
        }
        return parentCD.watch(parentName, fn, watchOption);
    }
    alight.createComponent = function (attrName, constructor) {
        var name = attrName.replace(/(-\w)/g, function (m) {
            return m.substring(1).toUpperCase();
        });
        alight.d.$global[name] = {
            restrict: 'E',
            stopBinding: true,
            priority: 5,
            init: function (parentScope, element, _value, env) {
                var parentCD = env.changeDetector;
                var scope = alight.Scope();
                parentScope.$watch('$destroy', function () { return scope.$destroy(); });
                scope.$dispatch = function (eventName, value) {
                    var event = new CustomEvent(eventName);
                    event.value = value;
                    element.dispatchEvent(event);
                };
                var option = constructor(scope, element, env);
                if (option.onStart) {
                    scope.$watch('$finishBinding', option.onStart);
                }
                // bind props
                var watchers = [];
                scope.$watch('$destroy', function () {
                    for (var _i = 0, watchers_1 = watchers; _i < watchers_1.length; _i++) {
                        var w = watchers_1[_i];
                        w.stop();
                    }
                    if (option.onDestroy)
                        option.onDestroy();
                });
                // option props
                var readyProps = {};
                if (option.props) {
                    for (var key in option.props) {
                        var propName = ':' + key;
                        var propValue = env.takeAttr(propName);
                        var listener = option.props[key];
                        readyProps[propName] = true;
                        if (!propValue)
                            continue;
                        watchers.push(makeWatch({ scope: scope, listener: listener, name: key, parentName: propValue, parentCD: parentCD }));
                    }
                }
                // element props
                for (var _i = 0, _a = element.attributes; _i < _a.length; _i++) {
                    var attr = _a[_i];
                    var propName = attr.name;
                    if (readyProps[propName])
                        continue;
                    readyProps[propName] = true;
                    var propValue = attr.value;
                    if (!propValue)
                        continue;
                    var parts = propName.match(/^\:(.*)$/);
                    if (!parts)
                        continue;
                    var name_1 = parts[1];
                    watchers.push(makeWatch({ scope: scope, name: name_1, parentName: propValue, parentCD: parentCD }));
                }
                // template
                if (option.template)
                    element.innerHTML = option.template;
                if (option.templateId) {
                    var templateElement = document.getElementById(option.templateId);
                    if (!templateElement)
                        throw 'No template ' + option.templateId;
                    element.innerHTML = templateElement.innerHTML;
                }
                if (option.templateUrl) {
                    f$.ajax({
                        url: option.templateUrl,
                        cache: true,
                        success: function (template) {
                            element.innerHTML = template;
                            binding(true);
                        },
                        error: function () {
                            console.error('Template is not loaded', option.templateUrl);
                        }
                    });
                }
                else {
                    binding();
                }
                function binding(async) {
                    alight.bind(scope, element, { skip_top: true });
                }
            }
        };
    };
})();
