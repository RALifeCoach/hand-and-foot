import React from 'react';
import Flex, {IFlexProps} from "./Flex";

const FlexColumn = ({children, ...props}: IFlexProps) => {
  return (
    <Flex
      {...props}
      direction='column'
    >
      {children}
    </Flex>
  );
};

export default FlexColumn;
