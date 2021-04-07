import { useState, useEffect } from 'react'
import moment from 'moment'

const DetailCounter = ({ time }) => {
  const [countTime, setCountTime] = useState(null)

  const future = new Date(time)
  const now = new Date()
  useEffect(() => {
    var count = (future.getTime() - now.getTime()) / 1000
    count = Math.floor(count)
    setInterval(() => {
      count = count - 1
      if (count) {
        const result = new Date(count * 1000).toISOString().substr(11, 8)
        setCountTime(result)
      }
    }, 1000)
  })
  return (
    <div id='detail-counter'>
      <h3>{countTime}</h3>
    </div>
  )
}

export default DetailCounter