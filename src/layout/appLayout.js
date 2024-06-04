import {Outlet} from 'react-router-dom'
import MyNavbar from '../Components/myNavBar'

function AppLayout() {
  return (
    <div>
    <MyNavbar />
    <Outlet />
    </div>
  )
}

export default AppLayout