import './App.css'
import './homepage.css'
import { Routes, Route } from 'react-router-dom'
import LoginForm from './front/login/login'
import SignUpForm from './front/signup/signup'
import Index from './front/index'
import Error from './front/404'
import AdminDashboard from './admin/admindashboard'
// import AuthRoute from './components/auth/auth'
import AdminRoute from './components/auth/adminRoute'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import VerifyCode from './front/verifycode/verifycode'
import VerifyOperator from './front/operator/verifyop'

function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Index />} />
        <Route exact path='/signin' element={<LoginForm />} />
        <Route exact path='/signup' element={<SignUpForm />} />
        <Route exact path='/confirm-email' element={<VerifyCode />} />
        <Route
          exact
          path='/confirmOperator/:orgId/:usId'
          element={<VerifyOperator />}
        />

        <Route
          exact
          path='/companyname/*'
          element={<AdminRoute Component={AdminDashboard} />}
        />

        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
