export function formatLongDate(date = new Date()) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function getYearsTogether(startDate) {
  const start = new Date(startDate);
  const now = new Date();
  const years = now.getFullYear() - start.getFullYear();
  const anniversaryThisYear = new Date(now.getFullYear(), start.getMonth(), start.getDate());

  return now < anniversaryThisYear ? years - 1 : years;
}
