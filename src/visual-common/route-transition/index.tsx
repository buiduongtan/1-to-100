import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

class ScrollToTop extends React.Component<Props> {
  public componentDidUpdate(prevProps: Props) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 1);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);

interface Props extends RouteComponentProps<any> {
  children?: React.ReactNode;
}
