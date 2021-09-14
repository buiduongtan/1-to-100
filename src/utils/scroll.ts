/**
 * Allows to scroll to the position of a Node with a smooth behavior.
 * This solution tries to emulate the behavior of "scroll-behavior: smooth" as it is not
 * supported by IE nor Safari.
 * @link https://developer.mozilla.org/es/docs/Web/CSS/scroll-behavior
 */
export const scrollTo = (options: ScrollOptions) => {
  const { to, duration, containerRef } = options;
  if (typeof document === 'undefined') return null;
  const element = containerRef || document.scrollingElement || document.documentElement;
  const start = element.scrollTop;
  const change = to - start;
  const startDate = new Date();

  /**
   * Create ease in/out effect when scrolling to top
   * Return scroll position based on time and change in value
   */
  const easeInOutQuad = (
    currentTime: number,
    startValue: number,
    changeInValue: number,
    duration: number
  ) => {
    let t = currentTime;
    const b = startValue;
    const c = changeInValue;
    const d = duration;

    /*
     * If currentTime is first half of duration
     * the return value will be result from quadratic ease in
     */
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;

    /*
     * If currentTime is second half of duration
     * the return value will be result from quadratic ease out
     */
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const animateScroll = () => {
    const currentDate = new Date();
    const currentTime = currentDate.getTime() - startDate.getTime();
    element.scrollTop = easeInOutQuad(currentTime, start, change, duration);
    if (currentTime < duration) {
      requestAnimationFrame(animateScroll);
    } else {
      element.scrollTop = to;
    }
  };
  animateScroll();
};

export type ScrollOptions = {
  /** destination scroll position (>=0) */
  to: number;
  /** duration time in ms */
  duration: number;
  /** Container where to execute the animation. By default is the body. */
  containerRef?: Element;
};
