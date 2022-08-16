import { CARD_VALUES, DECK, POSITION_ORDER } from "../consts";

export type CardType = typeof DECK[number];
export type CardValueType = typeof CARD_VALUES[number];

export type BehaviorType = "rock" | "lag" | "tag" | "lp" | "tp" | "maniac";
export type RoundType = "preflop" | "flop" | "turn" | "river" | "showdown";
export type ActionType = "fold" | "check" | "call" | "bet" | "raise";
export type PositionType = typeof POSITION_ORDER[number];
export type GameStatusType = "pending" | "inProgress";
