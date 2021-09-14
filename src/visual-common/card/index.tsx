import * as React from 'react';
import { Link } from 'react-router-dom';
import style from './styles.less';
import { LineClamp } from '../line-clamp';

export class Card extends React.Component<Props> {
  render() {
    const {
      imgSrc,
      text,
      title,
      titleLineClamp,
      textLineClamp,
      url,
    } = this.props;

    return (
      <div className={this.getClasses()}>
        <div className={this.getImageClass()}>
          {url ? (
            <Link to={url}>
              <img src={imgSrc} alt='' />
            </Link>
          ) : (
            <img src={imgSrc} alt='' />
          )}
        </div>
        <div className={this.getTextClasses()}>
          {title && (
            <h2 className={this.getTitleClasses()}>
              <LineClamp numberOfLine={titleLineClamp}>
                {url ? <Link to={url}>{title}</Link> : title}
              </LineClamp>
            </h2>
          )}
          {text && <LineClamp numberOfLine={textLineClamp}>{text}</LineClamp>}
        </div>
      </div>
    );
  }

  private getClasses() {
    const { layout, type } = this.props;
    const classes = [style.container];
    if (layout) {
      classes.push(
        style[`layout-${Object.keys(layout)[0]}-${layout.horizontal}`],
      );
    }
    if (type) {
      classes.push(style[`card-${type}`]);
    }
    return classes.join(' ');
  }

  private getTextClasses() {
    const { type } = this.props;
    const classes = [style.cardCommonText];
    if (type) {
      classes.push(style[`card-${type}-text`]);
    }

    return classes.join(' ');
  }

  private getImageClass() {
    const { imgSize, animation, type } = this.props;
    const classes = [style.cardCommonImage];
    if (type) {
      classes.push(style[`card-${type}-image`]);
    }
    if (imgSize) {
      classes.push(style[`size-${imgSize}`]);
    }
    if (animation) {
      classes.push(style[`animation-${animation}`]);
    }
    return classes.join(' ');
  }

  private getTitleClasses() {
    const { titleAlign } = this.props;
    const classes = [];
    if (titleAlign) {
      classes.push(style[`title-${titleAlign}`]);
    }

    return classes.join(' ');
  }
}

interface Props {
  /** Card url when click title and image */
  url?: string;
  /** Layout of image and text */
  layout?: Layout;
  /** Image source url */
  imgSrc?: string;
  /** Image size */
  imgSize?: ImageSize;
  /** Title of card */
  title?: string;
  /** Title of card */
  titleAlign?: 'left' | 'center';
  /** Text description */
  text?: React.ReactNode;
  /** Type for title and text description */
  type?: Type;
  /** lineClamp for title description */
  titleLineClamp?: number;
  /** lineClamp for text description */
  textLineClamp?: number;
  /** Animation when hovering image */
  animation?: 'hover';
}

export type ImageSize =
  | 'xxxsmall'
  | 'xxsmall'
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'custom-headline-large'
  | 'custom-big-banner'
  | 'default';

export type Type =
  | 'headline'
  | 'section'
  | 'section-big'
  | 'big-banner'
  | 'video-trailer'
  | 'latest-review'
  | 'recommend'
  | 'recommend-big'
  | 'recommend-site'
  | 'recommend-site-big';

export type Layout = {
  horizontal:
    | '1-9'
    | '2-8'
    | '3-7'
    | '4-6'
    | '5-5'
    | '6-4'
    | '7-3'
    | '8-2'
    | '9-1';
};
