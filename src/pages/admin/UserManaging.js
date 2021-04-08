import UserList from '../../components/UserList'
import { useState, useEffect } from 'react'
import api from '../../utils/axios'

const UserManager = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    api('GET', 'api/auth/admin')
      .then(res => {
        if (res.data && res.data.status) {
          api('GET', `api/users`)
            .then(userRes => {
              if (userRes.data && userRes.data.status) {
                setUsers(userRes.data.users)
              }
            })
        } else {
          alert('You are not Administrator!')
        }
      })
  }, [])

  return (
    <div id='admin-product' className='container'>
      <UserList users={users} setUsers={setUsers} />
    </div>
  )
}

export default UserManager