import dayjs from 'dayjs';

export const formatDate = (iso: string) => {
  const formatted = dayjs(iso).format('YYYY-MM-DD');
  return formatted;
};
