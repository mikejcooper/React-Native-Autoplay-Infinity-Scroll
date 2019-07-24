interface Dictionary<T> {
  [key: string]: T
}

const Images = {
  profileIcon: require('./images/profile.png'),
  profileSilhouette: require('./images/profileSilhouette.png'),
  play: require('./images/play.png'),
  pause: require('./images/pause.png'),
  fullScreen: require('./images/fullScreen.png'),
  fullscreenExit: require('./images/fullscreenExit.png'),
  audioOn: require('./images/audioOn.png'),
  audioOff: require('./images/audioOff.png'),
}

export default Images
