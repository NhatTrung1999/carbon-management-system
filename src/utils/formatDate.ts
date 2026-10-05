import dayjs from 'dayjs';

export const formatDate = (time?: string | null) => {
  if (!time) return '';
  const date = dayjs(time);
  if (!date.isValid()) return '';
  return date.format('YYYY-MM-DD');
};

// Today as YYYY-MM-DD in local time (toISOString() would give the UTC date).
export const todayLocal = () => dayjs().format('YYYY-MM-DD');

// First day of the current month, or of the previous month when today is the 1st.
export const getInitialDateFrom = () => {
  const now = dayjs();
  const base = now.date() === 1 ? now.subtract(1, 'month') : now;
  return base.startOf('month').format('YYYY-MM-DD');
};
