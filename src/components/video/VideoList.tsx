import React, { FunctionComponent, ReactElement } from 'react'
import { SectionList } from 'src/components/sectionList'
import VideoItem from 'src/components/video/VideoItem'
import { VideoData } from 'src/constants/DataStore'
import { RefreshControl } from 'react-native'
import Colors from 'src/constants/Colors'
import Scale from 'src/constants/Scale'

interface ListProps {
  isLoading: boolean
  isRefreshing: boolean
  onLoadMore: () => void
  onRefresh: () => void
  videos: VideoData[]
}

const VideoList: FunctionComponent<ListProps> = props => (
  <SectionList.InFocus
    sections={[{ title: 'Video List', data: props.videos }]}
    // Important bit.. We now make available itemInFocus & itemInFocusWindow to each item in list.
    renderItemWithInfo={(item: VideoData, itemInFocus: boolean, itemInFocusWindow: boolean) => {
      return (
        <VideoItem
          url={item.url}
          thumbnailUrl={item.thumbnailUrl}
          autoplay={itemInFocus}
          autorender={itemInFocusWindow}
        />
      )
    }}
    refreshing={props.isRefreshing}
    refreshControl={
      <RefreshControl
        refreshing={props.isRefreshing}
        onRefresh={props.onRefresh}
        progressViewOffset={1}
        progressBackgroundColor={Colors.OFF_WHITE}
      />
    }
    ItemSeparatorComponent={() => {
      return <SectionList.Components.SeparatorItem />
    }}
    ListFooterComponent={() => {
      if (props.isLoading) return <SectionList.Components.ActivityIndicatorItem />

      return <SectionList.Components.DefaultFooter />
    }}
    contentContainerStyle={{
      paddingHorizontal: Scale.ms(14),
    }}
    onEndReachedThreshold={0.5}
    onEndReached={() => {
      props.onLoadMore()
    }}
    windowSize={15}
    keyExtractor={item => item.id}
    renderSectionHeader={({ section }) => {
      return <SectionList.Components.SectionHeaderItem title={section.title} />
    }}
  />
)

export default VideoList
