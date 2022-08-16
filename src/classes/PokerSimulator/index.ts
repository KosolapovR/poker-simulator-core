import { BehaviorType, GameStatusType } from "../../type";
import { Player } from "../Player";
import { Deal } from "../Deal";
import { Action } from "../Action";
import { AI } from "../AI";
import { changePlayersPosition } from "../../utils/changePlayersPosition";
import { POSITION_ORDER } from "../../consts";
import { sortPlayersByPosition } from "../../utils";

export interface IPokerSimulator {
  handlePlayerAction: (action: Action) => Deal | undefined;
  startDeal: () => Deal | undefined;
  removePlayer: (player: Player) => void;
  getCurrentDeal: () => Deal | undefined;
}

export interface IPokerSimulatorParams {
  players: Player[];
  behaviorType?: BehaviorType;
}

export class PokerSimulator implements IPokerSimulator {
  private behaviorType?: BehaviorType;
  private players: Player[];
  private currentDeal?: Deal;
  private status: GameStatusType = "pending";

  constructor({ players, behaviorType = "tag" }: IPokerSimulatorParams) {
    this.behaviorType = behaviorType;
    this.players = players;
  }
  public handlePlayerAction(action: Action): Deal | undefined {
    this.currentDeal?.addAction(action);

    while (
      PokerSimulator.needGenerateAIAction(this.currentDeal) &&
      this.currentDeal?.getCurrentActivePlayer() instanceof AI
    ) {
      const AI = this.currentDeal?.getCurrentActivePlayer() as AI;
      this.currentDeal?.addAction(AI.makeDecision(this.currentDeal));
    }

    return this.currentDeal;
  }

  public startDeal(): Deal | undefined {
    if (this.players.length < 2 || this.players.length > 6) return undefined;
    this.players = sortPlayersByPosition(this.players);

    if (this.status === "pending") {
      this.initializePlayersPositions();
      this.status = "inProgress";
    } else {
      this.changePlayersPositions();
    }

    this.currentDeal = new Deal({ players: this.players });

    while (
      PokerSimulator.needGenerateAIAction(this.currentDeal) &&
      this.currentDeal?.getCurrentActivePlayer() instanceof AI
    ) {
      const AI = this.currentDeal?.getCurrentActivePlayer() as AI;
      this.currentDeal?.addAction(AI.makeDecision(this.currentDeal));
    }
    return this.currentDeal;
  }

  public removePlayer(p: Player) {
    this.players = this.players.filter(
      (player) => player.getId() !== p.getId()
    );
  }

  public getCurrentDeal() {
    return this.currentDeal;
  }

  private initializePlayersPositions() {
    this.players.forEach((p, index) => {
      p.setPosition(POSITION_ORDER[index]);
    });
  }

  private changePlayersPositions() {
    const changePositionResult = changePlayersPosition(this.players);
    if (!changePositionResult) {
      throw new Error(
        `something went wrong tried to change positions ${this.players}`
      );
    }
    this.setPlayers(changePositionResult);
  }

  private setPlayers(players: Player[]) {
    this.players = players;
    return this;
  }

  private static needGenerateAIAction(deal?: Deal) {
    if (!deal) return false;

    const activePlayer = deal.getCurrentActivePlayer();
    if (!activePlayer) return false;
    //TODO return true if next turn is AI
    if (activePlayer instanceof AI) {
      return false;
    } else {
      return false;
    }
  }
}
