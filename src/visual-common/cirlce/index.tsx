import * as React from 'react';
import style from './styles.less';

export class Circle extends React.Component<Props> {
  private readonly BASE_DEGREES = -135;
  private readonly FULL_POINT = 10;

  rightHalf = React.createRef<HTMLDivElement>();
  leftHalf = React.createRef<HTMLDivElement>();

  constructor(props: Props) {
    super(props);
  }

  public componentDidMount() {
    this.animation();
  }

  public componentDidUpdate() {
    this.animation();
  }

  public animation() {
    if (this.props.triggerAnimation) {
      this.rotate(this.rightHalf, this.leftHalf, this.props.point);
    }
  }

  render() {
    return (
      <div className={style.container}>
        <div className={style.progressRightHaft} ref={this.rightHalf} />
        <div className={style.progressLeftHaft} ref={this.leftHalf} />
        <div className={style.baseLeft} />
        <div className={style.baseRight} />
        <div>{this.props.children}</div>
      </div>
    );
  }

  private rotate(
    refRightHalf: React.RefObject<HTMLDivElement>,
    refLeftHalf: React.RefObject<HTMLDivElement>,
    point: number,
  ) {
    if (refRightHalf.current && refLeftHalf.current) {
      if (point <= this.FULL_POINT / 2) {
        const degress = this.calculate(point);
        refRightHalf.current.style.transform = `rotate(${degress}deg)`;
        refRightHalf.current.style.transition = 'all 1s';
      } else {
        const degress = this.calculate(point - this.FULL_POINT / 2);
        refRightHalf.current.style.transform = `rotate(45deg)`;
        refRightHalf.current.style.transition = 'all 1s ease-in-out';
        refLeftHalf.current.style.visibility = 'visible';
        refLeftHalf.current.style.transform = `rotate(${degress}deg)`;
        refLeftHalf.current.style.transition = 'all 1s 0.8s ease-out';
      }
    }
  }

  private calculate(point: number) {
    const degrees = this.BASE_DEGREES + (point / 10) * 360;
    return degrees;
  }
}

interface Props {
  children?: React.ReactNode;
  point: number;
  triggerAnimation: boolean;
}
