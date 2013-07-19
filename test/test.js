test('convertArgsString', function(){
    var argsString = '{Object|String}events, {String}[selector], {*}[data], {Function}fn',
        argsArray = [
            {classes: [], types: ['object', 'string'], mixed: false, optional: false},
            {classes: [], types: ['string'], mixed: false, optional: true},
            {classes: [], types: [], mixed: true, optional: true},
            {classes: [], types: ['function'], mixed: false, optional: false}
        ];

    equal(JSON.stringify(convertArgsString(argsString)), JSON.stringify(argsArray));
});

test('getCorrectArguments', function(){
    var argsOps = convertArgsString('{Object|String}events, {String}[selector], {*}[data], {Function}fn');

    var check = function(){
        var args = getCorrectArguments(arguments, argsOps);

        for(var i = 0; i < args.length; i++) {
            args[i] = typeof args[i];
        }

        return args.join(', ');
    };

    equal(check({}, '', '', function(){}), 'object, string, string, function');
    equal(check({}, '', function(){}),     'object, string, null, function');
    equal(check({}, 1, function(){}),      'object, null, number, function');
    equal(check({}, function(){}),         'object, null, null, function');

    equal(check('', '', '', function(){}), 'string, string, string, function');
    equal(check('', '', function(){}),     'string, string, null, function');
    equal(check('', 1, function(){}),      'string, null, number, function');
    equal(check('', function(){}),         'string, null, null, function');

    equal(check('', function(){}, function(){}), 'string, null, function, function');

});