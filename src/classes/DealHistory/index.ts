import { Action } from "../Action";
import { generateId } from "../../utils";

export interface IDealHistory {
  getId: () => string;
  getDateTime: () => string;
  getActions: () => Action[];
  addAction: (action: Action) => {};
}
export class DealHistory implements IDealHistory {
  private readonly id: string;
  private actions: Action[] = [];
  private readonly dateTime: string;

  constructor() {
    this.id = generateId();
    this.dateTime = new Date().toLocaleDateString();
  }

  public getId() {
    return this.id;
  }

  public getDateTime() {
    return this.dateTime;
  }

  public addAction(action: Action) {
    this.actions.push(action);
    return this;
  }

  public getActions() {
    return this.actions;
  }
}
