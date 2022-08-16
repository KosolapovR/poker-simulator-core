import { CardType } from "../type";

export const pocketCardsToCardValue = (a: CardType, b: CardType): string => {
  const [firstValue, firstSuit] = a.split("");
  const [secondValue, secondSuit] = b.split("");

  const base = `${firstValue}${secondValue}`;
  return firstValue === secondValue
    ? base
    : firstSuit === secondSuit
    ? `${base}s`
    : `${base}o`;
};
