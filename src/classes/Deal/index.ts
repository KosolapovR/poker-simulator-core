import { CardType, RoundType } from "../../type";
import { generateId, sortPlayersByPosition } from "../../utils";
import { Player } from "../Player";
import { DealHistory } from "../DealHistory";
import { Action } from "../Action";
import { DECK, POSITION_ORDER } from "../../consts";
import { AI } from "../AI";

export interface IDeal {
  getId: () => string;
  getPlayers: () => Player[];
  getDealHistory: () => DealHistory;
  getRound: () => RoundType;
  setRound: (r: RoundType) => {};
  removePlayer: (p: Player) => {} | void;
  addAction: (a: Action) => {};
  getCurrentActivePlayer: () => Player | AI | undefined;
  generateFlop: () => [CardType, CardType, CardType];
  generateTurn: () => CardType;
  generateRiver: () => CardType;
  getFlop: () => [CardType, CardType, CardType] | undefined;
  getTurn: () => CardType | undefined;
  getRiver: () => CardType | undefined;
  getCurrentDeck: () => CardType[];
  getAvailableActions: () => Action[];
}

export type IDealParams = {
  players: Player[];
};

export class Deal implements IDeal {
  private readonly id: string;
  private round: RoundType = "preflop";
  private players: Player[];
  private readonly dealHistory: DealHistory;
  private currentDeck: CardType[] = [...DECK];
  private flop?: [CardType, CardType, CardType];
  private turn?: CardType;
  private river?: CardType;
  private currentActivePlayer?: Player | AI;

  constructor({ players }: IDealParams) {
    this.id = generateId();
    this.players = players;
    this.dealHistory = new DealHistory();
    this.dealCards();
    this.currentActivePlayer = players[players.length - 1];
  }

  public getRound() {
    return this.round;
  }
  public getPlayers() {
    return this.players;
  }

  public setRound(round: RoundType) {
    this.round = round;
    return this;
  }

  public removePlayer(player: Player) {
    const playerToRemove = this.players.find(
      (p) => p.getId() === player.getId()
    );
    if (!playerToRemove) return;

    this.players = this.players.filter(
      (p) => p.getId() !== playerToRemove.getId()
    );

    return this;
  }

  public addAction(action: Action) {
    this.dealHistory.addAction(
      action
        .setNumber(this.getDealHistory().getActions().length + 1)
        .setRound(this.round)
    );

    this.changeRoundIfNecessary(action);

    const currPlayer = this.getCurrentActivePlayer();
    const shouldRemovePlayer = action.getType() === "fold" && currPlayer;

    const nextPlayer = this.getNextPlayer();

    if (shouldRemovePlayer) {
      this.removePlayer(currPlayer);
    }

    this.currentActivePlayer = nextPlayer;

    return this;
  }

  public getDealHistory() {
    return this.dealHistory;
  }

  public getId(): string {
    return this.id;
  }

  public getCurrentActivePlayer() {
    return this.currentActivePlayer;
  }

  public generateFlop() {
    const [card1] = this.currentDeck.splice(
      Math.floor(Math.random() * this.currentDeck.length),
      1
    );
    const [card2] = this.currentDeck.splice(
      Math.floor(Math.random() * this.currentDeck.length),
      1
    );
    const [card3] = this.currentDeck.splice(
      Math.floor(Math.random() * this.currentDeck.length),
      1
    );
    this.flop = [card1, card2, card3];
    return this.flop;
  }

  public generateTurn() {
    const [card] = this.currentDeck.splice(
      Math.floor(Math.random() * this.currentDeck.length),
      1
    );
    this.turn = card;
    return this.turn;
  }

  public generateRiver() {
    const [card] = this.currentDeck.splice(
      Math.floor(Math.random() * this.currentDeck.length),
      1
    );
    this.river = card;
    return this.river;
  }

  public getFlop() {
    return this.flop;
  }

  public getTurn() {
    return this.turn;
  }

  public getRiver() {
    return this.river;
  }

  public getCurrentDeck() {
    return this.currentDeck;
  }

  public getAvailableActions() {
    return [];
  }

  private dealCards = () => {
    this.players.forEach((p: Player) => {
      const [card1] = this.currentDeck.splice(
        Math.floor(Math.random() * this.currentDeck.length),
        1
      );
      const [card2] = this.currentDeck.splice(
        Math.floor(Math.random() * this.currentDeck.length),
        1
      );

      p.setCards([card1, card2]);
    });
  };

  private getNextPlayer() {
    if (
      !this.getCurrentActivePlayer() ||
      this.getRound() === "nonShowdown" ||
      this.getRound() === "showdown"
    ) {
      return undefined;
    }

    if (this.getDealHistory().getActions().length === 0) {
      return this.getCurrentActivePlayer();
    }
    const currPlayerPos = this.getCurrentActivePlayer()?.getPosition();
    if (!currPlayerPos) return undefined;
    const index = POSITION_ORDER.indexOf(currPlayerPos);

    const sorted = sortPlayersByPosition(this.getPlayers());
    const isLastPlayerInTable = currPlayerPos === sorted[0].getPosition();
    if (isLastPlayerInTable) {
      return sorted[sorted.length - 1];
    } else {
      const nextPlayerPos = POSITION_ORDER[index - 1];
      return this.getPlayers().find((p) => p.getPosition() === nextPlayerPos);
    }
  }

  private changeRoundIfNecessary(lastAction: Action): void {
    const currPlayer = this.getCurrentActivePlayer();
    const shouldRemovePlayer = lastAction.getType() === "fold" && currPlayer;

    if (
      Deal.isDealEndWithNoShowdown(
        shouldRemovePlayer ? this.players.length - 1 : this.players.length
      )
    ) {
      this.setRound("nonShowdown");
    }
  }

  private static isDealEndWithNoShowdown(playersCount: number) {
    return playersCount === 1;
  }
}
