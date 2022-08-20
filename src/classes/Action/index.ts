import { generateId } from "../../utils";
import { ActionType, RoundType } from "../../type";

export interface IAction {
  getId: () => string;
  getNumber: () => number | undefined;
  setNumber: (n: number) => {};
  getType: () => ActionType;
  getRound: () => RoundType | undefined;
  getValue: () => number | undefined;
}

export interface IActionParams {
  type: ActionType;
  value?: number;
}

export class Action implements IAction {
  private readonly id: string;
  private number?: number;
  private readonly type: ActionType;
  private round?: RoundType;
  private readonly value?: number;

  constructor({ type, value }: IActionParams) {
    this.id = generateId();
    this.type = type;
    this.value = value;
  }

  public getId() {
    return this.id;
  }

  public getNumber() {
    return this.number;
  }

  public setNumber(n: number) {
    this.number = n;
    return this;
  }

  public getType() {
    return this.type;
  }

  public getRound() {
    return this.round;
  }

  public setRound(r: RoundType) {
    this.round = r;
    return this;
  }

  public getValue() {
    return this.value;
  }
}
