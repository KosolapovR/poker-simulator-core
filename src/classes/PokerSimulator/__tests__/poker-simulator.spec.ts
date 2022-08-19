import { PokerSimulator } from "../index";
import { Player } from "../../Player";

describe("startDeal", () => {
  it("startDeal should return undefined without players", function () {
    const PS = new PokerSimulator({ players: [] });
    expect(PS.startDeal()).toBeUndefined();
  });

  it("startDeal should return deal with preflop round", function () {
    const player1 = new Player({ name: "hero1", chips: 100 });
    const player2 = new Player({ name: "hero2", chips: 100 });
    const PS = new PokerSimulator({ players: [player1, player2] });
    expect(PS.startDeal()?.getRound()).toBe("preflop");
  });
});
