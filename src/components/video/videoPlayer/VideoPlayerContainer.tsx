import React, { PureComponent } from 'react'
import { LayoutAnimation } from 'react-native'
import Video, { LoadError, OnLoadData, OnProgressData } from 'react-native-video'
import VideoLayout from 'src/components/video/videoPlayer/components/controlsOverlay/layout/VideoLayout'
import FullScreenModal from 'src/components/video/videoPlayer/components/FullScreen'
import CustomFloatingSlider, {
  SLIDER_HEIGHT,
} from 'src/components/video/videoPlayer/components/controlsOverlay/components/CustomFloatingSlider'
import ThumbnailBackground from 'src/components/video/videoPlayer/components/Thumbnail'
import VideoPlayer from 'src/components/video/videoPlayer/components/VideoPlayer'
import ControlsGrid from 'src/components/video/videoPlayer/components/controlsOverlay/components/ControlsGrid'

class VideoPlayerContainer extends PureComponent<IProps, IState> {
  static defaultProps = {
    viewedThresholdMs: 3,
  }

  _videoRef: Video
  _willBlurSubscription = null
  _viewedThresholdReached = false
  _visibilityTimeout = null

  state = {
    rate: 1,
    volume: 1,
    muted: true,
    duration: 0.0,
    currentTime: 0.0,
    paused: true,
    isLoading: false,
    hasLoaded: false,
    renderVideo: false,
    autoplay: false,
    autorender: false,
    showVideo: false,
    showOverlay: false,
    fullScreen: false,
  }

  componentDidMount() {
    this.setState({ paused: true })
  }

  componentWillUnmount() {
    clearTimeout(this._visibilityTimeout)
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    const autoplay = this.props.autoplay

    if (prevState.autoplay != autoplay) {
      this.setState({ autoplay: autoplay })
      // Overlay trigger
      if (autoplay) {
        this.setDismissOverlayTimer()
        this.setState({ showOverlay: true })
      }
      // Autoplay trigger
      if (prevState.paused && autoplay) {
        // Play
        this.setState({ paused: false })
      } else if (!prevState.paused && !autoplay) {
        // Stop
        this.setState({ paused: true })
      }
    }
  }

  checkViewedThreshold(time: number) {
    if (time > this.props.viewedThresholdMs && !this._viewedThresholdReached)
      if (this.props.onViewedThreshold) {
        this._viewedThresholdReached = true
        this.props.onViewedThreshold()
      }
  }

  onVideoRef = (videoRef: Video) => {
    this._videoRef = videoRef
  }

  onLoadStart = () => {
    this.setState({ isLoading: true })
  }

  onLoad = (data: OnLoadData) => {
    this.setState({ duration: data.duration, isLoading: false }, () => {
      this.setState({ hasLoaded: true })
    })
  }

  onProgress = (data: OnProgressData) => {
    if (data.currentTime > 0 && !this.state.showVideo) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      this.setState({ showVideo: true, currentTime: data.currentTime })
    } else {
      this.setState({ currentTime: data.currentTime })
    }

