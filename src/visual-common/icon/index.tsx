import * as React from 'react';
import style from './styles.less';

export class Icon extends React.Component<Props> {
  render() {
    return <div className={this.getClasses()} />;
  }

  private getClasses() {
    const classes = [style.container, style[`icon-${this.props.icon}`]];
    if (this.props.size) {
      classes.push(style[`size-${this.props.size}`]);
    }
    return classes.join(' ');
  }
}

interface Props {
  icon: IconType;
  /**
   * xsmall: 14px;
   * small: 20px;
   * medium: 32px;
   * large: 45px;
   */
  size?: Size;
}

type Size = 'xsmall' | 'small' | 'medium' | 'large';

export type IconType =
  | 'home'
  | 'calendar'
  | 'comment'
  | 'circle-up'
  | 'circle-right'
  | 'circle-down'
  | 'circle-left'
  | 'facebook'
  | 'instagram'
  | 'twitter'
  | 'youtube'
  | 'twitch'
  | 'steam'
  | 'pinterest'
  | 'search'
  | 'arrow-up'
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'edit'
  | 'author'
  | 'close'
  | 'zoom-in'
  | 'zoom-out'
  | 'chat-single'
  | 'chat-group'
  | 'news'
  | 'menu'
  | 'menu-up'
  | 'play';
