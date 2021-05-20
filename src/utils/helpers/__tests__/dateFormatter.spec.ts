import {
  formatHourMinuteDate,
  formatLongDate,
  formatScreenDateToISO,
  formatShortDate,
  formatToScreenDate,
} from '../dateFormatter';

test('should format a Date date to the right pattern', () => {
  const result = formatToScreenDate(new Date('2020-01-01'));

  expect(result).toBe('01/01/2020');
});

test('should format a ISO date to the right pattern', () => {
  const isoDateRegex = new RegExp(
    /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])/g,
  );
  const dateFormatted = formatScreenDateToISO(new Date());
  expect(isoDateRegex.test(dateFormatted)).toBe(true);
});

test('should format a short date to the right pattern', () => {
  const shortDateRegex = new RegExp(
    /^(3[01]|0[1-9]|[12][0-9])['/'](1[0-2]|0[1-9])['/'](-?(?:[1-9][0-9]*)?[0-9]{4})/g,
  );
  const dateFormatted = formatShortDate(new Date());
  expect(shortDateRegex.test(dateFormatted));
});

test('should format a long date to the right pattern', () => {
  const longDateRegex = new RegExp(/[0-9]\s[a-zA-Z]{2}\s[a-zA-Z]+/g);
  const longDateFormatted = formatLongDate(new Date());
  expect(longDateRegex.test(longDateFormatted)).toBe(true);
});

test('should format a date into hour minute in the right pattern', () => {
  const hourMinuteRegex = new RegExp(/^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/g);
  const dateFormatted = formatHourMinuteDate(new Date());
  expect(hourMinuteRegex.test(dateFormatted)).toBe(true);
});
