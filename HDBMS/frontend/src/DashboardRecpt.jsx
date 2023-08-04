import React from "react"
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link, Outlet } from "react-router-dom"


function DashboardRecpt(){
    return(
        <div className="container-fluid">
    <div className="row">
        {/* Sidebar */}
        <div className="col-auto col-md-4 col-xl-2 px-sm-2 px-0 bg-info">
            <div className="d-flex flex-column align-items-start px-3 pt-2 text-dark min-vh-100">

                {/* Menu Link */}
                <Link to='/' className="d-flex align-items-center pb-3 mb-md-1 me-md-auto text-dark text-decoration-none">
                    <span className="fs-5 d-none d-sm-inline"><b>Menu</b></span>
                </Link>

                {/* Sidebar Navigation */}
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
                    {/* Add Patient */}
                    <li>
                        <Link to="/" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-person-plus"></i> <span className="ms-1 d-none d-sm-inline text-dark"><b>Add Patient</b></span>
                        </Link>
                    </li>
                    
                    <li>
                        <Link to='/searchPatient' className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-search"></i> <span className="ms-1 d-none d-sm-inline text-dark"><b>Search Patient</b></span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/Profile' className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline text-dark"><b>Profile</b></span>
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
              <h3>PATIENT MANAGEMENT </h3>
           
            </div>
            <Outlet />
        </div>
    </div>
</div>


 
    )
}

export default DashboardRecpt  
