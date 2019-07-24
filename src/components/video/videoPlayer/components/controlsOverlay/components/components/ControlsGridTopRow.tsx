import React, { FunctionComponent } from 'react'
import { View } from 'react-native'
import Images from 'src/assets/images'
import Scale from 'src/constants/Scale'
import ControlsGridComponents from 'src/components/video/videoPlayer/components/controlsOverlay/components/components/ControlsGridComponents'

interface TopRowProps {
  isAudioOn: boolean
  onAudioOffButtonPressed: () => void
  onAudioOnButtonPressed: () => void
  onFullScreenButtonPressed: () => void
}

export const ControlsGridTopRow: FunctionComponent<TopRowProps> = props => (
  <View style={{ height: Scale.ms(15), width: '100%' }}>
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <ControlsGridComponents.TouchableImage
          style={{ height: Scale.ms(13), width: Scale.ms(13), margin: 16 }}
          imageUri={props.isAudioOn ? Images.audioOn : Images.audioOff}
          onPress={props.isAudioOn ? props.onAudioOffButtonPressed : props.onAudioOnButtonPressed}
        />
      </View>

      <View
        style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}
      >
        <ControlsGridComponents.TouchableImage
          style={{ height: Scale.ms(10), width: Scale.ms(10), margin: 16 }}
          imageUri={Images.fullScreen}
          onPress={props.onFullScreenButtonPressed}
        />
      </View>
    </View>
  </View>
)