    this.checkViewedThreshold(data.currentTime)
  }

  onSeek = (time: number) => {
    if (time >= 0 && time <= this.state.duration) {
      if (this._videoRef) this._videoRef.seek(time)
      if (this.state.paused) this.setState({ currentTime: time })
    }
  }

  onEnd = () => {
    this.onSeek(0)
  }

  onBuffer = () => {}

  onError = (err: LoadError) => {
    console.log(err)
  }

  setDismissOverlayTimer = () => {
    clearTimeout(this._visibilityTimeout)
    this._visibilityTimeout = setTimeout(() => {
      this.setState({ showOverlay: false })
    }, 3000)
  }

  render() {
    const { video, videoThumbnail, height } = this.props

    const renderVideo = this.props.autorender
    const showVideo = this.state.showVideo
    const showOverlay = this.state.showOverlay
    let paused = this.state.paused
    let showSpinner = this.state.isLoading

    if (!this.state.autoplay && this.state.isLoading) {
      showSpinner = false // Video is preloading within autorender range
    }

    return (
      <VideoLayout.Container height={height + SLIDER_HEIGHT / 2}>
        <FullScreenModal
          visible={this.state.fullScreen}
          currentTime={this.state.currentTime}
          onPressModalVisibilityChange={(isVisible, time) => {
            this.setDismissOverlayTimer()
            this.onSeek(time)
            if (isVisible) this.setState({ muted: false })
            if (!isVisible) this.setState({ muted: true })
          }}
          onPressModalBackButton={() => {
            this.setState({ fullScreen: !this.state.fullScreen })
          }}
        >
          <VideoLayout.Cover height={height} fullScreen={this.state.fullScreen}>
            <ThumbnailBackground imageUri={videoThumbnail} hide={this.state.fullScreen}>
              <VideoPlayer
                videoUri={video}
                rate={this.state.rate}
                volume={this.state.volume}
                muted={this.state.muted}
                duration={this.state.duration}
                currentTime={this.state.currentTime}
                paused={paused}
                showSpinner={showSpinner}
                showVideo={showVideo}
                renderVideo={renderVideo}
                onVideoRef={this.onVideoRef}
                onLoad={this.onLoad}
                onLoadStart={this.onLoadStart}
                onProgress={this.onProgress}
                onEnd={this.onEnd}
                onBuffer={this.onBuffer}
                onError={this.onError}
              />
            </ThumbnailBackground>
            <VideoLayout.Elevate>
              <ControlsGrid
                showControls={showOverlay}
                fullScreen={this.state.fullScreen}
                isAudioOn={!this.state.muted}
                isPaused={this.state.paused}
                currentTime={this.state.currentTime}
                endTime={this.state.duration}
                onScrollingTrigger={() => {
                  this.setDismissOverlayTimer()
                }}
                onBackgroundPressed={() => {
                  this.setDismissOverlayTimer()
                  this.setState({ showOverlay: !showOverlay })
                }}
                onPlayButtonPressed={() => {
                  this.setDismissOverlayTimer()
                  this.setState({ paused: false })
                }}
                onPauseButtonPressed={() => {
                  this.setDismissOverlayTimer()
                  this.setState({ paused: true })
                }}
                onAudioOnButtonPressed={() => {
                  this.setDismissOverlayTimer()
                  this.setState({ muted: false })
                }}
                onAudioOffButtonPressed={() => {
                  this.setDismissOverlayTimer()
                  this.setState({ muted: true })
                }}
                onFullScreenButtonPressed={() => {
                  this.setDismissOverlayTimer()
                  this.setState({ fullScreen: !this.state.fullScreen })
                }}
                onSeek={(time: number) => {
                  this.setDismissOverlayTimer()
                  this.onSeek(time)
                }}
              />
            </VideoLayout.Elevate>
          </VideoLayout.Cover>

          {this.state.showOverlay && (
            <CustomFloatingSlider
              value={this.state.currentTime}
              maximumValue={this.state.duration}
              onSeek={(time: number) => {
                this.setDismissOverlayTimer()
                this.onSeek(time)
              }}
            />
          )}
        </FullScreenModal>
      </VideoLayout.Container>
    )
  }
}

interface IState {
  rate: number
  volume: number
  muted: boolean
  duration: number
  currentTime: number
  paused: boolean
  isLoading: boolean
  hasLoaded: boolean
  renderVideo: boolean
  autoplay: boolean
  autorender: boolean
  showVideo: boolean
  showOverlay: boolean
  fullScreen: boolean
}

interface IProps {
  style?: any
  video?: string
  videoThumbnail?: string
  height: number
  autoplay: boolean
  autorender: boolean
  viewedThresholdMs?: number
  onViewedThreshold?: () => void
}

export default VideoPlayerContainer
