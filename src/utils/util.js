export const calculateTimeDifference = (nowDate, targetDate) => {
  if (!nowDate || !targetDate) return null
  nowDate = new Date(nowDate)
  targetDate = new Date(targetDate)
  var distance = targetDate - nowDate
  var day = Math.floor(distance / (1000 * 60 * 60 * 24))
  var hour = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  var minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  var second = Math.floor((distance % (1000 * 60)) / 1000)

  return {
    distance,
    day,
    hour,
    minute,
    second,
  }
}
