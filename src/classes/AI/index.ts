import { RoundType } from "../../type";
import { ACTION } from "../../consts";
import { Player } from "../Player";
import { Deal } from "../Deal";
import { Action } from "../Action";

interface IAI {
  name: string;
  chips: number;
}

export class AI extends Player {
  private currentDeal?: Deal;

  constructor(params: IAI) {
    super({ ...params, isAI: true });
  }

  public makeDecision(deal: Deal): Action | void {
    this.currentDeal = deal;

    const roundMap: { [key in RoundType]: () => Action | undefined } = {
      preflop: AI.getPreFlopAction,
      flop: AI.getFlopAction,
      turn: AI.getTurnAction,
      river: AI.getRiverAction,
      showdown: AI.getShowdownAction,
    };

    const getActionByRoundFunc = roundMap[deal.getRound()];

    return getActionByRoundFunc();
  }

  private static getPreFlopAction(): Action {
    return new Action({ type: ACTION.check });
  }

  private static getFlopAction(): Action {
    return new Action({ type: ACTION.check });
  }

  private static getTurnAction(): Action {
    return new Action({ type: ACTION.check });
  }

  private static getRiverAction(): Action {
    return new Action({ type: ACTION.check });
  }
  private static getShowdownAction(): undefined {
    return undefined;
  }
}
