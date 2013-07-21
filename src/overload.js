;(function(){

    var ov = this.Overload = function(argsOps, func) {
        argsOps = ov.convertArgsString(argsOps);
        return function(){
            return func.apply(this, ov.getCorrectArguments(arguments, argsOps));
        }
    };

    ov.convertArgsString = function(argsString) {
        argsString = argsString.split(',');

        var args = {
                length: argsString.length,
                requiredLength: 0
            },
            reg = /\{([^}]+)\}\s*(\[*\w*)/,
            match, types, argument,
            i, n;

        for(i = 0; i < argsString.length; i++) {
            match = argsString[i].match(reg);
            argument = {
                types:    [],
                mixed:    match[1] === '*',
                required: match[2].charAt(0) !== '['
            };

            args[i] = argument;

            if( argument.required ) args.requiredLength++;

            if( argument.mixed ) continue;

            types = match[1].split('|');
            for(n = 0; n < types.length; n++) {
                argument.types.push(types[n].toLowerCase());
            }
        }

        return args;
    };

    ov.isValidArgument = function(argument, option) {
        if( option.mixed ) return true;

        for(var i = 0; i < option.types.length; i++) {
            if( typeof argument === option.types[i] ) {
                return true;
            }
        }

        return false;
    };

    ov.getCorrectArguments = function(args, ops) {
        var correctArgs = new Array(ops.length),
            i;

        if( args.length === ops.length ) {
            for(i = 0; i < args.length; i++) {
                correctArgs[i] = args[i];
            }

            return correctArgs;
        }

        var argsForRequired = args.length,
            required = ops.requiredLength,
            n, argument, option;

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
