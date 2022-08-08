import { CARD_VALUES, TOTAL_COMBINATIONS } from "../consts";

const getCardValueCombinationsCount = (cardValue: string) =>
  cardValue.length === 2 ? 6 : cardValue.slice(2) === "s" ? 4 : 12;

const getCurrentRangeStrength = (cardValues: string[]) =>
  cardValues.reduce<number>(
    (acc: number, curr: string) => (acc += getCardValueCombinationsCount(curr)),
    0
  ) / TOTAL_COMBINATIONS;

const getCardValuesByRange = (openingRange: number) =>
  CARD_VALUES.reduce((acc: string[], curr: string) => {
    if (getCurrentRangeStrength([...acc, curr]) > openingRange) return acc;
    return [...acc, curr];
  }, []);

export { getCardValuesByRange };
