import React, { FunctionComponent } from 'react'
import { View } from 'react-native'
import Colors from 'src/constants/Colors'

const CornerRadius: FunctionComponent = props => (
  <View
    style={{
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      borderBottomRightRadius: 12,
      borderBottomLeftRadius: 12,
      overflow: 'hidden',
    }}
  >
    {props.children}
  </View>
)

const Columns: FunctionComponent = props => (
  <View
    style={{
      flex: 1,
      flexDirection: 'column',
      alignSelf: 'center',
      width: '100%',
      borderRadius: 12,
      backgroundColor: Colors.OFF_WHITE,
    }}
  >
    {props.children}
  </View>
)

const Components = { CornerRadius, Columns }

export default Components
