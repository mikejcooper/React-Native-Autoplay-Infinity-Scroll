import React, { FunctionComponent } from 'react'
import { View } from 'react-native'
import VideoPlayerContainer from 'src/components/video/videoPlayer/VideoPlayerContainer'
import Colors from 'src/constants/Colors'
import Components from 'src/components/video/VideoItemComponents'

// Set height of video - Needed due to container 'overflow' requirement for video scrubber.
export const VIDEO_HEIGHT = 200

interface VideoItemProps {
  autoplay: boolean
  autorender: boolean
  thumbnailUrl: string
  url: string
}

const VideoItem: FunctionComponent<VideoItemProps> = props => (
  <Components.CornerRadius>
    <Components.Columns>
      <View
        style={{
          // Allow user to visualise autoplay trigger
          backgroundColor: props.autoplay ? Colors.READ_MORE : 'transparent',
        }}
      >
        <VideoPlayerContainer
          video={props.url}
          videoThumbnail={props.thumbnailUrl}
          height={VIDEO_HEIGHT}
          autoplay={props.autoplay}
          autorender={props.autorender}
        />
      </View>
    </Components.Columns>
  </Components.CornerRadius>
)

export default VideoItem
