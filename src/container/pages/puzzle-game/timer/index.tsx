import * as React from 'react';
import styles from './styles.less';

export class Timer extends React.Component<Props, State> {
  public static readonly TIME_COUNT = 4 * 60 * 1000;
  public static readonly WARN_TIME_COUNT = 2 * 60 * 1000;
  public static readonly DANGER_TIME_COUNT = 1 * 60 * 1000;
  public static readonly START_TIME = '4:00';
  public static readonly TIME_OUT = 'TIME OUT';
  public static readonly WIN_SCORE = 1;

  protected counter = 0;
  protected componentIsMounted = false;
  protected itvl: any = '';

  constructor(props: Props) {
    super(props);

    this.state = {
      timer: '',
    };
  }

  public componentDidMount() {
    this.componentIsMounted = true;
    this.renderTimer();
    this.setState({
      timer: this.millisToMinutesAndSeconds(this.getRemainTime(this.counter)),
    });
  }

  public componentDidUpdate() {
    this.props.getTime(this.state.timer);
    return true;
  }

  public componentWillUnmount() {
    clearInterval(this.itvl);
  }

  public render() {
    return <div className={this.getTimerClasses()}>{this.state.timer}</div>;
  }

  protected getTimerClasses() {
    const classes = [styles.timer];
    if (this.getRemainTime(this.counter) < Timer.DANGER_TIME_COUNT) {
      classes.push(styles.timerDanger);
    } else if (this.getRemainTime(this.counter) < Timer.WARN_TIME_COUNT) {
      classes.push(styles.timerWarn);
    }

    return classes.join(' ');
  }

  protected renderTimer() {
    if (this.itvl) return;

    this.itvl = setInterval(() => {
      this.counter += 1;
      const newTime = this.getRemainTime(this.counter);

      this.setState({ timer: this.millisToMinutesAndSeconds(newTime) }, () => {
        if (newTime === 0 || !this.componentIsMounted) {
          this.handleTimeout();
        }
      });
    }, 1000);
  }

  protected millisToMinutesAndSeconds(millis: number) {
    var minutes = Math.floor(millis / 60000);
    var seconds = Number.parseInt(((millis % 60000) / 1000).toFixed(0));
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  protected getRemainTime(counter: number) {
    return Timer.TIME_COUNT - counter * 1000;
  }

  protected handleTimeout() {
    clearInterval(this.itvl);
    this.props.onTimeout();
  }
}

export type Props = StateProps & DispatchProps;

interface State {
  timer: string;
}

interface StateProps {
  endTimer?: boolean;
}

interface DispatchProps {
  onTimeout: () => void;
  getTime: (time: string) => void;
}
