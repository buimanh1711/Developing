import { Link, useHistory } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { usernameValidate } from '../../utils/validate'
import { getUser, toggleLoading } from '../../store/actions'
import { DataContext } from '../../store/index'
import api from '../../utils/axios'
import Cookies from 'js-cookie'

const SignIn = (props) => {

  const { state, dispatch } = useContext(DataContext)
  const [usernameErr, logUsernameErr] = useState(false)
  const [userData, setUserData] = useState({})
  const [passCheck, setPassCheck] = useState(false)
  const [login, setLogin] = useState(false)
  const history = useHistory()

  useEffect(() => {
    localStorage.clear()
  }, [])

  const usernameValidation = (e) => {
    let value = e.target.value
    value = value.trim()
    setUserData({
      ...userData,
      username: value
    })

    if (value !== '') {
      logUsernameErr(!usernameValidate(value))
      if (checkValidate(!usernameValidate(value), passCheck) && value?.length > 0 && userData.password?.length >= 6) {
        setLogin(true)
      } else {
        setLogin(false)
      }
    } else {
      logUsernameErr(false)
    }
  }

  const passValidation = (e) => {
    let value = e.target.value
    value = value.trim()

    setUserData({
      ...userData,
      password: value
    })

    if (value.length < 5) {
      setPassCheck(true)
    } else {
      setPassCheck(false)
    }

    if (checkValidate(usernameErr, passCheck) && userData.username?.length > 0 && value?.length >= 6) {
      setLogin(true)
    } else {
      setLogin(false)
    }
  }


  const checkValidate = (usernameErr, passCheck) => {
    if (!usernameErr && !passCheck) {
      return true
    } else return false
  }

  const submitHandle = (e) => {
    if (checkValidate(usernameErr, passCheck)) {
      dispatch(toggleLoading(true))
      api('POST', '/api/login', userData)
        .then(res => {
          console.log(res)
          if (res.data && res.data.status) {
            const { user } = res.data
            console.log(user)
            console.log(res.data)
            localStorage.setItem('login', true)
            localStorage.setItem('id', user._id)
            localStorage.setItem('image', user.image)
            localStorage.setItem('email', user.email)
            localStorage.setItem('firstName', user.firstName)
            localStorage.setItem('lastName', user.lastName)
            localStorage.setItem('phone', user.phone)
            localStorage.setItem('role', user.role)
            Cookies.set('userToken', res.data.token, { expires: 7 })
            dispatch(toggleLoading(false))
            dispatch(getUser())
            console.log(state)
            history.replace({ pathname: '/' })
          }

          // if (data.logged) {
          //   const userInfo = data.userData

            // localStorage.setItem('login', true)
            // localStorage.setItem('firstName', userInfo.firstName)
            // localStorage.setItem('lastName', userInfo.lastName)
            // localStorage.setItem('id', userInfo.id)
            // localStorage.setItem('userImage', userInfo.image)
            // localStorage.setItem('token', userToken)
            // localStorage.setItem('role', role)
          // } else {
          //   alert('Thông tin tài khoản không đúng, vui lòng đăng nhập lại.')
          // }
          // }
        })
        .catch(err => {
          console.log('err', err)
        })
    } else {
      alert('Thông tin không hợp lệ!')
    }
    e.preventDefault()
  }

  return (
    <>
      <div className='sign-in-container'>
        <div className='sign-in-header'>
          <div className='sign-in-logo-wrapper'>
            <Link to='/'>
              <img src='/images/mb_logo.png' />
            </Link>
          </div>
          <h1 className='sign-in-title'>Welcome!</h1>
        </div>
        <form onSubmit={(e) => submitHandle(e)} id='sign-up-form'>
          <label htmlFor='username'>Username: </label>
          <input onChange={(e) => usernameValidation(e)} className={usernameErr ? 'validate-error' : ''} required id='username' placeholder='Enter your Username' name='username' />
          <label htmlFor='password'>Password: </label>
          <input onChange={(e) => passValidation(e)} required type='password' placeholder='******' id='password' name='password' />
          <Link className='link-to-sign-in' to='/forget'>
            Forgot password?
                    </Link>
          <div className='form-btn'>
            <button disabled={!login} type='submit' className={login ? 'sign-btn active' : 'sign-btn'}>
              Sign in
                        </button>
          </div>
          <div className='form-auths'>
            <Link to='/' className='fb'>
              <span>Facebook</span><i className="fab fa-facebook"></i>
            </Link>
            <Link to='/' className='gg'>
              <span>Google</span><i className="fab fa-google"></i>
            </Link>
          </div>
        </form>
        <Link to='/register' className='link-to-sign-in'>
          You don't have an account? Sign-up here!
                </Link>
      </div>
    </>
  )
}

export default SignIn