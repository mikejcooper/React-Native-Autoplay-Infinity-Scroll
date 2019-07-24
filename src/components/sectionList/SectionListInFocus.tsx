import React, { Component, ReactElement } from 'react'
import { ViewToken, SectionList, SectionListProps } from 'react-native'
import SectionListInFocusWrapperItem from 'src/components/sectionList/SectionListInFocusWrapperItem'
import Scale from 'src/constants/Scale'

// Number of items above and below 'In Focus' item to autorender
const FOCUS_WINDOW_SIZE = 1
// Time to wait before checking item is still in focus and then updating state.
const FOCUS_ITEM_UPDATE_DELAY_MS = 400
// Scroll view state value will be set after every 15px scroll movement.
const SCROLL_DISTANCE_STATE_UPDATE = Scale.vs(20)

class SectionListInFocus extends Component<IProps, IState> {
  _isMounted = false

  _scrollHeights = []
  _inFocusIndex = -Math.max()
  _inFocusDist = Scale.ScreenHeight

  _wasItemInFocusTimer = null

  state = {
    scrollHeight: 0,
    inFocusIndex: -Math.max(),
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    clearTimeout(this._wasItemInFocusTimer)
    this._isMounted = false
  }

  /*  
    InFocus Item Logic
  */

  itemUpdate(index: number, dist: number) {
    if (dist < this._inFocusDist) {
      this.setInFocusItem(index, dist)
    } else if (this._inFocusIndex == index) {
      this._inFocusDist = dist
    }
  }

  setInFocusItem(index: number, dist: number) {
    this._inFocusIndex = index
    this._inFocusDist = dist

    this._wasItemInFocusTimer = setTimeout(() => {
      if (!this._isMounted) return

      const indexNearViewableIndex =
        Math.abs(index - this._viewableIndexCenter) < 2 * FOCUS_WINDOW_SIZE
      const indexStillInFocus = index == this._inFocusIndex

      if (indexStillInFocus && indexNearViewableIndex) {
        this.setState(() => ({ inFocusIndex: index }))
      }
    }, FOCUS_ITEM_UPDATE_DELAY_MS)
  }

  isItemInFocus(index: number): boolean {
    return index == this.state.inFocusIndex
  }

  isItemInFocusWindow(index: number): boolean {
    return (
      index + FOCUS_WINDOW_SIZE >= this.state.inFocusIndex &&
      index - FOCUS_WINDOW_SIZE <= this.state.inFocusIndex
    )
  }

  /*  
    onScroll Logic
  */

  onScroll = (event: Record<string, any>) => {
    const scrollHeight = event.nativeEvent.contentOffset.y
    this._scrollHeights.push(scrollHeight)
    const scrollHeightLastUpdate = this._scrollHeights[0]

    // Trigger state update after scroll distance
    if (Math.abs(scrollHeight - scrollHeightLastUpdate) > SCROLL_DISTANCE_STATE_UPDATE) {
      this._scrollHeights = [] // Reset array
      this.setState({ scrollHeight: scrollHeight })
    }
  }

  /*  
    onViewableItemsChanged Logic
    
    Used to establish which items are on screen. 
    This function appears to be accuracy, it will always return visible items.
    However, still we need exact position info to determine central item. 
  */

  _viewableIndexCenter = -10

  onViewableItemsChanged = (info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
    // Remove section headers from items
    const viewableItems = []
    for (let i = 0; i < info.viewableItems.length; i++) {
      if (info.viewableItems[i].index != null) {
        viewableItems.push(info.viewableItems[i])
      }
    }

    let arrLen = viewableItems.length
    let inFocusIndex = arrLen % 2 == 0 ? arrLen / 2 : (arrLen - 1) / 2

    // Only two items viewable and at top of list, set 0th item
    if (inFocusIndex == 1 && arrLen == 2) {
      inFocusIndex = 0
    }

    let itemInFocus = viewableItems[inFocusIndex]

    if (!itemInFocus) return

    // Reset inFocus data if inFocusIndex has been scrolled past (or unmounted) without updating
    if (Math.abs(itemInFocus.index - this._inFocusIndex) > 2 * FOCUS_WINDOW_SIZE) {
      this._inFocusIndex = -1
      this._inFocusDist = Scale.ScreenHeight
    }

    this._viewableIndexCenter = itemInFocus.index
  }

  render() {
    return (
      <SectionList
        renderItem={({ item, index }) => {
          const itemWindowSize = FOCUS_WINDOW_SIZE
          const withinViewableIndexWindow =
            this._viewableIndexCenter + itemWindowSize >= index &&
            this._viewableIndexCenter - itemWindowSize <= index

          if (withinViewableIndexWindow) {
            return (
              <SectionListInFocusWrapperItem
                scrollHeight={this.state.scrollHeight}
                renderItemWithInfo={distToScreenCenter => {
                  this.itemUpdate(index, distToScreenCenter)
                  const itemInFocus = this.isItemInFocus(index)
                  const itemInFocusWindow = this.isItemInFocusWindow(index)
                  return this.props.renderItemWithInfo(item, itemInFocus, itemInFocusWindow)
                }}
              />
            )
          } else {
            return this.props.renderItemWithInfo(item, false, false)
          }
        }}
        onViewableItemsChanged={this.onViewableItemsChanged}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
        onScroll={this.onScroll}
        {...this.props}
      />
    )
  }
}

interface IState {
  scrollHeight: number
  inFocusIndex: number
}

interface IProps extends SectionListProps<any> {
  renderItemWithInfo: (item: any, itemInFocus: boolean, itemInFocusWindow: boolean) => ReactElement
}

export default SectionListInFocus
