import React from 'react'
import {Outlet} from 'react-router-dom'
import Nav from "../features/shared/components/Nav.jsx"
const AppLayout = () => {
  return (
    <>
    <Nav />
    <Outlet />
    </>
  )
}

export default AppLayout