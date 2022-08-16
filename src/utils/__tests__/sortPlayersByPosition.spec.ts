import { Player } from "../../classes/Player";
import { sortPlayersByPosition } from "../sortPlayersByPosition";

const players = [
  new Player({ name: "name4", chips: 1 }).setPosition("btn"),
  new Player({ name: "name5", chips: 1 }).setPosition("sb"),
  new Player({ name: "name1", chips: 1 }).setPosition("utg"),
  new Player({ name: "name3", chips: 1 }).setPosition("cut"),
  new Player({ name: "name2", chips: 1 }).setPosition("mp"),
  new Player({ name: "name6", chips: 1 }).setPosition("bb"),
];

it("should correct sort positions for 6-max", function () {
  const playersAfterSortPositions = sortPlayersByPosition(players);
  if (Array.isArray(playersAfterSortPositions)) {
    expect(playersAfterSortPositions[0].getPosition()).toEqual("bb");
    expect(playersAfterSortPositions[0].getName()).toEqual("name6");
    expect(playersAfterSortPositions[1].getPosition()).toEqual("sb");
    expect(playersAfterSortPositions[1].getName()).toEqual("name5");
    expect(playersAfterSortPositions[2].getPosition()).toEqual("btn");
    expect(playersAfterSortPositions[2].getName()).toEqual("name4");
    expect(playersAfterSortPositions[3].getPosition()).toEqual("cut");
    expect(playersAfterSortPositions[3].getName()).toEqual("name3");
    expect(playersAfterSortPositions[4].getPosition()).toEqual("mp");
    expect(playersAfterSortPositions[4].getName()).toEqual("name2");
    expect(playersAfterSortPositions[5].getPosition()).toEqual("utg");
    expect(playersAfterSortPositions[5].getName()).toEqual("name1");
  }
});

it("should correct sort positions with empty seats", function () {
  const playersAfterSortPositions = sortPlayersByPosition(
    players.filter(
      (player) =>
        player.getPosition() !== "cut" && player.getPosition() !== "sb"
    )
  );
  if (Array.isArray(playersAfterSortPositions)) {
    expect(playersAfterSortPositions[0].getPosition()).toEqual("bb");
    expect(playersAfterSortPositions[1].getPosition()).toEqual("btn");
    expect(playersAfterSortPositions[2].getPosition()).toEqual("mp");
    expect(playersAfterSortPositions[3].getPosition()).toEqual("utg");
    expect(playersAfterSortPositions[4]).toBeUndefined();
    expect(playersAfterSortPositions[5]).toBeUndefined();
  }
});

it("should correct sort positions with undefined", function () {
  const players = [
    new Player({ name: "name4", chips: 1 }).setPosition("btn"),
    new Player({ name: "name5", chips: 1 }).setPosition("sb"),
    new Player({ name: "name1", chips: 1 }).setPosition("utg"),
    new Player({ name: "name3", chips: 1 }).setPosition(),
    new Player({ name: "name2", chips: 1 }).setPosition("mp"),
    new Player({ name: "name6", chips: 1 }).setPosition("bb"),
  ];
  const playersAfterSortPositions = sortPlayersByPosition(players);
  if (Array.isArray(playersAfterSortPositions)) {
    expect(playersAfterSortPositions[0].getPosition()).toEqual("bb");
    expect(playersAfterSortPositions[1].getPosition()).toEqual("sb");
    expect(playersAfterSortPositions[2].getPosition()).toEqual("btn");
    expect(playersAfterSortPositions[3].getPosition()).toEqual("mp");
    expect(playersAfterSortPositions[4].getPosition()).toEqual("utg");
    expect(playersAfterSortPositions[5].getPosition()).toBeUndefined();
  }
});
