import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Layout = () => {
  return (
    <div className='flex min-h-screen'>
      <div className='sticky top-0 h-screen ' >
        <Sidebar />
      </div>
      <div className='w-full flex-1'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout