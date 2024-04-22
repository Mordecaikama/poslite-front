import Homepage from './pages/dashboard/dashboard'
import { Routes, Route } from 'react-router-dom'

function AdminDashboard() {
  return (
    <div className='container'>
      <Routes>
        <Route exact path='/*' element={<Homepage />} />
      </Routes>
    </div>
  )
}

export default AdminDashboard
