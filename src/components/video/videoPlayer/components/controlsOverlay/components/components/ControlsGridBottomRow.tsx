import React, { FunctionComponent } from 'react'
import { Text, View } from 'react-native'
import Images from 'src/assets/images'
import ControlsGridComponents from 'src/components/video/videoPlayer/components/controlsOverlay/components/components/ControlsGridComponents'
import Scale from 'src/constants/Scale'
import Colors from 'src/constants/Colors'
import NumberHelper from 'src/constants/NumberHelper'

interface TopRowProps {
  currentTime: number
  endTime: number
  isPaused: boolean
  onPlayButtonPressed: () => void
  onPauseButtonPressed: () => void
}

export const ControlsGridBottomRow: FunctionComponent<TopRowProps> = props => (
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
          style={{
            height: Scale.ms(11),
            width: Scale.ms(11),
            margin: 12,
          }}
          imageUri={props.isPaused ? Images.play : Images.pause}
          onPress={props.isPaused ? props.onPlayButtonPressed : props.onPauseButtonPressed}
        />
        <View
          style={{
            backgroundColor: Colors.TRANSPARENT,
            height: 'auto',
            width: 'auto',
          }}
        >
          <Text
            style={{
              fontSize: Scale.ts(13),
              color: Colors.WHITE,
            }}
          >
            {NumberHelper.convertSecondsToReadableStr(props.currentTime)}
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            height: 'auto',
            width: 'auto',
            marginRight: 12,
          }}
        >
          <Text
            style={{
              fontSize: Scale.ts(13),
              color: Colors.WHITE,
            }}
          >
            {NumberHelper.convertSecondsToReadableStr(props.endTime)}
          </Text>
        </View>
      </View>
    </View>
  </View>
)
