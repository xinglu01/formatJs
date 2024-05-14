import moment from 'moment';
export function format(date, pattern) {
    return moment(date).format(pattern || 'YYYY-MM-dd hh:mm:ss');
}
//# sourceMappingURL=format.js.map