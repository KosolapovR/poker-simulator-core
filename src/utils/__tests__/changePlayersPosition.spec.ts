import { Player } from "../../classes/Player";
import { changePlayersPosition } from "../changePlayersPosition";

const players = [
  new Player({ name: "name3", chips: 1 }).setPosition("cut"),
  new Player({ name: "name1", chips: 1 }).setPosition("utg"),
  new Player({ name: "name4", chips: 1 }).setPosition("btn"),
  new Player({ name: "name5", chips: 1 }).setPosition("sb"),
  new Player({ name: "name2", chips: 1 }).setPosition("mp"),
  new Player({ name: "name6", chips: 1 }).setPosition("bb"),
];

it("should return undefined if has duplicates", function () {
  const playersWithDuplicatePosition = [...players];
  playersWithDuplicatePosition[0].setPosition("mp");
  expect(changePlayersPosition(playersWithDuplicatePosition)).toBeUndefined();
});

it("should correct change positions for 6-max", function () {
  const playersAfterChangePositions = changePlayersPosition(players);
  if (Array.isArray(playersAfterChangePositions)) {
    expect(playersAfterChangePositions[0].getPosition()).toBe("bb");
    expect(playersAfterChangePositions[0].getName()).toBe("name1");
    expect(playersAfterChangePositions[1].getPosition()).toBe("sb");
    expect(playersAfterChangePositions[1].getName()).toBe("name6");
    expect(playersAfterChangePositions[2].getPosition()).toBe("btn");
    expect(playersAfterChangePositions[2].getName()).toBe("name5");
    expect(playersAfterChangePositions[3].getPosition()).toBe("cut");
    expect(playersAfterChangePositions[3].getName()).toBe("name4");
    expect(playersAfterChangePositions[4].getPosition()).toBe("mp");
    expect(playersAfterChangePositions[4].getName()).toBe("name3");
    expect(playersAfterChangePositions[5].getPosition()).toBe("utg");
    expect(playersAfterChangePositions[5].getName()).toBe("name2");
  }
});

it("should correct change positions with empty seats", function () {
  const players = [
    new Player({ name: "name5", chips: 1 }).setPosition("sb"),
    new Player({ name: "name4", chips: 1 }).setPosition("btn"),
    new Player({ name: "name2", chips: 1 }).setPosition("mp"),
    new Player({ name: "name6", chips: 1 }).setPosition("bb"),
  ];
  const playersAfterChangePositions = changePlayersPosition(players);
  if (Array.isArray(playersAfterChangePositions)) {
    expect(playersAfterChangePositions[0].getPosition()).toBe("bb");
    expect(playersAfterChangePositions[0].getName()).toBe("name2");
    expect(playersAfterChangePositions[1].getPosition()).toBe("sb");
    expect(playersAfterChangePositions[1].getName()).toBe("name6");
    expect(playersAfterChangePositions[2].getPosition()).toBe("btn");
    expect(playersAfterChangePositions[2].getName()).toBe("name5");
    expect(playersAfterChangePositions[3].getPosition()).toBe("cut");
    expect(playersAfterChangePositions[3].getName()).toBe("name4");
  }
});

it("should correct change positions 4max", function () {
  const players = [
    new Player({ name: "name5", chips: 1 }).setPosition("sb"),
    new Player({ name: "name4", chips: 1 }).setPosition("btn"),
    new Player({ name: "name3", chips: 1 }).setPosition("cut"),
    new Player({ name: "name6", chips: 1 }).setPosition("bb"),
  ];
  const playersAfterChangePositions = changePlayersPosition(players);
  if (Array.isArray(playersAfterChangePositions)) {
    expect(playersAfterChangePositions[0].getPosition()).toBe("bb");
    expect(playersAfterChangePositions[0].getName()).toBe("name3");
    expect(playersAfterChangePositions[1].getPosition()).toBe("sb");
    expect(playersAfterChangePositions[1].getName()).toBe("name6");
    expect(playersAfterChangePositions[2].getPosition()).toBe("btn");
    expect(playersAfterChangePositions[2].getName()).toBe("name5");
    expect(playersAfterChangePositions[3].getPosition()).toBe("cut");
    expect(playersAfterChangePositions[3].getName()).toBe("name4");
  }
});
