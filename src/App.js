import { DataProvider } from './store'
import MainLayout from './Layouts'
import { BrowserRouter as Router } from 'react-router-dom'

import './static/css/reset.css'
import './static/css/header.scss'
import './static/css/footer.scss'
import './static/css/responsive.scss'

function App() {
  return (
    <Router>
      <DataProvider>
        <MainLayout />
      </DataProvider>
    </Router>
  )
}

export default App
