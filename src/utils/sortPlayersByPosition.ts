import { Player } from "../classes";
import { POSITION_ORDER } from "../consts";
import { PositionType } from "../type";

export const sortPlayersByPosition = (players: Player[]): Player[] =>
  players.sort((a, b) => {
    const aPos = a.getPosition();
    const bPos = b.getPosition();
    if (aPos === undefined || bPos === undefined) {
      return 0;
    } else {
      return (
        POSITION_ORDER.indexOf(aPos as PositionType) -
        POSITION_ORDER.indexOf(bPos as PositionType)
      );
    }
  });
