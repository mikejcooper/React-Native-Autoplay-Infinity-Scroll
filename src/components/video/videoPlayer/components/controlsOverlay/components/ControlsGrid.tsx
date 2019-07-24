import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { ControlsGridBottomRow } from 'src/components/video/videoPlayer/components/controlsOverlay/components/components/ControlsGridBottomRow'
import ControlsGridComponents from 'src/components/video/videoPlayer/components/controlsOverlay/components/components/ControlsGridComponents'
import { ControlsGridTopRow } from 'src/components/video/videoPlayer/components/controlsOverlay/components/components/ControlsGridTopRow'
import VideoLayout from 'src/components/video/videoPlayer/components/controlsOverlay/layout/VideoLayout'
import Scale from 'src/constants/Scale'

class ControlsGrid extends PureComponent<IProps, IState> {
  render() {
    const {
      showControls,
      fullScreen,
      isAudioOn,
      isPaused,
      currentTime,
      endTime,
      onScrollingTrigger,
      onBackgroundPressed,
      onPlayButtonPressed,
      onPauseButtonPressed,
      onAudioOnButtonPressed,
      onAudioOffButtonPressed,
      onFullScreenButtonPressed,
      onSeek,
    } = this.props

    return (
      <VideoLayout.Regular>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingBottom: fullScreen ? Scale.ms(40) : Scale.ms(14),
            paddingTop: fullScreen ? Scale.ms(20) : Scale.ms(13),
          }}
        >
          <ControlsGridComponents.BackgroundButton onPress={onBackgroundPressed} />

          {showControls && (
            <>
              {/* Top Row */}
              <ControlsGridTopRow
                isAudioOn={isAudioOn}
                onAudioOnButtonPressed={onAudioOnButtonPressed}
                onAudioOffButtonPressed={onAudioOffButtonPressed}
                onFullScreenButtonPressed={onFullScreenButtonPressed}
              />
              {/* Bottom Row */}
              <View>
                <ControlsGridBottomRow
                  currentTime={currentTime}
                  endTime={endTime}
                  isPaused={isPaused}
                  onPauseButtonPressed={onPauseButtonPressed}
                  onPlayButtonPressed={onPlayButtonPressed}
                />
              </View>
            </>
          )}
        </View>
      </VideoLayout.Regular>
    )
  }
}

interface IState {}

interface IProps {
  showControls: boolean
  fullScreen: boolean
  isAudioOn: boolean
  isPaused: boolean
  currentTime: number
  endTime: number
  onScrollingTrigger: () => void
  onBackgroundPressed: () => void
  onPlayButtonPressed: () => void
  onPauseButtonPressed: () => void
  onAudioOnButtonPressed: () => void
  onAudioOffButtonPressed: () => void
  onFullScreenButtonPressed: () => void
  onSeek: (time: number) => void
}

export default ControlsGrid
