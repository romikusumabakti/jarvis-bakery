export const formatNumber = (number) => {
  return new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 2,
  }).format(number);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

export const formatTime = (date) => {
  return new Intl.DateTimeFormat('id-ID', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
};
