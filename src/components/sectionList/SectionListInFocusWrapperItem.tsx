import React, { Component, ReactElement } from 'react'
import { View } from 'react-native'
import { VIDEO_HEIGHT } from 'src/components/video/VideoItem'
import Scale from 'src/constants/Scale'

class SectionListInFocusWrapperItem extends Component<IProps, IState> {
  _isMounted = false
  _itemRef = null

  _scrollHeight = -1

  state = {
    itemCenterToScreenCenter: Scale.ScreenHeight,
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  componentWillUpdate() {
    this.updateItemYPosition(this.props.scrollHeight)
  }

  updateItemYPosition(scrollHeight: number) {
    if (!this._itemRef) return

    // Asynchronously get measurements
    this._itemRef.measure(
      (x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
        const isStationary = scrollHeight === this._scrollHeight

        if (this._isMounted && !isStationary) {
          this._scrollHeight = scrollHeight

          const itemYPosition = pageY + scrollHeight
          // Calculate height from video middle to page top.
          const itemTopToScreenTop = scrollHeight - itemYPosition
          const itemCenterToScreenTop = itemTopToScreenTop - VIDEO_HEIGHT / 2
          const itemCenterToScreenCenter = itemCenterToScreenTop + Scale.ScreenHeight / 2

          this.setState({ itemCenterToScreenCenter: itemCenterToScreenCenter })
        }
      }
    )
  }

  render() {
    const { scrollHeight } = this.props

    return (
      <View
        ref={(ref: any) => (this._itemRef = ref)}
        onLayout={(_: any) => this.updateItemYPosition(scrollHeight)}
      >
        {this.props.renderItemWithInfo(Math.abs(this.state.itemCenterToScreenCenter))}
      </View>
    )
  }
}

interface IState {
  itemCenterToScreenCenter: number
}

interface IProps {
  renderItemWithInfo: (distToScreenCenter: number) => ReactElement
  scrollHeight: number
}

export default SectionListInFocusWrapperItem
