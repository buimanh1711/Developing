import { DataProvider } from './store'
import MyApp from './MyApp'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
const socket = io('localhost:3999')


function App() {
  useEffect(() => {
      socket.emit('chat message', 'chatting');
      socket.on('rep', (data) => {
        console.log(data)
      })
    }, [])
  return (
    <DataProvider>
        <MyApp />
    </DataProvider>
  )
}

export default App
