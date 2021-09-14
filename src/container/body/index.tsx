import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ScrollToTopButton } from 'src/visual-common/scroll-to-top-button';
import { OnScroll, Event } from 'src/visual-common/on-scroll';
import { RoutePath } from 'src/utils/route';

import { PuzzleGame } from '../pages/puzzle-game';
import { Site, Data } from '../pages/site';

const data: Data = {
  gameTitle: 'GOTHAM KNIGHTS',
  postTitle: "Gotham Knights: Heroes' Different Combat Styles Explained",
  author: 'Joe Skrebels',
  closeParagraph: (
    <p>
      We've learned a lot about Gotham Knights since it was announced at DC
      Fandome, from why it's killed off Batman, how it's set in a different
      universe, and why it definitely isn't a game-as-service.
    </p>
  ),
  firstParagraph: (
    <>
      <p>
        WB Games Montréal has explained a little more about the different combat
        styles of its four heroes, Red Hood, Nightwing, Robin, and Batgirl.
      </p>
      <p>
        In a previous interview with IGN, creative director Patrick Redding made
        clear that all four characters would use melee and ranged weaponry, as
        well as special abilities. In a new interview summarised by the
        PlayStation Blog, Redding explained how, despite the similar set-up, the
        four characters would fight differently.
      </p>
      <p>
        "Red Hood is a brutal brawler with a focus on gunplay. Nightwing’s
        acrobatics lead to a more exaggerated style of fighting, while the
        current Robin favours stealth and is a dab hand at using status effects
        to disrupt enemies. And Batgirl? 'She combines a laser-focused, targeted
        and efficient melee fighter approach with a lot of resilience and the
        ability to weaponize her environment using hacking,' says Redding."
      </p>
    </>
  ),
  secondParagraph: (
    <>
      <p>
        While we knew that each character would utilise different weapons, this
        is our first hint at how the characters' innate strengths will be used
        in moment-to-moment gameplay. Speaking of those weapons, we've also
        learned that the neon indicators we saw on each one are actually
        gameplay-related, rather than simply colour-coded for aesthetic reasons.
      </p>
      <p>
        “It’s a very important platform for us to deliver game information,"
        explained Redding. "Some of those visual effects tell you what damage
        type you have equipped on your weapons. So it’s a way for the player to
        receive signs of feedback… that lets them know what protection they
        have, what they’re going to use against their enemies, both in terms of
        ranged and melee attacks.”
      </p>
      <p>
        Redding has previously told IGN that players can choose to play as a
        single hero for the entire campaign, or switch between them by heading
        to the Belfry headquarters location - different playstyles and status
        effect-related gear makes clearer the benefit of switching characters,
        given that some may offer different approaches to specific challenges
        along the way.
      </p>
    </>
  ),
  postData: '5 Sep 2020 1:08 am',
  updateDate: '5 Sep 2020 1:21 am',
  images: [
    {
      url: '/assets/img/gotham-knights.jpg',
    },
    {
      url: '/assets/img/batman_arkham_city.jpg',
    },
    {
      url: '/assets/img/the_witcher.jpg',
    },
    {
      url: '/assets/img/batman_arkham_city.jpg',
    },
  ],
  video: {
    url: 'https://www.youtube.com/embed/IhVf_3TeTQE?autoplay=1',
    defaultImage: '/assets/img/gotham-knights.jpg',
  },
  type: 'game',
};
export class Body extends React.Component<{}, State> {
  private scrollEvents: Event[] = [];

  constructor(props: {}) {
    super(props);

    this.state = {
      events: [],
    };
  }

  // TODO: move this function to a action class component to exclude from visual component
  protected updateScrollEvent: ScrollEvent = (event: Event) => {
    this.scrollEvents.push(event);
    this.setState({
      events: [...this.scrollEvents],
    });
  };

  protected removeScrollEvent: ScrollEvent = (event: Event) => {
    const index = this.scrollEvents.indexOf(event);
    if (index === -1) {
      return;
    }
    this.scrollEvents.splice(index, 1);
    this.setState({
      events: [...this.scrollEvents],
    });
  };

  // Clear events of `this.state.events` which have index in `indexes`
  protected clearEvents = (indexes: number[]) => {
    const newEvents = this.state.events.filter((value, index) => {
      return indexes.indexOf(index) == -1;
    });
    this.setState({
      events: [...newEvents],
    });
  };

  render() {
    return (
      <>
        <Switch>
          <Route exact path='/'>
            <PuzzleGame />
          </Route>
          <Route path={['/home', '/index']}>
            <Redirect to='/' />
          </Route>
          <Route
            path={RoutePath.postRoute}
            render={({ match, location }) => (
              // {console.log({ match })}
              // {console.log({ location })}
              <Site data={data} />
            )}
          />
          <Route path='/*'>
            <h1 style={{ color: 'white' }}>404: Page not found.</h1>
          </Route>
        </Switch>
        {/* <ScrollToTopButton updateScrollEvent={this.updateScrollEvent} /> */}
        {/* <OnScroll events={this.state.events} clearEvents={this.clearEvents} /> */}
      </>
    );
  }
}

interface State {
  events: Event[];
}

export type ScrollEvent = (event: Event) => void;
