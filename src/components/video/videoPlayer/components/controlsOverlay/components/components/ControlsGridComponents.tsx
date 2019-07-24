import React, { FunctionComponent } from 'react'
import { Image, ImageSourcePropType, TouchableOpacity, View } from 'react-native'
import Colors from 'src/constants/Colors'

interface TouchableImageProps {
  style?: any
  imageUri: ImageSourcePropType
  onPress: () => void
}

const TouchableImage: FunctionComponent<TouchableImageProps> = props => (
  <TouchableOpacity onPress={props.onPress}>
    <View style={{ height: '100%', ...props.style }}>
      <Image
        style={{
          flex: 1,
          width: undefined,
          height: undefined,
          resizeMode: 'contain',
          tintColor: Colors.WHITE,
        }}
        source={props.imageUri}
      />
    </View>
    {props.children}
  </TouchableOpacity>
)

interface BackgroundButtonProps {
  onPress: () => void
}

const BackgroundButton: FunctionComponent<BackgroundButtonProps> = props => (
  <TouchableOpacity
    style={{
      position: 'absolute',
      width: '100%',
      height: '90%',
    }}
    onPress={props.onPress}
    activeOpacity={1}
  />
)

const ControlsGridComponents = { TouchableImage, BackgroundButton }

export default ControlsGridComponents
