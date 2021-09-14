import * as React from 'react';
import styles from './styles.less';
import { Timer } from './timer';

export class PuzzleGame extends React.Component<{}, State> {
  public static readonly WIN_SCORE = 10;

  protected counter = 0;
  protected itvl: any = '';

  constructor(props: {}) {
    super(props);

    this.state = {
      status: 'ready',
      selectedButton: [],
      result: 0,
      tableData: [],
      timer: '',
    };
  }

  render() {
    return (
      <div className={styles.container}>
        <h1>1 to 100 puzzle game</h1>
        {this.renderHeader()}
        {this.renderTable()}
      </div>
    );
  }

  protected renderHeader() {
    const startButton = (
      <button
        type='button'
        className={styles.actionButton}
        onClick={this.startCounter}
      >
        <h2>Start</h2>
      </button>
    );

    const timeout = (
      <div className={styles.twoColumn}>
        <h2>
          <div>TIMEOUT</div>
          <div>{`Result: ${this.state.result}/${PuzzleGame.WIN_SCORE} `}</div>
        </h2>
        <button
          type='button'
          className={styles.actionButton}
          onClick={this.retry}
        >
          <h2>Try again</h2>
        </button>
      </div>
    );

    const end = (
      <div className={styles.twoColumn}>
        <h2>
          <div>WIN {this.state.timer}</div>
          <div>{`Result: ${this.state.result}/${PuzzleGame.WIN_SCORE} `}</div>
        </h2>
        <button
          type='button'
          className={styles.actionButton}
          onClick={this.retry}
        >
          <h2>Replay</h2>
        </button>
      </div>
    );

    let displayButtons = null;
    switch (this.state.status) {
      case 'ready':
        displayButtons = startButton;
        break;
      case 'timeout':
        displayButtons = timeout;
        break;
      case 'end':
        displayButtons = end;
        break;
      case 'started':
      default:
        displayButtons = (
          <Timer onTimeout={this.handleTimeout} getTime={this.getTime} />
        );
        break;
    }

    return <div className={styles.header}>{displayButtons}</div>;
  }

  protected renderTable() {
    const table = this.state.tableData.map((number, index) => {
      const displayNumber = number + 1;

      return (
        <button
          key={index}
          value={displayNumber}
          type='button'
          className={this.getButtonClasses(displayNumber)}
          onClick={this.buttonOnClick}
        >
          {displayNumber}
        </button>
      );
    });
    return <div className={styles.table}>{table}</div>;
  }

  protected getButtonClasses = (number: number) => {
    const classes = [styles.button];
    const { selectedButton, status } = this.state;
    if (selectedButton.indexOf(number) !== -1) {
      classes.push(styles.buttonSelected);
    } else if (status === 'timeout') {
      classes.push(styles.buttonTimeout);
    }
    return classes.join(' ');
  };

  protected buttonOnClick = (e: any) => {
    const { selectedButton, result, status } = this.state;
    if (status !== 'started') return;

    const value = Number.parseInt(e.target.value);

    if (selectedButton.includes(value)) return;

    if (
      (selectedButton.length === 0 && value === 1) ||
      value === selectedButton[selectedButton.length - 1] + 1
    ) {
      selectedButton.push(value);
      const newResult = result + 1;
      const isWin = newResult === PuzzleGame.WIN_SCORE;

      this.setState({
        selectedButton: [...selectedButton],
        result: newResult,
        status: isWin ? 'win' : this.state.status,
      });
    }
  };

  protected retry = () => {
    this.counter = 0;
    this.setState({ result: 0, selectedButton: [] }, () => this.startCounter());
  };

  protected startCounter = () => {
    this.setState({
      status: 'started',
      tableData: this.shuffleArray(
        Array.from(Array(PuzzleGame.WIN_SCORE).keys()),
      ),
    });
  };

  protected shuffleArray(array: number[]) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  protected handleTimeout = () => {
    this.setState({ status: 'timeout' });
  };

  protected getTime = (timer: string) => {
    if (this.state.status === 'win') this.setState({ timer, status: 'end' });
  };
}

interface State {
  /**
   * ready: ready to play game
   * started: game is started and timer is counting down
   * timout: game is ended by timeout
   * win: game is ended by selected all the numbers
   * end: gam is ended and result is shown
   */
  status: 'ready' | 'started' | 'timeout' | 'win' | 'end';
  selectedButton: number[];
  tableData: number[];
  result: number;
  timer: string;
}
