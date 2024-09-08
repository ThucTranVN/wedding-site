import { useState } from 'react'
import dayjs from 'dayjs'

const initTime = dayjs(new Date(2024, 10, 10, 0, 0, 0)) // November 10, 2024
let inter = 0
const useTimer = () => {
  const [value, setValue] = useState({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0
  })

  const startTimer = () => {
    inter = setInterval(() => {
      const nowTime = dayjs(new Date())
      if (nowTime.isBefore(initTime)) {
        const day = initTime.diff(nowTime, 'd')
        const hour = (initTime.diff(nowTime, 'h') % 24)
          .toString()
          .padStart(2, '0')
        const minute = (initTime.diff(nowTime, 'm') % 60)
          .toString()
          .padStart(2, '0')
        const second = (initTime.diff(nowTime, 's') % 60)
          .toString()
          .padStart(2, '0')

        setValue({
          day,
          hour,
          minute,
          second
        })
      } else {
        setValue({
          day: 0,
          hour: '00',
          minute: '00',
          second: '00'
        })
        stopTimer() // Stop the timer when the countdown reaches zero
      }
    }, 1000) // update every second
  }

  const stopTimer = () => {
    clearInterval(inter)
  }

  return {
    stopTimer,
    startTimer,
    value
  }
}

export default useTimer
