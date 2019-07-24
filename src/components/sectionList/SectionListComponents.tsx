import { FunctionComponent, ReactElement } from 'react'
import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import Scale from 'src/constants/Scale'
import Colors from 'src/constants/Colors'

export const LIST_SEPARATOR_HEIGHT = 30

interface SectionHeaderItemProps {
  title: string
}

export const SectionHeaderItem: FunctionComponent<SectionHeaderItemProps> = props => (
  <View
    style={{
      flex: 1,
      paddingTop: Scale.ms(24),
      paddingBottom: Scale.ms(16),
      paddingLeft: Scale.ms(3),
      paddingRight: Scale.ms(5),
      flexDirection: 'row',
      alignItems: 'flex-end',
    }}
  >
    <Text
      style={{
        flexShrink: 0,
        fontSize: Scale.ts(21),
        color: Colors.OFF_BLACK,
      }}
    >
      {props.title}
    </Text>
    <View style={{ flex: 1 }} />
  </View>
)

export const ActivityIndicatorItem: FunctionComponent = props => (
  <View
    style={{
      height: Scale.vs(60),
      flexDirection: 'row',
      alignSelf: 'center',
    }}
  >
    <ActivityIndicator animating size="large" />
  </View>
)

const DefaultFooter: FunctionComponent = props => (
  <View
    style={{
      height: Scale.vs(60),
      flexDirection: 'row',
      alignSelf: 'center',
    }}
  />
)

const Container: FunctionComponent = props => (
  <View
    style={{
      flex: 1,
      backgroundColor: Colors.LIGHT_GRAY,
      width: '100%',
      height: '100%',
    }}
  >
    {props.children}
  </View>
)

const SeparatorItem: FunctionComponent = props => (
  <View
    style={{
      height: LIST_SEPARATOR_HEIGHT,
      width: '100%',
    }}
  />
)

interface HeaderProps {
  headerComponent: ReactElement | undefined
}

const Header: FunctionComponent<HeaderProps> = props =>
  // Reverse horizontal margin in contentContainerStyle
  props.headerComponent ? (
    <View style={{ marginHorizontal: Scale.ms(-14) }}>{props.headerComponent}</View>
  ) : null

const SectionListComponents = {
  ActivityIndicatorItem,
  DefaultFooter,
  SectionHeaderItem,
  Container,
  SeparatorItem,
  Header,
}

export default SectionListComponents
