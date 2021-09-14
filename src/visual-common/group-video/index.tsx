import * as React from 'react';
import style from './styles.less';
import { ImageSize } from '../card';
import { Video } from '../video';
import { Stack } from '../stack';
import { Icon } from '../icon';

export class GroupVideo extends React.Component<Props, State> {
  private readonly ANIMATION_TIMEOUT = 300;

  constructor(props: Props) {
    super(props);

    this.state = {
      mainVideoIndex: 0,
    };
  }

  public shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      JSON.stringify(this.props) !== JSON.stringify(nextProps) ||
      JSON.stringify(this.state) !== JSON.stringify(nextState)
    );
  }

  render() {
    const { mainVideoIndex } = this.state;
    const { data } = this.props;
    const { url, defaultImg } = this.normalize(data[mainVideoIndex]);
    if (!data || data.length === 0) {
      return;
    }

    return (
      <div className={style.container}>
        <div className={this.getMainVideoClasses()}>
          <Video url={url} defaultImg={defaultImg} videoSize='large' />
        </div>
        {this.getGroupVideo()}
      </div>
    );
  }

  private getGroupVideo() {
    const { data } = this.props;
    if (!data || data.length === 0) return;

    const group = [];
    for (let i = 0; i < 3; i++) {
      const { url, defaultImg } = this.normalize(data[i]);
      const classname = i % 3 === 2 ? 'flex-three-last-line' : 'flex-three';
      group.push(
        <div
          key={`${i}-video`}
          className={this.getVideoClasses(classname, i)}
          onClick={() => this.onVideoSelect(i)}
        >
          <Video
            url={url}
            defaultImg={defaultImg}
            videoSize='medium'
            disableClick
            title='HORIZON-- FORBIDEN WEST'
          />
        </div>,
      );
    }

    return (
      <Stack flex='row' align='start' justify='space-between'>
        {group}
      </Stack>
    );
  }

  private getMainVideoClasses = () => {
    const classes = [style.transitionOut];

    return classes.join(' ');
  };

  private getVideoClasses = (classname: string, index: number) => {
    const classes = [
      style.container,
      style.cardFlex,
      style[`card-${classname}`],
    ];
    if (this.state.mainVideoIndex === index) {
      classes.push(style.selected);
    }

    return classes.join(' ');
  };

  private onVideoSelect = (index: number) => {
    this.animation(() => {
      this.setState({
        mainVideoIndex: index,
      });
    });
  };

  private animation = (callback: () => void) => {
    const element = document.getElementsByClassName(
      style.transitionOut,
    )[0] as HTMLElement;
    element.classList.toggle(style.transitionOut);
    element.classList.toggle(style.transitionIn);
    setTimeout(() => {
      element.classList.toggle(style.transitionIn);
      element.classList.toggle(style.transitionOut);
    }, this.ANIMATION_TIMEOUT);
    setTimeout(callback, this.ANIMATION_TIMEOUT);
  };

  private normalize(data: VideoProps) {
    const { url, defaultImg } = data;
    const autoplayUrl = `${url}?autoplay=1`;

    return {
      url: autoplayUrl,
      defaultImg,
    };
  }
}

interface Props {
  disableNextPreviousButton?: boolean;
  videoSize?: ImageSize;
  data: VideoProps[];
}

interface State {
  mainVideoIndex: number;
}

interface VideoProps {
  url: string;
  defaultImg: string;
}
