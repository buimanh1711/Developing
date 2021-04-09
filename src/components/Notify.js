import { Link } from 'react-router-dom'

const Notify = ({ notifyList }) => {
  const newNotifyList = notifyList
  return (
    <div className='notification'>
      <div className='notif-container'>
        <div className='notif-list'>
          {
            newNotifyList && newNotifyList.length > 0 &&
            <ul>
              {
                newNotifyList.map(item =>
                  <li>
                    <span>
                      {item.value}
                    </span>
                  </li>
                )
              }
            </ul>
          }
        </div>
      </div>
    </div>
  )
}

export default Notify