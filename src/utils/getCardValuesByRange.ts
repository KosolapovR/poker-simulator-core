import { CARD_VALUES, TOTAL_COMBINATIONS } from "../consts";
import { CardValueType } from "../type";

export const getCardValueCombinationsCount = (cardValue: CardValueType) =>
  cardValue.length === 2 ? 6 : cardValue.slice(2) === "s" ? 4 : 12;

export const getRangePercent = (cardValues: CardValueType[]): number =>
  cardValues.reduce<number>(
    (acc: number, curr: CardValueType) =>
      acc + getCardValueCombinationsCount(curr),
    0
  ) / TOTAL_COMBINATIONS;

export const getCardValuesByRange = (openingRange: number): CardValueType[] =>
  CARD_VALUES.reduce<Array<CardValueType>>(
    (acc: CardValueType[], curr: CardValueType) => {
      if (getRangePercent([...acc, curr]) * 100 > openingRange) return acc;
      return [...acc, curr];
    },
    []
  );
