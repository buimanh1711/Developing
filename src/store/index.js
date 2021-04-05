import { createContext, useReducer, useEffect } from 'react'
import reducer from './reducer'
import api from '../utils/axios'

export const DataContext = createContext()

export const DataProvider = (props) => {
  const initialState = {
    notif: {
      active: false,
      content: ''
    },
    user: {},
    login: false,
    cart: [],
    loading: false
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      api('GET', '/auth')
        .then(res => {
          if (res.data.status) {
            
          } else {
            dispatch({
              type: "SET_LOGIN",
              payload: false
            })
          }
        })
    }
  })

  return (
    <DataContext.Provider value={{state, dispatch}}>
      {props.children}
    </DataContext.Provider>
  )

}
