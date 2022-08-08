import { RoundType } from "../../type";
import { generateId } from "../../utils";
import { Player } from "../Player";
import { DealHistory } from "../DealHistory";
import { Action } from "../Action";

export interface IDeal {
  getId: () => string;
  getPlayers: () => Player[];
  getDealHistory: () => DealHistory;
  getRound: () => RoundType;
  setRound: (r: RoundType) => {};
  removePlayer: (p: Player) => {};
  addAction: (a: Action) => {};
  getCurrentActivePlayer: () => Player | void;
}

export type IDealParams = {
  players: Player[];
};

export class Deal implements IDeal {
  private readonly id: string;
  private round: RoundType = "preflop";
  private players: Player[];
  private readonly dealHistory: DealHistory;

  constructor({ players }: IDealParams) {
    this.id = generateId();
    this.players = players;
    this.dealHistory = new DealHistory();
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
    if (!playerToRemove) throw Error("player not found");

    this.players = this.players.filter(
      (p) => p.getId() !== playerToRemove.getId()
    );

    return this;
  }

  public addAction(action: Action) {
    this.dealHistory.addAction(action);

    return this;
  }

  public getDealHistory(): DealHistory {
    return this.dealHistory;
  }

  public getId(): string {
    return this.id;
  }

  public getCurrentActivePlayer(): Player | undefined {
    return undefined;
  }
}
