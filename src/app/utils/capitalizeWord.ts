export function capitalizeWord(text: string) {
  return text.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
}
