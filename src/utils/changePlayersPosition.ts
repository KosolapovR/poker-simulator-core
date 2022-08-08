// export const changePlayersPosition = (players: Player[]): Player => {
//   const duplicatedPositions = players.reduce<string[]>((duplicated, curr) => {
//     return duplicated.includes(curr.getPosition())
//       ? [...duplicated, curr.getPosition()]
//       : duplicated;
//   }, []);
//   if (duplicatedPositions.length > 0) {
//     throw new Error("duplicate players positions");
//   }
//
//   return;
// };
