import { Deal } from "../index";
import { Player } from "../../Player";
import { PokerSimulator } from "../../PokerSimulator";
import { Action } from "../../Action";

const fold = (): Action =>
  new Action({
    type: "fold",
  });

const call = (): Action =>
  new Action({
    type: "call",
  });
const check = (): Action =>
  new Action({
    type: "check",
  });

const players = [
  new Player({ name: "name1", chips: 1 }),
  new Player({ name: "name2", chips: 1 }),
  new Player({ name: "name3", chips: 1 }),
  new Player({ name: "name4", chips: 1 }),
  new Player({ name: "name5", chips: 1 }),
  new Player({ name: "name6", chips: 1 }),
];

describe("getNextPlayer", () => {
  it("preflop, should return undefined when not enough players", () => {
    const PS = new PokerSimulator({ players: [players[0]] });
    const deal = PS.startDeal();
    expect(deal).toBeUndefined();
  });

  it("preflop, should return undefined on illegal players count", () => {
    const PS = new PokerSimulator({ players: [...players, ...players] });
    const deal = PS.startDeal();
    expect(deal).toBeUndefined();
  });

  it("preflop, should return first player when deal created", () => {
    const PS = new PokerSimulator({ players });
    const deal = PS.startDeal();
    const lastPlayer = players[players.length - 1];
    if (deal) {
      expect(deal.getCurrentActivePlayer()).toEqual(lastPlayer);
    } else {
      expect(deal).toBeUndefined();
    }
  });

  it("preflop, should return undefined on non-showdown", () => {
    const PS = new PokerSimulator({ players });
    const deal = PS.startDeal();
    if (!deal) {
      expect(deal).toBeUndefined();
      return;
    }

    PS.handlePlayerAction(fold()) //utg
      .handlePlayerAction(fold()) //mp
      .handlePlayerAction(fold()) //cut
      .handlePlayerAction(fold()) //btn
      .handlePlayerAction(fold()) // sb
      .handlePlayerAction(check()); //bb
    const dealAfterAction = PS.getCurrentDeal();

    if (!dealAfterAction) {
      expect(deal).toBeUndefined();
      return;
    }

    expect(dealAfterAction.getCurrentActivePlayer()).toBeUndefined();
  });

  it("preflop, should work in firstRound", () => {
    const PS = new PokerSimulator({ players });
    const deal = PS.startDeal();
    if (!deal) {
      expect(deal).toBeUndefined();
      return;
    }

    PS.handlePlayerAction(fold());
    const dealAfterAction = PS.getCurrentDeal();
    if (!dealAfterAction) {
      expect(deal).toBeUndefined();
      return;
    }

    const secondPlayer = players[4];
    expect(dealAfterAction.getCurrentActivePlayer()).toEqual(secondPlayer);
  });

  it("preflop, should work in firstRound on BB vs SB, current player - BB", () => {
    const PS = new PokerSimulator({ players });
    const deal = PS.startDeal();
    if (!deal) {
      expect(deal).toBeUndefined();
      return;
    }

    PS.handlePlayerAction(fold()) //utg
      .handlePlayerAction(fold()) //mp
      .handlePlayerAction(fold()) //cut
      .handlePlayerAction(fold()) //btn
      .handlePlayerAction(call()) // sb
      .handlePlayerAction(check()); //bb

    const dealAfterAction = PS.getCurrentDeal(); //bb

    if (!dealAfterAction) {
      expect(deal).toBeUndefined();
      return;
    }

    const sbPlayer = players[1]; //sb
    expect(dealAfterAction.getCurrentActivePlayer()).toEqual(sbPlayer);
  });

  it("should work in secondRound", () => {
    const PS = new PokerSimulator({ players });
    const deal = PS.startDeal();
    if (!deal) {
      expect(deal).toBeUndefined();
      return;
    }

    PS.handlePlayerAction(fold()) //utg
      .handlePlayerAction(call()) //mp
      .handlePlayerAction(call()) //cut
      .handlePlayerAction(call()) //btn
      .handlePlayerAction(call()) // sb
      .handlePlayerAction(check()); //bb

    const dealAfterAction = PS.getCurrentDeal();

    if (!dealAfterAction) {
      expect(deal).toBeUndefined();
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

describe("actions order numbers", () => {
  it("should create correct order", function () {
    const PS = new PokerSimulator({ players });
    const deal = PS.startDeal();
    if (!deal) {
      expect(deal).toBeUndefined();
      return;
    }

    PS.handlePlayerAction(fold()) //utg
      .handlePlayerAction(fold()) //mp
      .handlePlayerAction(fold()) //cut
      .handlePlayerAction(fold()) //btn
      .handlePlayerAction(fold()); // sb
    const dealAfterAction = PS.getCurrentDeal();

    if (!dealAfterAction) {
      expect(deal).toBeUndefined();
      return;
    }
    const actions = dealAfterAction.getDealHistory().getActions();
    actions.forEach((action, index) =>
      expect(action.getNumber()).toBe(index + 1)
    );
  });
});
