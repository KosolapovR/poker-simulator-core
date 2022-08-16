import { Player } from "../classes";

export const checkDuplicatePositions = (players: Player[]): boolean => {
  const uniqPositions = players.reduce<string[]>((acc, curr) => {
    return acc.includes(curr.getPosition() || "")
      ? acc
      : [...acc, curr.getPosition() || ""];
  }, []);
  return uniqPositions.length < players.length;
};
