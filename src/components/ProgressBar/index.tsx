import * as React from 'react';
import * as Spring from 'react-spring';
import { css } from 'aphrodite/no-important';

import { useTimeout } from 'utils/hooks/useTimeout';

import * as styles from './style';

type IProps = {
  progress: number;
  delay: number;
  callback: () => void;
};

export const ProgressBar: React.FC<IProps> = ({ progress, delay, callback }): JSX.Element => {
  // const [counter, setCounter] = React.useState(0);
  const props = Spring.useSpring({ width: progress > 0 ? `${progress}%` : '0%' });

  useTimeout(callback, delay / 100);

  // React.useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     callback();
  //   }, delay / 100);

  //   setCounter(counter + 1);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [callback, counter]);

  return (
    <div className={css(styles.regular.progress)}>
      <Spring.animated.div className={css(styles.regular.thumb)} style={props}></Spring.animated.div>
    </div>
  );
};
