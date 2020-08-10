import * as React from 'react';
import * as Spring from 'react-spring';

import { css } from 'aphrodite/no-important';

const cross = require('images/cross.svg');

import { Observer } from 'utils/index';

import { useTimeout } from 'utils/hooks/index';
import * as styles from './style';

const observer = new Observer();

type SetProps = {
  type: string;
  message: string;
  withCross?: boolean;
  delay?: number;
  customProps?: object;
  position?: string;
};

export const set = (props: SetProps) => {
  observer.dispatch(props);
};

const getPositionObject = (position: string) => {
  const result: any = {};
  const positionKeys = position.split('-');

  for (const key of positionKeys) {
    result[key] = '10px';
  }

  result.isTouched = true;

  return result;
};

export const Notification: React.FC = (): JSX.Element => {
  const [notification, setNotification] = React.useState<any>(false);

  const [stateDelay, setStateDelay] = React.useState(2000);
  const [translateX, setTranslateX] = React.useState(200);

  const transitions = Spring.useTransition(notification, null, {
    from: { opacity: 1, transform: `translateX(${translateX}%)` },
    enter: { opacity: 1, transform: 'translateX(0)' },
    leave: { opacity: 1, transform: `translateX(${translateX}%)` },
    config: Spring.config.wobbly
  });

  useTimeout(() => {
    setNotification(false);
  }, stateDelay);

  const defaultPositionStyles = getPositionObject('top-right');

  const makeVisible = ({ type, message, withCross, delay, customProps, position }: SetProps) => {
    const positionStyles = getPositionObject(position);

    position && (positionStyles.left ? setTranslateX(-200) : setTranslateX(200));

    setNotification({
      type,
      message,
      withCross,
      delay,
      customProps,
      positionStyles: position ? positionStyles : defaultPositionStyles
    });

    delay && setStateDelay(delay);
  };

  const close = () => {
    setNotification(false);

    observer.unsubscribe(makeVisible);
  };

  React.useEffect(() => {
    observer.subscribe(makeVisible);
    return () => {
      observer.unsubscribe(makeVisible);
    };
  }, []);

  // @ts-ignore
  return transitions.map(({ item, key, props }) => {
    return (
      item && (
        <Spring.animated.div
          style={props}
          key={key}
          className={css(styles.notification(item.type, item.customProps, item.positionStyles)._)}
        >
          {item.message}
          <img className={css(styles.cross(item.withCross)._)} src={cross} alt="Cross icon" onClick={close} />
        </Spring.animated.div>
      )
    );
  });
};
