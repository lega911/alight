(function () {
    /*
    
    alight.component('rating', (scope, element, env) => {
      return {
        template,
        templateId,
        templateUrl,
        props,
        onStart,
        onDestroy,
        api
      };
    })
    
    <rating :rating="rating" :max="max" @change="rating=$event.value"></rating>
    
    */
    var f$ = alight.f$;
    function makeWatch(_a) {
        var listener = _a.listener, childCD = _a.childCD, name = _a.name, parentName = _a.parentName, parentCD = _a.parentCD;
        var fn;
        var watchOption = {};
        if (listener && listener !== true) {
            if (f$.isFunction(listener)) {
                fn = listener;
            }
            else {
                fn = listener.onChange;
                if (listener === 'copy' || listener.watchMode === 'copy') {
                    if (fn)
                        fn(parentName);
                    else
                        childCD.scope[name] = parentName;
                    return;
                }
                if (listener === 'array' || listener.watchMode === 'array')
                    watchOption.isArray = true;
                if (listener === 'deep' || listener.watchMode === 'deep')
                    watchOption.deep = true;
            }
        }
        if (!fn) {
            fn = function (value) {
                childCD.scope[name] = value;
                childCD.scan();
            };
        }
        parentCD.watch(parentName, fn, watchOption);
    }
    alight.component = function (attrName, constructor) {
        var parts = attrName.match(/^(\w+)[\-](.+)$/);
        var ns, name;
        if (parts) {
            ns = parts[1];
            name = parts[2];
        }
        else {
            ns = '$global';
            name = attrName;
        }
        name = name.replace(/(-\w)/g, function (m) {
            return m.substring(1).toUpperCase();
        });
        if (!alight.d[ns])
            alight.d[ns] = {};
        alight.d[ns][name] = {
            restrict: 'E',
            stopBinding: true,
            priority: alight.priority.$component,
            init: function (_parentScope, element, _value, parentEnv) {
                parentEnv.fastBinding = true;
                var scope = {
                    $sendEvent: function (eventName, value) {
                        var event = new CustomEvent(eventName);
                        event.value = value;
                        event.component = true;
                        element.dispatchEvent(event);
                    }
                };
                var parentCD = parentEnv.changeDetector.new();
                var childCD = alight.ChangeDetector(scope);
                var env = new Env({
                    element: element,
                    attributes: parentEnv.attributes,
                    changeDetector: childCD,
                    parentChangeDetector: parentCD
                });
                try {
                    var option = constructor(scope, element, env) || {};
                }
                catch (e) {
                    alight.exceptionHandler(e, 'Error in component <' + attrName + '>: ', {
                        element: element,
                        scope: scope,
                        cd: childCD
                    });
                    return;
                }
                if (option.onStart) {
                    childCD.watch('$finishBinding', option.onStart);
                }
                // bind props
                var parentDestroyed = false;
                parentCD.watch('$destroy', function () {
                    parentDestroyed = true;
                    childCD.destroy();
                });
                childCD.watch('$destroy', function () {
                    if (option.onDestroy)
                        option.onDestroy();
                    if (!parentDestroyed)
                        parentCD.destroy(); // child of parentCD
                });
                // option api
                if (option.api) {
                    var propValue = env.takeAttr(':api');
                    if (propValue)
                        parentCD.locals[propValue] = option.api;
                }
                function watchProp(key, listener) {
                    var name = ':' + key;
                    var value = env.takeAttr(name);
                    if (!value) {
                        value = env.takeAttr(key);
                        if (!value)
                            return;
                        listener = 'copy';
                    }
                    makeWatch({ childCD: childCD, listener: listener, name: key, parentName: value, parentCD: parentCD });
                }
                // option props
                if (option.props) {
                    if (Array.isArray(option.props))
                        for (var _i = 0, _a = option.props; _i < _a.length; _i++) {
                            var key = _a[_i];
                            watchProp(key, true);
                        }
                    else
                        for (var key in option.props)
                            watchProp(key, option.props[key]);
                }
                else {
                    // auto props
                    for (var _b = 0, _c = element.attributes; _b < _c.length; _b++) {
                        var attr = _c[_b];
                        var propName = attr.name;
                        var propValue = attr.value;
                        if (!propValue)
                            continue;
                        var parts_1 = propName.match(/^\:(.*)$/);
                        if (!parts_1)
                            continue;
                        makeWatch({ childCD: childCD, name: parts_1[1], parentName: propValue, parentCD: parentCD });
                    }
                }
                var scanned = false;
                parentCD.watch('$onScanOnce', function () { return scanned = true; });
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
                    if (!scanned)
                        parentCD.digest();
                    alight.bind(childCD, element, { skip: true });
                }
            }
        };
    };
})();
