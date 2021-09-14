import * as React from 'react';
import style from './styles.less';
import { Card } from '../card';
import { Icon } from '../icon';
import { Stack } from '../stack';
import { normalized } from 'src/utils/image-normalize';

export class Video extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showVideo: false,
    };
  }

  public shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      JSON.stringify(this.props) !== JSON.stringify(nextProps) ||
      JSON.stringify(this.state) !== JSON.stringify(nextState)
    );
  }

  public componentDidUpdate(prevProps: Props, prevState: State) {
    if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
      if (this.state.showVideo) {
        this.setState({
          showVideo: false,
        });
      }
    }
  }

  render() {
    const { videoSize, defaultImg, url, title } = this.props;
    const { showVideo } = this.state;

    return (
      <div className={this.getClasses()} onClick={this.onVideoClick}>
        {videoSize === 'large' ? (
          <>
            <div className={style.play}>
              <Stack flex='row'>{this.renderPlayButton()}</Stack>
            </div>
            <Card imgSrc={normalized(defaultImg)} imgSize='default' />
          </>
        ) : (
          <>
            <div className={style.play}>
              <Stack flex='row' justify='end' align='start'>
                {this.renderPlayButton()}
              </Stack>
            </div>
            <Card
              imgSrc={normalized(defaultImg)}
              title={title}
              type='video-trailer'
            />
          </>
        )}
        {showVideo && (
          <iframe
            className={style.containerIframe}
            src={url}
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        )}
      </div>
    );
  }

  private renderPlayButton() {
    const { videoSize } = this.props;

    return (
      <div className={this.getPlayButtonWrapperClasses()}>
        <Stack flex='row'>
          <div className={this.getPlayButtonClasses()}>
            <Icon icon='play' size={videoSize} />
          </div>
        </Stack>
      </div>
    );
  }

  private getClasses() {
    const { videoSize } = this.props;
    const classes = [style.container];
    if (videoSize === 'large') {
      classes.push(style.back);
    }

    return classes.join(' ');
  }

  private getPlayButtonWrapperClasses() {
    const { videoSize } = this.props;
    const classes = [style[`play-button-${videoSize}-wrapper`]];
    if (this.state.showVideo) {
      classes.push(style.playButtonFadeOut);
    }

    return classes.join(' ');
  }

  private getPlayButtonClasses() {
    const { videoSize } = this.props;
    const classes = [style.playButton, style[`play-button-${videoSize}`]];

    return classes.join(' ');
  }

  private onVideoClick = () => {
    if (this.props.disableClick) {
      return;
    }

    this.setState({
      showVideo: true,
    });
  };
}

interface Props {
  url: string;
  defaultImg: string;
  imgSize?: string;
  title?: string;
  videoSize: VideoSize;
  disableClick?: boolean;
}

interface State {
  showVideo: boolean;
}

type VideoSize = 'medium' | 'large';
