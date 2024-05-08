/* eslint-disable @typescript-eslint/no-this-alias */
function DateFormatter(datePattern, dateMin, dateMax) {
    var that = this;
    that.date = [];
    that.blocks = [];
    that.datePattern = datePattern;
    that.dateMin = dateMin
        .split('-')
        .reverse()
        .map(function (x) {
        return parseInt(x, 10);
    });
    if (that.dateMin.length === 2)
        that.dateMin.unshift(0);
    that.dateMax = dateMax
        .split('-')
        .reverse()
        .map(function (x) {
        return parseInt(x, 10);
    });
    if (that.dateMax.length === 2)
        that.dateMax.unshift(0);
    that.initBlocks();
}

DateFormatter.prototype = {
    initBlocks: function () {
        var that = this;
        that.datePattern.forEach(function (value) {
            if (value === 'Y') {
                that.blocks.push(4);
            }
            else {
                that.blocks.push(2);
            }
        });
    },
    getISOFormatDate: function () {
        var that = this;
        var date = that.date;
        return date[2]
            ? date[2] +
                '-' +
                that.addLeadingZero(date[1]) +
                '-' +
                that.addLeadingZero(date[0])
            : '';
    },
    getBlocks: function () {
        var that = this;
        return that.blocks;
    },
    getValidatedDate: function (value) {
        var that = this;
        var result = '';
        value = value.replace(/[^\d]/g, '');
        that.blocks.forEach(function (length, index) {
            if (value.length > 0) {
                var sub = value.slice(0, length), sub0 = sub.slice(0, 1), rest = value.slice(length);
                switch (that.datePattern[index]) {
                    case 'd':
                        if (sub === '00') {
                            sub = '01';
                        }
                        else if (parseInt(sub0, 10) > 3) {
                            sub = '0' + sub0;
                        }
                        else if (parseInt(sub, 10) > 31) {
                            sub = '31';
                        }
                        break;
                    case 'm':
                        if (sub === '00') {
                            sub = '01';
                        }
                        else if (parseInt(sub0, 10) > 1) {
                            sub = '0' + sub0;
                        }
                        else if (parseInt(sub, 10) > 12) {
                            sub = '12';
                        }
                        break;
                }
                result += sub;
                // update remaining string
                value = rest;
            }
        });
        return that.getFixedDateString(result);
    },
    getFixedDateString: function (value) {
        var that = this;
        var datePattern = that.datePattern, date = [], dayIndex = 0, monthIndex = 0, yearIndex = 0, dayStartIndex = 0, monthStartIndex = 0, yearStartIndex = 0, fullYearDone = false, day, month, year;
        // mm-dd || dd-mm
        if (value.length === 4 &&
            datePattern[0].toLowerCase() !== 'y' &&
            datePattern[1].toLowerCase() !== 'y') {
            dayStartIndex = datePattern[0] === 'd' ? 0 : 2;
            monthStartIndex = 2 - dayStartIndex;
            day = parseInt(value.slice(dayStartIndex, dayStartIndex + 2), 10);
            month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);
            date = that.getFixedDate(day, month, 0);
        }
        // yyyy-mm-dd || yyyy-dd-mm || mm-dd-yyyy || dd-mm-yyyy || dd-yyyy-mm || mm-yyyy-dd
        if (value.length === 8) {
            datePattern.forEach(function (type, index) {
                switch (type) {
                    case 'd':
                        dayIndex = index;
                        break;
                    case 'm':
                        monthIndex = index;
                        break;
                    default:
                        yearIndex = index;
                        break;
                }
            });
            yearStartIndex = yearIndex * 2;
            dayStartIndex =
                dayIndex <= yearIndex ? dayIndex * 2 : dayIndex * 2 + 2;
            monthStartIndex =
                monthIndex <= yearIndex ? monthIndex * 2 : monthIndex * 2 + 2;
            day = parseInt(value.slice(dayStartIndex, dayStartIndex + 2), 10);
            month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);
            year = parseInt(value.slice(yearStartIndex, yearStartIndex + 4), 10);
            fullYearDone =
                value.slice(yearStartIndex, yearStartIndex + 4).length === 4;
            date = that.getFixedDate(day, month, year);
        }
        // mm-yy || yy-mm
        if (value.length === 4 &&
            (datePattern[0] === 'y' || datePattern[1] === 'y')) {
            monthStartIndex = datePattern[0] === 'm' ? 0 : 2;
            yearStartIndex = 2 - monthStartIndex;
            month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);
            year = parseInt(value.slice(yearStartIndex, yearStartIndex + 2), 10);
            fullYearDone =
                value.slice(yearStartIndex, yearStartIndex + 2).length === 2;
            date = [0, month, year];
        }
        // mm-yyyy || yyyy-mm
        if (value.length === 6 &&
            (datePattern[0] === 'Y' || datePattern[1] === 'Y')) {
            monthStartIndex = datePattern[0] === 'm' ? 0 : 4;
            yearStartIndex = 2 - 0.5 * monthStartIndex;
            month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);
            year = parseInt(value.slice(yearStartIndex, yearStartIndex + 4), 10);
            fullYearDone =
                value.slice(yearStartIndex, yearStartIndex + 4).length === 4;
            date = [0, month, year];
        }
        date = that.getRangeFixedDate(date);
        that.date = date;
        var result = date.length === 0
            ? value
            : datePattern.reduce(function (previous, current) {
                switch (current) {
                    case 'd':
                        return (previous +
                            (date[0] === 0
                                ? ''
                                : that.addLeadingZero(date[0])));
                    case 'm':
                        return (previous +
                            (date[1] === 0
                                ? ''
                                : that.addLeadingZero(date[1])));
                    case 'y':
                        return (previous +
                            (fullYearDone
                                ? that.addLeadingZeroForYear(date[2], false)
                                : ''));
                    case 'Y':
                        return (previous +
                            (fullYearDone
                                ? that.addLeadingZeroForYear(date[2], true)
                                : ''));
                }
            }, '');
        return result;
    },
    getRangeFixedDate: function (date) {
        var that = this;
        var datePattern = that.datePattern, dateMin = that.dateMin || [], dateMax = that.dateMax || [];
        if (!date.length || (dateMin.length < 3 && dateMax.length < 3))
            return date;
        if (datePattern.find(function (x) {
            return x.toLowerCase() === 'y';
        }) &&
            date[2] === 0)
            return date;
        if (dateMax.length &&
            (dateMax[2] < date[2] ||
                (dateMax[2] === date[2] &&
                    (dateMax[1] < date[1] ||
                        (dateMax[1] === date[1] && dateMax[0] < date[0])))))
            return dateMax;
        if (dateMin.length &&
            (dateMin[2] > date[2] ||
                (dateMin[2] === date[2] &&
                    (dateMin[1] > date[1] ||
                        (dateMin[1] === date[1] && dateMin[0] > date[0])))))
            return dateMin;
        return date;
    },
    getFixedDate: function (day, month, year) {
        var that = this;
        day = Math.min(day, 31);
        month = Math.min(month, 12);
        year = parseInt(year || 0, 10);
        if ((month < 7 && month % 2 === 0) || (month > 8 && month % 2 === 1)) {
            day = Math.min(day, month === 2 ? (that.isLeapYear(year) ? 29 : 28) : 30);
        }
        return [day, month, year];
    },
    isLeapYear: function (year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    },
    addLeadingZero: function (number) {
        return (number < 10 ? '0' : '') + number;
    },
    addLeadingZeroForYear: function (number, fullYearMode) {
        if (fullYearMode) {
            return ((number < 10
                ? '000'
                : number < 100
                    ? '00'
                    : number < 1000
                        ? '0'
                        : '') + number);
        }
        return (number < 10 ? '0' : '') + number;
    },
};

module.exports = {
    DateFormatter: DateFormatter
};
