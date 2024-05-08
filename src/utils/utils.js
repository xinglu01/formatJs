/* eslint-disable @typescript-eslint/no-this-alias */
function defaultDateProperties(target, opts) {
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

function stripDelimiters(value, delimiter, delimiters) {
    var owner = this;
    // single delimiter
    if (delimiters.length === 0) {
        var delimiterRE = delimiter ? owner.getDelimiterREByDelimiter(delimiter) : '';
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
;

function getDelimiterREByDelimiter(delimiter) {
    return new RegExp(delimiter.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'), 'g');
}

function getMaxLength(blocks) {
    return blocks.reduce(function (previous, current) {
        return previous + current;
    }, 0);
}

function sum(...args) {
    return args.reduce((prev, total) => total + prev, 0);
}

module.exports = {
    defaultDateProperties: defaultDateProperties,
    stripDelimiters: stripDelimiters,
    getDelimiterREByDelimiter: getDelimiterREByDelimiter,
    getMaxLength: getMaxLength,
    sum: sum
};
