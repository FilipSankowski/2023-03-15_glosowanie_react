import { Link, Outlet } from "react-router-dom";


export default function Layout() {
  return (
    <>
    <div className="navbarContainer">
      <div className="navbarItem">
        <Link to='/'>Home</Link>
      </div>
      <div className="navbarItem">
        <Link to='/adminPage'>Admin Page</Link>
      </div>
    </div>
    <Outlet />
    </>
  )
}