import React, { Component } from 'react'
import { View } from 'react-native'

class PaddingVertical extends Component<IProps> {
  render() {
    return <View style={{ paddingVertical: this.props.value }}>{this.props.children}</View>
  }
}

interface IProps {
  value: number
}

export default PaddingVertical
