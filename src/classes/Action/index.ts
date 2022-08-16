import { generateId } from "../../utils";
import { ActionType, RoundType } from "../../type";

export interface IAction {
  getId: () => string;
  getType: () => ActionType;
  getRound: () => RoundType;
  getValue: () => number | undefined;
}

export interface IActionParams {
  type: ActionType;
  round: RoundType;
  value?: number;
}

export class Action implements IAction {
  private readonly id: string;
  private readonly type: ActionType;
  private readonly round: RoundType;
  private readonly value?: number;

  constructor({ type, round, value }: IActionParams) {
    this.id = generateId();
    this.type = type;
    this.round = round;
    this.value = value;
  }

  public getId() {
    return this.id;
  }

  public getType() {
    return this.type;
  }

  public getRound() {
    return this.round;
  }

  public getValue() {
    return this.value;
  }
}
