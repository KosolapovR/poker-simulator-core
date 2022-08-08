import { generateId } from "../../utils";
import { ActionType } from "../../type";

export interface IAction {
  type: ActionType;
}

export class Action {
  private readonly id: string;
  private readonly type: ActionType;

  constructor({ type }: IAction) {
    this.id = generateId();
    this.type = type;
  }

  public getId() {
    return this.id;
  }

  public getType() {
    return this.type;
  }
}
