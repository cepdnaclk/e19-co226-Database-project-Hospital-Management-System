import React from 'react'
import Login from './Login'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import DashboardRecpt from './DashboardRecpt'
import AddPatient from './AddPatient'
import SearchPatient from './searchPatient'
import Profile from './Profile'
import AdminDashboard from './AdminDashboard'
import AddDoctor from './AddDoctor'
import AddNurse from './AddNurse'
import AddReceptionist from './AddReceptionist'
import Details from './Details'

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path='/adminDashboard' element={<AdminDashboard/>}>
          <Route path='' element={<AddDoctor/>}></Route>
          <Route path='/adminDashboard/addNurse' element={<AddNurse/>}></Route>
          <Route path='/adminDashboard/addReceptionist' element={<AddReceptionist/>}></Route>
          <Route path='/adminDashboard/Details' element={<Details/>}></Route>
        </Route>

        <Route path='/' element={<DashboardRecpt />}>
          <Route path='' element={<AddPatient/>}></Route>
          <Route path='/Profile' element={<Profile/>}></Route>
          <Route path='/searchPatient' element={<SearchPatient/>}></Route>
        </Route>

        <Route path='/login' element={<Login />}></Route>
      </Routes>
      
      </BrowserRouter>
  )
}

export default App
