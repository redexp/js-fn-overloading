Javascript function overloading
=================

It's experiment with some kind of function overloading like in Java for JavaScript.
Basically I just wanted to put arguments values to their correct places.
Here self described example from my tests
```javascript
var obj = {
    func: Overload('{Object|String}event, {String}[selector], {*}[data], {Function}fn', function(event, selector, data, fn){
        ok(this === obj);
        ok(typeof event === 'object' || typeof event === 'string');
        ok(typeof selector === 'undefined');
        ok(typeof data !== 'undefined');
        ok(typeof fn === 'function');
    })
};

obj.func('', 1, function(){});
```
`Overload` takes configuration string and your function and returns new function with algorithm which will put arguments values to their correct places.

## Configuration string

It's simple version of [YUIDoc Syntax](http://yui.github.io/yuidoc/syntax/index.html) for tag `@param`.

So `{Object|String}event` means - required parameter of type `Object` or `String` and `{*}[data]` means - optional parameter with any type.