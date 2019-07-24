import { Dimensions } from 'react-native'

/*  
  This file contains the scaling function for resizing across multiple screens.
  Source: https://blog.solutotlv.com/size-matters/
*/

// Guideline sizes are based on standard ~5" screen mobile device
const { width, height } = Dimensions.get('window')
const guidelineBaseWidth = 350
const guidelineBaseHeight = 680

// Scale based on width
const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size

// Scale based on height
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size

/*
  Enables control the resize factor (default is 0.5).
  If normal scale will increase your size by +2X, moderateScale will only increase it by +X.
  Or if the resize factor is 0.25, instead of increasing by +2X it will increase by +0.5X.
*/
const moderateScale = (size: number, factor: number = 0.5) =>
  size + (horizontalScale(size) - size) * factor

// Scale for text based on moderateScale 0.4
const textScale = (size: number) => moderateScale(size, 0.4)

const ScreenHeight = verticalScale(680)
const ScreenWidth = horizontalScale(350)

const Scale = {
  hs: horizontalScale,
  vs: verticalScale,
  ms: moderateScale,
  ts: textScale,
  ScreenHeight,
  ScreenWidth,
}

export default Scale
