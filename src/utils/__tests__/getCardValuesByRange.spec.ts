import { getCardValuesByRange } from "../getCardValuesByRange";
import { CARD_VALUES } from "../../consts";

it("0% range", () => {
  expect(getCardValuesByRange(0)).toEqual([]);
});

it("1% range", () => {
  expect(getCardValuesByRange(1)).toEqual(["AA", "KK"]);
});
it("2% range", () => {
  expect(getCardValuesByRange(2)).toEqual(["AA", "KK", "AKs", "QQ", "AQs"]);
});

it("100% range", () => {
  expect(getCardValuesByRange(100)).toEqual(CARD_VALUES);
});
