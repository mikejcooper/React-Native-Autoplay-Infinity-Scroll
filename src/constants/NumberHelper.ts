function convertSecondsToReadableStr(sec: number): string {
  sec = Math.round(sec)
  var hrs = Math.floor(sec / 3600)
  var min = Math.floor((sec - hrs * 3600) / 60)
  var seconds = sec - hrs * 3600 - min * 60
  seconds = Math.round(seconds * 100) / 100

  var result = hrs == 0 ? '' : hrs + ':'
  result += min
  result += ':' + (seconds < 10 ? '0' + seconds : seconds)
  return result
}

const NumberHelper = { convertSecondsToReadableStr }

export default NumberHelper
