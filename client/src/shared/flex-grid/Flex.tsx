import React, {CSSProperties, ReactNode} from 'react';

type tWrap = 'wrap' | 'nowrap' | 'wrap-reverse' | 'inherit' | 'initial' | 'unset';
type tDirection = 'row' | 'column' | 'row-reverse'| 'column-reverse' | 'inherit' | 'initial' | 'unset' | 'revert';

export interface IFlexProps {
  justify?: string,
  wrap?: tWrap,
  children: ReactNode,
  className?: string,
  style?: CSSProperties,
  onClick?: (event:any) => void,
}

interface IProps extends IFlexProps {
  direction: tDirection;
}

const Flex = (props: IProps) => {
  const {justify, wrap, children, className, style, direction, onClick} = props;

  const flexStyle: CSSProperties = {...(style || {}), display: 'flex', flexDirection: direction};
  if (justify) {
    flexStyle.justifyContent = justify;
  }
  if (wrap) {
    flexStyle.flexWrap = wrap;
  }
  return (
    <div style={flexStyle} className={className} onClick={onClick}>
      {children}
    </div>
  );
};

export default Flex;
