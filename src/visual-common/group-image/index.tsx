import * as React from 'react';
import style from './styles.less';
import { Card } from '../card';
import { Stack } from '../stack';
import { Icon } from '../icon';
import { normalized } from 'src/utils/image-normalize';

export class GroupImage extends React.Component<Props, State> {
  private readonly ANIMATION_TIMEOUT = 300;

  constructor(props: Props) {
    super(props);

    this.state = {
      mainImageIndex: 0,
      showModal: false,
    };
  }

  public shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      JSON.stringify(this.props) !== JSON.stringify(nextProps) ||
      JSON.stringify(this.state) !== JSON.stringify(nextState)
    );
  }

  render() {
    const { mainImageIndex } = this.state;
    const { data } = this.props;
    const { url } = data[mainImageIndex];
    if (!data || data.length === 0) {
      return;
    }

    return (
      <div className={style.container}>
        <div className={this.getMainImageClasses()}>
          <div className={style.transitionOut}>
            <Card imgSrc={normalized(url)} />
          </div>
          {this.renderButtons()}
        </div>
        {this.renderModal(url)}
        {this.getGroupImage()}
      </div>
    );
  }

  private renderButtons(hasCloseButton?: boolean) {
    return (
      <div className={style.button}>
        <Stack flex='row' justify='space-between'>
          <button
            className={style.buttonCommon}
            onClick={() => this.onDirectionClick('left')}
            aria-label='Previous Button'
          >
            <Icon icon='circle-left' size='large' />
          </button>
          <div className={style.zoomIn} onClick={this.onClick}>
            <Stack flex='row'>
              <div className={style.zoomInBorder}>
                <Icon icon='zoom-in' size='small' />
              </div>
            </Stack>
          </div>
          <button
            className={style.buttonCommon}
            onClick={() => this.onDirectionClick('right')}
            aria-label='Next Button'
          >
            <Icon icon='circle-right' size='large' />
          </button>
        </Stack>
        {hasCloseButton && (
          <button
            className={style.closeButton}
            onClick={this.onCloseButtonClick}
          >
            <Icon icon='close' size='small' />
          </button>
        )}
      </div>
    );
  }

  private renderModal(url: string) {
    return (
      this.state.showModal && (
        <div className={style.modal} onMouseDown={this.onModalClick}>
          <div className={style.modalFrame}>
            <Card imgSrc={normalized(url)} />
            {this.renderButtons(true)}
          </div>
        </div>
      )
    );
  }

  private onDirectionClick = (direction: 'left' | 'right') => {
    const { data } = this.props;
    const { mainImageIndex } = this.state;
    const newIndex =
      direction === 'left'
        ? mainImageIndex === 0
          ? data.length - 1
          : mainImageIndex - 1
        : mainImageIndex === data.length - 1
        ? 0
        : mainImageIndex + 1;

    if (this.state.showModal) {
      this.setState({
        mainImageIndex: newIndex,
      });
    } else {
      this.animation(() => {
        this.setState({
          mainImageIndex: newIndex,
        });
      });
    }
  };

  private getGroupImage() {
    const { data } = this.props;
    if (!data || data.length === 0) return;

    const group = [];
    for (let i = 0; i < 4; i++) {
      const { url } = data[i];
      const classname = i % 4 === 3 ? 'flex-four-last-line' : 'flex-four';
      group.push(
        <div
          key={`${i}-image`}
          className={this.getImageClasses(classname, i)}
          onClick={() => this.onImageSelect(i)}
          children={<Card imgSrc={normalized(url)} />}
        />,
      );
    }

    return (
      <Stack flex='row-nowrap' align='start' justify='space-between'>
        {group}
      </Stack>
    );
  }

  private getMainImageClasses = () => {
    const classes = [style.transition];
    return classes.join(' ');
  };

  private getImageClasses = (classname: string, index: number) => {
    const classes = [style.container, style[`card-${classname}`]];
    if (this.state.mainImageIndex === index) {
      classes.push(style.selected);
    }

    return classes.join(' ');
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

  private onImageSelect = (index: number) => {
    this.animation(() => {
      this.setState({
        mainImageIndex: index,
      });
    });
  };

  private onClick = () => {
    this.setState({
      showModal: true,
    });
  };

  private onModalClick = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    this.setState({
      showModal: false,
    });
  };

  private onCloseButtonClick = (e: React.MouseEvent) => {
    this.setState({
      showModal: false,
    });
  };
}

interface Props {
  disableNextPreviousButton?: boolean;
  data: ImageProps[];
}

interface State {
  mainImageIndex: number;
  showModal: boolean;
}

export interface ImageProps {
  url: string;
}
