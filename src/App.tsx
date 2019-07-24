import React, { Component } from 'react'
import Components from 'src/components/AppComponents'
import VideoList from 'src/components/video/VideoList'
import DataStore, { VideoData } from 'src/constants/DataStore'

class App extends Component<IState> {
  state = {
    data: [],
    isLoading: false,
    isRefreshing: false,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    this.setState({ isLoading: true })

    setTimeout(() => {
      this.setState({ data: DataStore.videoData, isLoading: false })
    }, 500)
  }

  onLoadMore = () => {
    this.setState({ isLoading: true })

    const moreData = DataStore.videoData.map(function(item) {
      const newItem = { ...item } // Shallow copy
      newItem.id = Math.random()
      return newItem
    })

    setTimeout(() => {
      this.setState({ data: this.state.data.concat(moreData), isLoading: false })
    }, 1000)
  }

  onRefresh = () => {
    this.setState({ isRefreshing: true })

    setTimeout(() => {
      this.setState({ data: DataStore.videoData, isRefreshing: false })
    }, 1000)
  }

  render() {
    return (
      <Components.AppContainer>
        <VideoList
          videos={this.state.data}
          isLoading={this.state.isLoading}
          isRefreshing={this.state.isRefreshing}
          onLoadMore={this.onLoadMore}
          onRefresh={this.onRefresh}
        />
      </Components.AppContainer>
    )
  }
}

interface IState {
  data: VideoData[]
  isLoading: boolean
  isRefreshing: boolean
}

export default App
