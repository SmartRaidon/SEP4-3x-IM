export function timeFormat(time) {
  const t = new Date(time);
  return `${t.getHours()}:${String(t.getMinutes()).padStart(2, "0")}`;
}
