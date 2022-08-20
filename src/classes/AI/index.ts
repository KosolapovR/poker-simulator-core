import { RoundType } from "../../type";
import { ACTION } from "../../consts";
import { Player } from "../Player";
import { Deal } from "../Deal";
import { Action } from "../Action";

export interface IAI {
  makeDecision: (deal: Deal) => Action;
}

interface IAIParams {
  name: string;
  chips: number;
}

export class AI extends Player implements IAI {
  private currentDeal?: Deal;

  constructor(params: IAIParams) {
    super({ ...params, isAI: true });
  }

  public makeDecision(deal: Deal): Action {
    this.currentDeal = deal;

    const roundMap: { [key in RoundType]: () => Action } = {
      preflop: AI.getPreFlopAction,
      flop: AI.getFlopAction,
      turn: AI.getTurnAction,
      river: AI.getRiverAction,
      showdown: AI.getShowdownAction,
      nonShowdown: AI.getShowdownAction,
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
  private static getShowdownAction(): Action {
    return new Action({ type: ACTION.check });
  }
}
