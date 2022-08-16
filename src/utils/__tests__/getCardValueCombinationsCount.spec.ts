import { getCardValueCombinationsCount } from "../getCardValuesByRange";
import {
  OFFSUITED_COMBINATIONS,
  PAIRED_COMBINATIONS,
  SUITED_COMBINATIONS,
} from "../../consts";

it("should return 6 for pocket pair", () => {
  expect(getCardValueCombinationsCount("AA")).toBe(PAIRED_COMBINATIONS);
});

it("should return 12 for offsuited", () => {
  expect(getCardValueCombinationsCount("AKo")).toBe(OFFSUITED_COMBINATIONS);
});

it("should return 4 for suited", () => {
  expect(getCardValueCombinationsCount("AKs")).toBe(SUITED_COMBINATIONS);
});
