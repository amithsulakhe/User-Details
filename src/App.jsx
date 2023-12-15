import './App.css'
import UserForm from './Components/UserForm'
import UserTable from './Components/UserTable'
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
        </RouterProvider>
      </div>
    </>
  )
}

export default App
