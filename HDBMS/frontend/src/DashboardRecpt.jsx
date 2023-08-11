import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link, Outlet } from "react-router-dom"
import { useState } from 'react';

function DashboardRecpt() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prevState) => !prevState);
};

return (
    <div className={`container-fluid ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`} style={{ backgroundImage: "url('images/BG.jpg')", backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <div className="row">
        {/* Sidebar */}
        <div className="col-auto col-md-4 col-xl-2 px-sm-2 px-0 bg-lightblue sidebar" style={{ backgroundColor: 'lightblue' }}>
          <div className="d-flex flex-column align-items-start px-3 pt-2 min-vh-100">
            {/* Menu Link */}
            <div className="d-flex align-items-center pb-3 mb-md-1 me-md-auto" style={{ color: '#042e5b' }}>
              <span className="fs-5 d-none d-sm-inline" ><b>Menu</b></span>
              <button className="btn btn-link text-#042e5b d-sm-none"  onClick={handleSidebarToggle}>
                <i className="bi bi-x"></i>
              </button>
            </div>

            {/* Sidebar Navigation */}
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start " id="menu">
              {/* Add Patient */}
              <li>
                <Link to="/rep" className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-person-plus" style={{ color: ' #042e5b',backgroundColor: 'white', padding: '2px', borderRadius: '20px' }}></i> <span className="ms-2 d-none d-sm-inline" style={{ color: ' #042e5b', fontSize: '18px' }}><b>Add Patient </b></span>
                </Link>
              </li>

              <li>
                <Link to='/rep/searchPatient' className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-search" style={{ color: ' #042e5b', backgroundColor: 'white', padding: '2px', borderRadius: '20px' }}></i> <span className="ms-2 d-none d-sm-inline " style={{ color: ' #042e5b', fontSize: '18px' }}><b>Search Patient</b></span>
                </Link>
              </li>
              <li>
                <Link to='/rep/Help' className="nav-link px-0 align-middle">
                <i className="fs-4 bi-book" style={{ color: ' #042e5b',backgroundColor: 'white', padding: '2px', borderRadius: '20px' }}></i> <span className="ms-2 d-none d-sm-inline " style={{ color: ' #042e5b', fontSize: '18px' }}><b>Help</b></span>               
                </Link>
              </li>
              <li>
                <Link to='/' className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-power" style={{ color: ' #042e5b',backgroundColor: 'white', padding: '2px', borderRadius: '20px' }}></i> <span className="ms-2 d-none d-sm-inline" style={{ color: ' #042e5b', fontSize: '18px' }}><b>Logout</b></span>
                </Link>
              </li>
            </ul>

          </div>
        </div>
        <div className="col py-3 position-relative">
          {/* Toggle Sidebar Button */}
          <button className="btn btn-info d-sm-none toggle-sidebar-button" onClick={handleSidebarToggle}>
            <i className={`bi bi-${isSidebarOpen ? 'arrow-left' : 'arrow-right'}`}></i>
          </button>

          {/* Content area */}
          <div className="p-3 d-flex justify-content-center " >
            <h3 className="text-lightblue" style={{ color: '#042e5b', fontSize: '30px', backgroundColor: 'white', padding: '5px', borderRadius: '5px' }} ><b>PATIENT MANAGEMENT</b></h3>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardRecpt;