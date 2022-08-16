import { AI, Deal, Player } from "../classes";
import { RoundType } from "../type";
import { POSITION_ORDER } from "../consts";
import { sortPlayersByPosition } from "./sortPlayersByPosition";

const getNextActivePlayerOnPreflop = (deal: Deal): Player | AI | undefined => {
  const preflopActionsLength = deal
    .getDealHistory()
    .getActionsByRound("preflop").length;
  if (preflopActionsLength === 0) {
    return deal.getCurrentActivePlayer();
  }
  const currPlayerPos = deal.getCurrentActivePlayer()?.getPosition();
  if (!currPlayerPos) return;
  const index = POSITION_ORDER.indexOf(currPlayerPos);

  const sorted = sortPlayersByPosition(deal.getPlayers());
  const isLastPlayerInTable = currPlayerPos === sorted[0].getPosition();
  if (isLastPlayerInTable) {
    const firstPlayerInTable = sorted[sorted.length - 1];
    return firstPlayerInTable;
  } else {
    const nextPlayerPos = POSITION_ORDER[index - 1];
    const leftSidePlayer = deal
      .getPlayers()
      .find((p) => p.getPosition() === nextPlayerPos);
    return leftSidePlayer;
  }
};

export const getNextPlayer = (deal: Deal): Player | AI | undefined => {
  if (!deal.getCurrentActivePlayer()) return undefined;

  const getNextPlayerByRoundFuncMap: {
    [key in RoundType]: (deal: Deal) => Player | AI | undefined;
  } = {
    preflop: getNextActivePlayerOnPreflop,
    flop: () => undefined,
    turn: () => undefined,
    river: () => undefined,
    showdown: () => undefined,
  };
  return getNextPlayerByRoundFuncMap[deal.getRound()](deal);
};
