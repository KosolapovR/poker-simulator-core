import { PokerSimulator } from "../index";
import { Player } from "../../Player";

test("startDeal should return undefined without players", function () {
  const PS = new PokerSimulator({ players: [] });
  expect(PS.startDeal()).toBeUndefined();
});

test("startDeal should return deal with preflop round", function () {
  const player = new Player({ name: "hero", chips: 100 });
  const PS = new PokerSimulator({ players: [player] });
  expect(PS.startDeal()?.getRound()).toBe("preflop");
});
