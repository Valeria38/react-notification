import { StyleSheet } from 'aphrodite/no-important';

import { colors } from '../../constants/index';

export const regular = StyleSheet.create({
  progress: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    left: '0',
    borderRadius: '6px',
    boxShadow: 'none'
  },
  thumb: {
    height: '10px',
    background: colors.darkerGreen,
    color: 'white',
    borderRadius: '6px'
  }
});
