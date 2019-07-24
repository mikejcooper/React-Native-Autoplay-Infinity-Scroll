import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import Video, { LoadError, OnLoadData, OnProgressData } from 'react-native-video'
import Colors from 'src/constants/Colors'

class VideoPlayer extends Component<IProps, IState> {
  render() {
    const { showSpinner, showVideo, renderVideo, videoUri } = this.props

    return (
      <View
        style={{
          ...styles.container,
          zIndex: 10,
        }}
      >
        {showSpinner && (
          <View style={styles.spinner}>
            <ActivityIndicator animating color={Colors.TURQUOISE} size="large" />
          </View>
        )}
        {renderVideo && (
          <>
            <Video
              ref={(ref: Video) => {
                this.props.onVideoRef(ref)
              }}
              source={{
                uri: videoUri,
              }}
              style={{
                ...styles.videoContainer,
                height: showVideo ? '100%' : '0%',
                backgroundColor: Colors.TRANSPARENT,
              }}
              resizeMode={'contain'}
              repeat={true}
              paused={this.props.paused}
              volume={this.props.volume}
              muted={this.props.muted}
              onLoad={this.props.onLoad}
              onLoadStart={this.props.onLoadStart}
              rate={this.props.rate}
              onProgress={this.props.onProgress}
              onEnd={this.props.onEnd}
              onBuffer={this.props.onBuffer}
              onError={this.props.onError}
            />
          </>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  spinner: {
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    margin: 'auto',
    resizeMode: 'contain',
  },
})

interface IState {}

interface IProps {
  rate: number
  volume: number
  muted: boolean
  duration: number
  currentTime: number
  paused: boolean
  showSpinner: boolean
  showVideo: boolean
  renderVideo: boolean
  videoUri: string

  onVideoRef: (videoRef: Video) => void
  onLoad: (data: OnLoadData) => void
  onLoadStart: () => void
  onProgress: (data: OnProgressData) => void
  onEnd: () => void
  onBuffer: () => void
  onError: (err: LoadError) => void
}

export default VideoPlayer

export type ResizeModeTypes = 'stretch' | 'contain' | 'cover' | 'none'
