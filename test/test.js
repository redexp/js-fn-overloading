test('convertArgsString', function(){
    var argsString = '{Object|String}events, {String}[selector], {*}[data], {Function}fn',
        argsArray = {
            length: 4,
            requiredLength: 2,
            0: {types: ['object', 'string'], mixed: false, required: true},
            1: {types: ['string'], mixed: false, required: false},
            2: {mixed: true, required: false},
            3: {types: ['function'], mixed: false, required: true}
        };

    deepEqual(Overload.convertArgsString(argsString), argsArray);
});

test('getCorrectArguments', function(){
    var argsOps = Overload.convertArgsString('{String}events, {Object|String}[selector], {*}[data], {Function}fn');

    var check = function(){
        var args = Overload.getCorrectArguments(arguments, argsOps);

        for(var i = 0; i < args.length; i++) {
            args[i] = typeof args[i];
        }

        return args.join(', ');
    };

    equal(check('', {}, '', function(){}), 'string, object, string, function');
    equal(check('', {}, function(){}),     'string, object, undefined, function');
    equal(check('', 1, function(){}),      'string, undefined, number, function');
    equal(check('', function(){}),         'string, undefined, undefined, function');

    equal(check('', '', '', function(){}), 'string, string, string, function');
    equal(check('', '', {}, function(){}), 'string, string, object, function');
    equal(check('', '', function(){}),     'string, string, undefined, function');

    equal(check('', function(){}, function(){}), 'string, undefined, function, function');

    equal(check('', function(){}, '', '', function(){}, ''), 'string, undefined, function, string');

});

test('Overload', function(){
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
});
