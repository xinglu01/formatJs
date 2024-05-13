import moment from 'moment';

export function format(pattern: string) {
    moment().format(pattern);
}
