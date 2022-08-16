import { getRangePercent } from "../getCardValuesByRange";
import {
  OFFSUITED_COMBINATIONS,
  PAIRED_COMBINATIONS,
  SUITED_COMBINATIONS,
  TOTAL_COMBINATIONS,
} from "../../consts";

it("should return 12/1326 for one offsuite", () => {
  expect(getRangePercent(["AKo"])).toBe(
    OFFSUITED_COMBINATIONS / TOTAL_COMBINATIONS
  );
});
it("should return 36/1326 for three offsuite", () => {
  expect(getRangePercent(["AKo", "AQo", "AJo"])).toBe(
    (OFFSUITED_COMBINATIONS * 3) / TOTAL_COMBINATIONS
  );
});

it("should return 4/1326 for one suite", () => {
  expect(getRangePercent(["AKs"])).toBe(
    SUITED_COMBINATIONS / TOTAL_COMBINATIONS
  );
});
it("should return 12/1326 for three suite", () => {
  expect(getRangePercent(["AKs", "AQs", "AJs"])).toBe(
    (SUITED_COMBINATIONS * 3) / TOTAL_COMBINATIONS
  );
});

it("should return 6/1326 for one pocket pair", () => {
  expect(getRangePercent(["AA"])).toBe(
    PAIRED_COMBINATIONS / TOTAL_COMBINATIONS
  );
});

it("should return 78/1326 for all pocket pairs", () => {
  expect(
    getRangePercent([
      "AA",
      "KK",
      "QQ",
      "JJ",
      "TT",
      "99",
      "88",
      "77",
      "66",
      "55",
      "44",
      "33",
      "22",
    ])
  ).toBe((PAIRED_COMBINATIONS * 13) / TOTAL_COMBINATIONS);
});
