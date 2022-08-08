import { BehaviorType } from "../../type";
import { Player } from "../Player";
import { Deal } from "../Deal";
import { Action } from "../Action";
import { AI } from "../AI";

export interface IPokerSimulator {
  handlePlayerAction: (action: Action) => Deal | Promise<Deal | void>;
  startDeal: () => Deal | undefined;
}

export interface IPokerSimulatorParams {
  players: Player[];
  behaviorType?: BehaviorType;
  withFakeIADelay?: boolean;
}

export class PokerSimulator implements IPokerSimulator {
  private behaviorType?: BehaviorType;
  private ai: AI;
  private players: Player[];
  private currentDeal?: Deal;
  private dealer?: Player;
  private withFakeIADelay?: boolean;

  constructor({
    players,
    behaviorType = "tag",
    withFakeIADelay = false,
  }: IPokerSimulatorParams) {
    this.behaviorType = behaviorType;
    const ai = new AI({ name: "computer", chips: 200 });
    this.ai = ai;
    this.players = [...players, ai];
    this.dealer = ai;
    this.withFakeIADelay = withFakeIADelay;
  }
  public async handlePlayerAction(action: Action): Promise<Deal | void> {
    this.currentDeal?.addAction(action);

    while (PokerSimulator.needGenerateAIAction(this.currentDeal)) {
      if (this.currentDeal) {
        const AiAction = this.ai.makeDecision(this.currentDeal);
        if (AiAction) {
          this.currentDeal?.addAction(AiAction);
        }
      }
    }

    return this.withFakeIADelay
      ? new Promise((resolve) => {
          setTimeout(() => {
            resolve(this.currentDeal);
          }, 1000);
        })
      : this.currentDeal;
  }

  public startDeal(): Deal | undefined {
    if (this.players.length < 2) return undefined;

    this.currentDeal = new Deal({ players: this.players });
    return this.currentDeal;
  }

  private changeDealer() {
    this.dealer = this.players.find((p) =>
      this.dealer?.getIsAI() ? !p.getIsAI() : p.getIsAI()
    );
  }

  private static needGenerateAIAction(deal?: Deal) {
    deal?.getDealHistory().getActions();
    //TODO return true if next turn is AI
    return true;
  }
}
