import { Player } from "../classes";
import { POSITION_ORDER } from "../consts";
import { checkDuplicatePositions } from "./checkDiplitacePositions";
import { sortPlayersByPosition } from "./sortPlayersByPosition";

export const changePlayersPosition = (players: Player[]): Player[] | void => {
  if (checkDuplicatePositions(players)) {
    return;
  }

  const totalSeats = players.filter((p) => !!p.getPosition()).length;

  const tmp = sortPlayersByPosition(players);

  for (let i = 0; i < totalSeats; i++) {
    const newPosition =
      i < totalSeats - 1 ? POSITION_ORDER[i + 1] : POSITION_ORDER[0];
    tmp[i].setPosition(newPosition);
  }
  return sortPlayersByPosition(tmp);
};
