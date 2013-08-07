;(function(){

    var ov = this.Overload = function(argsOps, func) {
        argsOps = ov.convertArgsString(argsOps);
        return function(){
            return func.apply(this, ov.getCorrectArguments(arguments, argsOps));
        };
    },
    reg = /\{([^}]+)\}\s*(\[*\w*)/,
    slice = [].slice;

    ov.convertArgsString = function(argsString) {
        argsString = argsString.split(',');

        var args = {
                length: argsString.length,
                requiredLength: 0
            },
            match, argument, i;

        for(i = 0; i < argsString.length; i++) {
            match = argsString[i].match(reg);
            argument = {
                mixed:    match[1] === '*',
                required: match[2].charAt(0) !== '['
            };

            args[i] = argument;

            if( argument.required ) args.requiredLength++;

            if( argument.mixed ) continue;

            argument.types = match[1].toLowerCase().split('|');
        }

        return args;
    };

    ov.isValidArgument = function(argument, option) {
        return option.mixed || option.types.indexOf(typeof argument) > -1;
    };

    ov.getCorrectArguments = function(args, ops) {
        if( args.length === ops.length ) {
            return slice.call(args);
        }

        var correctArgs = new Array(ops.length),
            argsForRequired = args.length,
            required = ops.requiredLength,
            n, argument, option, i;

        for(i = 0, n = 0; i < ops.length; i++) {
            option = ops[i];
            argument = args[n];
            if( option.required || (argsForRequired - 1 >= required && ov.isValidArgument(argument, option)) ) {
                correctArgs[i] = argument;
                n++;
                argsForRequired--;
                if( option.required ) required--;
            }
        }

        return correctArgs;
    };

}).call(this);
