(function (root, factory) {
  const moodUtils = factory();
  if (typeof module === "object" && module.exports) module.exports = moodUtils;
  if (root) root.MoodUtils = moodUtils;
})(typeof globalThis === "undefined" ? this : globalThis, function () {
  "use strict";

  function parseDateKey(dateKey) {
    if (typeof dateKey !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) return null;
    const [year, month, day] = dateKey.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
    return date;
  }

  function toDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function weeklyAverage(entries, selectedDate) {
    const selected = parseDateKey(selectedDate);
    if (!selected) return { average: null, count: 0, startDate: null, endDate: null };

    const start = new Date(selected.getFullYear(), selected.getMonth(), selected.getDate());
    const daysFromMonday = (start.getDay() + 6) % 7;
    start.setDate(start.getDate() - daysFromMonday);
    const end = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    end.setDate(end.getDate() + 6);

    const startDate = toDateKey(start);
    const endDate = toDateKey(end);
    let total = 0;
    let count = 0;

    for (const entry of Array.isArray(entries) ? entries : []) {
      if (!entry || typeof entry.date !== "string" || entry.date < startDate || entry.date > endDate) continue;
      if (!parseDateKey(entry.date) || !Number.isInteger(entry.score) || entry.score < 1 || entry.score > 10) continue;
      total += entry.score;
      count += 1;
    }

    return {
      average: count === 0 ? null : total / count,
      count,
      startDate,
      endDate
    };
  }

  return { weeklyAverage };
});
