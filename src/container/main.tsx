import * as React from 'react';
import { App } from './app';
import { mockData } from 'src/mock';
const renderServer = async () => {
  // set data as mock data for test in development
  let data = mockData;
  // Call api async
  return data;
};

export default class Main extends React.Component {
  public async componentDidMount() {
    const data = await renderServer();
    
  }
  render() {
    return <App />;
  }
}
