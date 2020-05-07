import { IGameJson, IMeldType } from "Game";

const getMessageTypeText = (type: IMeldType): string => {
  switch (type) {
    case '3s':
      return 'red three';
    case 'run':
      return 'run';
    case 'wild':
      return 'wild card meld';
    case 'clean':
      return 'clean meld';
    case 'dirty':
      return 'dirty meld';
  }
};

export default getMessageTypeText;
