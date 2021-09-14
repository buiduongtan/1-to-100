import * as React from 'react';
import { Stack } from 'src/visual-common/stack';
import { Video } from 'src/visual-common/video';
import { GroupImage, ImageProps } from 'src/visual-common/group-image';
import { Icon, IconType } from 'src/visual-common/icon';

import style from './styles.less';
import { Link } from 'react-router-dom';
import { normalized } from 'src/utils/image-normalize';

export class Site extends React.Component<Props> {
  ref: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.ref = React.createRef();
  }

  public componentDidMount() {
    if (this.ref && this.ref.current) {
      const fadeColor =
        this.props.data.type === 'game' ? '#000d19' : 'rgba(0, 0, 0, 0)';
      const image = normalized('/assets/img/gotham-knights.jpg');
      this.ref.current.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), ${fadeColor}),url(${image})`;
    }
  }

  public shouldComponentUpdate(prevProps: Props) {
    return JSON.stringify(this.props) !== JSON.stringify(prevProps);
  }

  render() {
    return (
      <div className={this.getClasses()}>
        <div className={style.header} ref={this.ref} />
        <div className={style.content}>
          <Stack flex='row' align='start' justify='space-between'>
            {this.renderLeftContent()}
            {this.renderRightContent()}
          </Stack>
        </div>
        <div className={style.breadcrumbs}>
          <Stack flex='row-nowrap' justify='start'>
            <Link to='/'>Home</Link>
            <span>
              <Icon icon='arrow-right' size='xsmall' />
            </span>
            <Link to='/site'>Site</Link>
          </Stack>
        </div>
      </div>
    );
  }

  private getClasses() {
    const classes = [style.container];
    if (this.props.data.type === 'movie') {
      classes.push(style.movie);
    }
    return classes.join(' ');
  }

  private renderLeftContent() {
    const {
      gameTitle,
      postTitle,
      author,
      postData,
      updateDate,
      firstParagraph,
      secondParagraph,
      closeParagraph,
      images,
      video,
    } = this.props.data;

    return (
      <div className={style.flexTwo}>
        <div>
          <div className={style.gameTitle}>
            <Link to='/'>{gameTitle}</Link>
          </div>
          <div className={style.postTitle}>
            <h1>{postTitle}</h1>
          </div>
          <div className={style.authorInfo}>
            {this.renderAuthorInfo(`By ${author}`, 'author', style.author)}
            {this.renderAuthorInfo(
              `Updated: ${updateDate}`,
              'edit',
              style.updateDate,
            )}
            {this.renderAuthorInfo(
              `Posted: ${postData}`,
              'calendar',
              style.postDate,
            )}
          </div>
        </div>
        {firstParagraph}
        {video && (
          <div className={style.video}>
            <Video
              url={video.url}
              defaultImg={video.defaultImage}
              videoSize='large'
            />
          </div>
        )}
        {secondParagraph}
        {images && images.length > 0 && (
          <>
            <h3>
              {gameTitle} - {images.length} Screenshots
            </h3>
            <GroupImage data={images} />
          </>
        )}

        {closeParagraph}
      </div>
    );
  }

  private renderAuthorInfo(text: string, icon: IconType, className: string) {
    return (
      <Stack flex='row-nowrap' justify='start'>
        <Icon icon={icon} />
        <div className={className}>{text}</div>
      </Stack>
    );
  }

  private renderRightContent() {
    return (
      <div className={style.flexTwoLastLine}>
        <Stack flex='row' align='start' justify='start'>
          <div className={style.box}>
            <input
              type='text'
              className={style.boxInput}
              placeholder='Input search keyword ...'
            />
          </div>
          <div className={style.box}>
            <div className={style.recent}>
              <Stack flex='row-nowrap' justify='space-between'>
                <h3>Recent Posts</h3>
                <Icon icon='news' size='small' />
              </Stack>
              <hr className={style.horizontalLine} />
              <Link to=''>
                <div className={style.recentPost}>Hello world!</div>
              </Link>
              <Link to=''>
                <div className={style.recentPost}>
                  Horizon Zero Dawn Game | PS4
                </div>
              </Link>
              <Link to=''>
                <div className={style.recentPost}>
                  Far Cry 5 launches on Xbox One
                </div>
              </Link>
              <Link to=''>
                <div className={style.recentPost}>
                  God Of War – Gaming Reviews, News
                </div>
              </Link>
              <Link to=''>
                <div className={style.recentPost}>
                  Frostpunk Review: Damned If You Do, Damned If You Don’t
                </div>
              </Link>
            </div>
          </div>
          <div className={style.box}>
            <Stack flex='row-nowrap' justify='space-between'>
              <h3>Comments (0)</h3>
              <Icon icon='chat-group' size='medium' />
            </Stack>
          </div>
        </Stack>
      </div>
    );
  }
}

interface Props {
  data: Data;
}

export interface Data {
  gameTitle: string;
  postTitle: string;
  author: string;
  postData: string;
  updateDate?: string;
  firstParagraph: React.ReactNode;
  secondParagraph: React.ReactNode;
  closeParagraph: React.ReactNode;
  /** Image in post */
  images?: ImageProps[];
  /** Video link in post */
  video?: {
    url: string;
    defaultImage: string;
  };
  type: 'game' | 'movie';
}
