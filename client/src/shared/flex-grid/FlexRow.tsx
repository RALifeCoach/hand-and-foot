import React from 'react';
import Flex, {IFlexProps} from "./Flex";

const FlexRow = ({children, ...props}: IFlexProps) => {
  return (
    <Flex
      {...props}
      direction='row'
    >
      {children}
    </Flex>
  );
};

export default FlexRow;
