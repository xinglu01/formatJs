import moment from 'moment';

export function format(date: string | number, pattern?: string) {
    return moment(date).format(pattern || 'YYYY-MM-dd hh:mm:ss');
}
