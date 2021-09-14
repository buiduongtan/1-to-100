import * as React from 'react';
import style from './styles.less';
import { Stack } from '../stack';

export class Section extends React.Component<Props> {
  render() {
    return (
      <div className={style.container}>
        <div className={style.content}>
          <Stack flex='row' justify='space-between' align='start'>
            {this.props.children}
          </Stack>
        </div>
      </div>
    );
  }
}

interface Props {
  children?: React.ReactNode | React.ReactNode[];
}
