import MainLayout from './layouts'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { DataContext } from './store'
import { useContext, useEffect } from 'react'
import { getUser } from './store/actions'

import './static/css/reset.css'
import './static/css/header.scss'
import './static/css/footer.scss'
import './static/css/product.scss'
import './static/css/sign.scss'
import './static/css/home.scss'
import './static/css/create.scss'
import './static/css/main.scss'
import './static/css/responsive.scss'

import Product from './pages/product'
import SignIn from './pages/sign/sign-in'
import SignUp from './pages/sign/sign-up'
import Create from './pages/create'
import Update from './pages/update'
import Home from './pages/home'
import Loading from './components/Loading'

const MyApp = () => {
  const { state, dispatch } = useContext(DataContext)
  useEffect(() => {
    dispatch(getUser())
    console.log(state)
  }, [])

  return (
    <>
    {
      state.loading &&
      <Loading />
    }
      <Router>
        <Switch>
          <Route path='/login'>
            <SignIn />
          </Route>
          <Route path='/register'>
            <SignUp />
          </Route>
          <Route path='/products/create'>
            <Create />
          </Route>
          <Route path='/products/update/:productId'>
            <Update />
          </Route>
          <Route path='/products'>
            <MainLayout>
              <Product />
            </MainLayout>
          </Route>
          <Route path='/'>
            <MainLayout>
              <Home />
            </MainLayout>
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default MyApp