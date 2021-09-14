import * as React from 'react';
import { scrollTo, ScrollOptions } from 'src/utils/scroll';

import { Stack } from '../stack';
import style from './styles.less';
import { ScrollEvent } from '../../container/body';
import { Icon } from '../icon';

export class ScrollToTopButton extends React.Component<Props, State> {
  protected readonly OPTION: ScrollOptions = {
    to: 0,
    duration: 800,
  };

  protected readonly POSITION = {
    displayPosition: 1000,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  public componentDidMount() {
    const { displayPosition } = { ...this.POSITION, ...this.props };
    const topToBottomAction = () => {
      this.setState({
        show: true,
      });
    };
    const bottomToTopAction = () => {
      this.setState({
        show: false,
      });
    };
    if (this.props.updateScrollEvent) {
      this.props.updateScrollEvent({
        topToBottomAction,
        bottomToTopAction,
        triggerPoint: displayPosition,
      });
    }
  }

  public shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      JSON.stringify(this.props) !== JSON.stringify(nextProps) ||
      JSON.stringify(this.state) !== JSON.stringify(nextState)
    );
  }

  render() {
    return (
      <Stack floatingPositon='right-bottom'>
        <button className={this.getClasses()} onClick={this.click} aria-label='ScrollToTopButton'>
          <Icon icon='arrow-up' size='small' />
        </button>
      </Stack>
    );
  }

  private getClasses() {
    const classes = [style.container];
    if (this.state.show) {
      classes.push(style.show);
    }

    return classes.join(' ');
  }

  private click = () => {
    const { to, duration } = { ...this.OPTION, ...this.props };
    scrollTo({ to, duration });
  };
}

interface Props {
  /** Number of pixel display from top */
  displayPosition?: number;
  to?: number;
  duration?: number;
  updateScrollEvent: ScrollEvent;
}

interface State {
  show?: boolean;
}
