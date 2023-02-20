import {createBrowserRouter} from "react-router-dom";
import RootLayout from "../view/rootLayout/RootLayout";
import EmployeeList from "../view/employee/EmployeeList";
import Register from "../view/register/Register";
import Test from "../view/test/Test";
import Login from "../view/login/Login";
import Home from "../view/home/Home";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/employee',
        element: <EmployeeList/>
      },
      {
        path: '/sign-up',
        element: <Register/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/test',
        element: <Test/>
      },
    ]
  },

])

export default router
