import React, { FunctionComponent, PureComponent } from 'react'
import { View } from 'react-native'
import Colors from 'src/constants/Colors'

const Regular: FunctionComponent = props => <View style={{ height: '100%' }}>{props.children}</View>

const Elevate: FunctionComponent = props => (
  <View style={{ position: 'absolute', height: '100%', width: '100%', zIndex: 10, elevation: 10 }}>
    {props.children}
  </View>
)
interface CoverProps {
  height: number | string
  fullScreen: boolean
}

const Cover: FunctionComponent<CoverProps> = props => (
  <View
    style={{
      height: props.fullScreen ? '100%' : props.height,
      justifyContent: 'center',
      backgroundColor: props.fullScreen ? Colors.BLUE_GREY_DARK : Colors.BLACK,
    }}
  >
    {props.children}
  </View>
)

interface ContainerProps {
  height: number | string
}

const Container: FunctionComponent<ContainerProps> = props => (
  <View style={{ height: props.height, justifyContent: 'center' }}>{props.children}</View>
)

const VideoLayout = { Regular, Elevate, Cover, Container }

export default VideoLayout
