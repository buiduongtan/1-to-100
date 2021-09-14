import * as React from 'react';
import style from './styles.less';
import { Stack } from '../stack';
import { Icon } from '../icon';

export class SearchBar extends React.Component<{}, State> {
  private readonly ANIMATION_TIMEOUT = 300;

  ref: React.RefObject<HTMLInputElement>;
  constructor(props: {}) {
    super(props);

    this.state = {
      showSearchInput: false,
      keyword: '',
      disableSearchIcon: false,
      icon: 'search',
    };
    this.ref = React.createRef();
  }

  public componentDidMount() {
    this.ref.current?.addEventListener('blur', this.hideSearchBar);
  }

  public componentWillUnmount() {
    this.ref.current?.removeEventListener('blur', this.hideSearchBar);
  }

  public componentDidUpdate() {
    if (this.state.showSearchInput) {
      // Set time out due to animation
      setTimeout(() => {
        this.ref.current?.focus();
      }, this.ANIMATION_TIMEOUT);
    }
  }

  render() {
    return (
      <div className={style.search}>
        <Stack flex='row-nowrap' justify='start'>
          <div className={style.searchIcon} onClick={this.searchIconClick}>
            <Icon icon={this.state.icon} />
          </div>
          <input
            className={this.getInputClasses()}
            placeholder='Search keyword: ps4, ps5, gow, ...'
            ref={this.ref}
            onKeyPress={this.onPressSearch}
            onChange={this.onChange}
            value={this.state.keyword}
          />
        </Stack>
      </div>
    );
  }

  private hideSearchBar = () => {
    this.setState(
      {
        showSearchInput: false,
      },
      () => {
        setTimeout(() => {
          this.setState({
            disableSearchIcon: false,
            icon: 'search',
          });
        }, this.ANIMATION_TIMEOUT);
      },
    );
  };

  private searchIconClick = () => {
    const { showSearchInput, disableSearchIcon } = this.state;
    if (showSearchInput || disableSearchIcon) {
      return;
    }
    this.setState({
      showSearchInput: true,
      disableSearchIcon: true,
      icon: 'close',
    });
  };

  private onPressSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      console.log('key value', e.key);
      console.log('keyword ', this.state.keyword);
    }
  };

  private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      keyword: e.target.value,
    });
  };

  private getInputClasses() {
    const classes = [style.searchInput, style.searchInputHide];
    if (this.state.showSearchInput) {
      classes.push(style.searchInputShow);
    }
    return classes.join(' ');
  }
}

interface State {
  showSearchInput: boolean;
  keyword: string;
  disableSearchIcon: boolean;
  icon: 'search' | 'close';
}
