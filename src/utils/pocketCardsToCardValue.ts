export const pocketCardsToCardValue = (a: string, b: string) => {
  if (a.length !== 2 || b.length !== 2)
    throw Error("Card length should be equal 2");

  const [firstValue, firstSuit] = a.split("");
  const [secondValue, secondSuit] = b.split("");

  const base = `${firstValue}${secondValue}`;
  return firstValue === secondValue
    ? base
    : firstSuit === secondSuit
    ? `${base}s`
    : `${base}o`;
};
