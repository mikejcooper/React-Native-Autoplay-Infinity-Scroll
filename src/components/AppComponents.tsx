import React, { FunctionComponent } from 'react'
import { View } from 'react-native'

const AppContainer: FunctionComponent = props => (
  <View style={{ width: '100%', height: '100%' }}>{props.children}</View>
)

const Components = { AppContainer }

export default Components
