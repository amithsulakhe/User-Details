import './App.css'
import UserForm from './Components/UserForm'
import UserTable from './Components/UserTable'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import appStore from './Components/Redux/store'
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
        <Provider store={appStore}>
        <RouterProvider router={appRouter}>


      <div>


      </div>
      </RouterProvider>

      </Provider>

    </>
  )
}

export default App
