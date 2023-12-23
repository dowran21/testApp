import dayjs from 'dayjs';

export const formatDate = (date) => {
    return dayjs(date).format('YYYY-MM-DD')
}
 
export const exFormatDate = (date, format) => {
    return dayjs(date).format(format)
}