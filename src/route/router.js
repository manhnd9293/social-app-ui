import {createBrowserRouter} from "react-router-dom";
import RootLayout from "../view/rootLayout/RootLayout";
import EmployeeList from "../view/employee/EmployeeList";
import Register from "../view/register/Register";
import Test from "../view/test/Test";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      {
        path: '/employee',
        element: <EmployeeList/>
      },
      {
        path: '/register',
        element: <Register/>
      },
      {
        path: '/test',
        element: <Test/>
      }
    ]
  },

])

export default router
