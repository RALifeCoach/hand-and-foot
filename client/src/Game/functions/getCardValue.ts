import { IRank } from "../../queries/game";

const VALUE_FROM_RANK = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14,
    "U": -1,
}

const getCardValue = (rank?: IRank) => VALUE_FROM_RANK[rank || 'U'];

export default getCardValue;
