import { pocketCardsToCardValue } from "../pocketCardsToCardValue";

it("offsuit", () => {
  expect(pocketCardsToCardValue("Ah", "Kd")).toBe("AKo");
});

it("suit", () => {
  expect(pocketCardsToCardValue("Ah", "Kh")).toBe("AKs");
});

it("pocket pair", () => {
  expect(pocketCardsToCardValue("Ah", "Ad")).toBe("AA");
});
