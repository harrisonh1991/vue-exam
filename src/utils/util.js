/**
 * 計算兩個時間的差值
 * @param {Date} nowDate - 現在時間
 * @param {Date} endTime - 目標時間
 * @returns {{
 *   distance: number,
 *   day: number,
 *   hour: number,
 *   minute: number,
 *   second: number
 * }} 返回時間差的物件
 * @example
 * calculateTimeDifference('2024-01-01', '2024-01-03')
 * // returns { distance: 86400000, day: 2, hour: 0, minute: 0, second: 0 }
 */
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

export const formatDateString = (val, format) => {
  const date = new Date(val)
  if (format.includes('yyyy')) {
    const year = date.getFullYear()
    format = format.replaceAll('yyyy', year)
  }
  if (format.includes('MM')) {
    const month = String(date.getMonth() + 1).padStart(2, '0')
    format = format.replaceAll('MM', month)
  }
  if (format.includes('dd')) {
    const day = String(date.getDate()).padStart(2, '0')
    format = format.replaceAll('dd', day)
  }
  if (format.includes('hh')) {
    const hours = String(date.getHours()).padStart(2, '0')
    format = format.replaceAll('hh', hours)
  }
  if (format.includes('mm')) {
    const minutes = String(date.getMinutes()).padStart(2, '0')
    format = format.replaceAll('mm', minutes)
  }
  if (format.includes('ss')) {
    const seconds = String(date.getSeconds()).padStart(2, '0')
    format = format.replaceAll('ss', seconds)
  }
  return format
}
