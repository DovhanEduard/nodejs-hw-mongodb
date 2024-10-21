function parsNumber(number, defaultValue) {
  const isString = typeof number === 'string';

  if (isString === false) return defaultValue;

  const parsedNumber = parseInt(number);

  if (Number.isNaN(parsedNumber)) return defaultValue;

  return parsedNumber;
}

export function parsePaginationParams(query) {
  const { page, perPage } = query;

  const parsedPage = parsNumber(page, 1);
  const parsedPerPage = parsNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
}
