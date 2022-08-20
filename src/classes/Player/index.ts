import { CardType, PlayerStatusType, PositionType } from "../../type";
import { generateId } from "../../utils";

export interface IPlayer {
  getId: () => string;
  getName: () => string;
  getChips: () => number;
  getIsAI: () => boolean;
  setName: (s: string) => {};
  setChips: (n: number) => {};
  getPosition: () => PositionType | undefined;
  setPosition: (p: PositionType) => {};
  getCards: () => CardType[];
  setCards: (cards: [CardType, CardType]) => {};
  getStatus: () => PlayerStatusType | undefined;
  setStatus: (s: PlayerStatusType) => {};
}

type PlayerParamsType = {
  name: string;
  chips: number;
  isAI?: boolean;
};

export class Player implements IPlayer {
  private readonly id: string;
  private readonly isAI: boolean;
  private name: string;
  private chips: number;
  private position?: PositionType;
  private cards: CardType[] | [] = [];
  private status?: PlayerStatusType;

  constructor({ name, chips, isAI = false }: PlayerParamsType) {
    this.id = generateId();
    this.name = name;
    this.chips = chips;
    this.isAI = isAI;
  }

  public getPosition(): PositionType | undefined {
    return this.position;
  }

  public setPosition(p?: PositionType) {
    this.position = p;
    return this;
  }

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getChips() {
    return this.chips;
  }

  public setName(name: string) {
    this.name = name;
    return this;
  }

  public setChips(chips: number) {
    this.chips = chips;
    return this;
  }

  public getIsAI() {
    return this.isAI;
  }

  public getCards(): CardType[] {
    return this.cards;
  }

  public setCards(cards: [CardType, CardType]) {
    this.cards = cards;
    return this;
  }

  public getStatus(): PlayerStatusType | undefined {
    return this.status;
  }

  public setStatus(s: PlayerStatusType) {
    this.status = s;
    return this;
  }
}
