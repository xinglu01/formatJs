/* eslint-disable @typescript-eslint/no-this-alias */
export function defaultDateProperties(target, opts) {
    // date
    target.date = !!opts.date;
    target.datePattern = opts.datePattern || ['Y', 'm', 'd'];
    target.dateMin = opts.dateMin || '';
    target.dateMax = opts.dateMax || '';
    target.delimiter = '-';
    target.delimiters = opts.delimiters || [];
    target.dateFormatter = {};
    target.delimiterLength = target.delimiter.length;
    target.blocks = opts.blocks || [];
    target.blocksLength = target.blocks.length;
    return target;
}

export function stripDelimiters(value, delimiter, delimiters) {
    const owner = this;
    // single delimiter
    if (delimiters.length === 0) {
        const delimiterRE = delimiter
            ? owner.getDelimiterREByDelimiter(delimiter)
            : '';
        return value.replace(delimiterRE, '');
    }
    // multiple delimiters
    delimiters.forEach(function (current) {
        current.split('').forEach(function (letter) {
            value = value.replace(owner.getDelimiterREByDelimiter(letter), '');
        });
    });
    return value;
}
export function getDelimiterREByDelimiter(delimiter) {
    return new RegExp(delimiter.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'), 'g');
}

export function getMaxLength(blocks) {
    return blocks.reduce(function (previous, current) {
        return previous + current;
    }, 0);
}

export function sum(...args) {
    return args.reduce((prev, total) => total + prev, 0);
}
