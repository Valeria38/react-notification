import React from 'react';
import PropTypes from 'pro-types';

import { Observer } from '../utils/index';

const observer = new Observer();

const set = observer.set;
console.log('set', set);

export const Notification = ({ type, message, position, autoClose, customStyles }) => {
  return <div>{message}</div>;
};

Notification.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  position: PropTypes.string,
  autoClose: PropTypes.number,
  customStyles: PropTypes.object
};

Notification.defaultProps = {
  position: 'top-right',
  autoClose: 3000
};
