import * as React from 'react';
import style from './styles.less';

export class LineClamp extends React.Component<Props> {
  render() {
    return <div className={this.getClasses()}>{this.props.children}</div>;
  }

  private getClasses() {
    const { numberOfLine } = this.props;
    const classes = [style.container];
    if (numberOfLine === 2) {
      classes.push(style.lineTwo);
    } else if (numberOfLine === 3) {
      classes.push(style.lineThree);
    } else if (numberOfLine === 4) {
      classes.push(style.lineFour);
    }

    return classes.join(' ');
  }
}

type Props = {
  children?: React.ReactNode;
  numberOfLine?: number;
};
