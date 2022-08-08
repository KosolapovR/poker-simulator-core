import { Player } from "../../classes";
import { changePlayersPosition } from "../changePlayersPosition";

const players = [
  new Player({ name: "name1", chips: 1 }).setPosition("utg"),
  new Player({ name: "name2", chips: 1 }).setPosition("mp"),
  new Player({ name: "name3", chips: 1 }).setPosition("cut"),
  new Player({ name: "name4", chips: 1 }).setPosition("btn"),
  new Player({ name: "name5", chips: 1 }).setPosition("sb"),
  new Player({ name: "name6", chips: 1 }).setPosition("bb"),
];

it("changePlayerPosition", function () {
  describe("should throw an error if has duplicates", () => {
    const playersWithDuplicatePosition = [...players];
    playersWithDuplicatePosition[0].setPosition("mp");

    expect(changePlayersPosition(playersWithDuplicatePosition)).toThrow();
  });
});
