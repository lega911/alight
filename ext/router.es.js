(function () {
    /*
    
        al-route - define route (can be empty)
        al-route:default - it's activated on undefined url (for 404)
        al-route-out="onOut()" - return true if you want prevent url be changed
        al-on.route-to - event when route is activated, you can use al-ctrl instead of it.
        scope.$route - contains arguments from url
    
        alight.router = {
            setBase(location.pathname)
            go(link)  // move to link
            subscribe(fn, [flag])  // subscribe on changes url, on 404 page, out-event
            unsubscribe(fn, [flag])
            getCurrentUrl()
            isDefault()  // returns true if it's 404
        }
    
        TODO:
        // $(window).unload(function(e){
    */
    alight.router = (function () {
        var value = document.location.pathname;
        var list = [];
        var nameList = {
            main: list,
            default: [],
            out: [],
            out2: []
        };
        var defaultStatus = false;
        var base = '';
        window.onpopstate = function () {
            var path = document.location.pathname.slice(base.length);
            alight.router.go(path, true);
        };
        return {
            setBase: function (n) {
                base = n.match(/^(.*\w+)\/*$/)[1];
            },
            getCurrentUrl: function () {
                return value;
            },
            isDefault: function () {
                return defaultStatus;
            },
            go: function (url, noPush) {
                if (url === value)
                    return;
                // out
                for (var _i = 0, _a = nameList.out.slice(); _i < _a.length; _i++) {
                    var fn = _a[_i];
                    if (fn(url)) {
                        // set old url
                        if (noPush)
                            history.pushState(null, null, base + value);
                        return false;
                    }
                }
                // out2
                for (var _b = 0, _c = nameList.out2.slice(); _b < _c.length; _b++) {
                    var fn = _c[_b];
                    if (fn(url)) {
                        // set old url
                        if (noPush)
                            history.pushState(null, null, base + value);
                        return false;
                    }
                }
                //change url
                if (!noPush)
                    history.pushState(null, null, base + url);
                value = url;
                // publish
                var taken = false;
                for (var _d = 0, _e = list.slice(); _d < _e.length; _d++) {
                    var fn = _e[_d];
                    if (fn(url))
                        taken = true;
                }
                // call route:default
                defaultStatus = !taken;
                for (var _f = 0, _g = nameList.default.slice(); _f < _g.length; _f++) {
                    var fn = _g[_f];
                    fn(defaultStatus);
                }
                return true;
            },
            subscribe: function (fn, key) {
                nameList[key || 'main'].push(fn);
            },
            unsubscribe: function (fn, key) {
                var l = nameList[key || 'main'];
                var i = l.indexOf(fn);
                if (i >= 0)
                    l.splice(i, 1);
            }
        };
    })();
    var Route = (function () {
        function Route() {
            this.routes = [];
        }
        Route.prototype.add = function (url) {
            this.routes.push(routeMatcher(url));
        };
        Route.prototype.test = function (url) {
            for (var _i = 0, _a = this.routes; _i < _a.length; _i++) {
                var route = _a[_i];
                var result = route(url);
                if (result)
                    return result;
            }
            return false;
        };
        Route.prototype.size = function () {
            return this.routes.length;
        };
        return Route;
    }());
    ;
    var f$ = alight.f$;
    alight.d.al.route = {
        priority: 1000,
        init: function (scope, baseElement, inputUrl, env) {
            var parentCD = env.changeDetector;
            env.stopBinding = true;
            var outCondition = null;
            var $router = {
                result: {
                    go: alight.router.go
                },
                setOut: function (fn) {
                    outCondition = function (url) {
                        if (route.test(url))
                            return false;
                        return fn();
                    };
                    alight.router.subscribe(outCondition, 'out');
                }
            };
            var route = new Route();
            var defaultRoute = env.attrArgument === 'default';
            if (inputUrl)
                route.add(inputUrl);
            else if (!defaultRoute) {
                inputUrl = '<group>';
                for (var _i = 0, _a = baseElement.querySelectorAll('[al-route]'); _i < _a.length; _i++) {
                    var el = _a[_i];
                    var url = el.getAttribute('al-route');
                    if (!url)
                        continue;
                    route.add(url);
                }
                ;
                defaultRoute = !!baseElement.querySelector('[al-route\\.default]');
            }
            ;
            if (defaultRoute)
                inputUrl += ':default';
            var flagUrl = false;
            var flagDefault = false;
            if (route.size()) {
                var onChangeUrl_1 = function (url) {
                    var result = route.test(url);
                    flagUrl = !!result;
                    if (flagUrl || flagDefault) {
                        insertBlock(result);
                        return flagUrl;
                    }
                    else
                        removeBlock();
                    return false;
                };
                alight.router.subscribe(onChangeUrl_1);
                parentCD.watch('$destroy', function () {
                    alight.router.unsubscribe(onChangeUrl_1);
                    removeBlock(true);
                });
            }
            if (defaultRoute) {
                flagDefault = alight.router.isDefault();
                function onDefault(active) {
                    flagDefault = active;
                    if (flagUrl || flagDefault)
                        insertBlock(null);
                    else
                        removeBlock();
                    scope.$scan({ late: true });
                }
                alight.router.subscribe(onDefault, 'default');
                parentCD.watch('$destroy', function () {
                    alight.router.unsubscribe(onDefault, 'default');
                    removeBlock(true);
                });
            }
            var topElement = document.createComment("route: " + inputUrl);
            f$.before(baseElement, topElement);
            f$.remove(baseElement);
            var childCD = null;
            var childElement = null;
            function insertBlock(result) {
                $router.result = Object.assign($router.result, result);
                if (childCD)
                    return;
                var event = new CustomEvent('route-to');
                event.value = result;
                baseElement.dispatchEvent(event);
                childCD = parentCD.new();
                childCD.$router = $router;
                childElement = baseElement.cloneNode(true);
                f$.after(topElement, childElement);
                alight.bind(childCD, childElement, { skip_attr: env.skippedAttr() });
            }
            function removeBlock(destroyed) {
                if (outCondition) {
                    alight.router.unsubscribe(outCondition, 'out');
                    outCondition = null;
                }
                if (!childCD)
                    return;
                if (!destroyed)
                    childCD.destroy();
                f$.remove(childElement);
                childCD = null;
                childElement = null;
            }
            var result = route.test(alight.router.getCurrentUrl());
            flagUrl = !!result;
            if (flagUrl || flagDefault) {
                insertBlock(result);
            }
        }
    };
    alight.d.al.routeOut = function (scope, element, expression, env) {
        var cd = env.changeDetector;
        var $router = cd.$router;
        if (!$router && cd.parent)
            $router = cd.parent.$router;
        if (!$router)
            throw 'al-router is not found';
        $router.setOut(function () { return scope.$eval(expression); });
    };
    alight.d.al.routeOut2 = function (scope, element, expression, env) {
        var fn = scope.$compile(expression, { input: ['$url'] });
        var handler = function ($url) {
            return fn(scope, $url);
        };
        alight.router.subscribe(handler, 'out2');
        scope.$watch('$destroy', function () {
            alight.router.unsubscribe(handler, 'out2');
        });
    };
    alight.hooks.scope.push({
        code: '$route',
        fn: function () {
            if (this.scope.$route)
                return;
            var cd = this.changeDetector;
            if (cd.parent && cd.parent.$router)
                this.scope.$route = cd.parent.$router.result;
        }
    });
    alight.d.al.link = function (scope, element, url) {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            alight.router.go(url);
            scope.$scan({ late: true });
        });
    };
    // coded by rumkin
    function routeMatcher(route) {
        var segments = route.replace(/^\/+|\/+$/, '').split(/\/+/);
        var names = [];
        var rules = [];
        segments.forEach(function (segment) {
            var rule;
            if (segment.charAt(0) === ':') {
                names.push(segment.slice(1));
                rules.push('([^\/]+)');
            }
            else if (segment === '**') {
                names.push('tail');
                rules.push('(.+)');
            }
            else {
                rules.push(escapeRegExp(segment));
            }
        });
        var regex = new RegExp('^\/' + rules.join('\/') + '\/?$', 'i');
        var matcher = function (url) {
            var match = url.match(regex);
            if (!match) {
                return;
            }
            var result = {};
            names.forEach(function (name, i) {
                result[name] = match[i + 1];
            });
            return result;
        };
        return matcher;
    }
    function escapeRegExp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
    ;
})();
