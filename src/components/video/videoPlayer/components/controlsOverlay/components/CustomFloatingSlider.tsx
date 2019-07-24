import React, { PureComponent } from 'react'
import Slider from 'react-native-slider'
import Colors from 'src/constants/Colors'
import Scale from 'src/constants/Scale'

export const SLIDER_HEIGHT = Scale.vs(30)

class CustomFloatingSlider extends PureComponent<IProps, IState> {
  trackHeight = Scale.ms(4)

  render() {
    return (
      <Slider
        style={{
          width: '100%',
          height: SLIDER_HEIGHT,
          position: 'absolute',
          bottom: 0,
          zIndex: 10,
          elevation: 10,
        }}
        value={this.props.value}
        onValueChange={(value: number) => this.props.onSeek(value)}
        minimumValue={0}
        maximumValue={this.props.maximumValue}
        minimumTrackTintColor={Colors.TURQUOISE}
        maximumTrackTintColor={Colors.GRAY}
        thumbTintColor={Colors.TURQUOISE}
        thumbStyle={{ width: Scale.ms(13), height: Scale.ms(13), borderRadius: 50 }}
        thumbTouchSize={{
          width: Scale.hs(50),
          height: Scale.vs(50),
        }}
        trackStyle={{ height: this.trackHeight, borderRadius: 0 }}
      />
    )
  }
}

interface IState {}

interface IProps {
  value: number
  maximumValue: number
  onSeek: (time: number) => void
}

export default CustomFloatingSlider
