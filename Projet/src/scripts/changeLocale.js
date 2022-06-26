/** Change D3 locale, used in time labels */
export async function changeLocale() {
  const locale = await d3.json(
    'https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/fr-CA.json',
  );
  locale.shortMonths = locale.shortMonths.map(
    (month) => month.slice(0, 1).toUpperCase() + month.slice(1),
  );
  locale.months = locale.months.map(
    (month) => month.slice(0, 1).toUpperCase() + month.slice(1),
  );

  d3.timeFormatDefaultLocale(locale);
}
