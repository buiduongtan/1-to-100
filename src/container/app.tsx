import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Stack } from 'src/visual-common/stack';
import RouteTransition from 'src/visual-common/route-transition';

import { Header } from './header';
import { Footer } from './footer';
import { Body } from './body';
import style from './app.less';

export class App extends React.Component<{}> {
  render() {
    return (
      <div className={style.container}>
        <Router>
          <RouteTransition>
            <Stack flex='column-nowrap'>
              <Header />
              <Body />
              <Footer />
            </Stack>
          </RouteTransition>
        </Router>
      </div>
    );
  }
}
