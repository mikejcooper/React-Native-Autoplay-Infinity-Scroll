import React, { PureComponent } from 'react'
import { ImageBackground, StyleSheet } from 'react-native'
import Images from 'src/assets/images'

class ThumbnailBackground extends PureComponent<IProps, {}> {
  render() {
    const { imageUri, hide } = this.props
    return !hide ? (
      <ImageBackground
        source={imageUri ? { uri: imageUri } : Images.profileSilhouette}
        style={{
          aspectRatio: 16 / 9,
        }}
      >
        {this.props.children}
      </ImageBackground>
    ) : (
      this.props.children
    )
  }
}

interface IProps {
  imageUri?: string
  hide?: boolean
}

export default ThumbnailBackground
