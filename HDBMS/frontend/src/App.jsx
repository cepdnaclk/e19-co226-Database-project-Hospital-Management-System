import React from 'react'
import Login from './Login'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import DashboardRecpt from './DashboardRecpt'
import AddPatient from './AddPatient'
import SearchPatient from './searchPatient'
import PProfile from './PProfile'
import Help from './Help'
import DashboardAdmin from './DashboardAdmin'
import AddDoctor from './AddDoctor'
import AddNurse from './AddNurse'
import AddReceptionist from './AddReceptionist'
import Details from './Details'


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/DashboardAdmin' element={<DashboardAdmin/>}>
        <Route path='' element={<AddDoctor/>}></Route>
        <Route path='/DashboardAdmin/addNurse' element={<AddNurse/>}></Route>
        <Route path='/DashboardAdmin/addReceptionist' element={<AddReceptionist/>}></Route>
        <Route path='/DashboardAdmin/Details' element={<Details/>}></Route> 
        <Route path='/DashboardAdmin/Help' element={<Help/>}></Route>    
      </Route>

      <Route path ='/' element={<DashboardRecpt />}>
        <Route path='' element={<AddPatient/>}></Route>
        <Route path='/PProfile' element={<PProfile/>}></Route>
        <Route path='/searchPatient' element={<SearchPatient/>}></Route>
        <Route path='/Help' element={<Help/>}></Route>
      </Route>
      
      <Route path='/login' element={<Login />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
