export const getPositionObject = (position: string, index: number) => {
  const result: any = {};
  const positionKeys = position.split('-');

  for (const key of positionKeys) {
    if (index === 0) {
      result[key] = '10px';
    } else {
      if (key === 'top' || key === 'bottom') {
        result[key] = `${index * 70 + 10}px`;
      } else {
        result[key] = '10px';
      }
    }
  }

  // console.log('r', result);

  return result;
};
