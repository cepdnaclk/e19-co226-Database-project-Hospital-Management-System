import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link, Outlet } from "react-router-dom"

function AdminDashboard(){
    return(
    <div className="container-fluid">
    <div className="row">
        {/* Sidebar */}
        <div className="col-auto col-md-4 col-xl-2 px-sm-2 px-0" style={{ backgroundColor: 'rgb(173, 250, 255)' }}>
            <div className="d-flex flex-column align-items-start px-3 pt-2 text-dark min-vh-100">

                {/* Menu Link */}
                <Link to='/adminDashboard' className="d-flex align-items-center pb-3 mb-md-1 me-md-auto text-dark text-decoration-none">
                    <span className="fs-5 d-none d-sm-inline"><b>Admin Dashboard</b></span>
                </Link>

                {/* Sidebar Navigation */}
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
                    {/* Add Patient */}
                    <li>
                        <Link to="/adminDashboard" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-person-plus"></i> <span className="ms-1 d-none d-sm-inline text-dark"><b>Add Doctor</b></span>
                        </Link>
                    </li>
                    
                    <li>
                        <Link to='/adminDashboard/addNurse' className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-person-plus"></i> <span className="ms-1 d-none d-sm-inline text-dark"><b>Add Nurse</b></span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/adminDashboard/addReceptionist' className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-person-plus"></i> <span className="ms-1 d-none d-sm-inline text-dark"><b>Add Receptionist</b></span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/adminDashboard/Details' className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-info-circle"></i> <span className="ms-1 d-none d-sm-inline text-dark"><b>Details</b></span>
                        </Link>
                    </li>
                    <li>
                        <a href="#" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline text-dark"><b>Logout</b></span>
                        </a>
                    </li>
                </ul>

            </div>
        </div>
        <div className="col py-3 position-relative">
            
            {/* Content area */}
            <div className="p-1 d-flex justify-content-center shadow" >
              <h4>ADMIN DASHBOARD</h4>
           
            </div>
            <Outlet />
        </div>
    </div>
</div>


 
    )
}

export default AdminDashboard