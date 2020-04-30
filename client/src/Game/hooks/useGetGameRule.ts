import { useContext } from "react";
import GameContext from "../GameContext";
import { IRuleType } from "Game";

const useGetGameRule = (rule: IRuleType) => {
  const { rules } = useContext(GameContext);
  switch (rule) {
    case "canDraw7":
      return rules.canDraw7;
  }
  return rules[rule];
};

export default useGetGameRule;
