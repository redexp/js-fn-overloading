function convertArgsString(argsString) {
    argsString = argsString.split(/\s*,\s*/);

    var args = [],
        classToType = {'Object':'object', 'String':'string', 'Number':'number', 'Boolean':'boolean', 'Function':'function'},
        match, types, type, argument,
        i, n;

    for(i = 0; i < argsString.length; i++) {
        match = argsString[i].match(/\{([^}]+)\}\s*(\[*\w+\]*)/);

        argument = {
            classes:  [],
            types:    [],
            mixed:  match[1] === '*',
            optional: match[2].charAt(0) === '['
        };

        args.push(argument);

        if( argument.mixed ) continue;

        types = match[1].split('|');
        for(n = 0; n < types.length; n++) {
            type = types[n];
            if( classToType.hasOwnProperty(type) ) {
                argument.types.push(classToType[type]);
            }
            else {
                argument.classes.push(type);
            }
        }
    }

    return args;
}

function getCorrectArguments(args, ops) {
    var correctArgs = new Array(ops.length),
        i, n, argument, option;

    if( args.length === ops.length ) {
        for(i = 0; i < args.length; i++) {
            correctArgs[i] = args[i];
        }

        return correctArgs;
    }

    for(i = 0; i < args.length; i++) {
        argument = args[i];
        for(n = 0; n < ops.length; n++) {
            option = ops[n];

        }
    }

    return correctArgs;
}

function Overload(args) {
    return function(){

    }
}
