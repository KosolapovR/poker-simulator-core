const Player = require("./lib/classes");
const PokerSimulator = require("./lib/classes");
const player = new Player({ name: "1", chips: 1 });
const PS = new PokerSimulator({ players: [player] });
console.log(PS.startDeal());
