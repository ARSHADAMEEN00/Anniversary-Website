export function shuffleArray(items) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }

  const unchanged = copy.every((item, index) => item.id === items[index].id);
  if (unchanged && copy.length > 1) {
    [copy[0], copy[1]] = [copy[1], copy[0]];
  }

  return copy;
}
