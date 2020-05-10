const getWindowSize = (size: number) => {
  if (size < 530) {
    return 'phone';
  }
  if (size < 830) {
    return 'tablet';
  }
  return size < 1000 ? 'small' : 'large';
};

export default getWindowSize;
