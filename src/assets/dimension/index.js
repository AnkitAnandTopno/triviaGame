const screenSizeFactor =
  Math.sqrt(Math.pow(window.innerWidth, 2)) / Math.sqrt(Math.pow(1600, 2));
const sizes = {
  logoHeight:
    window.innerHeight > window.innerWidth
      ? 200 * screenSizeFactor
      : 60 * screenSizeFactor,
  screenWidth: 1600 * screenSizeFactor,
  headTextSize: 90 * screenSizeFactor,
  screenSizeFactor: screenSizeFactor,
  deviceHeight: window.innerHeight,
  deviceWidth: window.innerWidth
};

export default sizes;
