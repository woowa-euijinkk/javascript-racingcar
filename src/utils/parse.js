export function isEmptryOrNil(v) {
  if (v === '') {
    return true;
  }
  if (v === undefined) {
    return true;
  }
  if (v === null) {
    return true;
  }
  return false;
}
