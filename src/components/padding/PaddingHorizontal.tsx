import React, { Component } from 'react'
import { View } from 'react-native'

class PaddingHorizontal extends Component<IProps> {
  render() {
    return <View style={{ paddingHorizontal: this.props.value }}>{this.props.children}</View>
  }
}

interface IProps {
  value: number
}

export default PaddingHorizontal
