import dayjs from 'dayjs';

export const formatDate = (time?: string | null) => {
  if (!time) return '';
  const date = dayjs(time);
  if (!date.isValid()) return '';
  return date.format('YYYY-MM-DD');
};

export const getInitialDateFrom = () => {
  const now = new Date();

  if (now.getDate() === 1) {
    now.setMonth(now.getMonth() - 1);
  }

  now.setDate(1);

  return now.toISOString().slice(0, 10);
};
