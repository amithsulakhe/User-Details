import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserForm from './Components/UserForm'
import UserTable from './Components/UserTable'
import Form from './Components/Form'
import { RouterProvider, createBrowserRouter } from "react-router-dom"

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <UserForm />

    },
    {
      path: "/details",
      element: <UserTable />
    }
  ])

  return (
    <>
      <div>
        <RouterProvider router={appRouter}>
          <UserForm />
          <UserTable />
        </RouterProvider>
        {/* <Form/> */}
      </div>
    </>
  )
}

export default App
