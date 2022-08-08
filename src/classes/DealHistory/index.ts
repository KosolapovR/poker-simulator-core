import { Action } from "../Action";
import { generateId } from "../../utils";

export class DealHistory {
  private readonly id: string;
  private actions: Action[] = [];
  private dateTime: string;

  constructor() {
    this.id = generateId();
    this.dateTime = new Date().toLocaleDateString();
  }

  public addAction(action: Action) {
    this.actions.push(action);
  }

  public getActions() {
    return this.actions;
  }
}
