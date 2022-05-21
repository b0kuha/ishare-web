import dayjs from 'dayjs';

export function parseTime(date, fmt) {
    return dayjs(date).format(fmt);
}
