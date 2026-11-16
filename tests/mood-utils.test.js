const test = require("node:test");
const assert = require("node:assert/strict");
const { weeklyAverage } = require("../mood-utils.js");

test("returns no average for a week with no entries", () => {
  assert.deepEqual(weeklyAverage([], "2026-11-18"), {
    average: null,
    count: 0,
    startDate: "2026-11-16",
    endDate: "2026-11-22"
  });
});

test("averages every check-in in the selected Monday-to-Sunday week", () => {
  const entries = [
    { date: "2026-11-16", score: 4 },
    { date: "2026-11-18", score: 8 },
    { date: "2026-11-22", score: 6 },
    { date: "2026-11-23", score: 10 }
  ];

  assert.deepEqual(weeklyAverage(entries, "2026-11-18"), {
    average: 6,
    count: 3,
    startDate: "2026-11-16",
    endDate: "2026-11-22"
  });
});

test("keeps fractional averages precise", () => {
  const entries = [
    { date: "2026-11-17", score: 5 },
    { date: "2026-11-20", score: 8 }
  ];

  assert.equal(weeklyAverage(entries, "2026-11-18").average, 6.5);
});

test("includes Sunday in its week and starts the next week on Monday", () => {
  const entries = [
    { date: "2026-11-15", score: 2 },
    { date: "2026-11-16", score: 5 },
    { date: "2026-11-22", score: 9 },
    { date: "2026-11-23", score: 1 }
  ];

  assert.deepEqual(weeklyAverage(entries, "2026-11-22"), {
    average: 7,
    count: 2,
    startDate: "2026-11-16",
    endDate: "2026-11-22"
  });
  assert.deepEqual(weeklyAverage(entries, "2026-11-23"), {
    average: 1,
    count: 1,
    startDate: "2026-11-23",
    endDate: "2026-11-29"
  });
});

test("ignores malformed dates and scores outside the 1–10 scale", () => {
  const entries = [
    { date: "2026-11-17", score: 7 },
    { date: "2026-11-18", score: 0 },
    { date: "2026-11-19", score: 11 },
    { date: "2026-02-30", score: 10 },
    { date: "not-a-date", score: 3 },
    { date: "2026-11-20", score: 4.5 }
  ];

  assert.deepEqual(weeklyAverage(entries, "2026-11-18"), {
    average: 7,
    count: 1,
    startDate: "2026-11-16",
    endDate: "2026-11-22"
  });
});

test("does not change the entries it receives", () => {
  const entries = [{ date: "2026-11-17", score: 6 }];
  const original = structuredClone(entries);
  weeklyAverage(entries, "2026-11-18");
  assert.deepEqual(entries, original);
});

test("returns an empty result for an invalid selected date", () => {
  assert.deepEqual(weeklyAverage([], "2026-02-30"), {
    average: null,
    count: 0,
    startDate: null,
    endDate: null
  });
});
