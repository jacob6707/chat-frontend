export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isBottom(el) {
  return el.scrollTop + el.clientHeight >= el.scrollHeight;
}
