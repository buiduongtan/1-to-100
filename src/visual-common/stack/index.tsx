import * as React from 'react';
import style from './styles.less';

export class Stack extends React.Component<Props> {
  render() {
    return <div className={this.getClasses()}>{this.props.children}</div>;
  }

  protected getClasses() {
    const { floatingPositon, flex, justify, align, fullWidth } = this.props;
    const classes = [];
    if (flex) {
      classes.push(style[`flex-${flex}`]);
    } else {
      classes.push(style.flexRow);
    }
    if (justify) {
      classes.push(style[`justify-${justify}`]);
    }
    if (align) {
      classes.push(style[`align-${align}`]);
    }
    if (floatingPositon) {
      classes.push(style.floating);
      classes.push(style[`floating-${floatingPositon}`]);
    }
    if (fullWidth) {
      classes.push(style.fullWidth);
    }

    return classes.join(' ');
  }
}

type Props = {
  children?: React.ReactNode;
  floatingPositon?: 'right-bottom';
  flex?: FlexType;
  justify?:
    | 'center'
    | 'start'
    | 'end'
    | 'space-between'
    | 'space-evenly'
    | 'stretch';
  align?: 'center' | 'start' | 'end' | 'stretch';
  fullWidth?: boolean;
};

export type FlexType = 'row' | 'row-nowrap' | 'column' | 'column-nowrap';
