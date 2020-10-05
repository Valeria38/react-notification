import * as React from 'react';
import * as Spring from 'react-spring';

import { css } from 'aphrodite/no-important';

const cross = require('images/cross.svg');

import { Observer, getPositionObject } from 'utils/index';

// import { ProgressBar } from 'components/ProgressBar/index';

import { defaultDelay } from 'constants/index';

import * as styles from './style';

type SetProps = {
  type: string;
  message: string;
  withCross?: boolean;
  delay?: number;
  customProps?: object;
  position?: string;
  index?: number;
};

const observer = new Observer();

export const set = (props: SetProps) => {
  observer.dispatch(props);
};

export const Notification: React.FC = (): JSX.Element => {
  const [notification, setNotification] = React.useState<any>([false]);

  const [translateX, setTranslateX] = React.useState(200);

  // const [notificationsCount, setNotificationsCount] = React.useState(0);

  const transitions = Spring.useTransition(notification, null, {
    from: { opacity: 1, transform: `translateX(${translateX}%)` },
    enter: { opacity: 1, transform: 'translateX(0)' },
    leave: { opacity: 1, transform: `translateX(${translateX}%)` },
    config: Spring.config.wobbly
  });

  const defaultPositionStyles = getPositionObject('top-right', 0);

  const makeVisible = (props: SetProps) => {
    console.log('make visible');

    run({ ...props });
  };

  const run = ({ type, message, withCross, delay, customProps, position }: SetProps) => {
    const positionStyles = position ? getPositionObject(position, 0) : defaultPositionStyles;

    position && (positionStyles.left ? setTranslateX(-200) : setTranslateX(200));

    if (withCross === undefined) {
      withCross = true;
    }

    setNotification([
      {
        type,
        message,
        withCross,
        delay: delay || defaultDelay,
        customProps,
        positionStyles
      }
    ]);

    closeAfterDelay(delay || defaultDelay);
  };

  const closeAfterDelay = (delay: number) => {
    setTimeout(() => {
      console.log('timeout close');
      setNotification([false]);
    }, delay);
  };

  const close = () => {
    setNotification([false]);

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
          <img className={css(styles.cross(item.withCross)._)} src={cross} alt="Cross icon" onClick={close} />
          {item.message}
        </Spring.animated.div>
      )
    );
  });
};
