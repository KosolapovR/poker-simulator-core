import { Deal } from "../index";
import { Player } from "../../Player";
import { PokerSimulator } from "../../PokerSimulator";
import { getNextPlayer } from "../../../utils";
import { Action } from "../../Action";

describe("getNextPlayer", () => {
  const players = [
    new Player({ name: "name1", chips: 1 }),
    new Player({ name: "name2", chips: 1 }),
    new Player({ name: "name3", chips: 1 }),
    new Player({ name: "name4", chips: 1 }),
    new Player({ name: "name5", chips: 1 }),
    new Player({ name: "name6", chips: 1 }),
  ];

  it("should return undefined when not enough players", () => {
    const PS = new PokerSimulator({ players: [players[0]] });
    const createdDeal = PS.startDeal();
    expect(createdDeal).toBeUndefined();
  });

  it("should return undefined on illegal players count", () => {
    const PS = new PokerSimulator({ players: [...players, ...players] });
    const createdDeal = PS.startDeal();
    expect(createdDeal).toBeUndefined();
  });

  it("should return first player when deal created", () => {
    const PS = new PokerSimulator({ players });
    const createdDeal = PS.startDeal();
    const lastPlayer = players[players.length - 1];
    if (createdDeal) {
      expect(getNextPlayer(createdDeal)).toEqual(lastPlayer);
    } else {
      expect(createdDeal).toBeUndefined();
    }
  });

  it("should work in firstRound", () => {
    const PS = new PokerSimulator({ players });
    const createdDeal = PS.startDeal();
    if (!createdDeal) {
      expect(createdDeal).toBeUndefined();
      return;
    }

    const firstPlayerAction = new Action({
      type: "fold",
      round: createdDeal.getRound(),
    });

    const dealAfterAction = PS.handlePlayerAction(firstPlayerAction);
    if (!dealAfterAction) {
      expect(createdDeal).toBeUndefined();
      return;
    }

    const secondPlayer = players[4];
    expect(dealAfterAction.getCurrentActivePlayer()).toEqual(secondPlayer);
  });

  it("should work in secondRound", () => {
    const PS = new PokerSimulator({ players });
    const createdDeal = PS.startDeal();
    if (!createdDeal) {
      expect(createdDeal).toBeUndefined();
      return;
    }

    const firstPlayerAction = new Action({
      type: "fold",
      round: createdDeal.getRound(),
    });

    const bbPlayerAction = new Action({
      type: "check",
      round: createdDeal.getRound(),
    });

    const otherPlayersAction = new Action({
      type: "call",
      round: createdDeal.getRound(),
    });
    PS.handlePlayerAction(firstPlayerAction); //utg
    PS.handlePlayerAction(otherPlayersAction); //mp
    PS.handlePlayerAction(otherPlayersAction); //cut
    PS.handlePlayerAction(otherPlayersAction); //btn
    PS.handlePlayerAction(otherPlayersAction); //sb
    const dealAfterAction = PS.handlePlayerAction(bbPlayerAction); //bb

    if (!dealAfterAction) {
      expect(createdDeal).toBeUndefined();
      return;
    }

    const firstPlayerInSecondRound = players[4];
    expect(dealAfterAction.getCurrentActivePlayer()).toEqual(
      firstPlayerInSecondRound
    );
  });
});

describe("discard cards", () => {
  it("should dealt cards after initiation", function () {
    const players = [
      new Player({ name: "name1", chips: 1 }),
      new Player({ name: "name2", chips: 1 }),
    ];

    new Deal({ players });
    const firstPlayerCards = players[0].getCards();
    const secondPlayerCards = players[1].getCards();
    expect(firstPlayerCards.length).toBe(2);
    expect(secondPlayerCards.length).toBe(2);
  });

  it("should discard dealt preflop cards", function () {
    const players = [
      new Player({ name: "name1", chips: 1 }),
      new Player({ name: "name2", chips: 1 }),
    ];

    const deal = new Deal({ players });
    const [firstCard, secondCard] = players[0].getCards();
    expect(deal.getCurrentDeck().includes(firstCard)).toBeFalsy();
    expect(deal.getCurrentDeck().includes(secondCard)).toBeFalsy();
  });

  it("should discard dealt flop cards", function () {
    const players = [
      new Player({ name: "name1", chips: 1 }),
      new Player({ name: "name2", chips: 1 }),
    ];

    const deal = new Deal({ players });
    const flopCards = deal.generateFlop();
    flopCards.forEach((card) => {
      expect(deal.getCurrentDeck().includes(card)).toBeFalsy();
    });
  });

  it("should discard dealt turn cards", function () {
    const players = [
      new Player({ name: "name1", chips: 1 }),
      new Player({ name: "name2", chips: 1 }),
    ];

    const deal = new Deal({ players });
    const turnCard = deal.generateTurn();
    expect(deal.getCurrentDeck().includes(turnCard)).toBeFalsy();
  });

  it("should discard dealt river cards", function () {
    const players = [
      new Player({ name: "name1", chips: 1 }),
      new Player({ name: "name2", chips: 1 }),
    ];

    const deal = new Deal({ players });
    const riverCard = deal.generateRiver();
    expect(deal.getCurrentDeck().includes(riverCard)).toBeFalsy();
  });
});
