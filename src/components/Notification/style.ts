import { StyleSheet } from 'aphrodite/no-important';

import { colors } from '../../constants/index';

export const notification = (type: string, extraStyles: object, positionStyles: {}) => {
  return StyleSheet.create({
    _: {
      position: 'fixed',
      ...positionStyles,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      padding: '20px 40px',
      background:
        type === 'success'
          ? colors.green
          : type === 'warning'
          ? colors.yellow
          : type === 'error'
          ? colors.red
          : 'slateblue',
      color: 'white',
      borderRadius: '6px',
      ...extraStyles
    }
  });
};

export const cross = (isVisible: boolean) =>
  StyleSheet.create({
    _: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      display: isVisible ? 'block' : 'none',
      cursor: 'pointer'
    }
  });
