# Mood Tracker Specification

## Purpose

A simple, personal mood tracker that runs as plain web pages and saves entries in this browser only. It is for one person using their own computer; it does not need an account or a server.

## Main page

- Open directly to today's mood entries.
- Let the user add more than one entry on the same day.
- Each entry has a required mood score from 1 to 10 and an optional short note.
- Label the scale endpoints: 1 = very bad; 10 = very good.
- Show today's entries, with the date and time for each.
- Let the user edit or delete a saved entry.
- Ask the user to confirm before deleting an entry.

## Past entries

- Provide a calendar so the user can pick a date.
- Show the entries saved for the selected date, including their scores, notes, and times.
- Allow editing and deleting past entries under the same rules as today's entries.

## Weekly summary

- Show the average of all mood scores saved during the Monday-to-Sunday week containing the selected date.
- Show the number of check-ins included and the week's date range.
- Show an empty state when that week has no entries.

## Saving and dates

- Save entries in browser storage on this computer. Entries are available in the same browser where they were entered.
- Each entry records its date and time using the computer's local time.
- Do not send entries to a server or require sign-in.
- If browser data is cleared or the user switches browsers or computers, entries may no longer be available.

## Out of scope for the first version

- Accounts, syncing between devices, sharing, reminders, charts, and medical advice.
