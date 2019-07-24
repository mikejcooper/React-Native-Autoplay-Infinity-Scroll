/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { StatusBar, View } from 'react-native'
import Modal from 'react-native-modal'
import Colors from 'src/constants/Colors'

class FullScreenModal extends Component<IProps, {}> {
  render() {
    if (this.props.visible) {
      StatusBar.setHidden(true)
    } else {
      StatusBar.setHidden(false)
    }

    return (
      <>
        {this.props.visible ? (
          <View
            onLayout={() => {
              this.props.onPressModalVisibilityChange(true, this.props.currentTime)
            }}
          >
            <Modal
              style={{
                flex: 1,
                margin: 0,
                width: '100%',
                height: '100%',
                backgroundColor: Colors.BLUE_GREY_DARK,
              }}
              onBackButtonPress={() => {
                this.props.onPressModalBackButton()
              }}
              isVisible={this.props.visible}
              animationIn="zoomIn"
              animationInTiming={250}
            >
              {this.props.children}
            </Modal>
          </View>
        ) : (
          <View
            style={{ width: '100%', height: '100%' }}
            onLayout={() => {
              this.props.onPressModalVisibilityChange(false, this.props.currentTime)
            }}
          >
            {this.props.children}
          </View>
        )}
      </>
    )
  }
}

interface IProps {
  visible: boolean
  currentTime: number
  onPressModalBackButton: () => void
  onPressModalVisibilityChange: (isVisible: boolean, time: number) => void
}

export default FullScreenModal
