import * as React from 'react';

export class OnScroll extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      events: [...this.props.events],
    };
  }

  public componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);
  }

  public componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  private handleScroll = () => {
    const { events } = this.props;
    const clearEventIndexes: number[] = [];
    events.forEach((event, index) => {
      const currentScrollPosition =
        document.scrollingElement && document.scrollingElement.scrollTop;
      if (
        event.topToBottomAction &&
        currentScrollPosition &&
        event.triggerPoint &&
        currentScrollPosition >= event.triggerPoint
      ) {
        event.topToBottomAction();
        if (event.clearAfterTriggering) {
          clearEventIndexes.push(index);
        }
      }
      if (
        event.bottomToTopAction &&
        currentScrollPosition &&
        event.triggerPoint &&
        currentScrollPosition < event.triggerPoint
      ) {
        event.bottomToTopAction();
        if (event.clearAfterTriggering) {
          clearEventIndexes.push(index);
        }
      }
      if (index === events.length - 1) {
        this.props.clearEvents(clearEventIndexes);
      }
    });
  };

  render() {
    return null;
  }
}
type Props = State & {
  clearEvents: (indexes: number[]) => void;
};

interface State {
  events: Event[];
}

export interface Event {
  triggerPoint?: number;
  clearAfterTriggering?: boolean;
  topToBottomAction?: () => void;
  bottomToTopAction?: () => void;
}
